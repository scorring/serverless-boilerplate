#!/usr/bin/env groovy

class Version implements Serializable {
  def jenkins = null

  Integer major = -1
  Integer minor = -1
  Integer patch = -1
  Integer rcNum = -1
  Boolean isRelease = false
  Boolean isReleaseCandidate = false
  Boolean isSnapshot = false
  String snapshotComment = null
  String fileName = null

  Version() {
  }

  Version(Version oldV) {
    this.jenkins = oldV.jenkins
    this.major = oldV.major
    this.minor = oldV.minor
    this.patch = oldV.patch
    this.rcNum = oldV.rcNum
    this.isRelease = oldV.isRelease
    this.isSnapshot = oldV.isSnapshot
  }

  Boolean initFromPackageJson() {
    String fileContents = this.jenkins.steps.readFile('package.json')
    def matcher = fileContents =~ '  "version": "(\\d+)\\.(\\d+)\\.(\\d+)(?:-(SNAPSHOT))?",'
    if (!matcher) {
      return false
    }

    println matcher
    this.fillVersion(matcher[0])
    true
  }

  Boolean saveToPackageJson() {
    this.jenkins.sh($/./build/update-package-json.sh ${this.repr()}/$)
    true
  }

  Boolean fillVersion(List<String> matcher) {
    this.major = matcher[1].toInteger()
    this.minor = matcher[2].toInteger()
    this.patch = matcher[3].toInteger()

    def snapshot = matcher[4]

    if (snapshot == null) {
      this.isRelease = true
    } else if (snapshot == "SNAPSHOT") {
      this.isSnapshot = true
    }
    println matcher
    true
  }

  String repr() {
    def str = "${this.major}.${this.minor}.${this.patch}"
    if (this.isSnapshot) {
      str += "-SNAPSHOT"
    }
    str
  }

  Version transformToR() {
    if (this.isSnapshot) {
      this.isSnapshot = false
      this.isRelease = true
    } else if (this.isRelease) {
      this.patch += 1
      this.isSnapshot = false
    }
    this
  }

  // Const this
  Version toR() {
    Version v = new Version(this)

    v.transformToR()
  }

  Version increaseSnapshot() {
    this.minor += 1
    this.patch = 0
    this.isRelease = false
    this.isSnapshot = true
    this
  }

  // Const this
  Version toSnapshot() {
    Version v = new Version(this)

    v.increaseSnapshot()
  }
}

class VersionBuilder {
  Version newVersion() {
    return new Version()
  }

  Version newVersionFromString(String value) {
    return Version.newFromString(value)
  }
}


return new VersionBuilder()