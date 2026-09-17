/**
 * Ahli Bank Oman - Simple Single-Page Home Loan Lead Capture
 * Straightforward validation, simple submission, and bilingual support.
 */

const I18N = {
  en: {
    pillText: "Home Loan Inquiry",
    mainTitle: "Ahli Bank Home Loan Lead Capture",
    subTitle: "Interested in owning a home in Oman? Fill in your details below and our team will get in touch with you.",
    secPersonal: "Personal Information",
    lblFullName: "Full Name (as per Civil ID / Passport)",
    lblCivilId: "Civil ID / Resident Card Number",
    lblNationality: "Nationality",
    natOmani: "Omani Citizen",
    natExpat: "Resident Expatriate",
    lblMobile: "Mobile Number",
    lblEmail: "Email Address",
    lblGovernorate: "Governorate",
    lblBranch: "Preferred Ahli Bank Branch",
    secEmployment: "Employment & Income",
    lblSector: "Employment Sector",
    lblEmployer: "Employer / Ministry Name",
    lblSalary: "Monthly Net Salary (OMR)",
    yes: "Yes",
    no: "No",
    secLoan: "Home Loan Interest & Property",
    lblPurpose: "Loan Purpose",
    lblPropLoc: "Property Location",
    lblPropVal: "Estimated Property Value (OMR)",
    lblLoanAmt: "Desired Loan Amount (OMR)",
    lblTenure: "Preferred Tenure",
    lblContactTime: "Preferred Time to Call",
    consentText: "I authorize Ahli Bank Oman to contact me regarding my home loan inquiry and review my basic eligibility.",
    btnSubmit: "Submit Home Loan Inquiry",
    modalTitle: "Inquiry Received!",
    modalDesc: "Thank you for your interest in Ahli Bank Oman Home Loan. A representative from your preferred branch will contact you shortly.",
    modalLeadId: "Lead ID:",
    modalRef: "Application Reference:",
    modalBtn: "Done"
  },
  ar: {
    pillText: "طلب قرض سكني",
    mainTitle: "تسجيل اهتمام بقرض سكني - البنك الأهلي",
    subTitle: "هل ترغب في امتلاك منزل أحلامك في عُمان؟ يرجى تعبئة البيانات أدناه وسيتواصل معك فريقنا المختص.",
    secPersonal: "البيانات الشخصية",
    lblFullName: "الاسم الكامل (وفقاً للبطاقة المدنية / جواز السفر)",
    lblCivilId: "الرقم المدني / رقم بطاقة المقيم",
    lblNationality: "الجنسية",
    natOmani: "مواطن عُماني",
    natExpat: "مقيم في عُمان",
    lblMobile: "رقم الهاتف النقال",
    lblEmail: "البريد الإلكتروني",
    lblGovernorate: "المحافظة",
    lblBranch: "فرع البنك الأهلي المفضل",
    secEmployment: "بيانات العمل والدخل",
    lblSector: "جهة العمل / القطاع",
    lblEmployer: "اسم جهة العمل / الوزارة",
    lblSalary: "صافي الراتب الشهري (ريال عماني)",
    yes: "نعم",
    no: "لا",
    secLoan: "تفاصيل القرض السكني والعقار المطلوب",
    lblPurpose: "الغرض من القرض",
    lblPropLoc: "موقع العقار",
    lblPropVal: "القيمة التقديرية للعقار (ريال عماني)",
    lblLoanAmt: "مبلغ القرض المطلوب (ريال عماني)",
    lblTenure: "فترة السداد المفضلة",
    lblContactTime: "الوقت المفضل للتواصل",
    consentText: "أفوض البنك الأهلي عُمان بالتواصل معي بخصوص طلبي والتحقق من أهليتي الائتمانية المبدئية.",
    btnSubmit: "إرسال طلب القرض السكني",
    modalTitle: "تم استلام طلبك بنجاح!",
    modalDesc: "شكراً لاهتمامك بقروض البنك الأهلي عُمان السكنية. سيتواصل معك ممثل الفرع المفضل في أقرب وقت.",
    modalLeadId: "رقم الطلب (Lead ID):",
    modalRef: "رقم المرجع:",
    modalBtn: "تم"
  }
};

let currentLang = 'en';

