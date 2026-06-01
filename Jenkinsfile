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
            bat 'aws s3 cp build.tar.gz s3://hunhunhun/build.tar.gz --region ap-southeast-2'
        }
    }

    stage('Deploy to EC2') {
        steps {
            bat '''
            ssh -o StrictHostKeyChecking=no ec2-user@3.27.173.54 ^
            "aws s3 cp s3://hunhunhun/build.tar.gz /home/ec2-user/build.tar.gz --region ap-southeast-2 && ^
            sudo rm -rf /var/www/html/* && ^
            sudo tar -xzf /home/ec2-user/build.tar.gz -C /var/www/html/ && ^
            sudo systemctl restart nginx"
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
