# Our Net AWS Sandbox preparation

Adapted from Devoli's affinity-frontends-infra.zip. Architecture: CloudFront -> private S3 -> the existing frontend. No application code changes.

## Status and approval boundary

Preparation only. Do not bootstrap CDK, deploy stacks, create IAM resources, enable the workflow, or change website DNS until AWS costs and the change preview have been reviewed and approved. The certificate must be Issued. Public DNS validation records were verified; certificate issuance is not yet confirmed.

## Configuration

- AWS account: 704403761519
- Hosting region: ap-southeast-2 (Sydney)
- ACM certificate region: us-east-1
- Proposed bucket: ournet-websites-704403761519 (availability and existing resources still to check)
- Bucket stack: ournet-website-bucket
- Website stack: ournet-sandbox-website
- Alias: sandbox.our.net.nz
- S3 prefix: sandbox/
- Application: apps/ournet-portal, npm workspace social-impact-isp
- Build mode: sandbox

Copy .env.example to .env locally; never commit .env or credentials. Use Node 24 for infrastructure; retain the app's existing Node 20 setup.

## Local validation without deployment

From deployment/, install dependencies using npm ci, then run npm run build and npm run cdk -- synth --lookups=false with DEPLOY_ENV=sandbox and the .env values. Synthesis writes templates locally and does not create AWS resources.

The configuration rejects other environments, accounts, certificates, aliases and bucket names. No Production configuration is included. The CDK stacks create no Route 53 records.

## Later, after approval

1. Verify the AWS identity, certificate Issued status, proposed bucket availability, stack-name conflicts, and whether sandbox.our.net.nz already serves anything.
2. Review CDK bootstrap requirements/costs and cdk diff before any deployment. Bootstrap and deploy are intentionally manual; this PR does not run them.
3. Record BucketName, DistributionDomainName, and DistributionId outputs.
4. Create the GitHub environment "Ournet Sandbox" with deployment branch restricted to main and required review where supported.
5. Configure OIDC trust for audience sts.amazonaws.com and subject repo:socialimpactisp/Our-Net-Frontend:environment:Ournet Sandbox.
6. Limit the deployment role to listing the bucket with prefix sandbox/*, PutObject/DeleteObject on sandbox/* only, reading the designated distribution configuration, and invalidating only that distribution. Do not use long-lived access keys.
7. Set environment variables AWS_SANDBOX_ROLE_ARN and SANDBOX_DISTRIBUTION_ID. Set the repository variable SANDBOX_DEPLOYMENT_ENABLED to true only after deployment approval.
8. Merge only after review; manually run the Sandbox workflow on main. It verifies the AWS account and distribution alias/origin before uploading.
9. Test the CloudFront domain, then review and add only sandbox.our.net.nz DNS. Leave our.net.nz, www, email and Devoli records unchanged.
10. Test direct links, assets, Auth0 callback/logout/origin allowlists, API CORS and Sandbox API calls. Verify Stripe test mode before test transactions. Do not exercise live payments or registrations.

The workflow does not provision infrastructure or deploy Production. The existing review workflow and frontend files remain unchanged. If AWS resources have been created later, deleting this branch or closing the PR will not remove them.
