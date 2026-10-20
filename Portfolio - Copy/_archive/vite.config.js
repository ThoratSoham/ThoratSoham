import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    open: false,
    host: true
  },
  plugins: [
    {
      name: 'save-export-file',
      configureServer(server) {
        server.middlewares.use('/api/save-file', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const { filePath, base64Data } = JSON.parse(body);
                const fullPath = path.resolve(process.cwd(), filePath);
                fs.mkdirSync(path.dirname(fullPath), { recursive: true });
                const buffer = Buffer.from(base64Data, 'base64');
                fs.writeFileSync(fullPath, buffer);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, size: buffer.length }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            res.writeHead(405).end();
          }
        });
      }
    }
  ],
  build: {
    target: 'esnext'
  }
});

