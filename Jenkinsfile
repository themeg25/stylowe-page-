pipeline {
    agent any

    environment {
        EC2_IP = '3.27.78.113'
        PEM_KEY = 'C:\\Users\\Admin\\Downloads\\kasva.pem'
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
                bat '''
                scp -i "%PEM_KEY%" -r build/* ec2-user@%EC2_IP%:/home/ec2-user/build/

                ssh -i "%PEM_KEY%" -o StrictHostKeyChecking=no ec2-user@%EC2_IP% "sudo rm -rf /usr/share/nginx/html/*"

                ssh -i "%PEM_KEY%" -o StrictHostKeyChecking=no ec2-user@%EC2_IP% "sudo cp -r /home/ec2-user/build/* /usr/share/nginx/html/"

                ssh -i "%PEM_KEY%" -o StrictHostKeyChecking=no ec2-user@%EC2_IP% "sudo systemctl restart nginx"
                '''
            }
        }
    }
}
