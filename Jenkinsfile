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

        stage('Check Commit Author') {
            steps {
                script {
                    def author = bat(script: 'git log -1 --pretty=format:"%an"', returnStdout: true).trim()
                    echo "Last Commit Author: ${author}"
                    if (author.toLowerCase().contains('jenkins')) {
                        echo 'Build triggered by Jenkins bot, skipping...'
                        currentBuild.result = 'SUCCESS'
                        return
                    }
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        script {
                            try {
                                echo '📦 Building frontend Docker image...'
                                bat "docker build -t mern-frontend ${FRONTEND_DIR}"
                            } catch (Exception e) {
                                error("❌ Frontend build failed: ${e}")
                            }
                        }
                    }
                }

                stage('Build Backend Image') {
                    steps {
                        script {
                            try {
                                echo '📦 Building backend Docker image...'
                                bat "docker build -t mern-backend ${BACKEND_DIR}"
                            } catch (Exception e) {
                                error("❌ Backend build failed: ${e}")
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
                        echo '🚀 Running Docker Compose...'
                        bat 'docker-compose down || exit 0' // stop existing
                        bat 'docker-compose up -d --build'
                    } catch (Exception e) {
                        error("❌ Docker Compose failed: ${e}")
                    }
                }
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up Docker resources...'
            bat 'docker system prune -f -a --volumes || exit 0'
        }

        success {
            echo '✅ Pipeline ran successfully!'
        }

        failure {
            echo '❌ Pipeline failed. Check logs for details.'
        }
    }
}
