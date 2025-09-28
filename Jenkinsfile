pipeline{
    agent any 
    stages {
        stage ('build docker image'){
            agent {
                docker {
                    image 'docker/compose:1.29.2'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                    reuseNode true
                }
            }
            steps{
                sh 'docker-compose up -d --build'
            }
        }
        
    }
}