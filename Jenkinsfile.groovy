pipeline {
    agent any
    environment {
        DOCKER_REG = "${BC_DOCKER_REG}"
        IMAGE_NAME = "${BC_DOCKER_REG}/cac-management"
        IMAGE_TAG  = "build-${BUILD_NUMBER}"
    }
    stages {
        stage('Build') {
            steps {
              sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-reg-cn', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                    sh '''
                    echo $DOCKER_PASSWORD | docker login --username $DOCKER_USER --password-stdin $DOCKER_REG
                    '''
                }
                sh 'docker push ${IMAGE_NAME}:${IMAGE_TAG}'
                sh 'docker rmi ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Deploy') {
            steps {
                sh 'kubectl get namespaces cac || kubectl create namespace cac'
                sh '/usr/local/bin/helm -n cac upgrade cac-management ./helm --set image.tag=${IMAGE_TAG}'
            }
        }
    }
}