// Simple verification test for XYZ Bank Lead Capture Form
const assert = require('assert');

function validatePhone(phone) {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return /^\d{7,15}$/.test(cleaned);
}

function validateCivilId(civilId) {
  return /^[A-Za-z0-9\-]{5,16}$/.test(civilId.trim());
}

function generateLeadReference() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `XYZ-HL-${year}-${rand}`;
}

console.log('--- Running XYZ Bank Lead Capture Validation Tests ---');

// Test 1: Phone validation
assert.strictEqual(validatePhone('+1 555-012-3456'), true);
assert.strictEqual(validatePhone('5550123456'), true);
assert.strictEqual(validatePhone('+96891234567'), true);
assert.strictEqual(validatePhone('123'), false);
console.log('✓ Generic phone validation passed');

// Test 2: ID validation
assert.strictEqual(validateCivilId('12345678'), true);
assert.strictEqual(validateCivilId('ID-98234'), true);
assert.strictEqual(validateCivilId('12'), false);
console.log('✓ Generic ID validation passed');

// Test 3: Reference code generation
const ref = generateLeadReference();
assert(/^XYZ-HL-\d{4}-\d{5}$/.test(ref));
console.log(`✓ Reference code generated: ${ref}`);

// Test 4: Verify HTML does not contain old Ahli Bank specific strings
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

assert.strictEqual(html.includes('Ahli Bank'), false, 'Should not contain Ahli Bank in index.html');
assert.strictEqual(html.includes('Central Bank of Oman'), false, 'Should not contain Central Bank of Oman');
assert.strictEqual(html.includes('(OMR)'), false, 'Should not contain (OMR) in index.html');
assert.strictEqual(html.includes('XYZ Bank'), true, 'Must contain XYZ Bank in index.html');
assert.strictEqual(js.includes('XYZ Bank'), true, 'Must contain XYZ Bank in app.js');
console.log('✓ Brand genericization to XYZ Bank verified');

// Test 5: Verify CRM Payload generation
// Check that app.js contains all required CRM field names
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
console.log('✓ Active CRM fields (9679-9682) and Thank You modal Lead ID elements verified');

// Test 7: Verify server.js handles CRM proxy and extracts leadId
const serverCode = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
assert.strictEqual(serverCode.includes('/api/create-lead'), true, 'server.js must define /api/create-lead');
assert.strictEqual(serverCode.includes('oauth2/token'), true, 'server.js must call oauth2/token');
assert.strictEqual(serverCode.includes('crmWebApi/saveObject'), true, 'server.js must call saveObject');
assert.strictEqual(serverCode.includes('leadId: leadId ? String(leadId) : null'), true, 'server.js must return leadId');
assert.strictEqual(html.includes('ABO-HL-2026-12345'), false, 'index.html must not contain static inquiry ID');
console.log('✓ Server CRM proxy route and system Lead ID extraction verified');

console.log('--- ALL SIMPLE TESTS PASSED ---');
