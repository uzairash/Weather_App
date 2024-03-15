#!/usr/bin/env groovy
def imageName
def gv

pipeline {
    agent any
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

        stage("Update commit") {
            steps {
                echo "Update commit...."
                sshagent(['jenkins-ssh-github']) {
                    withCredentials([gitUsernamePassword(credentialsId: 'github-credentials', gitToolName: 'Default')]) {
                        sh "git config user.email 'uzairashfaq90@gmail.com'"
                        sh "git config user.name 'uzairash'"

                        
                        sh "git add ."
                        sh "git remote set-url origin git@github.com:uzairash/Weather_App.git"
                        sh 'git status'
                        // Commit changes
                        sh "git commit -m '[ci skip]'"

                        // Check if master branch exists locally
                        script {
                            def branchExists = sh(script: "git rev-parse --verify master", returnStatus: true) == 0
                            if (!branchExists) {
                                // Create and switch to the master branch if it doesn't exist
                                sh "git checkout -b master"
                            } else {
                                // If the branch exists, switch to it
                                sh "git checkout master"
                            }
                        }

                        // Pull latest changes from the remote master branch
                        sh "git pull origin master"
                        
                        // Push changes to the master branch
                        sh "git push -u origin master"
                    }            
                }
            }
        }

    }
}
