
pipeline {
    agent any
    // environment {
    //         // DOCKER_HUB_USERNAME = credentials('dockerhub-credentials') // Reference the Jenkins credential ID
    //         // DOCKER_HUB_PASSWORD = credentials('dockerhub-credentials')
    //         DOCKER = credentials('dockerhub-credentials')
    // }

    stages {
        stage('Run with Docker Compose') {
            steps {
                sh '''
                docker compose version
                docker compose down
                IMAGE_TAG=${BUILD_NUMBER} docker compose up -d --build
                docker ps
                docker images
                sleep 10
                docker ps
                docker logs syvora-app-app-1
                # curl http://127.0.0.1:3000
                '''
            }
        }
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
        stage('Deploy to Kubernetes') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@ec2-54-196-208-124.compute-1.amazonaws.com \
                        "kubectl get pods -n kube-system"
                        kubectl run syv-pod --image=${DOCKER_HUB_USERNAME}/syvora-app:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
    }
}
