def imageName = 'weather_app-v1.1'

pipeline {
    agent any
    
    stages {
        stage("Build") {
            steps {
                echo 'Building the application image....'
                sh "docker image build -t ${imageName} ."
            }
        }
        
        stage("Test") {
            steps {
                echo "Testing the app..."
            }
        }
        
        stage("Push to Docker Hub repository") {
            steps {
                echo "Deploying the app..."
                sh 'docker login'
                sh "docker tag ${imageName} uzair102/u_repo:${imageName}"
                sh "docker push uzair102/u_repo:${imageName}"
            }
        }
        
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
            }
        }
    }
}
