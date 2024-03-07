def imageName = 'weather_app-v1.6'

pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="730335323304"
        AWS_DEFAULT_REGION="ap-south-1"
        IMAGE_REPO_NAME="jenkins-pipeline"
        IMAGE_TAG="v1"
        REPOSITORY_URI = "730335323304.dkr.ecr.ap-south-1.amazonaws.com"
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
                
                // withCredentials([[
                //     $class: 'AmazonWebServicesCredentialsBinding' ,
                //     credentialsId: 'credentials-aws'
                // ]]) {
                //     sh 'docker login -u AWS --password-stdin < $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'  

                //    //sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'
                // }
                //sh "docker login --username AWS --password-stdin ${env.AWS_ACCESS_KEY_ID}:${env.AWS_SECRET_ACCESS_KEY} 730335323304.dkr.ecr.ap-south-1.amazonaws.com"
                sh """/usr/local/bin/aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"""
                sh "docker tag ${imageName} 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
                sh "docker push 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
                
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
