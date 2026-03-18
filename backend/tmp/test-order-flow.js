const { spawn } = require('node:child_process');
const path = require('node:path');

const backendPath = path.resolve(__dirname, '..');
const serverPort = 5007;

const serverProcess = spawn('C:\\Windows\\System32\\cmd.exe', ['/c', 'node server.js'], {
  cwd: backendPath,
  env: {
    ...process.env,
    PORT: String(serverPort),
    NODE_ENV: 'development',
  },
});

serverProcess.stdout.on('data', (chunk) => {
  process.stdout.write(`[server stdout] ${chunk}`);
});
serverProcess.stderr.on('data', (chunk) => {
  process.stderr.write(`[server stderr] ${chunk}`);
});

serverProcess.on('close', (code) => {
  console.log(`server exited with ${code}`);
});

const makeOrderRequest = async () => {
  await new Promise((r) => setTimeout(r, 3000)); // wait for server to boot
  try {
    const res = await fetch(`http://localhost:${serverPort}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Test User', phone: '08012345678', email: 'test@example.com' },
        items: [{ productId: '69b81479e039f645c84809e7', quantity: 1 }],
        fulfillmentType: 'pickup',
        customerNote: 'test order',
      }),
    });
    const body = await res.text();
    console.log('order response', res.status, body);
  } catch (err) {
    console.error('request error', err);
  } finally {
    serverProcess.kill();
  }
};

makeOrderRequest();
