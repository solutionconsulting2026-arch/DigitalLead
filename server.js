const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function httpsPost(url, headers, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        ...headers
      }
    }, res => {
      let body = '';
      res.on('data', c => { body += c; });
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function handleCreateLead(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);

      // Step 1: Request OAuth2 token
      const tokenRes = await httpsPost(
        'https://presales.businessbywire.com/restapigb8/oauth2/token',
        {},
        JSON.stringify({
          userName: 'james@crmnext.com',
          password: 'Chief@admin2025'
        })
      );

      const tokenData = JSON.parse(tokenRes.body);
      const accessToken = tokenData.access_token;
      if (!accessToken) {
        throw new Error('Failed to obtain CRM access token: ' + tokenRes.body);
      }

      // Step 2: Call saveObject with Bearer token
      const saveRes = await httpsPost(
        'https://presales.businessbywire.com/restapigb8/crmWebApi/saveObject',
        {
          'Authorization': `Bearer ${accessToken}`
        },
        JSON.stringify(payload)
      );

      // Parse CRM response to extract actual Lead ID created in system
      let crmData = null;
      try {
        crmData = JSON.parse(saveRes.body);
      } catch (pErr) {
        console.warn('Could not parse saveRes.body as JSON:', saveRes.body);
      }

      let leadId = null;
      if (Array.isArray(crmData) && crmData[0]) {
        leadId = crmData[0].ObjectKey || crmData[0].Result?.LeadID?.[0] || crmData[0].CustomObjectId || null;
      } else if (crmData && typeof crmData === 'object') {
        leadId = crmData.ObjectKey || crmData.Result?.LeadID?.[0] || crmData.CustomObjectId || null;
      }

      console.log(`[CRM] Lead successfully created in system. Lead ID: ${leadId}`);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({
        success: true,
        leadId: leadId ? String(leadId) : null,
        data: crmData || saveRes.body
      }));
    } catch (err) {
      console.error('CRM Proxy Error:', err);
      res.writeHead(500, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
}

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  let reqPath = req.url.split('?')[0];

  // API Route for CRM Lead Creation
  if (reqPath === '/api/create-lead' && req.method === 'POST') {
    handleCreateLead(req, res);
    return;
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Ahli Bank Oman - Home Loan Lead Capture Portal`);
  console.log(` Running locally at: http://localhost:${PORT}`);
  console.log(` CRM API Route: http://localhost:${PORT}/api/create-lead`);
  console.log(` Press Ctrl+C to stop`);
  console.log(`====================================================`);
});
