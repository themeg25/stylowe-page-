pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/themeg25/stylowe-page-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Clean Old Frontend Files') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    execCommand: '''
                                    sudo rm -rf /usr/share/nginx/html/*
                                    '''
                                )
                            ]
                        )
                    ]
                )
            }
        }

        stage('Upload New Frontend Files') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'build/**',
                                    removePrefix: 'build',
                                    remoteDirectory: '/usr/share/nginx/html'
                                )
                            ]
                        )
                    ]
                )
            }
        }

        stage('Restart Nginx') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    execCommand: '''
                                    sudo chmod -R 755 /usr/share/nginx/html
                                    sudo systemctl restart nginx
                                    '''
                                )
                            ]
                        )
                    ]
                )
            }
        }
    }
}
