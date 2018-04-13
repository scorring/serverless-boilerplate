#!/usr/bin/groovy

String target = "dev"

node('aws') {
  properties([parameters([
          booleanParam(name: 'RELEASE', defaultValue: false, description: 'Release this version')
  ])])

  // Repo: Cleanup + Checkout
  stage('Workspace/Git: Init/Setup') {
    step([$class: 'WsCleanup'])
    checkout(scm)
    sh($/git config user.email jenkins@jenkins.com/$)
    sh($/git config user.name Jenkins/$)
  }

  // Version Management
  def VersionBuilder = load('build/Version.groovy')
  def v = VersionBuilder.newVersion()
  v.jenkins = this
  v.initFromPackageJson()

  // Compile
  stage('Build') {
    sh($/npm ci/$)
  }

  // Test
  stage('Test') {
    sh($/npm test/$)
  }

  if (env.BRANCH_NAME == "master") {
    stage('AWS: Deploy') {
      sh($/TARGET=${target} npm run deploy/$)
    }
  }

  if (env.BRANCH_NAME == "master" && params.RELEASE) {
    stage('Releasing') {
      // Release Current Version
      sh($/git checkout -b release-${v.toR().repr()}/$)
      v.toR().saveToPackageJson()
      sh($/git add package.json package-lock.json/$)
      sh($/git commit -m "Release ${v.toR().repr()}"/$)
      sh($/git tag ${v.toR().repr()}/$)

      //FIXME: Disabled
      // sh($/git push origin ${v.toR().repr()}/$)

      // Prepare Next Release
      sh($/git checkout master/$)
      v.toSnapshot().saveToPackageJson()
      sh($/git add package.json package-lock.json/$)
      sh($/git commit -m "Next Release ${v.toSnapshot().repr()}"/$)

      //FIXME: Disabled
      //sh($/git push origin master/$)
    }
  }
}
