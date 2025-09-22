/**
 * VA API Configuration
 * 
 * Centralized configuration for VA Veteran Confirmation API
 */

export interface VAApiConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  rateLimit: number;
  retryAttempts: number;
  environment: 'sandbox' | 'production';
}

/**
 * Load and validate VA API configuration from environment
 */
export function loadVAApiConfig(): VAApiConfig {
  const apiKey = process.env.VA_API_KEY;
  const environment = (process.env.NODE_ENV === 'production') ? 'production' : 'sandbox';
  
  if (!apiKey) {
    throw new Error('VA_API_KEY environment variable is required');
  }

  const config: VAApiConfig = {
    apiKey,
    environment,
    baseUrl: environment === 'production' 
      ? 'https://api.va.gov/services/veteran-confirmation/v1'
      : 'https://sandbox-api.va.gov/services/veteran-confirmation/v1',
    timeout: parseInt(process.env.VA_API_TIMEOUT || '30000'), // 30 seconds
    rateLimit: parseInt(process.env.VA_API_RATE_LIMIT || '60'), // 60 requests per minute
    retryAttempts: parseInt(process.env.VA_API_RETRY_ATTEMPTS || '3')
  };

  return config;
}

/**
 * Get current VA API configuration
 */
export const vaApiConfig = loadVAApiConfig();