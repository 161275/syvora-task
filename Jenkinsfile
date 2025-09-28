// pipeline{
//     agent any 
//     stages {
//         stage ('build docker image'){
//             agent {
//                 docker {
//                     image 'docker/compose:1.29.2'
//                     args '-v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
//                     reuseNode true

//                 }
//             }
//             steps{
//                 sh '''
//                 docker-compose version
//                 docker-compose up -d --build
//                 '''
//             }
//         }
        
//     }
// }
pipeline {
    agent any
    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/161275/syvora-task.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("syvora-app:latest")
                }
            }
        }

        stage('Run with Docker Compose') {
            steps {
                sh 'docker compose version'
                sh 'docker compose up -d --build'
            }
        }
    }
}
