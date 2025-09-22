# VA Veteran Confirmation API Research Notes

## Key Differences from Initial Research

### Major Schema Changes
1. **More Required Fields**: Initial research suggested only firstName, lastName, birthDate, and SSN were required
2. **Address Required**: streetAddressLine1, city, state, zipCode, country are all required
3. **No SSN Field**: The actual API schema does NOT include SSN as a field
4. **Different Endpoint**: Uses `/status` endpoint, not `/verify`

### Authentication
- Uses `apiKey` header (confirmed from initial research)
- No OAuth required (confirmed)

### Sandbox Environment
- **Important**: In sandbox, only test user's **date of birth and zip code** are used to identify a Veteran
- Must use official test users to get "confirmed" responses
- Different matching logic than production

### API Behavior
- **Binary Response**: Only "confirmed" or "not confirmed" (confirmed)
- **No Personal Data Returned**: Only status confirmation (confirmed)
- **Rate Limiting**: 60 requests per minute (confirmed)

## Implementation Impact

### Current Code Issues
Our current implementation is using the wrong schema:
```typescript
// ❌ Current (incorrect)
interface VeteranData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;  // This field doesn't exist in real API
}
```

### Correct Implementation Needed
```typescript
// ✅ Correct schema
interface VeteranStatusRequest {
  firstName: string;
  lastName: string;
  birthDate: string;        // Note: birthDate not dateOfBirth
  streetAddressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Optional fields...
}
```

## Production Considerations

### Data Collection
- Non-profits will need to collect more information than initially expected
- Address information is critical for matching
- No SSN required (privacy benefit)

### Matching Algorithm
- VA uses standardization algorithm for matching
- More fields = better chance of match
- If no match, try variations of names/addresses
- Veterans may need to update their VA.gov profile

### Error Handling
- Multiple reasons for "not confirmed" status
- Important to distinguish between "person not found" vs "not a veteran"