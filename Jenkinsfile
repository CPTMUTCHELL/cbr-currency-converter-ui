pipeline {
    agent any

    options {
        buildDiscarder logRotator(numToKeepStr: '3')
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    environment {
        registryCredential = 'dockerhub_id'
        BUILD_VERSION = "${GIT_BRANCH.split("/")[1]}"+"-"+"${GIT_COMMIT[0..7]}"+"-"
        BUILD_VERSION1 = sh(script: "echo \$(date +%Y%m%d%H%M%S)", returnStdout: true).trim()
    }
    parameters {
        booleanParam(name: 'USE_CACHE', defaultValue: true, description: 'node_modules are cached in WORKSPACE')
        booleanParam(name: 'NO_CACHE', defaultValue: false, description: 'npm i is inside docker')

    }
    stages {
        stage('Cache npm install and docker build') {
            when {
                expression { return params.USE_CACHE }

            }
            steps {
                sh """
               yarn install
               CI= yarn run build
               """

                withDockerRegistry(credentialsId: registryCredential, url: 'https://index.docker.io/v1/') {
                    sh """
                             bash ./docker.sh cbr-ui ${BUILD_VERSION}${BUILD_VERSION1} Dockerfile.cache
                             """
                }

            }

        }

        stage('Build docker') {
            when {
                expression { return params.NO_CACHE }

            }
            steps {
                withDockerRegistry(credentialsId: registryCredential, url: 'https://index.docker.io/v1/') {
                    sh """
                   bash ./docker.sh cbr-ui ${BUILD_VERSION}${BUILD_VERSION1} Dockerfile
                    """
                }
            }
        }
    }

}