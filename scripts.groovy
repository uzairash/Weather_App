// def imageName = 'weather_app-v' 
// def imageVersion = readFile(file: 'version.txt')

// def getVersion() {
//     echo 'script.groovy file....'
//     def (major, minor) = imageVersion.tokenize('.').collect { it.toInteger() }
//     minor++
//     imageVersion = "${major}.${minor}"
//     writeFile(file: versionFilePath, text: imageVersion) // Update version in the file
//     return "${imageName}${imageVersion}"
// }

def test() {
    echo "executing pipeline fron branch $BRANCH_NAME"
    echo 'running tests'
}
def buildJar() {
    echo 'Building the application ...'
    sh 'mvn package'

}

def buildImage() {
    echo 'Building the docker image...'
    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable:'PASS', usernameVariable:'USER')]) {
        sh 'docker build -t uzair102/u_repo:jma-2.1 .'
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh 'docker push uzair102/u_repo:jma-2.1'
    }
}

def deploy() {
      echo 'Deploying the application...'
}
return this