def imageName = 'weather_app-v1.6'

pipeline {
    agent any
    // environment {
    //     AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
    //     AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    // }

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
        
        stage('AWS Setup and S3 Bucket Creation') {
        steps {
            // Configure AWS credentials using Jenkins credential provider
            withCredentials([usernameId: 'AWS_ACCESS_KEY_ID', passwordId: 'AWS_SECRET_ACCESS_KEY']) {
                // Install AWS CLI if needed (replace 'amazon-linux2' with your AMI if different)
                sh 'if [ ! -f /usr/local/bin/aws ]; then curl -sL https://awscli.amazonaws.com/awscliv2.zip | unzip -d /tmp && sudo mv /tmp/aws/dist/aws /usr/local/bin/ && sudo chmod +x /usr/local/bin/aws; fi'

                // Configure AWS region (replace 'us-east-1' with your desired region)
                sh 'aws configure set region ap-south-1'

                sh "docker tag ${imageName} 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
                sh "docker push 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
            }
        }
        }
        // stage("Push to AWS ECR...") {
        //     steps {
        //         echo "Deploying the app..."
                
        //         withCredentials([[
        //             $class: 'AmazonWebServicesCredentialsBinding' ,
        //             credentialsId: 'credentials-aws'
        //         ]]) {
        //             sh 'docker login -u AWS --password-stdin < $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'  

        //            //sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'
        //         }
        //         //sh "docker login --username AWS --password-stdin ${env.AWS_ACCESS_KEY_ID}:${env.AWS_SECRET_ACCESS_KEY} 730335323304.dkr.ecr.ap-south-1.amazonaws.com"
        //         //sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-south-1) 730335323304.dkr.ecr.ap-south-1.amazonaws.com'


                
        //     }
        // }
        
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
