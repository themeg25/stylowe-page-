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

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'my-ec2',
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'build/**',
                                    removePrefix: 'build',
                                    remoteDirectory: '/tmp/stylo-build',
                                    execCommand: '''
                                        sudo mkdir -p /usr/share/nginx/html
                                        sudo cp -r /tmp/stylo-build/* /usr/share/nginx/html/
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
