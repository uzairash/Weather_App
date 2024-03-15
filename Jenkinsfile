def imageName = 'weather_app-v1.5'

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
                withCredentials([usernamePassword(credentialsId: 'docker-credentials-pipeline', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh "echo ${DOCKER_PASSWORD}| docker login --username ${DOCKER_USERNAME} --password-stdin"
                }
                
                sh "docker tag ${imageName} uzair102/u_repo:${imageName}"
                sh "docker push uzair102/u_repo:${imageName}"
            }
        }
        
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
                sshagent(['react-server-ssh']) {
                    script {
                        def sshCommand = """
                            ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" root@142.93.222.110 'docker stop \$(docker ps -q) && docker system prune -f && docker pull uzair102/u_repo:${imageName} && docker run -d --name weather_app_container -p 4042:3000 uzair102/u_repo:${imageName}'
                        """
                        echo "Executing SSH command: $sshCommand"
                        sh sshCommand
                    }
                }
            }
        }

    }
}
