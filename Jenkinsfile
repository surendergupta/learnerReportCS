pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-registry-credentials')
        KUBE_CONFIG = credentials('kube-config')
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone frontend and backend repositories
                git branch: 'main', url: 'https://github.com/your-frontend-repo.git'
                git branch: 'main', url: 'https://github.com/your-backend-repo.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                // Build Docker images for frontend and backend
                script {
                    docker.build('your-frontend-image:latest', './frontend')
                    docker.build('your-backend-image:latest', './backend')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                // Push Docker images to your Docker registry
                script {
                    docker.withRegistry('https://your.docker.registry', DOCKER_REGISTRY_CREDENTIALS) {
                        docker.image('your-frontend-image:latest').push()
                        docker.image('your-backend-image:latest').push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Set kubectl config
                withCredentials([kubeconfigContent(credentialsId: 'kube-config', variable: 'KUBE_CONFIG')]) {
                    sh """
                        echo "\$KUBE_CONFIG" > kubeconfig
                        export KUBECONFIG=\$(pwd)/kubeconfig
                    """
                }

                // Deploy frontend and backend using kubectl or HELM
                sh """
                    kubectl apply -f frontend-deployment.yaml
                    kubectl apply -f backend-deployment.yaml                    
                """

                // Deploy using HELM
                sh """
                    helm upgrade --install your-mern-app ./helm-chart \
                        --set frontend.image.repository=your-frontend-image \
                        --set frontend.image.tag=latest \
                        --set backend.image.repository=your-backend-image \
                        --set backend.image.tag=latest
                """
            }
        }
    }
}
