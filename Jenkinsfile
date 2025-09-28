
pipeline {
    agent any
    // environment {
    //         // DOCKER_HUB_USERNAME = credentials('dockerhub-credentials') // Reference the Jenkins credential ID
    //         // DOCKER_HUB_PASSWORD = credentials('dockerhub-credentials')
    //         DOCKER = credentials('dockerhub-credentials')
    // }
    stages {
        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]){
                    sh '''
                        docker build -t ${DOCKER_HUB_USERNAME}/syvora-app:${BUILD_NUMBER} .
                        echo \"${DOCKER_HUB_PASSWORD}\" | docker login -u \"${DOCKER_HUB_USERNAME}\" --password-stdin
                        docker push ${DOCKER_HUB_USERNAME}/syvora-app:${BUILD_NUMBER}
                    '''
                    }
       
                }
            }
        stage('Run with Docker Compose') {
            steps {
                sh '''
                docker compose version
                IMAGE_TAG=${BUILD_NUMBER} docker compose up -d --build
                docker ps
                docker images
                '''
            }
        }
    }
}
