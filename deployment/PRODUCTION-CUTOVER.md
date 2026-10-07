# Our Net production preparation

This change prepares the existing frontend for separate production hosting in AWS account 704403761519. It does not deploy resources, enable workflows, move CloudFront domain aliases, change DNS, or modify Stripe/Auth0.

## Proposed destination

- Existing private bucket: ournet-websites-704403761519.
- Separate prefix: production/.
- New stack: ournet-production-website in ap-southeast-2.
- Certificate: the existing us-east-1 certificate ending 0ac9457d-a3b9-4120-b52c-72f968bcb25e. Recheck Issued status and coverage of our.net.nz and www.our.net.nz.
- No custom domain aliases at initial provisioning. The generated CloudFront hostname is the staging address for production assets.
- Existing Sandbox entry point, stack, prefix and workflow stay unchanged.
- This production build uses the existing production backend and live publishable key. Do not submit registrations or payments during preview. Missing Sandbox test configuration remains a separate verification blocker.

## Before provisioning

1. Obtain Hemi's approval for the reviewed AWS change and costs. Confirm AWS identity, existing bucket stack, certificate and lack of conflicting production resources.
2. Confirm Devoli is retiring frontend hosting only; obtain explicit continuity confirmation for the production backend, Auth0, customer data and payment configuration.
3. Confirm the shutdown time/timezone for Monday 12 October 2026 and agree on overlap and rollback support. Friday 9 October is a target, not an agreed cutover.
4. Inspect the current CloudFront ownership of both live domains. If aliases already exist on Devoli's distribution, coordinate their transfer. DNS alone is insufficient. Do not disable the old distribution or remove its aliases before an agreed transfer plan.
5. Export the actual Cloudflare records including apex flattening, proxy status, TTL, redirects and any AAAA records. Preserve email and certificate validation records. Identify the current canonical-domain redirect.
6. Keep the full source repository and history where they are. This preparation folder is not an application checkout.

## Local validation

Use the existing infrastructure dependencies and Node 24. From deployment/, set AWS_ACCOUNT_ID=704403761519, AWS_REGION=ap-southeast-2 and DEPLOY_ENV=production, then run:

```sh
npx tsc --noEmit
npx cdk synth --app "node -r ts-node/register bin/production.ts" --lookups=false --output cdk.out-production
```

The empty-domain warning is intentional: custom-domain attachment is a later reviewed change. Synthesis makes no AWS resource changes. Compare the generated shared bucket template with the existing Sandbox template; it must be unchanged. Exclude generated assembly folders from commits.

After approval, use a read-only CloudFormation/CDK diff against the actual account. Stop for any replacement/deletion or bucket-policy change. Deploy only the new production stack with the existing bucket dependency already present; do not blindly deploy all stacks or re-bootstrap.

## Deployment access to prepare

Create an Ournet Production GitHub environment restricted to main and configure a human reviewer where supported. Use a separate OurNetProductionGitHubDeployer OIDC role. Derive its trust subject from the repository's current GitHub OIDC subject format (the Sandbox setup uses numeric owner/repository IDs); do not assume the legacy subject format.

Scope permissions to:
- List the existing bucket only for production/ and production/*.
- PutObject/DeleteObject under production/* only.
- GetDistribution and CreateInvalidation for the new production distribution only.
- No Sandbox uploads or invalidations, no DNS or infrastructure administration.

Record the new distribution ID and set AWS_PRODUCTION_ROLE_ARN and PRODUCTION_DISTRIBUTION_ID on the Production environment. Leave PRODUCTION_DEPLOYMENT_ENABLED unset until explicitly approved. The workflow is manual and main-only. First upload also requires approval; it uses production configuration.

## Verification and live switch

- Complete Sandbox plans, address lookup, signup and test payment checks after Robin receives/configures the restricted test key securely.
- Check production assets and direct routes on the new CloudFront hostname; do not assume Auth0 accepts that hostname and do not add it without review.
- Confirm existing production backend and Auth0 configuration will accept the unchanged live domain names. Never replace existing allowed URLs.
- Check production TLS, error fallback, redirect requirements and content. Preserve or deliberately implement the canonical redirect before cutover.
- Freeze deployment during the transfer window and retain the previous release/old hosting.
- Obtain approval for the exact alias-transfer method and actual Cloudflare record changes.
- Coordinate CloudFront domain transfer first as required by AWS. Reconcile transferred aliases into the production infrastructure source before any later infrastructure deployment; this initial entry point still declares no aliases and must not be redeployed after a manual transfer until reconciled.
- Point the verified live records at the new distribution using the existing DNS provider's appropriate apex mechanism. Do not paste CloudFront IPs into A records.
- Verify HTTPS and public routes on both domains, login/logout and account access. Do not perform live payments without separate explicit authorization.
- Confirm completion to Devoli only after verification and agreement about retiring the old frontend.

## Rollback

Record old DNS values, source distribution ownership/configuration, target distribution ID, and the agreed person at Devoli who can assist. If custom domains have moved between CloudFront distributions, DNS rollback alone may not restore the site: reverse the alias association as well using the agreed AWS procedure. Keep the old distribution enabled and available until the rollback window is formally closed. If backend continuity is unconfirmed or testing fails, request an extension rather than declaring the migration complete.

## References

- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/alternate-domain-names-move.html
- https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/alternate-domain-names-move-options.html
- Existing PR 6 and deployment records.
