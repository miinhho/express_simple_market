import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

interface ServerConfig {
  port: number;
  nodeEnv: NodeJS.ProcessEnv['NODE_ENV'];
  isProduction: boolean;
  isDevelopment: boolean;
}

interface Config {
  server: ServerConfig;
}

const validateEnv = (): void => {
  const requiredEnvVars = ['PORT', 'NODE_ENV'] as const;
  const missing = requiredEnvVars.filter(env => !process.env[env]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Validate environment variables
validateEnv();

const DEFAULT_PORT = 3000;

export const config: Config = {
  server: {
    port: parseInt(process.env.PORT || String(DEFAULT_PORT), 10),
    nodeEnv: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development'
  }
};