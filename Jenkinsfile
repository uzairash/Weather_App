#!/usr/bin/env groovy
def imageName
def gv


pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                scmSkip(deleteBuild: true, skipPattern:'.*\\[ci skip\\].*')
            }
        }

        stage('Increment Version') {
            steps {
                script {
                    gv = load "scripts.groovy"
                    imageName = gv.getVersion()
                    echo "Updated Image Version: ${imageName}"
                }
            }
        }
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
                        credentialsId: 'aws-credentials',
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                    ]
                ]) {
                    
                   sh "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 730335323304.dkr.ecr.ap-south-1.amazonaws.com"

                    sh "docker tag ${imageName} 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}"
                    sh "docker push 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}"
                }
            }
        }

        
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
                sshagent(['react-server-ssh']) {
                    script {
                        def awsCredentials = credentials('aws-credentials') // Use the ID of the AWS credentials added in Jenkins

                        withCredentials([
                            [
                                $class: 'AmazonWebServicesCredentialsBinding',
                                credentialsId: 'aws-credentials',
                                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                            ]
                        ]) {
                            def sshCommand = """
                                ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" root@142.93.222.110 '
                                    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 730335323304.dkr.ecr.ap-south-1.amazonaws.com &&
                                    docker ps -q | xargs docker inspect -f '{{.Name}}' | xargs -I {} docker stop {} && 
                                    docker ps -q | xargs docker inspect -f '{{.Name}}' | xargs -I {} docker rm {} &&
                                    docker pull 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName} &&
                                    docker run -d --name ${imageName}-container -p 4042:3000 730335323304.dkr.ecr.ap-south-1.amazonaws.com/weatcher_app:${imageName}
                                '
                            """
                        echo " Executing SSH command: $sshCommand"
                        sh sshCommand
                        
                        }
                        
                    }
                }
            }
        }


        stage("Update commit") {
            steps {
                echo "Update commit...."
                sshagent(['jenkins-ssh-github']) {
                    withCredentials([gitUsernamePassword(credentialsId: 'github-credentials', gitToolName: 'Default')]) {
                        sh "git config user.email 'uzairashfaq90@gmail.com'"
                        sh "git config user.name 'uzairash'"

                        // Add changes to the index
                        sh "git add ."


                        sh "git remote set-url origin git@github.com:uzairash/Weather_App.git"

                        sh 'git status'


                        // Commit changes
                        sh "git commit -m '[ci skip]'"

                        // Create and switch to the config_AWS branch
                        sh "git checkout -b config_AWS"

                        // Pull latest changes from the remote config_AWS branch
                        sh "git pull origin config_AWS"
                        
                        // Push changes to the config_AWS branch
                        sh "git push -u origin config_AWS"
                    }            
                }
            }
        }


    }
}
