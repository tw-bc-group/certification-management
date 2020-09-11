pipeline {
    agent any
    environment {
        AWS_PROFILE = "tw-bc-cn"
        DOCKER_REG = "${DOCKER_REGISTRY}"
        IMAGE_NAME = "${DOCKER_REGISTRY}/cac-management"
        IMAGE_TAG  = "build-${BUILD_NUMBER}"
    }
    stages {
        stage('Build Artifacts') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Push') {
            steps {
                sh 'aws ecr get-login-password | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}'
                sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'docker rmi ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl get namespaces cac || kubectl create namespace cac'
                sh 'helm -n cac upgrade cac-management ./helm --set image.tag=${IMAGE_TAG} --set image.repository=${IMAGE_NAME}'
            }
        }
    }
}