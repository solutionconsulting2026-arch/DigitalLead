# XYZ Bank - Home Loan Lead Capture Portal

A modern, high-conversion digital lead capture application built for **XYZ Bank** (بنك XYZ) to capture and pre-qualify prospective home loan applicants with instant CRM registration.

---

## Key Features

1. **Lead Capture Flow**:
   - **Personal Information**: Full Name, National ID / Resident ID Number, Nationality (Citizen vs Resident / Expatriate), Mobile Number, Email Address, State / Region, and Preferred XYZ Bank Branch.
   - **Employment & Income**: Employment Sector (Private, Corporate / Multinational, Government & Public, Self-Employed), Employer Name, Net Monthly Salary in USD ($).
   - **Loan & Property Details**: Loan Purpose (Ready Property, Land Purchase, Construction, Buyout), Property Location, Property Value, Desired Loan Amount, Tenure (up to 30 years), Preferred Time to Call.

2. **Bilingual Experience (English & العربية)**:
   - Instant language switcher in header.
   - Fully mirrored Right-to-Left (RTL) layout for Arabic and Left-to-Right (LTR) for English.

3. **CRM REST API Integration**:
   - Submits leads in real-time to the CRM backend endpoint with automated payload mapping.
   - Displays real-time confirmation with the generated CRM Lead ID.

---

## Quick Start

### 1. Run Automated Test Suite
```bash
node test_lead_capture.js
```

### 2. Start the Local Web Server
```bash
npm start
# Or directly:
node server.js
```
Then open your browser at **[http://localhost:3000](http://localhost:3000)**.
