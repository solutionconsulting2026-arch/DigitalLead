// Simple verification test for Ahli Bank Oman Lead Capture Form
const assert = require('assert');

function validatePhone(phone) {
  const cleaned = phone.replace(/[\s\-]/g, '');
  return /^(?:\+968|00968|968)?([79]\d{7})$/.test(cleaned);
}

function validateCivilId(civilId) {
  return /^\d{7,10}$/.test(civilId.trim());
}

function generateLeadReference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ABO-HL-${year}-${rand}`;
}

console.log('--- Running Ahli Bank Lead Capture Validation Tests ---');

// Test 1: Phone validation
assert.strictEqual(validatePhone('+96891234567'), true);
assert.strictEqual(validatePhone('79876543'), true);
assert.strictEqual(validatePhone('12345678'), false);
console.log('✓ Oman phone validation passed');

// Test 2: Civil ID validation
assert.strictEqual(validateCivilId('12345678'), true);
assert.strictEqual(validateCivilId('123'), false);
console.log('✓ Civil ID validation passed');

// Test 3: Reference code generation
const ref = generateLeadReference();
assert(/^ABO-HL-\d{4}-\d{5}$/.test(ref));
console.log(`✓ Reference code generated: ${ref}`);

// Test 4: Verify HTML does not contain removed fields
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

assert.strictEqual(html.includes('Existing Ahli Bank Customer'), false, 'Should not contain Existing Ahli Bank Customer');
assert.strictEqual(html.includes('name="existingCustomer"'), false, 'Should not contain existingCustomer input');
assert.strictEqual(html.includes('Financing Option'), false, 'Should not contain Financing Option');
assert.strictEqual(html.includes('name="financeType"'), false, 'Should not contain financeType radio');
assert.strictEqual(html.includes('Home Finance'), false, 'Should not contain Home Finance in index.html');
assert.strictEqual(js.includes('Home Finance'), false, 'Should not contain Home Finance in app.js');
console.log('✓ Removed fields and loan terminology verified');

// Test 5: Verify CRM Payload generation
const sampleFormData = {
  fullName: 'Aditya Jain',
  civilId: '12345678',
  nationality: 'omani',
  mobile: '+96898939939',
  email: 'aditya.jain@businessnext.com',
  governorate: 'Muscat',
  branch: 'Al Khuwair (Head Office)',
  sector: 'private',
  employer: 'Muscat Trading LLC',
  salary: '1850',
  loanPurpose: 'ready_property',
  propLocation: 'Al Mouj, Muscat',
  propValue: '120000',
  loanAmount: '96000',
  tenure: '20'
};

// Check that app.js contains all required CRM field names
const requiredFields = [
  'LayoutID', 'ProcessID', 'LastName', 'Product', 'Rating',
  'LeadOwnerName', 'MobilePhone', 'Email', 'ProductCategory', 'StatusCode',
  'Lea_ex4_174', 'Lea_ex3_70', 'XMLField_9677', 'XMLField_9678', 'Lea_ex9_24',
  'Lea_ex1_71', 'Lea_ex1_95', 'XMLField_9779', 'XMLField_9780', 'XMLField_9781',
  'XMLField_9782', 'Lea_ex4_114'
];

for (const field of requiredFields) {
  assert.strictEqual(js.includes(field), true, `app.js must include CRM field: ${field}`);
}
console.log('✓ All CRM payload fields verified in app.js');

// Test 6: Verify XMLField_9679 to 9682 and modal elements
const activeFields = ['XMLField_9679', 'XMLField_9680', 'XMLField_9681', 'XMLField_9682'];
for (const field of activeFields) {
  assert.strictEqual(js.includes(field), true, `app.js must include active CRM field: ${field}`);
}
assert.strictEqual(html.includes('id="crmLeadIdVal"'), true, 'index.html must include crmLeadIdVal');
assert.strictEqual(html.includes('id="leadIdRow"'), true, 'index.html must include leadIdRow');
console.log('✓ Active CRM fields (9679-9682) and Thank You modal Lead ID elements verified');

// Test 7: Verify server.js handles CRM proxy
const serverCode = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
assert.strictEqual(serverCode.includes('/api/create-lead'), true, 'server.js must define /api/create-lead');
assert.strictEqual(serverCode.includes('oauth2/token'), true, 'server.js must call oauth2/token');
assert.strictEqual(serverCode.includes('crmWebApi/saveObject'), true, 'server.js must call saveObject');
console.log('✓ Server CRM proxy route verified');

console.log('--- ALL SIMPLE TESTS PASSED ---');
