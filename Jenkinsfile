pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'client'
        BACKEND_DIR = '.'
    }


    stages {
        stage('Check Commit Author') {
            steps {
                script {
                    def author = bat(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                    if (author == 'jenkins') {
                        echo 'Build triggered by Jenkins bot, skipping...'
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }
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
                              bat 'docker build -t mern-frontend ./client'
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
                                bat 'docker build -t mern-backend .'
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
                        bat 'docker-compose up -d'
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
            bat 'docker system prune -f'
        }

        success {
            echo 'Pipeline ran successfully!'
        }

        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
