/**
 * API Response View
 * 
 * Handles formatting of API responses for clients
 */

import { VeteranVerificationResult, APIError } from '../models/VeteranRequest.js';

export class ApiResponseView {
  /**
   * Format successful verification response
   */
  static formatVerificationResponse(result: VeteranVerificationResult): Response {
    return Response.json(result, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Window': '60'
      }
    });
  }

  /**
   * Format validation error response
   */
  static formatValidationError(errors: string[]): Response {
    return Response.json({
      error: 'Validation failed',
      details: errors,
      timestamp: new Date().toISOString()
    }, {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Format VA API error response
   */
  static formatVAApiError(error: string, status: number = 500): Response {
    return Response.json({
      error: 'VA API Error',
      message: error,
      timestamp: new Date().toISOString()
    }, {
      status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Format rate limit error response
   */
  static formatRateLimitError(): Response {
    return Response.json({
      error: 'Rate limit exceeded',
      message: 'Maximum 60 requests per minute allowed',
      timestamp: new Date().toISOString(),
      retryAfter: 60
    }, {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60'
      }
    });
  }

  /**
   * Format configuration error response
   */
  static formatConfigError(): Response {
    return Response.json({
      error: 'Service configuration error',
      message: 'VA API key not configured',
      timestamp: new Date().toISOString()
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Format service status response
   */
  static formatStatusResponse(isConfigured: boolean): Response {
    return Response.json({
      service: 'VA Veteran Verification',
      version: '1.0.0',
      status: 'running',
      vaApiConfigured: isConfigured,
      timestamp: new Date().toISOString(),
      endpoints: {
        verify: 'POST /api/verify',
        health: 'GET /health'
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}