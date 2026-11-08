const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const allowed = ['index.html', 'css', 'js', 'assets'];
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm',
};
const port = Number(process.env.PORT) || 8080;

// Lists files under assets/ so the page can pick up your own images and videos automatically.
function listAssets(dir = path.join(root, 'assets'), base = '') {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out = out.concat(listAssets(path.join(dir, e.name), rel));
    else out.push(rel);
  }
  return out;
}

http.createServer((req, res) => {
  if (new URL(req.url, 'http://localhost').pathname === '/api/assets') {
    let list = [];
    try { list = listAssets(); } catch (e) { /* no assets folder */ }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(list));
  }
  let rel =decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
  const file = path.normalize(path.join(root, rel));
  const top = path.relative(root, file).split(path.sep)[0];
  if (!file.startsWith(root + path.sep) || !allowed.includes(top)) { res.writeHead(404); return res.end('Not found'); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const headers = { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' };
    // Byte ranges let the browser seek inside videos (jump to a moment, scrub, loop large files).
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    let start = 0, end = st.size - 1, status = 200;
    if (m) {
      start = m[1] === '' ? Math.max(0, st.size - Number(m[2])) : Number(m[1]);
      end = m[1] !== '' && m[2] !== '' ? Math.min(Number(m[2]), st.size - 1) : st.size - 1;
      if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${st.size}`;
    }
    headers['Content-Length'] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD') return res.end();
    const stream = fs.createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy()); // the browser often cancels video requests mid-way
    stream.pipe(res);
  });
}).on('error', (err) => { console.error(`Preview failed on port ${port}: ${err.message}`); process.exitCode = 1; })
  .listen(port, '0.0.0.0', () => console.log(`Preview: http://localhost:${port}`));

// keep the preview alive if a single request goes wrong
process.on('uncaughtException', (e) => console.error('Request error (server still running):', e.message));
