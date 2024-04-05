def COLOR_MAP = [
    'FAILURE' : 'danger',
    'SUCCESS' : 'good'
]

pipeline {
    agent any
    
    environment {
        
        DOCKER_HUB_KEY = credentials('dockerhubcredentials')
        DOCKER_IMAGE_FRONTEND = 'surendergupta/learnercs_fe'
        DOCKER_IMAGE_BACKEND = 'surendergupta/learnercs_be'
        GITHUB_URL = 'https://github.com/surendergupta/learnerReportCS.git'
        GIT_BRANCH = 'main'
        DOCKER_TAG = "${env.BUILD_ID}"
        KUBECONFIG = credentials('kubeconfig')
        HELM_CHART_PATH_BE = './learner-charts/backend-chart'
        HELM_CHART_PATH_FE = './learner-charts/frontend-chart'
        HELM_RELEASE_NAME_BE = 'backend-chart'
        HELM_RELEASE_NAME_FE = 'frontend-chart'
        KUBE_NAMESPACE = 'default'
    }
    
    stages {
        stage('Checkout from Git'){
            steps{
                git branch: env.GIT_BRANCH, url: env.GITHUB_URL
            }
        }
        stage('OWASP FS SCAN') {
            steps {
                script {
                    try {
                        dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-check'
                        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                    } catch (err) {
                        echo "Error in OWASP FS SCAN: ${err.message}"
                    }
                }
            }
        }
        stage('Build Docker Image') {
            parallel {
                stage('build backend') {
                    steps {
                        script {
                            // Build Docker image
                            docker.withRegistry('https://index.docker.io/v1/', 'dockerhubcredentials') {
                                def customImage = docker.build("${env.DOCKER_IMAGE_BACKEND}:${env.BUILD_ID}", "./backends") 
                                customImage.push()
                            }
                        }
                    }
                }
                stage('build frontend') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', 'dockerhubcredentials') {
                                def customImage = docker.build("${env.DOCKER_IMAGE_FRONTEND}:${env.BUILD_ID}", "./frontends")
                                customImage.push()
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Set KUBECONFIG environment variable
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_BE} ${env.HELM_CHART_PATH_BE}"
                        bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_FE} ${env.HELM_CHART_PATH_FE}"
                        // sh "kubectl port-forward service/backend-chart 5000:5000"
                        // sh "kubectl port-forward service/frontend-chart 3000:3000"                        
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Slack Notifications'
            slackSend (
                channel: '#slack-jenkins',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} \n build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
            )
        }
    }
}
