import { StackProps } from "aws-cdk-lib";

export interface StaticSiteStackProps extends StackProps {
  readonly us_east_1_certificateArn: string;
  readonly environment: string;
  readonly s3Path: string;

  // What is the stack name of this site?
  readonly stackName: string;

  // Override the default ID generation for the distribution, if necessary
  readonly distributionNameOverride?: string;

  // What other domains might be pointed at this site?
  readonly siteDnsAliases: Array<string>;
}
