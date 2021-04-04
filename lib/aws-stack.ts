import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3'
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";

export class AwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this,'FirstS3Bucket',{
      versioned:true
    })

    const hello = new lambda.Function(this, "HelloHandlerFunction",{
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler:"index.handler",
    });

    new apigw.LambdaRestApi(this, "EndPoint", {
      handler: hello,
    })

  }
}
