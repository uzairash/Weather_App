def imageName = 'weather_app-v'
def versionFilePath = 'version.txt'
def imageVersion = readFile(file: versionFilePath).trim()

def getVersion() {
    echo 'script.groovy file '
    def (major, minor) = imageVersion.tokenize('.').collect { it.toInteger() }
    minor++
    imageVersion = "${major}.${minor}"
    writeFile(file: versionFilePath, text: imageVersion) // Update version in the file
    return "${imageName}${imageVersion}"
}
