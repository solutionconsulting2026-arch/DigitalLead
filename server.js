const http = require('http');
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

const { handleCreateLead } = require('./crm');

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

  // API Route for CRM Lead Creation (supports root /api/create-lead or subpath /digitaleadabo/api/create-lead)
  if ((reqPath === '/api/create-lead' || reqPath.endsWith('/api/create-lead')) && req.method === 'POST') {
    handleCreateLead(req, res);
    return;
  }

  // Strip subpath prefix if ingress forwards it
  reqPath = reqPath.replace(/^\/digitaleadabo/, '');

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
  console.log(` XYZ Bank - Home Loan Lead Capture Portal`);
  console.log(` Running locally at: http://localhost:${PORT}`);
  console.log(` CRM API Route: http://localhost:${PORT}/api/create-lead`);
  console.log(` Press Ctrl+C to stop`);
  console.log(`====================================================`);
});
