pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/themeg25/stylowe-page-.git'
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'ec2-server',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'build/**',
                                    removePrefix: 'build',
                                    remoteDirectory: '/usr/share/nginx/html'
                                )
                            ],
                            execCommand: 'sudo systemctl restart nginx',
                            verbose: true
                        )
                    ]
                )
            }
        }
    }
}
