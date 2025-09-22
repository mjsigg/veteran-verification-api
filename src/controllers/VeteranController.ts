/**
 * Veteran Controller
 * 
 * Handles HTTP requests for veteran verification
 */

import { vaApiConfig } from '../config/vaApiConfig.ts';
import { VeteranStatusRequest, VeteranVerificationResult } from '../models/VeteranRequest.ts';
import { ApiResponseView } from '../views/ApiResponseView.ts';
import { VeteranValidator } from '../services/VeteranValidator.ts';
import { VAApiService } from '../services/VAApiService.ts';

export class VeteranController {
  private vaApiService: VAApiService;
  private validator: VeteranValidator;

  constructor() {
    this.vaApiService = new VAApiService(vaApiConfig);
    this.validator = new VeteranValidator();
  }

  /**
   * Handle veteran verification request
   * POST /api/verify
   */
  async verifyVeteran(request: Request): Promise<Response> {
    const startTime = Date.now();

    try {
      // Parse request body
      const requestData = await request.json() as VeteranStatusRequest;

      // Validate request data
      const validation = this.validator.validateRequest(requestData);
      if (!validation.isValid) {
        return ApiResponseView.formatValidationError(validation.errors);
      }

      // Call VA API
      const result = await this.vaApiService.verifyVeteranStatus(requestData);
      
      // Add processing time
      result.processingTime = Date.now() - startTime;

      // Log request (sanitized)
      console.log(`Verification: ${requestData.firstName} ${requestData.lastName} -> ${result.confirmed ? 'CONFIRMED' : 'NOT CONFIRMED'}`);

      return ApiResponseView.formatVerificationResponse(result);

    } catch (error) {
      console.error('Verification error:', error);
      
      if (error instanceof Error && error.message.includes('Rate limit')) {
        return ApiResponseView.formatRateLimitError();
      }
      
      return ApiResponseView.formatVAApiError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  /**
   * Handle service status request
   * GET /status
   */
  getStatus(): Response {
    try {
      const isConfigured = !!vaApiConfig.apiKey;
      return ApiResponseView.formatStatusResponse(isConfigured);
    } catch (error) {
      return ApiResponseView.formatConfigError();
    }
  }

  /**
   * Handle health check request
   * GET /health
   */
  getHealth(): Response {
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      vaApi: {
        configured: !!vaApiConfig.apiKey,
        environment: vaApiConfig.environment,
        baseUrl: vaApiConfig.baseUrl
      }
    });
  }
}