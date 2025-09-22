/**
 * VA API Service
 * 
 * Handles communication with the VA Veteran Confirmation API
 */

import { VAApiConfig } from '../config/vaApiConfig.ts';
import { VeteranStatusRequest, VeteranStatusResponse, VeteranVerificationResult } from '../models/VeteranRequest.ts';

export class VAApiService {
  private config: VAApiConfig;

  constructor(config: VAApiConfig) {
    this.config = config;
  }

  /**
   * Verify veteran status with VA API
   */
  async verifyVeteranStatus(requestData: VeteranStatusRequest): Promise<VeteranVerificationResult> {
    const startTime = Date.now();

    try {
      const response = await this.callVAApi(requestData);
      const vaResponse = await response.json() as VeteranStatusResponse;

      if (!response.ok) {
        throw new Error(`VA API error: ${response.status} ${response.statusText}`);
      }

      // Map VA response to our simplified format
      return this.mapVAResponse(vaResponse, startTime);

    } catch (error) {
      console.error('VA API call failed:', error);
      
      return {
        confirmed: false,
        timestamp: new Date().toISOString(),
        reason: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime
      };
    }
  }

  /**
   * Make HTTP call to VA API
   */
  private async callVAApi(requestData: VeteranStatusRequest): Promise<Response> {
    const url = `${this.config.baseUrl}/status`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.config.apiKey,
        'X-VA-Client-Name': this.config.clientName
      },
      body: JSON.stringify(requestData),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    // Handle rate limiting
    if (response.status === 429) {
      throw new Error('Rate limit exceeded (60 requests per minute)');
    }

    return response;
  }

  /**
   * Map VA API response to our simplified format
   */
  private mapVAResponse(vaResponse: VeteranStatusResponse, startTime: number): VeteranVerificationResult {
    return {
      confirmed: vaResponse.veteran_status === 'confirmed',
      timestamp: new Date().toISOString(),
      requestId: vaResponse.id !== '(REDACTED)' ? vaResponse.id : undefined,
      reason: vaResponse.veteran_status === 'not confirmed' ? vaResponse.not_confirmed_reason : undefined,
      processingTime: Date.now() - startTime
    };
  }

  /**
   * Check if service is properly configured
   */
  isConfigured(): boolean {
    return !!this.config.apiKey && !!this.config.clientName;
  }

  /**
   * Get service configuration info (safe for logging)
   */
  getConfigInfo() {
    return {
      hasApiKey: !!this.config.apiKey,
      hasClientName: !!this.config.clientName,
      environment: this.config.environment,
      baseUrl: this.config.baseUrl,
      timeout: this.config.timeout,
      rateLimit: this.config.rateLimit
    };
  }
}