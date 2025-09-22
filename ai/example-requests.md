# VA Veteran Confirmation API Examples

## Example Request (from official docs)

```json
POST /status
Content-Type: application/json
apiKey: {YOUR_API_KEY}

{
  "firstName": "Alfredo",
  "lastName": "Armstrong", 
  "birthDate": "1993-06-08",
  "middleName": "M",
  "gender": "M",
  "streetAddressLine1": "17020 Tortoise St",
  "city": "Round Rock",
  "zipCode": "78664",
  "state": "TX",
  "country": "USA",
  "homePhoneNumber": "555-555-5555",
  "mothersMaidenName": "Smith",
  "birthPlaceCity": "Johnson City",
  "birthPlaceState": "MA",
  "birthPlaceCountry": "USA"
}
```

## Example Successful Response

```json
{
  "id": "(REDACTED)",
  "veteran_status": "confirmed",
  "not_confirmed_reason": null
}
```

## Example Not Confirmed Response

```json
{
  "veteran_status": "not confirmed",
  "not_confirmed_reason": "PERSON_NOT_FOUND"
}
```

## Example Error Responses

### Missing Required Field (400)
```json
{
  "errors": [
    {
      "title": "Missing parameter",
      "detail": "The required parameter 'firstName', is missing",
      "code": "108", 
      "status": "400"
    }
  ]
}
```

### No API Key (401)
```json
{
  "message": "No API key found in request"
}
```

### Invalid API Key (403)
```json
{
  "message": "You cannot consume this service"
}
```

### Rate Limit Exceeded (429)
```json
{
  "message": "API rate limit exceeded"
}
```

## Minimal Required Request

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1980-01-15",
  "streetAddressLine1": "123 Main St",
  "city": "Anytown",
  "state": "CA", 
  "zipCode": "12345",
  "country": "USA"
}
```

## Sandbox Test User Note

In sandbox environment:
- Only `birthDate` and `zipCode` are used for matching
- Must use official VA test users to get "confirmed" responses
- Other fields are accepted but not used for matching logic