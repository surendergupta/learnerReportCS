def COLOR_MAP = [
    'FAILURE' : 'danger',
    'SUCCESS' : 'good'
]

pipeline {
    agent any

    environment {
        DOCKER_HUB_KEY = credentials('dockerhubcredentials')
        DOCKER_IMAGE_FRONTEND = 'surendergupta/learnercs-fe'
        DOCKER_IMAGE_BACKEND = 'surendergupta/learnercs-be'
        GITHUB_URL = 'https://github.com/surendergupta/learnerReportCS.git'
        GIT_BRANCH = 'main'
        DOCKER_TAG = "${env.BUILD_ID}"
        KUBE_CONFIG = credentials('kubeconfig')
        HELM_CHART_PATH_BE = './learner-chart/backend-chart'
        HELM_CHART_PATH_FE = './learner-chart/frontend-chart'
        HELM_RELEASE_NAME_BE = 'backend-chart'
        HELM_RELEASE_NAME_FE = 'frontend-chart'
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
        stage('Build Docker Image And Push') {
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
                // Set kubectl config
                withCredentials([kubeconfigContent(credentialsId: 'kubeconfig', variable: 'KUBE_CONFIG')]) {
                    sh """
                        echo "\$KUBE_CONFIG" > kubeconfig
                        export KUBECONFIG=\$(pwd)/kubeconfig
                    """
                }
                // Deploy frontend and backend using kubectl or HELM
                sh """
                    kubectl apply -f ./frontends/k8s/deployment.yml
                    kubectl apply -f ./frontends/k8s/service.yml
                    kubectl apply -f ./backends/k8s/deployment.yml
                    kubectl apply -f ./backends/k8s/service.yml
                    
                """

                // Deploy using HELM
                sh """
                    helm upgrade --install your-mern-app ./helm-chart \
                        --set frontend.image.repository=your-frontend-image \
                        --set frontend.image.tag=latest \
                        --set backend.image.repository=your-backend-image \
                        --set backend.image.tag=latest
                """

                // Set KUBECONFIG environment variable
                withEnv(["KUBECONFIG=${env.KUBE_CONFIG}"]) {
                    // Deploy using kubectl or Helm
                    sh "helm upgrade --install --set backend-chart.image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_BE} ${env.HELM_CHART_PATH_BE}"
                    sh "helm upgrade --install --set frontend-chart.image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_FE} ${env.HELM_CHART_PATH_FE}"                    
                    // sh "kubectl port-forward service/backend-chart 5000:5000"
                    // sh "kubectl port-forward service/frontend-chart 3000:3000"
                }
            }
        }
    }
}
