# VA API Field Validation Rules

## Name Fields (firstName, lastName, middleName)

### Valid Characters
- First character must be alpha/letter (upper or lowercase)
- Upper/lowercase letters
- Spaces
- Special characters: `/`, `\`, `-`, `'` (apostrophe)

### Invalid Patterns
- Consecutive special characters not supported
- Diacritical characters (ä, é) not supported

### Multiple Names
- Can include multiple names separated by space or valid special characters
- Example: "Margaret Mary" or "Smith-Jones"

### Name Variations for Better Matching
- Try variations if no match found
- "O'leary" → "oleary"
- "Smith-Jones" → "SmithJones", "Smith Jones", "Jones", "Smith"
- Capitalization doesn't matter: "John" vs "john"

## Address Fields

### streetAddressLine1/2/3
- Letters (upper/lowercase)
- Digits
- Spaces, commas, hashes (#), apostrophes ('), periods (.)
- Back slashes (\), forward slashes (/), hyphens (-)

### city, birthPlaceCity
- Letters (upper/lowercase)
- Digits
- Spaces, commas, apostrophes ('), periods (.)
- Back slashes (\), forward slashes (/), hyphens (-)

### state, birthPlaceState
- Starts with one or more letters
- Followed by zero or more: (space or hyphen) + letters

### country, birthPlaceCountry
- Same rules as state field

### zipCode
- 1-16 characters
- Letters (upper/lowercase), digits, spaces, hyphens (-)

## Date Fields

### birthDate
- Format: `YYYY-MM-DD`
- Must be valid date

## Other Fields

### gender
- Only 'm' or 'f' values help with search
- Case sensitivity not specified

### homePhoneNumber
- No specific validation rules provided

### mothersMaidenName
- No specific validation rules provided

## Best Practices

### Address Usage
- Use current residence address
- For unhoused Veterans: can use USPS, support organization, or descriptive location
- Example: "the corner of RTE512 and U.S.1"

### Data Matching
- Aim to match Veteran's VA.gov profile data
- Data is standardized using same algorithm before matching
- Close data with enough fields usually finds Veteran
- If not found, try different address or name variations