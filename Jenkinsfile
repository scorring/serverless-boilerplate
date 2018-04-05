#!/usr/bin/env groovy

node("aws") {
  properties([parameters([choice(choices: "NONE\n", description: 'Choose your action', name: 'action')])])

  // Repo: Cleanup + Checkout
  stage('Workspace: Init') {
    step([$class: 'WsCleanup'])
    checkout(scm)
  }

  // Git: Set Remote
  stage('Git: Init') {
    sh($/git config user.email jenkins@jenkins.com/$)
    sh($/git config user.name Jenkins/$)
  }

  // Build
  stage('Git: Init') {
    sh($/npm ci/$)
    sh($/./node_modules/serverless/bin/serverless package/$)
  }

  // Deploy
  stage('AWS: Deploy') {
    sh($/./node_modules/serverless/bin/serverless deploy --env dev --stage dev/$)
  }
}
