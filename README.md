
# AWS Web Utilities

A collection of useful lambda functions for Amazon Web Services

### Setup

Install serverless package globally

```
    npm install serverless -g
```

Add credentials from AWS IAM, create an API user with key/secret:

```
    serverless config credentials --provider aws --key xxx --secret xxx
```

### Deploy to AWS

Deploy to test:

```
    npm run deploy
```

Deploy to production:

```
    npm run deploy-production
```

# Lambda's / Functions

## PING

Created for use with CloudWatch for the monitoring of websites. Use to send alerts via Amazon Simple Notification Service (SNS) when problems occur with the loading of a URL/web domain.

Setup:

* Deploy lambda
* Add Cloudwatch Events trigger (schedule ie: `0/15 * ? * * *` for every 15 minutes, input constant ie: `{"queryStringParameters":{"url":"https://www.duckduckgo.com/"}}`)
* Add SNS topic (create topic, create subscription to topic)
* Add CloudWatch alarm for Lambda