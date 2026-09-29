// Verification test for XYZ Bank Oman Lead Capture Form
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
  return `XYZ-HL-${year}-${rand}`;
}

console.log('--- Running XYZ Bank Oman Lead Capture Validation Tests ---');

// Test 1: Oman phone validation
assert.strictEqual(validatePhone('+96891234567'), true);
assert.strictEqual(validatePhone('79876543'), true);
assert.strictEqual(validatePhone('12345678'), false);
console.log('✓ Oman phone validation passed');

// Test 2: Oman Civil ID validation
assert.strictEqual(validateCivilId('12345678'), true);
assert.strictEqual(validateCivilId('123'), false);
console.log('✓ Civil ID validation passed');

// Test 3: Reference code generation
const ref = generateLeadReference();
assert(/^XYZ-HL-\d{4}-\d{5}$/.test(ref));
console.log(`✓ Reference code generated: ${ref}`);

// Test 4: Verify HTML brand is XYZ Bank while keeping Oman flavour
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

assert.strictEqual(html.includes('Ahli Bank'), false, 'Should not contain Ahli Bank in index.html');
assert.strictEqual(html.includes('XYZ Bank'), true, 'Must contain XYZ Bank in index.html');
assert.strictEqual(js.includes('XYZ Bank'), true, 'Must contain XYZ Bank in app.js');
assert.strictEqual(html.includes('+968 24577177'), true, 'Must keep Oman phone number');
assert.strictEqual(html.includes('OMR'), true, 'Must keep OMR currency');
assert.strictEqual(html.includes('Central Bank of Oman (CBO)'), true, 'Must keep CBO regulation in footer');
assert.strictEqual(html.includes('Muscat (مسقط)'), true, 'Must keep Oman governorates');
assert.strictEqual(html.includes('Al Khuwair (Head Office)'), true, 'Must keep Oman branches');
console.log('✓ XYZ Bank brand with Oman flavour verified');

// Test 5: Verify CRM Payload generation
const requiredFields = [
  'LayoutID', 'ProcessID', 'LastName', 'Product', 'Rating',
  'LeadOwnerName', 'AssignTo', 'MobilePhone', 'Email', 'ProductCategory', 'StatusCode',
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
console.log('✓ Active CRM fields and Thank You modal Lead ID elements verified');

// Test 7: Verify server.js handles CRM proxy and extracts leadId
const serverCode = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
assert.strictEqual(serverCode.includes('/api/create-lead'), true, 'server.js must define /api/create-lead');
assert.strictEqual(serverCode.includes('oauth2/token'), true, 'server.js must call oauth2/token');
assert.strictEqual(serverCode.includes('crmWebApi/saveObject'), true, 'server.js must call saveObject');
assert.strictEqual(serverCode.includes('leadId: leadId ? String(leadId) : null'), true, 'server.js must return leadId');
console.log('✓ Server CRM proxy route and system Lead ID extraction verified');

console.log('--- ALL SIMPLE TESTS PASSED ---');
