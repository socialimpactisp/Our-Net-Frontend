import * as fs from 'fs';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig({ path: path.resolve(__dirname, '../.env') });

export interface SiteConfig {
  stackName: string;
  siteDnsAliases: string[];
  s3Path: string;
}

export interface CloudFrontConfig {
  priceClass: string;
  cacheTtl: {
    default: number;
    min: number;
    max: number;
  };
  errorPages: Array<{
    httpStatus: number;
    responseHttpStatus: number;
    responsePagePath: string;
  }>;
}

export interface ProjectConfig {
  name: string;
  bucketStackName: string;
  bucketName: string;
}

export interface AwsConfig {
  region: string;
}

export interface BaseConfig {
  project: ProjectConfig;
  aws: AwsConfig;
  cloudfront: CloudFrontConfig;
}

export interface EnvironmentConfig {
  environment: string;
  sites: SiteConfig[];
}

export interface DeploymentConfig extends BaseConfig, EnvironmentConfig {
  awsAccountId: string;
  acmCertificateArn: string;
}

export class ConfigLoader {
  private static instance: ConfigLoader;
  private config: DeploymentConfig | null = null;

  private constructor() { }

  public static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  public getConfig(): DeploymentConfig {
    if (!this.config) {
      this.config = this.loadConfig();
    }
    return this.config;
  }

  private loadConfig(): DeploymentConfig {
    // Get environment from env var, default to 'sandbox'
    const deployEnv = process.env.DEPLOY_ENV || 'sandbox';

    if (deployEnv !== 'sandbox') throw new Error('Only Sandbox is enabled for this migration.');

    // Load base configuration
    const baseConfigPath = path.resolve(__dirname, '../config/base.json');
    if (!fs.existsSync(baseConfigPath)) {
      throw new Error(`Base configuration file not found: ${baseConfigPath}`);
    }
    const baseConfig: BaseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));

    // Load environment-specific configuration
    const envConfigPath = path.resolve(__dirname, `../config/${deployEnv}.json`);
    if (!fs.existsSync(envConfigPath)) {
      throw new Error(`Environment configuration file not found: ${envConfigPath}. Available environments: sandbox, production`);
    }
    const envConfig: EnvironmentConfig = JSON.parse(fs.readFileSync(envConfigPath, 'utf8'));

    // Load required environment variables
    const awsAccountId = process.env.AWS_ACCOUNT_ID;
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN;

    // Validate required environment variables
    if (!awsAccountId) {
      throw new Error('AWS_ACCOUNT_ID environment variable is required. Please check your .env file.');
    }
    if (!acmCertificateArn) {
      throw new Error('ACM_CERTIFICATE_ARN environment variable is required. Please check your .env file.');
    }

    // Merge configurations
    const config: DeploymentConfig = {
      ...baseConfig,
      ...envConfig,
      awsAccountId,
      acmCertificateArn,
      aws: {
        ...baseConfig.aws,
        region: process.env.AWS_REGION || baseConfig.aws.region,
      },
    };

    // Validate configuration
    this.validateConfig(config);

    return config;
  }

  private validateConfig(config: DeploymentConfig): void {
    // Validate AWS account ID format
    if (!/^\d{12}$/.test(config.awsAccountId)) {
      throw new Error(`Invalid AWS account ID format: ${config.awsAccountId}. Must be 12 digits.`);
    }

    // Validate ACM certificate ARN format
    if (!config.acmCertificateArn.startsWith('arn:aws:acm:')) {
      throw new Error(`Invalid ACM certificate ARN format: ${config.acmCertificateArn}`);
    }

    if (config.awsAccountId !== '704403761519' || config.aws.region !== 'ap-southeast-2') {
      throw new Error('Unexpected AWS account or hosting region.');
    }
    if (config.acmCertificateArn !== 'arn:aws:acm:us-east-1:704403761519:certificate/0ac9457d-a3b9-4120-b52c-72f968bcb25e') {
      throw new Error('Unexpected certificate. Review the Sandbox configuration first.');
    }
    if (!Array.isArray(config.sites) || config.sites.length !== 1) {
      throw new Error('Exactly one Sandbox site is required.');
    }
    if (config.environment !== 'sandbox' ||
        config.sites[0].siteDnsAliases.join(',') !== 'sandbox.our.net.nz' ||
        config.sites[0].s3Path !== '/sandbox/' ||
        config.project.bucketName !== 'ournet-websites-704403761519') {
      throw new Error('Only the reviewed Sandbox target is permitted.');
    }

    // Validate sites configuration
    if (!config.sites) {
      throw new Error(`No sites configured for environment: ${config.environment}`);
    }

    config.sites.forEach((site, index) => {
      if (!site.stackName) {
        throw new Error(`Invalid site configuration at index ${index}: stackName is required`);
      }

      if (!Array.isArray(site.siteDnsAliases) || site.siteDnsAliases.length === 0) {
        throw new Error(`Invalid site configuration at index ${index}: siteDnsAliases must be a non-empty array`);
      }
    });
  }

  public listAvailableEnvironments(): string[] {
    const configDir = path.resolve(__dirname, '../config');
    if (!fs.existsSync(configDir)) {
      return [];
    }

    return fs.readdirSync(configDir)
      .filter(file => file.endsWith('.json') && file !== 'base.json')
      .map(file => path.basename(file, '.json'));
  }
}

// Export singleton instance
export const configLoader = ConfigLoader.getInstance();
