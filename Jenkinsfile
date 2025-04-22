pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "ritesh/backend-app"
        FRONTEND_IMAGE = "ritesh/frontend-app"
    }

    options {
        skipDefaultCheckout()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repo') {
            steps {
                git credentialsId: 'Disseratation', url: 'https://github.com/kdkritya0330/mern-appointment-app'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    sh 'rm -rf node_modules'
                    sh 'npm ci'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE .'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('client') {
                    sh 'docker build -t $FRONTEND_IMAGE .'
                }
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker rm -f backend || true'
                sh 'docker rm -f frontend || true'

                // Changed ports
                sh 'docker run -d --name backend -p 8082:8080 $BACKEND_IMAGE'
                sh 'docker run -d --name frontend -p 3031:3000 $FRONTEND_IMAGE'
            }
        }
    }
}
