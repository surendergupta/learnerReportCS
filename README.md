# learnerReportCS

## Steps to Create Git Repositories and Deploy on Kubernetes

1. **Create Git Repositories**:
   - Create two Git repositories, one for the frontend and one for the backend:
     - [Frontend Repository](https://github.com/UnpredictablePrashant/learnerReportCS_frontend)
     - [Backend Repository](https://github.com/UnpredictablePrashant/learnerReportCS_backend)
   - We use this repo in Our Project
     - [learnerReportCS] (https://github.com/surendergupta/learnerReportCS.git)

2. **Directory Structure**:
   - Inside your local directory, create folders named `frontend` and `backend`.
   - Inside each directory (`frontend` and `backend`), create a folder named `k8s`.

3. **Create Kubernetes Manifests**:
   - In the `k8s` folder of both frontend and backend repositories, create `deployment.yml` and `service.yml` files.

4. **Deploy on Minikube**:
   - Install Minikube locally.
   - Deploy both frontend and backend services using their respective `deployment.yml` and `service.yml` files inside the `k8s` folders.

5. **Install Helm**:
   - Install Helm using Chocolatey (choco).
   - Create a folder named `learner-chart` for Helm charts.

6. **Create Helm Charts**:
   - Create Helm charts for both frontend and backend services.

7. **Update Values**:
   - Update the `values.yml` file for both frontend and backend Helm charts with appropriate configurations.

8. **Package and Run Charts**:
   - Package both Helm charts.
   - Install and run both Helm charts.

9. **Jenkins Pipeline**:
   - Set up a Jenkins pipeline on your localhost.
   - Configure the pipeline to build, test, and deploy the frontend and backend services.

10. **Deployment on AWS EKS**:
    - Use EKSCTL to create an AWS EKS cluster.
    - Deploy the Helm charts on the AWS EKS cluster using the Jenkins pipeline.

By following these steps, you can effectively manage your frontend and backend services, deploy them on Kubernetes locally using Minikube, and automate the deployment process using Jenkins pipelines, including deployment on AWS EKS.
