def COLOR_MAP = [
    'FAILURE' : 'danger',
    'SUCCESS' : 'good'
]

pipeline {
    agent any
    
    parameters {
        choice(name: 'action', choices: 'create\ndelete', description: 'Select create or destroy.')
    }
    
    environment {
        
        DOCKER_HUB_KEY = credentials('dockerhubcredentials')
        DOCKER_IMAGE_FRONTEND = 'surendergupta/learnercs_fe'
        DOCKER_IMAGE_BACKEND = 'surendergupta/learnercs_be'
        DOCKER_TAG = "${env.BUILD_ID}"
        
        GITHUB_URL = 'https://github.com/surendergupta/learnerReportCS.git'
        GIT_BRANCH = 'main'
        
        // KUBECONFIG = credentials('kubeconfig')
        // KUBE_NAMESPACE = 'default'
        
        HELM_CHART_PATH_BE = './learner-charts/backend-chart'
        HELM_CHART_PATH_FE = './learner-charts/frontend-chart'
        HELM_RELEASE_NAME_BE = 'backend-chart'
        HELM_RELEASE_NAME_FE = 'frontend-chart'
        
        AWS_REGION = 'us-east-1'
        AWS_EKS_CLUSTER_NAME = 'suri-eks-cluster-jenkins'
    }
    
    stages {
        stage('Checkout from Git'){
            when { expression { params.action == 'create'}}
            steps{
                git branch: env.GIT_BRANCH, url: env.GITHUB_URL
            }
        }
        stage('OWASP FS SCAN') {
            when { expression { params.action == 'create'}}
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
                    when { expression { params.action == 'create'}}
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
                    when { expression { params.action == 'create'}}
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
        // stage('Deploy to Minikube using HELM Kubernetes') {
        //     when { expression { params.action == 'create'}}
        //     steps {
        //         script {
        //             withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
        //                 bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_BE} ${env.HELM_CHART_PATH_BE}"
        //                 bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_FE} ${env.HELM_CHART_PATH_FE}"
        //                 // sh "kubectl port-forward service/backend-chart 5000:5000"
        //                 // sh "kubectl port-forward service/frontend-chart 3000:3000"
        //             }
        //         }
        //     }
        // }
        stage('Connect to EKS') {
            when {
                expression { params.action == 'create' }
            }
            steps {
                script {
                    withCredentials([aws(credentialsId: 'aws-config', region: env.AWS_REGION)]) {
                        def eksClusterExists = bat(script: "aws eks describe-cluster --name ${env.AWS_EKS_CLUSTER_NAME} --region ${env.AWS_REGION}", 
                                                   returnStatus: true) == 0
                        if (!eksClusterExists) {
                            bat """
                            eksctl create cluster --name ${env.AWS_EKS_CLUSTER_NAME} --region ${env.AWS_REGION} --nodegroup-name standard-workers --node-type t3.micro --nodes 2 --nodes-min 1 --nodes-max 3
                            """
                        }
                    }
                }
            }
        }
        stage ('deploy to eks') {
            when { expression { params.action == 'create'}}
            steps {
                script {
                    withCredentials([aws(credentialsId: 'aws-config', region: env.AWS_REGION )]) {
                        // Delete Helm releases
                        bat "helm --uninstall ${env.HELM_RELEASE_NAME_BE}"
                        bat "helm --uninstall ${env.HELM_RELEASE_NAME_FE}"
                        
                        bat "aws eks --region ${env.AWS_REGION} update-kubeconfig --name ${env.AWS_EKS_CLUSTER_NAME}"
                        bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_BE} ${env.HELM_CHART_PATH_BE}"
                        bat "helm upgrade --install --set image.tag=${env.DOCKER_TAG} ${env.HELM_RELEASE_NAME_FE} ${env.HELM_CHART_PATH_FE}"

                        // bat "kubectl apply -f ./backends/k8s/deployment.yml"
                        // bat "kubectl apply -f ./backends/k8s/service.yml"
                        // bat "kubectl apply -f ./frontends/k8s/deployment.yml"
                        // bat "kubectl apply -f ./frontends/k8s/service.yml"
                    }
                }
            }
        }
        stage ('Delete to eks') {
            when { expression { params.action == 'delete'}} 
            steps {
                script {
                    withCredentials([aws(credentialsId: 'aws-config', region: env.AWS_REGION )]) {
                        // Delete Helm releases
                        bat "helm --uninstall ${env.HELM_RELEASE_NAME_BE}"
                        bat "helm --uninstall ${env.HELM_RELEASE_NAME_FE}"
                        
                        // Delete the EKS cluster
                        bat "aws eks --region ${env.AWS_REGION} delete-nodegroup --cluster-name ${env.AWS_EKS_CLUSTER_NAME} --nodegroup-name standard-workers --wait"
                        bat "aws eks --region ${env.AWS_REGION} delete-cluster --name ${env.AWS_EKS_CLUSTER_NAME}"
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
