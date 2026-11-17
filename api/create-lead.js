// Vercel serverless function: POST /api/create-lead
// Shares the CRM proxy logic with server.js (used for Docker / local runs).
const { handleCreateLead } = require('../crm');

module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json', 'Allow': 'POST, OPTIONS' });
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }));
    return;
  }
  handleCreateLead(req, res);
};
