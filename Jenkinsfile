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
                git url: 'https://github.com/themeg25/stylowe-page-.git', branch: 'main'
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

        stage('Archive') {
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
                ssh -i C:\\jenkins-key\\Madhan.pem -o StrictHostKeyChecking=no ec2-user@3.27.173.54 "aws s3 cp s3://hunhunhun/build.tar.gz /home/ec2-user/build.tar.gz --region ap-southeast-2 && tar -xzf /home/ec2-user/build.tar.gz -C /home/ec2-user && sudo cp -r /home/ec2-user/build/* /usr/share/nginx/html/ && sudo systemctl restart nginx"
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
