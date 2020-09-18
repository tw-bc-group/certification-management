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
                sh 'sed "s/PROD_LC_APP_ID/${CAC_LC_APP_ID}/g"'
                sh 'sed "s/PROD_LC_APP_KEY/${CAC_LC_APP_KEY}/g"'
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Push') {
            steps {
                sh '''
                aws ecr get-login-password | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}
                docker push ${IMAGE_NAME}:${IMAGE_TAG}
                docker rmi ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl get namespaces cac || kubectl create namespace cac'
                sh 'helm -n cac upgrade --install cac-management ./helm --set image.tag=${IMAGE_TAG} --set image.repository=${IMAGE_NAME}'
            }
        }
    }
}
