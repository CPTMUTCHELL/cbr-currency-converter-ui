
pipeline {
    agent any

    options {
        buildDiscarder logRotator(numToKeepStr: '3')
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    environment {
        registryCredential = 'dockerhub_id'
        me = 'cptmutchell'
        set = 'helm upgrade --install cbr-ui ./cbr-ui --set '

    }

    stages {

        stage('Build docker') {
          steps {
                    withDockerRegistry(credentialsId: registryCredential, url: 'https://index.docker.io/v1/') {
                            sh """
                             bash ./docker.sh cbr-ui v${BUILD_NUMBER} Dockerfile
                             """
                        }
                          script {
                                                    set = set + 'tag=v${BUILD_NUMBER},'
                                                }
          }

        }
        stage("Helm") {
                    steps {
                        script {
                            if (set =~ '--set [A-Za-z]') {
                                set = set.substring(0, set.length() - 1);
                                sh """
                                cd k8s/helm
                                eval ${set}
                                """
                            } else {
                                sh """
                                    cd k8s/helm
                                    helm upgrade --install -n cbr  cbr-ui ./cbr-ui
                                """
                            }
                        }
                    }
                }
    }

}