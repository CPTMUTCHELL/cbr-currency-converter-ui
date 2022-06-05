
pipeline {
    agent any

    options {
        buildDiscarder logRotator(numToKeepStr: '3')
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    environment {
        registryCredential = 'dockerhub_id'
        me = 'cptmutchell'

    }

    stages {

        stage('build and deploy application') {
          steps {
              sh '''
                mvn --version
                npm --version
                '''
          }

        }
    }

}