import fs from 'fs';

async function main() {
  const vRes = await fetch('http://127.0.0.1:9222/json/version');
  const vJson = await vRes.json();
  const browserWs = new WebSocket(vJson.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  function sendBrowser(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      browserWs.send(JSON.stringify({ id, method, params }));
    });
  }

  browserWs.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise((r) => (browserWs.onopen = r));

  const target = await sendBrowser('Target.createTarget', {
    url: 'https://campus-ai-project-assistant.vercel.app'
  });

  const pageWs = new WebSocket(`ws://127.0.0.1:9222/devtools/page/${target.targetId}`);
  let pageId = 1;
  const pagePending = new Map();

  function sendPage(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = pageId++;
      pagePending.set(id, { resolve, reject });
      pageWs.send(JSON.stringify({ id, method, params }));
    });
  }

  pageWs.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pagePending.has(data.id)) {
      const { resolve, reject } = pagePending.get(data.id);
      pagePending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };

  await new Promise((r) => (pageWs.onopen = r));

  await sendPage('Page.enable');
  await sendPage('Runtime.enable');
  await sendPage('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('1. Loading landing / login page...');
  await new Promise((r) => setTimeout(r, 4000));

  // Figure 8.1: Home / Login / Welcome Page
  console.log('Capturing Figure 8.1...');
  const snap1 = await sendPage('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/fig8_1.png', Buffer.from(snap1.data, 'base64'));
  console.log('Saved /tmp/fig8_1.png');

  // Inject student login into localStorage
  console.log('Setting localStorage auth state...');
  await sendPage('Runtime.evaluate', {
    expression: `
      localStorage.setItem('campus_ai_user', JSON.stringify({
        id: 'google-student-01',
        name: 'Geetesh Kumar',
        email: 'geetesh525@gmail.com',
        role: 'student',
        institution: 'Dayananda Sagar University',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Geetesh',
        authProvider: 'google'
      }));
    `
  });

  // Re-navigate to load dashboard as authenticated student
  console.log('Navigating to dashboard...');
  await sendPage('Page.navigate', { url: 'https://campus-ai-project-assistant.vercel.app' });
  await new Promise((r) => setTimeout(r, 4500));

  // Click on Campus Chat in Sidebar
  console.log('Opening Campus Chat...');
  await sendPage('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
      const chatBtn = buttons.find(b => b.textContent && (b.textContent.includes('Campus Chat') || b.textContent.includes('Smart Campus Chatbot')));
      if (chatBtn) chatBtn.click();
    `
  });
  await new Promise((r) => setTimeout(r, 2500));

  // Check what's in the DOM
  console.log('Checking DOM in chat...');
  const domCheck = await sendPage('Runtime.evaluate', {
    expression: `document.body.innerText.slice(0, 300)`
  });
  console.log('Page text snippet:', domCheck.result.value);

  // Send an academic message
  await sendPage('Runtime.evaluate', {
    expression: `
      const textarea = document.querySelector('textarea, input[type="text"]');
      if (textarea) {
        textarea.value = "Explain what a linked list is in simple words with examples.";
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const buttons = Array.from(document.querySelectorAll('button'));
      const sendBtn = buttons.find(b => b.type === 'submit' || b.getAttribute('aria-label') === 'Send' || b.querySelector('svg'));
      if (sendBtn) sendBtn.click();
    `
  });

  console.log('Waiting for AI response in chat (5s)...');
  await new Promise((r) => setTimeout(r, 5000));

  console.log('Capturing Figure 8.2...');
  const snap2 = await sendPage('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/fig8_2.png', Buffer.from(snap2.data, 'base64'));
  console.log('Saved /tmp/fig8_2.png');

  // Switch to Project Studio
  console.log('Opening Project Studio...');
  await sendPage('Runtime.evaluate', {
    expression: `
      const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
      const projBtn = buttons.find(b => b.textContent && (b.textContent.includes('Project Studio') || b.textContent.includes('Project Assistant')));
      if (projBtn) projBtn.click();
    `
  });

  await new Promise((r) => setTimeout(r, 3000));

  console.log('Capturing Figure 8.3...');
  const snap3 = await sendPage('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/fig8_3.png', Buffer.from(snap3.data, 'base64'));
  console.log('Saved /tmp/fig8_3.png');

  pageWs.close();
  browserWs.close();
  console.log('Complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
