import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticSiteStackProps } from "./staticSite-stack-props";
import { StaticSiteBucketStack } from "./bucketStack";
import { configLoader } from "./config";

export class StaticSiteStack extends cdk.Stack {
  //output
  bucketStack: StaticSiteBucketStack;
  bucketDeployment: s3deploy.BucketDeployment;
  siteDistribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, bucketStack: StaticSiteBucketStack, props: StaticSiteStackProps) {
    super(scope, id, props);
    this.bucketStack = bucketStack;
    const config = configLoader.getConfig();
    this.siteDistribution = this.createCloudfrontDistribution(this, props.us_east_1_certificateArn, props.stackName, props.siteDnsAliases, config.aws.region, props)

    // Output CloudFront distribution domain name
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.siteDistribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name'
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.siteDistribution.distributionId
    });
    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucketStack.bucket.bucketName
    });

    // Output CNAME instructions for manual DNS setup
    const cnameInstructions = props.siteDnsAliases.map(alias =>
      `${alias} -> ${this.siteDistribution.distributionDomainName}`
    ).join(', ');

    new cdk.CfnOutput(this, 'CNAMEInstructions', {
      value: 'Manual CNAME records to create in your DNS provider',
      description: 'Manual CNAME records to create at your DNS provider'
    });

    new cdk.CfnOutput(this, 'CNAMERecords', {
      value: cnameInstructions,
      description: 'Manual CNAME records to create at your DNS provider'
    });
  }

  createCloudfrontDistribution(stack: cdk.Stack, certificateArn: string, stackName: string, siteDnsAliases: Array<string>, siteBucketRegion: string, props: StaticSiteStackProps): cloudfront.Distribution {
    const distributionName = props.distributionNameOverride || stackName;
    const distribution = new cloudfront.Distribution(
      stack,
      `StaticSiteDistribution-${(props.distributionNameOverride || stackName).replace(/[^a-zA-Z0-9-_]/g, "-")}-${siteBucketRegion.replace(/[^a-zA-Z0-9-_]/g, "-")}`,
      {
        comment: `${props.distributionNameOverride || stackName} distribution created by CDK`,
        certificate: acm.Certificate.fromCertificateArn(stack, "stackAcmCertificate", certificateArn),
        domainNames: siteDnsAliases,
        sslSupportMethod: cloudfront.SSLMethod.SNI,
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2018,
        errorResponses: [{
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html"
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html"
        }],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessIdentity(this.bucketStack.bucket, {
            originPath: props.s3Path.replace(/\/$/, ""),
            originAccessIdentity: this.bucketStack.originAccessIdentity
          }),
          cachePolicy: new cloudfront.CachePolicy(stack, "StaticSiteCachePolicy", {
            defaultTtl: Duration.minutes(1),
            minTtl: Duration.minutes(1),
            maxTtl: Duration.minutes(1),
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      });

    // Add Name tag to the distribution
    cdk.Tags.of(distribution).add('Name', distributionName);

    return distribution;
  }

}
