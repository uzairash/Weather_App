def imageName = 'weather_app-v1.6'

pipeline {
    agent any
    
    stages {
        stage("Build") {
            steps {
                echo 'Building the application image...'
                sh "docker image build -t ${imageName} ."
            }
        }
        
        stage("Test") {
            steps {
                echo "Testing the app...."
            }
        }
        
        
        stage("Push to AWS ECR...") {
            steps {
                echo "Deploying the app..."
                sh '/usr/local/bin/aws --version'
                withCredentials([
                    [
                        $class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'credentials-of-aws',
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                    ]
                ]) {
                    
                    sh "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin -u https://730335323304.dkr.ecr.ap-south-1.amazonaws.com"
                    sh "docker tag ${imageName} 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
                    sh "docker push 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weather_app:${imageName}"
                }
            }
        }

        
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
                sshagent(['react-server-ssh']) {
                    script {
                        def sshCommand = """
                            ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" root@142.93.222.110 'docker stop \$(docker ps -q) && docker system prune -f && docker pull 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName} && docker run -d --name weather_app_container -p 4042:3000 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}
'
                        """
                        echo "Executing SSH command: $sshCommand"
                        sh sshCommand
                    }
                }
            }
        }

    }
}
