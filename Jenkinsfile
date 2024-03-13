#!/usr/bin/env groovy
def currentVersion = ''
def scripts

pipeline {
    agent any
    
    stages {
        stage('Increment Version') {
            steps {
                script {
                    scripts = load "scripts.groovy"
                    currentVersion = scripts.getVersion()
                    echo "Updated Image Version: ${currentVersion}"
                }
            }
        }
        // stage("Build") {
        //     steps {
        //         echo 'Building the application image...'
        //         sh "docker image build -t ${imageName} ."
        //     }
        // }
        
        // stage("Test") {
        //     steps {
        //         echo "Testing the app...."
        //     }
        // }
        
        
        // stage("Push to AWS ECR...") {
        //     steps {
        //         echo "Deploying the app..."
        //         sh '/usr/local/bin/aws --version'
        //         withCredentials([
        //             [
        //                 $class: 'AmazonWebServicesCredentialsBinding',
        //                 credentialsId: 'aws-credentials',
        //                 accessKeyVariable: 'AWS_ACCESS_KEY_ID',
        //                 secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        //             ]
        //         ]) {
                    
        //            sh "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 730335323304.dkr.ecr.ap-south-1.amazonaws.com"

        //             sh "docker tag ${imageName} 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}"
        //             sh "docker push 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}"
        //         }
        //     }
        // }

        
        // stage("Deploy") {
        //     steps {
        //         echo "Deploying the app..."
        //         sshagent(['react-server-ssh']) {
        //             script {
        //                 def awsCredentials = credentials('aws-credentials') // Use the ID of the AWS credentials added in Jenkins

        //                 withCredentials([
        //                     [
        //                         $class: 'AmazonWebServicesCredentialsBinding',
        //                         credentialsId: 'aws-credentials',
        //                         accessKeyVariable: 'AWS_ACCESS_KEY_ID',
        //                         secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        //                     ]
        //                 ]) {
        //                     def sshCommand = """
        //                         ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" root@142.93.222.110 '
        //                             AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 730335323304.dkr.ecr.ap-south-1.amazonaws.com &&
        //                             docker ps -q | xargs docker inspect -f '{{.Name}}' | xargs -I {} docker stop {} && 
        //                             docker ps -q | xargs docker inspect -f '{{.Name}}' | xargs -I {} docker rm {} &&
        //                             docker pull 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName} &&
        //                             docker run -d --name ${imageName}-container -p 4042:3000 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}
        //                         '
        //                     """
        //                 echo " Executing SSH command: $sshCommand"
        //                 sh sshCommand
                        
        //                 }
                        
        //             }
        //         }
        //     }
        // }


    }
}


//to make docker available in jenkins container
// docker run -p 8080:8080 -p 50000:50000 -d -v /var/run/docker.sock:/var/run/docker.sock -v /var/jenkins_home:/var/jenkins_home -v $(which docker):/usr/bin/docker jenkins/jenkins:lts
            
//  docker stop \$(docker ps -q) &&
//                                docker system prune -f &&