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
}
def buildJar() {
    echo 'Building the application ...'
   

}

def buildImage() {
    echo 'Building the docker image...'
    
}

def deploy() {
      echo 'Deploying the application...'
}
return this