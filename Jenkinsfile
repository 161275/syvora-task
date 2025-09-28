pipeline{
    agent any 
    stages {
        stage ('build docker image'){
            steps{
                sh 'docker-compose up -d --build'
            }
        }
        
    }
}