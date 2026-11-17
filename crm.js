const https = require('https');

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

module.exports = { handleCreateLead };
