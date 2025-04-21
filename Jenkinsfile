pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "ritesh/backend-app"
        FRONTEND_IMAGE = "ritesh/frontend-app"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git credentialsId: 'Disseratation', url: 'https://github.com/riteshusername/your-repo.git'
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
                sh 'docker run -d --name backend -p 8080:8080 $BACKEND_IMAGE'
                sh 'docker run -d --name frontend -p 3030:3000 $FRONTEND_IMAGE'
            }
        }
    }
}
