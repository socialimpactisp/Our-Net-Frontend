#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { StaticSiteBucketStack } from '../lib/bucketStack';

// Separate entry point: the existing Sandbox app and config stay unchanged.
// Default to preview. Apply live mode only during an explicitly approved cutover.
const domainMode = process.env.PRODUCTION_DOMAIN_MODE || 'preview';
if (!['preview', 'live'].includes(domainMode)) {
  throw new Error('PRODUCTION_DOMAIN_MODE must be preview or live.');
}
const domainNames = domainMode === 'live'
  ? ['our.net.nz', 'www.our.net.nz', 'www-new.our.net.nz']
  : ['www-new.our.net.nz'];
const account = '704403761519';
const region = 'ap-southeast-2';
const certificateArn = process.env.PRODUCTION_PREVIEW_CERTIFICATE_ARN;
if (!certificateArn || !/^arn:aws:acm:us-east-1:704403761519:certificate\/[0-9a-f-]{36}$/.test(certificateArn)) {
  throw new Error('Provide the reviewed, issued preview certificate ARN in us-east-1.');
}
if (certificateArn.endsWith('/0ac9457d-a3b9-4120-b52c-72f968bcb25e')) {
  throw new Error('The existing certificate does not cover the preview hostname.');
}
if (process.env.AWS_ACCOUNT_ID !== account || process.env.AWS_REGION !== region) {
  throw new Error('Set the reviewed AWS_ACCOUNT_ID and AWS_REGION before production preparation.');
}
if (process.env.DEPLOY_ENV !== 'production') {
  throw new Error('This entry point requires DEPLOY_ENV=production.');
}
const app = new cdk.App();
const env = { account, region };
// Reuses the existing shared bucket stack with its unchanged construct IDs.
const bucket = new StaticSiteBucketStack(app, 'ournet-website-bucket', 'ournet-websites-704403761519', { env });
const site = new cdk.Stack(app, 'ournet-production-website', { env });
const distribution = new cloudfront.Distribution(site, 'ProductionDistribution', {
  comment: 'Our Net production frontend',
  domainNames,
  certificate: acm.Certificate.fromCertificateArn(site, 'ProductionCertificate', certificateArn),
  sslSupportMethod: cloudfront.SSLMethod.SNI,
  minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
  defaultRootObject: 'index.html',
  priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
  errorResponses: [403, 404].map(httpStatus => ({
    httpStatus, responseHttpStatus: 200, responsePagePath: '/index.html',
  })),
  defaultBehavior: {
    origin: origins.S3BucketOrigin.withOriginAccessIdentity(bucket.bucket, {
      originPath: '/production',
      originAccessIdentity: bucket.originAccessIdentity,
    }),
    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    cachePolicy: new cloudfront.CachePolicy(site, 'ProductionCachePolicy', {
      defaultTtl: cdk.Duration.minutes(1),
      minTtl: cdk.Duration.seconds(0),
      maxTtl: cdk.Duration.minutes(1),
    }),
  },
});
new cdk.CfnOutput(site, 'DistributionId', { value: distribution.distributionId });
new cdk.CfnOutput(site, 'DistributionDomainName', { value: distribution.distributionDomainName });
new cdk.CfnOutput(site, 'BucketName', { value: bucket.bucket.bucketName });
new cdk.CfnOutput(site, 'DeploymentPrefix', { value: 'production/' });
