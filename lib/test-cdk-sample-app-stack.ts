import { BundlingFileAccess, Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { aws_lambda_nodejs } from 'aws-cdk-lib'; 
import * as lambda from 'aws-cdk-lib/aws-lambda'; 
import { Construct } from 'constructs';

export class TestCdkSampleAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'TestCdkSampleAppQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'TestCdkSampleAppTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    const typescriptLambda = new aws_lambda_nodejs.NodejsFunction(this, "nodejsDemo", {
        functionName: "typescript-lambda",
        entry: "typescript-lambda/hello-world/app.ts",
        handler: "lambdaHandler"
    })

    const pythonLambda = new lambda.Function(this, "pythonDemo", {
        runtime: lambda.Runtime.PYTHON_3_11,
        handler: "lambda_handler",
        code: lambda.Code.fromAsset("python-lambda", {
            bundling: {
                image: lambda.Runtime.PYTHON_3_11.bundlingImage,
                command: [
                    "sh", 
                    "-c",
                    ["mkdir -p package",
                    "ls -la",
                    "pip install -r requirements.txt --target package",
                    "cd package",
                    "zip -r ../my_deployment_package.zip .",
                    "cd ..",
                    "zip my_deployment_package.zip app.py",
                    "mv my_deployment_package.zip /asset-output"].join(" && ")
                ],
                workingDirectory: "/asset-input/hello_world"
            }
        })
    })

  }
}
