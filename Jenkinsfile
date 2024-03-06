def imageName = 'weather_app-v1.6'

pipeline {
    agent any
    environment {
        PATH = "/path/to/awscli:$PATH"
    }

    stages {
        stage("Build") {
            steps {
                echo 'Building the application image...'
                sh "docker image build -t ${imageName} ."
            }
        }
        
        stage("Test") {
            steps {
                echo "Testing the app..."
            }
        }
        
        
        stage("Push to AWS ECR...") {
            steps {
                echo "Deploying the app..."
                
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding' ,
                    credentialsId: 'credentials-aws'
                ]]) {
                    sh '/usr/local/bin/aws ecr get-login-password --region ap-south-1 | docker login -u AWS --password-stdin 730335323304.dkr.ecr.ap-south-1.amazonaws.com'
                    sh "docker login --username AWS --password-stdin ${env.AWS_ACCESS_KEY_ID}:${env.AWS_SECRET_ACCESS_KEY} 730335323304.dkr.ecr.ap-south-1.amazonaws.com"
                    sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'
 
                   //sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'
                }
                

                
            }
        }
        
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
                sshagent(['react-server-ssh']) {
                    script {
                        def sshCommand = """
                            ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" root@142.93.222.110 'docker stop \$(docker ps -q) && docker system prune -f && docker pull 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName} && docker run -d --name weather_app_container -p 4042:3000 uzair102/u_repo:${imageName}'
                        """
                        echo "Executing SSH command: $sshCommand"
                        sh sshCommand
                    }
                }
            }
        }

    }
}
