pipeline {
    agent any

    environment {
        EC2_HOST = '3.27.78.113'
        EC2_USER = 'ec2-user'
        SSH_KEY_ID = 'ec2-ssh-key'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/themeg25/stylowe-page-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "
                            sudo rm -rf /usr/share/nginx/html/*
                        "

                        scp -o StrictHostKeyChecking=no -r build/* $EC2_USER@$EC2_HOST:/tmp/

                        ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST "
                            sudo cp -r /tmp/* /usr/share/nginx/html/ &&
                            sudo systemctl restart nginx
                        "
                    '''
                }
            }
        }
    }
}
