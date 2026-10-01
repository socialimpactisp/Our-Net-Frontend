#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import "source-map-support/register";
import { StaticSiteBucketStack } from "../lib/bucketStack";
import { StaticSiteStack } from "../lib/staticSite-stack";
import { configLoader } from "../lib/config";

// Load configuration
const config = configLoader.getConfig();

console.log(`🚀 Deploying ${config.project.name} for ${config.environment} environment`);
console.log(`📍 Region: ${config.aws.region}, Account: ${config.awsAccountId}`);
console.log(`🌐 Sites: ${config.sites.map(s => s.siteDnsAliases.join(', ')).join(', ')}`);

const env = {
  account: config.awsAccountId,
  region: config.aws.region,
};

const app = new cdk.App();

// Create the shared bucket stack
const bucketStack = new StaticSiteBucketStack(
  app,
  config.project.bucketStackName,
  config.project.bucketName,
  { env: env }
);

// Create site stacks for each configured site
const siteStacks: StaticSiteStack[] = [];

config.sites.forEach((siteConfig) => {
  const siteStack = new StaticSiteStack(app, siteConfig.stackName, bucketStack, {
    env: env,
    us_east_1_certificateArn: config.acmCertificateArn,
    environment: config.environment,
    stackName: siteConfig.stackName,
    siteDnsAliases: siteConfig.siteDnsAliases,
    s3Path: siteConfig.s3Path,
  });

  siteStacks.push(siteStack);
});

console.log(`✅ Created ${siteStacks.length} site stack(s) and 1 bucket stack`);
console.log(`💡 Available environments: ${configLoader.listAvailableEnvironments().join(', ')}`);
console.log(`📝 To switch environments, provide DEPLOY_ENV on command line`);

