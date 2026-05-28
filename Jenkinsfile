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

        stage('Upload Build Files to EC2') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'build/**/*',
                                    remoteDirectory: '/home/ec2-user/stylo-build',
                                    cleanRemote: false
                                )
                            ]
                        )
                    ]
                )
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    execCommand: '''
                                        sudo rm -rf /usr/share/nginx/html/*
                                        sudo cp -r /home/ec2-user/stylo-build/build/* /usr/share/nginx/html/
                                        sudo chmod -R 755 /usr/share/nginx/html
                                        sudo chown -R nginx:nginx /usr/share/nginx/html
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

    post {
        success {
            echo 'Deployment Successful'
        }
        failure {
            echo 'Deployment Failed'
        }
    }
}
