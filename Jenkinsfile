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
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            try {
                                echo 'Building frontend Docker image...'
                                sh 'docker build -t mern-frontend ./client'
                            } catch (Exception e) {
                                currentBuild.result = 'FAILURE'
                                throw e
                            }
                        }
                    }
                }

                stage('Build Backend Image') {
                    steps {
                        script {
                            try {
                                echo 'Building backend Docker image...'
                                sh 'docker build -t mern-backend .'
                            } catch (Exception e) {
                                currentBuild.result = 'FAILURE'
                                throw e
                            }
                        }
                    }
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    try {
                        echo 'Starting containers with Docker Compose...'
                        sh 'docker-compose up -d'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        throw e
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh 'docker system prune -f'
        }

        success {
            echo 'Pipeline ran successfully!'
        }

        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
