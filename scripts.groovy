def getVersion() {
    def imageName = 'weather_app-v' 
    def versionFilePath = 'version.txt'
    def imageVersion = readFile(file: versionFilePath)

    echo 'script.groovy file....'
    echo "image version"
    echo "image version ${imageVersion}"

    def (major, minor) = imageVersion.tokenize('.').collect { it.toInteger() }
    minor++
    imageVersion = "${major}.${minor}"
    writeFile(file: versionFilePath, text: imageVersion) // Update version in the file
    def print = readFile(file: versionFilePath)
    echo "after writing ${print}"
    return "${imageName}${imageVersion}"
}
return this

