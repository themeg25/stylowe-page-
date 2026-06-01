pipeline {
agent any

```
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

    stage('Install Dependencies') {
        steps {
            sh 'npm install'
        }
    }

    stage('Build Application') {
        steps {
            sh 'npm run build'
        }
    }

    stage('Create Archive') {
        steps {
            sh 'tar -czf build.tar.gz build/'
        }
    }

    stage('Upload to S3') {
        steps {
            sh 'aws s3 cp build.tar.gz s3://hunhunhun/build.tar.gz --region ap-southeast-2'
        }
    }

    stage('Deploy to EC2') {
        steps {
            sshagent(['ec2-ssh-key']) {
                sh '''
                ssh -o StrictHostKeyChecking=no ec2-user@3.27.173.54 "
                aws s3 cp s3://hunhunhun/build.tar.gz /home/ec2-user/build.tar.gz --region ap-southeast-2 &&
                sudo rm -rf /var/www/html/* &&
                sudo tar -xzf /home/ec2-user/build.tar.gz -C /var/www/html/ &&
                sudo systemctl restart nginx
                "
                '''
            }
        }
    }
}

post {
    success {
        echo 'Deployment completed successfully'
    }

    failure {
        echo 'Build or deployment failed'
    }
}
```

}
