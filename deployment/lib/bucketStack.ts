import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";


export class StaticSiteBucketStack extends cdk.Stack {
  bucket: s3.Bucket;
  originAccessIdentity: cloudfront.OriginAccessIdentity;

  constructor(scope: Construct, id: string, bucketName: string, props: StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, "sitebucket", {
      bucketName: bucketName,
      accessControl: s3.BucketAccessControl.PRIVATE,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    })

    this.originAccessIdentity = new cloudfront.OriginAccessIdentity(this, "bucketoriginaccessidentity", {
      comment: `Access identity for site deployments`
    })

    // Allow only the CloudFront origin access identity to read objects
    this.bucket.addToResourcePolicy(
      iam.PolicyStatement.fromJson(
        {
          "Effect": "Allow",
          "Principal": this.originAccessIdentity.grantPrincipal.policyFragment.principalJson,
          "Action": "s3:GetObject",
          "Resource": `${this.bucket.bucketArn}/*`
        })
    )

    // Prevent non-TLS access
    this.bucket.addToResourcePolicy(
      iam.PolicyStatement.fromJson(
        {
          "Sid": "AllowSSLRequestsOnly",
          "Effect": "Deny",
          "Principal": "*",
          "Action": "s3:*",
          "Resource": [
            `${this.bucket.bucketArn}`,
            `${this.bucket.bucketArn}/*`
          ],
          "Condition": {
            "Bool": {
              "aws:SecureTransport": "false"
            }
          }
        }
      )
    )
  }
}
