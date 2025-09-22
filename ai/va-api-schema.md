# VA Veteran Confirmation API Schema

## API Overview
- **Base URL (Sandbox)**: `https://sandbox-api.va.gov/services/veteran-confirmation/v1`
- **Base URL (Production)**: `https://api.va.gov/services/veteran-confirmation/v1`
- **Authentication**: API key in header (`apiKey`)
- **Content-Type**: `application/json`

## Request Schema (VeteranStatusRequest)

### Required Fields
```typescript
interface VeteranStatusRequest {
  firstName: string;           // Required
  lastName: string;            // Required  
  birthDate: string;           // Required - YYYY-MM-DD format
  streetAddressLine1: string;  // Required
  city: string;                // Required
  state: string;               // Required
  zipCode: string;             // Required
  country: string;             // Required
}
```

### Optional Fields
```typescript
interface VeteranStatusRequestOptional {
  middleName?: string;
  gender?: string;             // 'm' or 'f' only
  streetAddressLine2?: string;
  streetAddressLine3?: string;
  homePhoneNumber?: string;
  mothersMaidenName?: string;
  birthPlaceCity?: string;
  birthPlaceState?: string;
  birthPlaceCountry?: string;
}
```

## Response Schema (VeteranStatusConfirmation)

```typescript
interface VeteranStatusConfirmation {
  id: string;                  // Non-identifying string (deprecated)
  veteran_status: "confirmed" | "not confirmed";
  not_confirmed_reason?: string;  // See reasons below
}
```

### Not Confirmed Reasons
- `ERROR` - System error occurred
- `MORE_RESEARCH_REQUIRED` - Insufficient data for match
- `NOT_TITLE_38` - Person found but not Title 38 Veteran
- `PERSON_NOT_FOUND` - No matching person found

## Error Response Schema

```typescript
interface APIError {
  errors: Array<{
    title: string;
    detail: string;
    code: string;
    status: string;
  }>;
}
```

## HTTP Status Codes
- `200` - Success
- `400` - Bad request (missing/invalid parameters)
- `401` - No API key provided
- `403` - Invalid API key
- `413` - Payload too large
- `429` - Rate limit exceeded
- `500` - Internal server error
- `502` - Bad gateway
- `503` - Service unavailable
- `504` - Gateway timeout