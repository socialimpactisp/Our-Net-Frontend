# Production preview preparation

This change prepares separate preview hosting. It does not deploy resources, enable deployment, change DNS or perform live cutover.

## Preview configuration

The infrastructure declares only the preview hostname. Set PRODUCTION_PREVIEW_CERTIFICATE_ARN to an independently verified, issued certificate that covers that hostname. The same value is required by the upload workflow. Do not reuse a certificate without preview coverage.

The workflow is manual, main-only and requires PRODUCTION_DEPLOYMENT_ENABLED. It verifies the intended distribution, alias, certificate and origin before uploading. Leave deployment disabled until the reviewed change is approved.

## Before deployment

- Compare the proposal with actual AWS state. Use the explicit production entry point and CDK diff --no-change-set --lookups=false to avoid creating a change set during inspection.
- Stop for unexpected replacements, deletions or changes to shared resources.
- Review actual changes, access and cost before provisioning. Deploy only the new stack; do not deploy all stacks or re-bootstrap.
- Confirm backend authentication redirect/logout allowlists and CORS support for the preview origin. Preserve existing allowed origins.
- Prepare scoped deployment access and a reviewed GitHub environment. Record the verified distribution and role configuration. Do not enable uploads until approved.

## Validation

Local synthesis and TypeScript checking passed during preparation. Synthesis used a placeholder certificate. These checks do not establish actual AWS state, workflow execution or end-to-end readiness.

Verify preview TLS, direct routes, catalogue, login/logout and account access. Preview uses production application configuration; do not place real orders or payments without separate authorization.

## Live cutover and rollback

Live cutover requires a separate reviewed change and explicit approval. Capture existing DNS and distribution ownership, coordinate any domain-alias transfer, and preserve the previous release and old hosting for rollback. Update declared aliases and workflow checks together.

DNS rollback alone may not restore a site after a distribution alias transfer. Agree the reversal procedure and hosting overlap before cutover. Preserve unrelated DNS records and validate both live domains after the approved transfer.

The detailed operational checkpoint is maintained locally and is not part of this public repository.
