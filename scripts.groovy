def imageName = 'weather_app-v' 
def imageVersion = readFile(file: 'version.txt')

def getVersion() {
    echo 'script.groovy file....'
    echo "image version ${imageVersion}"

    def (major, minor) = imageVersion.tokenize('.').collect { it.toInteger() }
    minor++
    imageVersion = "${major}.${minor}"
    writeFile(file: versionFilePath, text: imageVersion) // Update version in the file
    return "${imageName}${imageVersion}"
}
return this

// def test() {
//     echo "executing pipeline fron branch "
// }
// def buildJar() {
//     echo 'Building the application ...'
   

// }

// def buildImage() {
//     echo 'Building the docker image...'
    
// }

// def deploy() {
//       echo 'Deploying the application...'
// }
// return this