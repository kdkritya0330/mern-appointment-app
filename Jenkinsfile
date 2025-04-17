pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
               pipeline {
    agent any

    stages {
        stage('Clone Code') {
            steps {
                git 'https://github.com/kdkritya0330/mern-appointment-app'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}

        }

        stage('Build & Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose build'
                sh 'docker-compose up -d'
            }
        }
    }
}
