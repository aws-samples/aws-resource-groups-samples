## Instantly Monitor Serverless Applications

This sample beer service contains the source code used in the AWS blog post [Instantly Monitor Serverless Applications with AWS Resource Groups](https://aws.amazon.com/blogs/mt/instantly-monitor-serverless-applications-aws-resource-groups). It uses the [Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) (SAM) to simplify the creation of resources. The template specification provides a clean syntax to describe functions, APIs, permissions, configurations, and events.

The SAM template file `template.yaml` leverages the [AWS::Serverless::Function](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html) resource type which creates a [Lambda Function](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html) and a [ApiGateway RestApi](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apigateway-restapi.html) resource under the hood. It creates a [DynamoDB Table](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html) resource to store beers and a [Resource Groups Group](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-resourcegroups-group.html) resource to encapsulate all the resources of the service in a single logical unit.

## Prerequisites

[Install the SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) command line interface (CLI) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). 

Ensure that the AWS CLI is [configured for your account](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) and that you have permissions to create a CloudFormation stack. You need the capability [CAPABILITY_IAM](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html#API_CreateStack_RequestParameters) to create a new IAM role for the Lambda function.


## How to deploy

Execute the following two commands to deploy the application to your AWS account.

```
sam build
```

When asked `"Allow SAM CLI IAM role creation [Y/n]"` reply with `"Y"`:

```
sam deploy \
  --guided \
  --stack-name BeerService \
  --region us-east-1 \
  --no-confirm-changeset
```
