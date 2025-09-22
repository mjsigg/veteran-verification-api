/**
 * Veteran Validator Service
 * 
 * Validates veteran request data according to VA API requirements
 */

import { VeteranStatusRequest, ValidationResult } from '../models/VeteranRequest.js';

export class VeteranValidator {
  /**
   * Validate veteran status request
   */
  validateRequest(data: VeteranStatusRequest): ValidationResult {
    const errors: string[] = [];

    // Check required fields
    this.validateRequiredFields(data, errors);
    
    // Validate field formats
    this.validateFieldFormats(data, errors);
    
    // Validate field lengths and patterns
    this.validateFieldPatterns(data, errors);

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate required fields are present
   */
  private validateRequiredFields(data: VeteranStatusRequest, errors: string[]): void {
    const requiredFields = [
      'firstName', 'lastName', 'birthDate', 'streetAddressLine1',
      'city', 'state', 'zipCode', 'country'
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof VeteranStatusRequest] || 
          typeof data[field as keyof VeteranStatusRequest] !== 'string' ||
          (data[field as keyof VeteranStatusRequest] as string).trim() === '') {
        errors.push(`${field} is required and cannot be empty`);
      }
    }
  }

  /**
   * Validate field formats
   */
  private validateFieldFormats(data: VeteranStatusRequest, errors: string[]): void {
    // Validate birth date format (YYYY-MM-DD)
    if (data.birthDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(data.birthDate)) {
        errors.push('birthDate must be in YYYY-MM-DD format');
      } else {
        // Validate it's a real date
        const date = new Date(data.birthDate);
        if (isNaN(date.getTime()) || date.toISOString().split('T')[0] !== data.birthDate) {
          errors.push('birthDate must be a valid date');
        }
      }
    }

    // Validate gender if provided
    if (data.gender && !['M', 'F', 'm', 'f'].includes(data.gender)) {
      errors.push('gender must be M, F, m, or f');
    }
  }

  /**
   * Validate field patterns and lengths
   */
  private validateFieldPatterns(data: VeteranStatusRequest, errors: string[]): void {
    // Validate names (first character must be alpha)
    this.validateNameField(data.firstName, 'firstName', errors);
    this.validateNameField(data.lastName, 'lastName', errors);
    if (data.middleName) {
      this.validateNameField(data.middleName, 'middleName', errors);
    }

    // Validate zip code (1-16 characters, letters/digits/spaces/hyphens)
    if (data.zipCode) {
      const zipRegex = /^[a-zA-Z0-9\s\-]{1,16}$/;
      if (!zipRegex.test(data.zipCode)) {
        errors.push('zipCode must be 1-16 characters (letters, digits, spaces, hyphens only)');
      }
    }

    // Validate address fields
    this.validateAddressField(data.streetAddressLine1, 'streetAddressLine1', errors);
    if (data.streetAddressLine2) {
      this.validateAddressField(data.streetAddressLine2, 'streetAddressLine2', errors);
    }
    if (data.streetAddressLine3) {
      this.validateAddressField(data.streetAddressLine3, 'streetAddressLine3', errors);
    }

    // Validate city fields
    this.validateCityField(data.city, 'city', errors);
    if (data.birthPlaceCity) {
      this.validateCityField(data.birthPlaceCity, 'birthPlaceCity', errors);
    }
  }

  /**
   * Validate name field according to VA API rules
   */
  private validateNameField(value: string, fieldName: string, errors: string[]): void {
    if (!value) return;

    // First character must be alpha
    if (!/^[a-zA-Z]/.test(value)) {
      errors.push(`${fieldName} must start with a letter`);
      return;
    }

    // Valid characters: letters, spaces, /, \, -, '
    const nameRegex = /^[a-zA-Z][a-zA-Z\s\/\\\-']*$/;
    if (!nameRegex.test(value)) {
      errors.push(`${fieldName} contains invalid characters. Allowed: letters, spaces, /, \\, -, '`);
    }

    // Check for consecutive special characters
    if (/[\/\\\-']{2,}/.test(value)) {
      errors.push(`${fieldName} cannot contain consecutive special characters`);
    }

    // Length check (reasonable limit)
    if (value.length > 50) {
      errors.push(`${fieldName} must be 50 characters or less`);
    }
  }

  /**
   * Validate address field
   */
  private validateAddressField(value: string, fieldName: string, errors: string[]): void {
    if (!value) return;

    // Valid characters: letters, digits, spaces, commas, #, ', ., \, /, -
    const addressRegex = /^[a-zA-Z0-9\s,#'.\\/\-]+$/;
    if (!addressRegex.test(value)) {
      errors.push(`${fieldName} contains invalid characters. Allowed: letters, digits, spaces, commas, #, ', ., /, \\, -`);
    }

    if (value.length > 100) {
      errors.push(`${fieldName} must be 100 characters or less`);
    }
  }

  /**
   * Validate city field
   */
  private validateCityField(value: string, fieldName: string, errors: string[]): void {
    if (!value) return;

    // Valid characters: letters, digits, spaces, commas, ', ., \, /, -
    const cityRegex = /^[a-zA-Z0-9\s,'.\\/\-]+$/;
    if (!cityRegex.test(value)) {
      errors.push(`${fieldName} contains invalid characters. Allowed: letters, digits, spaces, commas, ', ., /, \\, -`);
    }

    if (value.length > 50) {
      errors.push(`${fieldName} must be 50 characters or less`);
    }
  }
}