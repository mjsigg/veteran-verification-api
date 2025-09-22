/**
 * Veteran Request Model
 * 
 * Data models for VA Veteran Confirmation API requests and responses
 */

/**
 * Veteran status request payload (matches VA API schema exactly)
 */
export interface VeteranStatusRequest {
  // Required fields
  firstName: string;
  lastName: string;
  birthDate: string;                // YYYY-MM-DD format
  streetAddressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Optional fields
  middleName?: string;
  gender?: 'M' | 'F' | 'm' | 'f';
  streetAddressLine2?: string;
  streetAddressLine3?: string;
  homePhoneNumber?: string;
  mothersMaidenName?: string;
  birthPlaceCity?: string;
  birthPlaceState?: string;
  birthPlaceCountry?: string;
}

/**
 * VA API response format
 */
export interface VeteranStatusResponse {
  id: string;                                    // Non-identifying string (deprecated)
  veteran_status: 'confirmed' | 'not confirmed';
  not_confirmed_reason?: string;                 // ERROR | MORE_RESEARCH_REQUIRED | NOT_TITLE_38 | PERSON_NOT_FOUND
}

/**
 * Simplified response for microservice clients
 */
export interface VeteranVerificationResult {
  confirmed: boolean;
  timestamp: string;
  requestId?: string;
  reason?: string;                              // Reason if not confirmed
  processingTime?: number;
}

/**
 * Validation result for request data
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Error response format
 */
export interface APIError {
  errors: Array<{
    title: string;
    detail: string;
    code: string;
    status: string;
  }>;
}