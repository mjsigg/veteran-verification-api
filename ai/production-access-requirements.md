# VA Production Access Requirements Checklist

This comprehensive checklist outlines all requirements for requesting VA API production access.

## 📋 Pre-Application Checklist

### **Basic Eligibility Requirements**
- [ ] **US-Based Consumer**: Confirm your organization is US-based
- [ ] **No Data Monetization**: Ensure no plans to monetize or sell Veteran data
- [ ] **Section 508 Compliance**: Review accessibility requirements
- [ ] **Rate Limiting Understanding**: Acknowledge 60 requests per minute limit

---

## 📝 Production Access Form Requirements

⚠️ **Critical**: Form progress cannot be saved once started. Gather ALL information before beginning.

### **1. Basic Information**
- [ ] Company name and address
- [ ] Primary contact information
- [ ] Notification email address for API status updates

### **2. Company Contacts and Information**
- [ ] Technical contact details
- [ ] Business contact details
- [ ] Organization type and structure

### **3. Application Information**
- [ ] **App Description**: Detailed information about your app and its use cases
- [ ] **Veteran Value**: Clear description of value provided to Veterans
- [ ] **Business Model**: Description of how your company generates income
- [ ] **Primary Users**: If Veterans are primary users, prepare app directory information:
  - [ ] Key URLs
  - [ ] Brief app description
  - [ ] Compatible devices and browsers list

### **4. Internal APIs (if applicable)**
- [ ] **VASI System Name**: For internal-only APIs, provide VASI system name

### **5. VA Facilities API (if applicable)**
- [ ] **Wait Time Screenshot**: If using PatientWaitTime resource, screenshot showing required message about wait time calculations

---

## 🔧 Technical Requirements

### **Security and Storage**
- [ ] **Credential Storage**: Description of secure API key/secret storage
- [ ] **PHI/PII Handling**: Details about secure storage/exposure of PHI/PII (if applicable)

### **Security Procedures Documentation**
- [ ] **Unauthorized Access Safeguards**: Protection against unauthorized/duplicate requests
- [ ] **Breach Response Process**: Documented procedures for security breaches
- [ ] **Vulnerability Management**: Patch and vulnerability management processes

### **OAuth APIs (if applicable)**
- [ ] **Scopes Documentation**: List of scopes your application will request

### **Benefits Intake API (if applicable)**
- [ ] **Naming Conventions**: Customer naming conventions for source field
- [ ] **Centralized Logging**: Information about centralized back-end log maintenance

### **Veterans Health API/FHIR (if applicable)**
- [ ] **Medical Disclaimers**: Screenshots showing appropriate medical advice disclaimers
- [ ] **MyHealthApplication.com**: Confirm app is listed (strongly recommended)

---

## 📄 Privacy Policy and Terms of Service

### **Required Documents**
- [ ] **Terms of Service URL**: Publicly accessible terms of service
- [ ] **Privacy Policy URL**: Publicly accessible privacy policy

### **Desktop Readability Requirements**
- [ ] **Reading Level**: Grade 12 or below
- [ ] **No Typos**: Proofread for obvious errors
- [ ] **Text Formatting**:
  - [ ] Font size 14px or larger
  - [ ] No long, unbroken paragraphs
  - [ ] No ALL-CAPS paragraphs (except 1-2 sentences)
  - [ ] No run-on sentences
  - [ ] No narrow column widths
  - [ ] WCAG contrast ratio 4.5:1 minimum

### **Mobile Readability Requirements**
- [ ] **Font Size**: 14px or larger
- [ ] **Paragraph Structure**: No long, unbroken paragraphs
- [ ] **Capitalization**: No ALL-CAPS paragraphs
- [ ] **Sentence Structure**: No run-on sentences
- [ ] **Layout**: No narrow column widths

---

## 🗂️ Data Retention and Deletion Requirements

### **Required Policy Statements**
- [ ] **Data Retention Policy**: Specify how long data is held for dormant accounts
- [ ] **Deletion Request Process**: Easy way for users to request permanent data deletion
- [ ] **Complete Data Deletion**: 100% of user data (including non-VA data) deleted upon request
- [ ] **Deletion Timeline**: Data deletion within 45 days of user request

---

## 🔒 Privacy and Data Practices Requirements

### **Data Collection Transparency**
- [ ] **Data Types**: Define specific types collected (geolocation, financial, medical, contacts, etc.)
- [ ] **Data Usage**: Clear description of how data is used, including de-identified/anonymized sharing

### **Third-Party Sharing**
- [ ] **Sharing Disclosure**: State whether data is shared with third-parties
- [ ] **Entity Identification**: Name entities data is shared with and how they use it
- [ ] **No Sales Policy**: State that no user data is sold for profit
- [ ] **Advertising Disclosure**: Indicate if data is used for targeted advertising

### **Impact and Consent**
- [ ] **Data Impact**: Address how sharing could impact others (genetic/family history)
- [ ] **User Consent**: Third-party use prohibited without user consent
- [ ] **Vendor Commitments**: Third-party vendors bound to same data commitments

### **Breach and Business Changes**
- [ ] **Breach Notification**: User notification and instruction process for breaches
- [ ] **Ownership Transfer**: User options if business is sold/transferred:
  - [ ] Secure data disposal/transmission/download option
  - [ ] New owner policy consistency option  
  - [ ] Account closure option
- [ ] **Change Notification**: User notification of ownership changes

### **Policy Updates**
- [ ] **Policy Change Notification**: Clear statement about notifying users of privacy/terms changes

---

## ✅ Final Pre-Submission Checklist

- [ ] All form sections completed
- [ ] All technical documentation prepared
- [ ] Privacy policy and terms of service meet all requirements
- [ ] Screenshots and supporting materials ready
- [ ] Contact information verified
- [ ] Legal review completed (recommended)

---

## 📞 Support Resources

- **VA Developer Portal**: https://developer.va.gov/
- **Production Access Form**: https://developer.va.gov/apply
- **Rate Limiting Policy**: Available on VA developer portal
- **Section 508 Guidelines**: https://www.section508.gov/
- **WCAG Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

**Estimated Preparation Time**: 2-4 weeks  
**Form Completion Time**: 1-2 hours (cannot save progress)  
**Review Timeline**: 1-2 weeks after submission