pipeline {
    agent any

    stages {

        stage('Build React App') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Deploy To EC2') {
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
                            execCommand: '''
                                sudo chown -R ec2-user:ec2-user /usr/share/nginx/html
                                sudo cp -r /home/ec2-user/usr/share/nginx/html/* /usr/share/nginx/html/ || true
                                sudo systemctl restart nginx
                            ''',
                            verbose: true
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
