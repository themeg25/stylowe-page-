pipeline {
    agent any

    environment {
        BUCKET_NAME = 'hunhunhun'
        EC2_HOST = '3.27.173.54'
        AWS_REGION = 'ap-southeast-2'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/themeg25/stylowe-page-.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Create Archive') {
            steps {
                bat 'tar -czf build.tar.gz build'
            }
        }

        stage('Upload to S3') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: '083141433743',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    bat '''
                    set AWS_ACCESS_KEY_ID=%AWS_ACCESS_KEY_ID%
                    set AWS_SECRET_ACCESS_KEY=%AWS_SECRET_ACCESS_KEY%
                    aws s3 cp build.tar.gz s3://hunhunhun/build.tar.gz --region ap-southeast-2
                    '''
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                bat '''
                ssh -i C:\\jenkins-key\\Madhan.pem -o StrictHostKeyChecking=no ec2-user@3.27.173.54 "aws s3 cp s3://hunhunhun/build.tar.gz /home/ec2-user/build.tar.gz --region ap-southeast-2 && mkdir -p /home/ec2-user/app && tar -xzf /home/ec2-user/build.tar.gz -C /home/ec2-user/app && sudo cp -r /home/ec2-user/app/build/* /usr/share/nginx/html/ && sudo systemctl restart nginx"
                '''
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
