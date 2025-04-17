pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'client'
        BACKEND_DIR = '.'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/kdkritya0330/mern-appointment-app.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t mern-frontend ./client'
                    sh 'docker build -t mern-backend .'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}
