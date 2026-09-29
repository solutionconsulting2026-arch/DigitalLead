/**
 * XYZ Bank Oman - Simple Single-Page Home Loan Lead Capture
 * Straightforward validation, simple submission, and bilingual support.
 */

const I18N = {
  en: {
    pillText: "Home Loan Inquiry",
    mainTitle: "XYZ Bank Home Loan Lead Capture",
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
    lblBranch: "Preferred XYZ Bank Branch",
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
    consentText: "I authorize XYZ Bank Oman to contact me regarding my home loan inquiry and review my basic eligibility.",
    btnSubmit: "Submit Home Loan Inquiry",
    modalTitle: "Lead Created in System!",
    modalDesc: "Your home loan application has been successfully created in XYZ Bank's CRM system. A representative from your preferred branch will contact you shortly.",
    modalLeadId: "CRM Lead ID",
    modalStatus: "System Status:",
    modalBtn: "Done"
  },
  ar: {
    pillText: "طلب قرض سكني",
    mainTitle: "تسجيل اهتمام بقرض سكني - بنك XYZ",
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
    lblBranch: "فرع بنك XYZ المفضل",
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
    consentText: "أفوض بنك XYZ عُمان بالتواصل معي بخصوص طلبي والتحقق من أهليتي الائتمانية المبدئية.",
    modalTitle: "تم تسجيل الطلب في النظام بنجاح!",
    modalDesc: "تم إنشاء طلب القرض السكني الخاص بك بنجاح في نظام إدارة علاقات العملاء ببنك XYZ. سيتواصل معك ممثل الفرع المفضل في أقرب وقت.",
    modalLeadId: "رقم الطلب في النظام (Lead ID)",
    modalStatus: "حالة النظام:",
    modalBtn: "تم"
  }
};

let currentLang = 'en';

function generateLeadReference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `XYZ-HL-${year}-${rand}`;
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
        LeadOwnerName: "Mr. Yousuf Al Lawati",
        AssignTo: "Mr. Yousuf Al Lawati",
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

// CRM API Integration: Supports GitHub Pages, GCP/Kubernetes, and local proxy
async function sendCrmLead(crmPayload) {
  const candidateEndpoints = [];

  // 1. Custom backend URL override (if specified via script or localStorage)
  const customBackend = window.CRM_BACKEND_URL || localStorage.getItem('crm_backend_url');
  if (customBackend) {
    const clean = customBackend.replace(/\/+$/, '');
    candidateEndpoints.push(clean.endsWith('/api/create-lead') ? clean : `${clean}/api/create-lead`);
  }

  // 2. Production Live CRM API Proxy (CORS-enabled backend on GKE)
  candidateEndpoints.push('https://presales1.businessbywire.com/digitaleadabo/api/create-lead');

  // 3. Current origin relative endpoints (when running inside GKE ingress or custom domain)
  const currentPath = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '');
  if (currentPath && !window.location.hostname.endsWith('github.io')) {
    candidateEndpoints.push(`${currentPath}/api/create-lead`);
  }
  if (!window.location.hostname.endsWith('github.io')) {
    candidateEndpoints.push('api/create-lead');
    candidateEndpoints.push('./api/create-lead');
    candidateEndpoints.push('/api/create-lead');
  }

  // 4. Local dev proxies
  candidateEndpoints.push('http://localhost:3000/api/create-lead');
  candidateEndpoints.push('http://127.0.0.1:3000/api/create-lead');

  let lastError = null;

  for (const endpoint of candidateEndpoints) {
    try {
      console.log(`[CRM Lead API] Submitting lead in real-time to: ${endpoint}`);
      const proxyRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crmPayload)
      });

      if (proxyRes.ok) {
        const resData = await proxyRes.json();
        let leadId = resData.leadId;
        if (!leadId && resData.data) {
          const item = Array.isArray(resData.data) ? resData.data[0] : resData.data;
          leadId = item?.ObjectKey || item?.Result?.LeadID?.[0] || item?.CustomObjectId;
        }
        if (!leadId && Array.isArray(resData)) {
          leadId = resData[0]?.ObjectKey || resData[0]?.Result?.LeadID?.[0] || resData[0]?.CustomObjectId;
        }
        if (leadId) {
          console.log(`[CRM Lead API] Success! Real-time Lead #${leadId} created via ${endpoint}`);
          return { success: true, leadId: String(leadId), data: resData, endpoint };
        }
        if (resData.error || resData.success === false) {
          lastError = new Error(resData.error || 'CRM returned failure without Lead ID');
        }
      } else {
        const errBody = await proxyRes.text().catch(() => '');
        lastError = new Error(`HTTP ${proxyRes.status} from ${endpoint}: ${errBody}`);
      }
    } catch (proxyErr) {
      console.warn(`[CRM Lead API] Endpoint ${endpoint} unreachable:`, proxyErr);
      lastError = proxyErr;
    }
  }

  throw lastError || new Error('Could not connect to CRM API endpoint.');
}

// Submit Handler
async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('btnSubmit');
  btn.disabled = true;
  btn.textContent = currentLang === 'en' ? 'Registering Lead in CRM...' : 'جاري تسجيل الطلب في النظام...';

  const formData = {
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
  let crmLeadId = null;

  try {
    const res = await sendCrmLead(crmPayload);
    if (!res || !res.leadId) {
      throw new Error(res?.error || 'No lead ID returned from CRM system');
    }
    crmLeadId = res.leadId;
    formData.crmLeadId = crmLeadId;
    formData.crmStatus = 'SUCCESS';
    console.log('Real Lead Registered Successfully in CRM. Lead ID:', crmLeadId);
  } catch (err) {
    console.error('CRM Submission error:', err);
    alert(currentLang === 'en'
      ? 'CRM System Error: Unable to create lead in real-time.\n\nError: ' + (err.message || 'Connection failed') + '\n\nPlease check your internet connection and try again.'
      : 'خطأ في نظام إدارة علاقات العملاء: تعذر إنشاء الطلب في الوقت الفعلي.\n\nالخطأ: ' + (err.message || 'فشل الاتصال') + '\n\nيرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${I18N[currentLang].btnSubmit}</span>`;
    return;
  }

  // Store lead in localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('xyz_leads') || localStorage.getItem('ahli_leads') || '[]');
    stored.unshift(formData);
    localStorage.setItem('xyz_leads', JSON.stringify(stored));
  } catch (err) {
    console.error(err);
  }

  // Show Confirmation Modal with prominent REAL CRM Lead ID
  const crmLeadIdVal = document.getElementById('crmLeadIdVal');
  if (crmLeadIdVal) {
    crmLeadIdVal.textContent = '#' + crmLeadId;
  }
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
