# veteran-verification-api

A dedicated backend microservice for verifying military veteran status using the official VA Veteran Confirmation API.

## 🎯 Purpose

This microservice provides a simple, reusable API endpoint that any application can use to verify if someone is a confirmed military veteran. Designed for organizations (non-profits, businesses, etc.) that need to validate veteran status for benefits, discounts, or services.

## 🏗️ Microservice Architecture

```
┌─────────────────┐    HTTP POST     ┌──────────────────────┐
│  Any Frontend   │ ──────────────→  │  VA Verification     │
│  (React/Vue/etc)│                  │  Microservice        │
└─────────────────┘                  └──────────────────────┘
                                               │
                                               │ VA API Call
                                               ▼
                                     ┌──────────────────────┐
                                     │   VA.gov API         │
                                     └──────────────────────┘
```

## ✅ **Benefits**

### **Single Responsibility**
- **Only does one thing**: Veteran status verification
- **Stateless**: No user management, sessions, or business logic
- **Pure API**: Takes veteran data → returns confirmation

### **Technology Agnostic** 
- Any frontend can consume it (React, Vue, mobile apps, etc.)
- Any backend can integrate it (Node, Python, Java, etc.)
- Organizations can plug it into their existing systems

### **Easy to Deploy & Scale**
- Deploy independently 
- Scale based on verification volume
- No frontend deployment coupling

### **Security Benefits**
- API keys stay on backend only
- No frontend secrets exposure
- Can add authentication/authorization layers easily

## 🔧 API

**Endpoint**: `POST /api/verify`

**Input**: Veteran demographic data  
**Output**: `{ "confirmed": true/false }`

## 🚀 Usage

```bash
# Start development server
bun run dev

# Start production server  
bun run start
```

## 📋 Requirements

- VA API key (obtain from https://developer.va.gov/apply)
- Set environment variables:
  - `VA_API_VETERAN_CONFIRMATION` - Your VA API key
  - `VA_API_CLIENT_NAME` - Your client identifier

## 📚 Documentation

- `ai/va-api-schema.md` - Complete API schema and data models
- `ai/va-api-notes.md` - Research notes and implementation guidance
- `ai/field-validation-rules.md` - Input validation requirements
- `ai/example-requests.md` - API request/response examples
- `ai/production-access-timeline.md` - Timeline and process for getting production access
- `ai/production-access-requirements.md` - Comprehensive checklist for production access application

## ⚡ Rate Limits

- 60 requests per minute (VA API limit)
- Returns 429 status when exceeded

## 🧪 Testing

**Sandbox Environment**: 
- Only `birthDate` and `zipCode` are used for matching
- Requires specific VA test user data to return "confirmed" status
- All other fields are ignored in sandbox

**Production Environment**:
- Uses full data matching algorithm with all required fields
- Better matching accuracy with complete veteran information

---

**Built with Bun** - Fast, lightweight, and efficient