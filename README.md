# Ahli Bank Oman - Home Loan Lead Capture Portal

A digital lead capture application built for **Ahli Bank Oman** (البنك الأهلي عُمان) to capture and pre-qualify home loan prospects for Ahli Bank conventional (**MyHome**) housing loan.

---

## Key Features

1. **Lead Capture**:
   - **Step 1: Applicant Profile**: Full Name, Oman Civil ID / Resident Card Number, Nationality (Omani vs Resident Expatriate), Mobile Number (+968), Email Address, Current Governorate, and Preferred Ahli Bank Branch.
   - **Step 2: Employment & Income**: Employment Sector (Government, Semi-Gov, Private, Self-Employed), Employer Name, Net Monthly Salary in OMR.
   - **Step 3: Loan & Property Details**: Loan Purpose (Ready Property, Land Purchase, Construction, Buyout), Property Location, Property Value, Desired Loan Amount (up to OMR 350,000), Tenure (up to 25 years), Preferred Time to Call.

2. **Central Bank of Oman (CBO) Regulatory Compliance**:
   - Minimum salary checks based on sector (Government: OMR 320, Private: OMR 500, Expatriate: OMR 3,000, Self-Employed: OMR 1,000).
   - Maximum tenure capped at 25 years.
   - Maximum finance amount up to OMR 350,000.
   - Real-time DBR (Debt Burden Ratio) warning if obligations exceed 50% of monthly net income.
   - Mala'a Credit and Financial Information Bureau consent disclosure.

3. **Bilingual Experience (English & العربية)**:
   - Instant language switcher in header.
   - Fully mirrored Right-to-Left (RTL) layout for Arabic and Left-to-Right (LTR) for English.

4. **CRMNext REST API Integration**:
   - **Step 1: OAuth2 Authentication**: Automatically retrieves bearer token from `https://presales.businessbywire.com/restapigb8/oauth2/token`.
   - **Step 2: Save Object**: Submits lead payload to `https://presales.businessbywire.com/restapigb8/crmWebApi/saveObject` with `Authorization: Bearer <token>`.
   - **Mapped Fields**: Full Name (`LastName`), Mobile Phone, Email, Nationality (`Lea_ex4_174` & `Lea_ex4_175`), Civil ID (`Lea_ex3_70`), Governorate (`XMLField_9677`), Preferred Branch (`XMLField_9678`), Employment Sector (`Lea_ex9_24`), Employer Name (`Lea_ex1_71`), Net Salary (`Lea_ex1_95`), Loan Purpose (`XMLField_9779`), Property Location (`XMLField_9780`), Property Value (`XMLField_9781`), Desired Loan Amount (`XMLField_9782`), and Tenure (`Lea_ex4_114`).
   - Constant defaults: `LayoutID: 103145`, `ProcessID: 102118`, `Product: "Home Loan"`, `Rating: "Warm"`, `LeadOwnerName: "Mr. James May"`, `ProductCategory: "Loans"`, `StatusCode: "New"`.
   - Returns real-time CRM `ObjectKey` and displays it in the confirmation modal.

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
