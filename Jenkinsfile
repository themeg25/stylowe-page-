pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/themeg25/stylowe-page-.git'
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
                                    remoteDirectory: '/home/ec2-user/build',
                                    execCommand: '''
sudo mkdir -p /usr/share/nginx/html
sudo cp -r /home/ec2-user/build/* /usr/share/nginx/html/
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