function generateLeadReference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ABO-HL-${year}-${rand}`;
}

// Validation
function validateForm() {
  let valid = true;
  document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

  // Full Name
  const fullName = document.getElementById('fullName');
  if (!fullName.value.trim() || fullName.value.trim().length < 3) {
    markError(fullName);
    valid = false;
  }

  // Civil ID (7-10 digits)
  const civilId = document.getElementById('civilId');
  if (!/^\d{7,10}$/.test(civilId.value.trim())) {
    markError(civilId);
    valid = false;
  }

  // Mobile (8-digit Oman number)
  const mobile = document.getElementById('mobile');
  const cleanMobile = mobile.value.trim().replace(/[\s\-]/g, '');
  if (!/^(?:\+968|00968|968)?([79]\d{7})$/.test(cleanMobile)) {
    markError(mobile);
    valid = false;
  }

  // Email
  const email = document.getElementById('email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    markError(email);
    valid = false;
  }

  // Employer
  const employer = document.getElementById('employer');
  if (!employer.value.trim()) {
    markError(employer);
    valid = false;
  }

  // Salary
  const salary = document.getElementById('salary');
  if (!salary.value || Number(salary.value) <= 0) {
    markError(salary);
    valid = false;
  }

  // Property Location
  const propLoc = document.getElementById('propLocation');
  if (!propLoc.value.trim()) {
    markError(propLoc);
    valid = false;
  }

  // Property Value
  const propVal = document.getElementById('propValue');
  if (!propVal.value || Number(propVal.value) <= 0) {
    markError(propVal);
    valid = false;
  }

  // Desired Loan Amount
  const loanAmt = document.getElementById('loanAmount');
  if (!loanAmt.value || Number(loanAmt.value) <= 0) {
    markError(loanAmt);
    valid = false;
  }

  // Consent
  const consent = document.getElementById('chkConsent');
  const consentErr = document.getElementById('consentErr');
  if (!consent.checked) {
    consentErr.style.display = 'block';
    valid = false;
  } else {
    consentErr.style.display = 'none';
  }

  if (!valid) {
    const firstErr = document.querySelector('.has-error');
    if (firstErr) {
      firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return valid;
}

function markError(el) {
  const parent = el.closest('.input-group') || el.parentElement;
  parent.classList.add('has-error');
}

// Build CRM Payload matching user schema
function buildCrmPayload(formData) {
  const sectorMap = {
    government: "Government & Public Sector",
    semi_government: "Semi-Government",
    private: "Private Sector",
    self_employed: "Self-Employed / Business Owner"
  };

  const purposeMap = {
    ready_property: "Purchase Ready Property (Villa/Apartment)",
    land_purchase: "Purchase Residential Land / Plot",
    construction: "Home Construction / Renovation",
    buyout: "Transfer / Buyout Existing Loan"
  };

  const nationalityText = formData.nationality === 'expat' ? 'Resident Expatriate' : 'Omani';
  const mobileClean = parseInt(formData.mobile.replace(/\D/g, ''), 10) || formData.mobile;
  const sectorText = sectorMap[formData.sector] || formData.sector;
  const purposeText = purposeMap[formData.loanPurpose] || formData.loanPurpose;
  const propValNum = Number(formData.propValue) || 0;
  const loanAmtNum = Number(formData.loanAmount) || 0;

  return [
    {
      ItemId: "0",
      ItemType: "Lead",
      ProcessMode: "Create",
      OutputFieldList: [
        "CustomObjectId",
        "ItemId",
        "XMLField_9679",
        "XMLField_9680",
        "XMLField_9681",
        "XMLField_9682"
      ],
      ObjectData: {
        LayoutID: 103145,
        ProcessID: 102118,
        LastName: formData.fullName,
        Product: "Home Loan",
        Rating: "Warm",
        LeadOwnerName: "Mr. James May",
        MobilePhone: mobileClean,
        Email: formData.email,
        ProductCategory: "Loans",
        StatusCode: "New",
        Lea_ex4_174: nationalityText,
        Lea_ex4_175: nationalityText,
        Lea_ex3_70: formData.civilId,
        XMLField_9677: formData.governorate,
        XMLField_9678: formData.branch,
        Lea_ex9_24: sectorText,
        Lea_ex1_71: formData.employer,
        Lea_ex1_95: String(formData.salary),
        // Loan Purpose (XMLField_9679 is active on Layout, 9779 sent for backward compatibility)
        XMLField_9679: purposeText,
        XMLField_9779: purposeText,
        // Property Location (XMLField_9680 is active on Layout, 9780 sent for backward compatibility)
        XMLField_9680: formData.propLocation,
        XMLField_9780: formData.propLocation,
        // Estimated Property Value (XMLField_9681 is active on Layout, 9781 sent for backward compatibility)
        XMLField_9681: propValNum,
        XMLField_9781: propValNum,
        // Desired Loan Amount (XMLField_9682 is active on Layout, 9782 sent for backward compatibility)
        XMLField_9682: loanAmtNum,
        XMLField_9782: loanAmtNum,
        Lea_ex4_114: String(formData.tenure)
      }
    }
  ];
}

// 2-Step CRM API Integration: OAuth2 token -> saveObject
async function sendCrmLead(crmPayload) {
  // Method 1: If hosted on a server, try local /api/create-lead proxy to avoid browser CORS issues
  if (window.location.protocol.startsWith('http')) {
    try {
      const proxyRes = await fetch('/api/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crmPayload)
      });
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        return { success: true, data };
      }
    } catch (proxyErr) {
      console.warn('Local proxy attempt failed, trying direct CRM API call:', proxyErr);
    }
  }

  // Method 2: Direct 2-step API call
  // Step 1: Hit OAuth2 Token API
  const tokenRes = await fetch('https://presales.businessbywire.com/restapigb8/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userName: 'james@crmnext.com',
      password: 'Chief@admin2025'
    })
  });

  if (!tokenRes.ok) {
    throw new Error(`Auth Token API responded with status ${tokenRes.status}`);
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  if (!accessToken) {
    throw new Error('Access token not found in auth response');
  }

  // Step 2: Hit saveObject API with Bearer token
  const saveRes = await fetch('https://presales.businessbywire.com/restapigb8/crmWebApi/saveObject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(crmPayload)
  });

  if (!saveRes.ok) {
    throw new Error(`saveObject API responded with status ${saveRes.status}`);
  }

  const saveData = await saveRes.json();
  return { success: true, data: saveData };
}

// Submit Handler
async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('btnSubmit');
  btn.disabled = true;
  btn.textContent = currentLang === 'en' ? 'Submitting to CRM...' : 'جاري إرسال الطلب إلى النظام...';

  const refCode = generateLeadReference();

  const formData = {
    reference: refCode,
    date: new Date().toISOString(),
    fullName: document.getElementById('fullName').value.trim(),
    civilId: document.getElementById('civilId').value.trim(),
    nationality: document.querySelector('input[name="nationality"]:checked')?.value || 'omani',
    mobile: document.getElementById('mobile').value.trim(),
    email: document.getElementById('email').value.trim(),
    governorate: document.getElementById('governorate').value,
    branch: document.getElementById('branch').value,
    sector: document.getElementById('sector').value,
    employer: document.getElementById('employer').value.trim(),
    salary: document.getElementById('salary').value,
    loanType: 'conventional',
    loanPurpose: document.getElementById('loanPurpose').value,
    propLocation: document.getElementById('propLocation').value.trim(),
    propValue: document.getElementById('propValue').value,
    loanAmount: document.getElementById('loanAmount').value,
    tenure: document.getElementById('tenure').value,
    contactTime: document.getElementById('contactTime').value
  };

  const crmPayload = buildCrmPayload(formData);
  let crmObjectKey = null;

  try {
    const res = await sendCrmLead(crmPayload);
    const crmResult = res.data;
    if (Array.isArray(crmResult) && crmResult[0]?.ObjectKey) {
      crmObjectKey = crmResult[0].ObjectKey;
    }
    formData.crmObjectKey = crmObjectKey;
    formData.crmStatus = 'SUCCESS';
    console.log('CRM Lead Created Successfully:', crmResult);
  } catch (err) {
    console.error('CRM Submission error:', err);
    formData.crmStatus = 'LOCAL_ONLY';
    formData.crmError = err.message;
  }

  // Store lead silently in localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('ahli_leads') || '[]');
    stored.unshift(formData);
    localStorage.setItem('ahli_leads', JSON.stringify(stored));
  } catch (err) {
    console.error(err);
  }

  // Show Confirmation Modal with prominent Lead ID
  const leadIdRow = document.getElementById('leadIdRow');
  const crmLeadIdVal = document.getElementById('crmLeadIdVal');
  const leadRefCode = document.getElementById('leadRefCode');

  if (crmObjectKey) {
    crmLeadIdVal.textContent = '#' + crmObjectKey;
    leadIdRow.style.display = 'flex';
  } else {
    leadIdRow.style.display = 'none';
  }
  leadRefCode.textContent = refCode;
  document.getElementById('successModal').classList.add('show');

  // Reset button
  btn.disabled = false;
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${I18N[currentLang].btnSubmit}</span>`;
}

// Modal Close
function closeModal() {
  document.getElementById('successModal').classList.remove('show');
  document.getElementById('leadForm').reset();
  // Reset active classes on radio pills
  document.querySelectorAll('.radio-pill').forEach(pill => {
    const radio = pill.querySelector('input[type="radio"]');
    if (radio && radio.checked) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Radio Pill Selection Styling
function setupRadioPills() {
  document.querySelectorAll('.radio-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const name = radio.name;
        document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
          r.closest('.radio-pill')?.classList.remove('active');
        });
        pill.classList.add('active');
      }
    });
  });
}

// Language Switcher
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  const isAr = currentLang === 'ar';

  document.documentElement.lang = isAr ? 'ar' : 'en';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', isAr ? 'rtl' : 'ltr');

  document.getElementById('langText').textContent = isAr ? 'English' : 'العربية';

  const dict = I18N[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  setupRadioPills();
  document.getElementById('leadForm')?.addEventListener('submit', handleSubmit);
  document.getElementById('btnModalClose')?.addEventListener('click', closeModal);
  document.getElementById('btnLangToggle')?.addEventListener('click', toggleLanguage);
});
