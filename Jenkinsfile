pipeline {
    agent any
    stages {
        stage("Build") {
            steps {
                echo 'building the application image'
                sh 'docker image build -t weather_app:1.0 .'
            }
        }
        stage("Test") {
            steps {
                echo "Testing the app..."
            }
        }
        stage("push to dockehub repository") {
            steps {
                echo "Deploying the app..."
                sh 'docker login'
                sh 'docker tag 2e5bce271c22 weather_app:v1.1'
                sh 'docker push uzair102/u_repo:weather_app-v1.1'
            }
        }
        stage("deploy") {
            steps {
                echo "Deploying the app..."
            }
        }
    }
}