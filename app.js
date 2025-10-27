// A tiny HTTP server with three endpoints: /, /time, /headers
const http = require('http');
const url = require('url');

const port = process.env.PORT || 8080;
const service = process.env.SERVICE_NAME || 'hello-sre';
const region = process.env.GOOGLE_CLOUD_REGION || 'unknown';

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  if (path === '/time') {
    // Returns current UTC time as ISO string
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({ service, region, nowUtc: new Date().toISOString() }) + '\n');
  }

  if (path === '/headers') {
    // Echoes incoming request headers (prove it’s a real server)
    res.writeHead(200, {'Content-Type':'application/json'});
    return res.end(JSON.stringify({ service, region, headers: req.headers }, null, 2) + '\n');
  }

  // Default: health/info
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end(`OK from ${service} in ${region}\n`);
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
