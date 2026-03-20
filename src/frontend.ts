/**
 * @source cursor @line_count 1750
 */

export function getHtml(): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CyberCupid - AI 约会教练</title>
<style>
${CSS}
</style>
</head>
<body>
<div id="app"></div>
<script>
${JS}
</script>
</body>
</html>`;
}

const CSS = `
:root {
  --bg-primary: #0f0f13;
  --bg-secondary: #1a1a24;
  --bg-card: #22222e;
  --bg-hover: #2a2a3a;
  --bg-input: #1e1e2a;
  --accent: #e94d7b;
  --accent-hover: #f0608a;
  --accent-light: rgba(233, 77, 123, 0.15);
  --text-primary: #e8e8f0;
  --text-secondary: #9898a8;
  --text-muted: #6a6a7a;
  --border: #2d2d3d;
  --success: #4ade80;
  --warning: #fbbf24;
  --danger: #ef4444;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow: 0 4px 24px rgba(0,0,0,0.3);
  --transition: 0.2s ease;
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  line-height: 1.6;
}

#app { min-height: 100vh; display: flex; flex-direction: column; }

.hidden { display: none !important; }

/* Auth pages */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #0f0f13 0%, #1a0a1a 50%, #0f0f13 100%);
}

.auth-box {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.auth-logo {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo h1 {
  font-size: 32px;
  background: linear-gradient(135deg, var(--accent), #ff8fa3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.auth-logo p {
  color: var(--text-secondary);
  font-size: 14px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-weight: 500;
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 15px;
  outline: none;
  transition: border-color var(--transition);
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  border-color: var(--accent);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), #d63d6b);
  color: white;
  width: 100%;
}

.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover { background: var(--bg-hover); }

.btn-ghost {
  background: transparent;
  color: var(--accent);
  padding: 8px 16px;
}

.btn-ghost:hover { background: var(--accent-light); }

.auth-switch {
  text-align: center;
  margin-top: 24px;
  color: var(--text-secondary);
  font-size: 14px;
}

.auth-switch a {
  color: var(--accent);
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
}

.error-msg {
  color: var(--danger);
  font-size: 13px;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(239,68,68,0.1);
  border-radius: var(--radius-sm);
}

/* Main layout */
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 280px;
  min-width: 280px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-header h2 {
  font-size: 18px;
  background: linear-gradient(135deg, var(--accent), #ff8fa3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.new-chat-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.new-chat-btn:hover { transform: scale(1.1); }

.sidebar-modules {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.module-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition);
  text-align: left;
}

.module-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
.module-btn.active { background: var(--accent-light); color: var(--accent); }
.module-btn span.icon { font-size: 18px; }

.conversation-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.conversation-list::-webkit-scrollbar { width: 4px; }
.conversation-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.conv-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);
  margin-bottom: 2px;
}

.conv-item:hover { background: var(--bg-hover); }
.conv-item.active { background: var(--accent-light); }

.conv-item .conv-title {
  flex: 1;
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conv-item.active .conv-title { color: var(--accent); }

.conv-item .conv-delete {
  opacity: 0;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 16px;
  padding: 2px 6px;
  border-radius: 4px;
}

.conv-item:hover .conv-delete { opacity: 1; }
.conv-item .conv-delete:hover { color: var(--danger); }

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 8px;
}

.sidebar-footer button {
  flex: 1;
  padding: 10px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.sidebar-footer button:hover { background: var(--bg-hover); color: var(--text-primary); }

/* Chat area */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
}

.chat-header h3 {
  font-size: 16px;
  font-weight: 600;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 24px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-messages::-webkit-scrollbar { width: 6px; }
.chat-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 6px; }

.message {
  display: flex;
  gap: 12px;
  max-width: 85%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

.message.user { align-self: flex-end; flex-direction: row-reverse; }

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message.assistant .message-avatar { background: var(--accent-light); }
.message.user .message-avatar { background: var(--bg-card); }

.message-content {
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.7;
  word-break: break-word;
}

.message.assistant .message-content {
  background: var(--bg-card);
  border-bottom-left-radius: 4px;
}

.message.user .message-content {
  background: linear-gradient(135deg, var(--accent), #d63d6b);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-content p { margin-bottom: 8px; }
.message-content p:last-child { margin-bottom: 0; }
.message-content strong { color: var(--accent); }
.message.user .message-content strong { color: white; }
.message-content code {
  background: rgba(255,255,255,0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}
.message-content pre {
  background: var(--bg-primary);
  padding: 12px;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: 8px 0;
}
.message-content ul, .message-content ol {
  padding-left: 20px;
  margin: 8px 0;
}
.message-content table {
  border-collapse: collapse;
  margin: 8px 0;
  width: 100%;
}
.message-content th, .message-content td {
  border: 1px solid var(--border);
  padding: 8px 12px;
  text-align: left;
  font-size: 13px;
}
.message-content th {
  background: var(--bg-primary);
}
.message-content h1, .message-content h2, .message-content h3 {
  margin: 12px 0 8px;
}
.message-content blockquote {
  border-left: 3px solid var(--accent);
  padding-left: 12px;
  color: var(--text-secondary);
  margin: 8px 0;
}

.welcome-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.welcome-screen h2 {
  font-size: 28px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, var(--accent), #ff8fa3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.welcome-screen p {
  color: var(--text-secondary);
  margin-bottom: 32px;
  max-width: 500px;
}

.welcome-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 700px;
}

.welcome-module-btn {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition);
  text-align: center;
}

.welcome-module-btn:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(233,77,123,0.15);
}

.welcome-module-btn .wm-icon { font-size: 28px; margin-bottom: 8px; }
.welcome-module-btn .wm-title { font-size: 14px; font-weight: 600; }
.welcome-module-btn .wm-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

/* Chat input */
.chat-input-area {
  padding: 16px 24px;
  border-top: 1px solid var(--border);
  background: var(--bg-secondary);
}

.chat-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  max-width: 900px;
  margin: 0 auto;
}

.chat-input-wrapper textarea {
  flex: 1;
  padding: 14px 18px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  max-height: 150px;
  min-height: 52px;
  line-height: 1.5;
  transition: border-color var(--transition);
}

.chat-input-wrapper textarea:focus { border-color: var(--accent); }

.send-btn {
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, var(--accent), #d63d6b);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
  flex-shrink: 0;
}

.send-btn:hover { transform: scale(1.05); }
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 14px 18px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: 0s; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingBounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* Settings & Dashboard modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: var(--bg-secondary);
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow-y: auto;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.modal::-webkit-scrollbar { width: 4px; }
.modal::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.modal-header {
  padding: 24px 28px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-header h3 { font-size: 20px; }

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
}

.modal-close:hover { background: var(--bg-hover); color: var(--text-primary); }

.modal-body { padding: 24px 28px 28px; }

.settings-section {
  margin-bottom: 28px;
}

.settings-section h4 {
  font-size: 14px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.provider-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.provider-card {
  padding: 14px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: center;
  transition: all var(--transition);
}

.provider-card:hover { border-color: var(--accent); }
.provider-card.selected { border-color: var(--accent); background: var(--accent-light); }
.provider-card .pc-icon { font-size: 24px; margin-bottom: 6px; }
.provider-card .pc-name { font-size: 13px; font-weight: 600; }

/* Dashboard */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stat-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px;
  border: 1px solid var(--border);
}

.stat-card .stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-card .stat-value {
  font-size: 28px;
  font-weight: 700;
  margin-top: 4px;
  background: linear-gradient(135deg, var(--accent), #ff8fa3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-card .stat-sub {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.exp-bar {
  height: 8px;
  background: var(--bg-primary);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
}

.exp-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #ff8fa3);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.radar-chart {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 20px;
  border: 1px solid var(--border);
  margin-bottom: 16px;
}

.radar-chart h4 { margin-bottom: 16px; font-size: 15px; }

.radar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.radar-label {
  width: 80px;
  font-size: 13px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.radar-bar {
  flex: 1;
  height: 10px;
  background: var(--bg-primary);
  border-radius: 5px;
  overflow: hidden;
}

.radar-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), #ff8fa3);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.radar-score {
  width: 30px;
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.badge-item {
  text-align: center;
  padding: 12px 8px;
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.badge-item.earned { border-color: var(--accent); }
.badge-item.locked { opacity: 0.4; }
.badge-icon { font-size: 24px; }
.badge-name { font-size: 11px; color: var(--text-secondary); margin-top: 4px; }

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 100;
    transform: translateX(-100%);
  }
  .sidebar.open { transform: translateX(0); }
  .mobile-menu-btn { display: block; }
  .message { max-width: 95%; }
  .welcome-modules { grid-template-columns: repeat(2, 1fr); }
  .dashboard-grid { grid-template-columns: 1fr; }
  .provider-cards { grid-template-columns: 1fr; }
  .badges-grid { grid-template-columns: repeat(3, 1fr); }
  .auth-box { padding: 32px 24px; }
}

@media (max-width: 480px) {
  .welcome-modules { grid-template-columns: 1fr; }
}
`;

const JS = `
'use strict';

const API_BASE = '';
let currentUser = null;
let currentToken = null;
let conversations = [];
let currentConvId = null;
let currentModule = 'chat';
let isLoading = false;

// ========== Router ==========
function navigate(page, data) {
  const app = document.getElementById('app');
  switch(page) {
    case 'login': app.innerHTML = renderLogin(); bindLogin(); break;
    case 'register': app.innerHTML = renderRegister(); bindRegister(); break;
    case 'main': app.innerHTML = renderMainLayout(); bindMainLayout(); loadConversations(); break;
  }
}

function init() {
  currentToken = localStorage.getItem('cc_token');
  const savedUser = localStorage.getItem('cc_user');
  if (currentToken && savedUser) {
    currentUser = JSON.parse(savedUser);
    navigate('main');
  } else {
    navigate('login');
  }
}

// ========== API ==========
async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (currentToken) headers['Authorization'] = 'Bearer ' + currentToken;
  const res = await fetch(API_BASE + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) { logout(); throw new Error('登录已过期'); }
    throw new Error(data.error || '请求失败');
  }
  return data;
}

function logout() {
  currentToken = null;
  currentUser = null;
  localStorage.removeItem('cc_token');
  localStorage.removeItem('cc_user');
  navigate('login');
}

// ========== Auth pages ==========
function renderLogin() {
  return \`<div class="auth-container">
    <div class="auth-box">
      <div class="auth-logo">
        <h1>CyberCupid</h1>
        <p>毒舌但温暖的 AI 约会教练</p>
      </div>
      <form id="loginForm">
        <div class="form-group">
          <label>用户名 / 邮箱</label>
          <input type="text" id="loginInput" placeholder="请输入用户名或邮箱" required>
        </div>
        <div class="form-group">
          <label>密码</label>
          <input type="password" id="loginPassword" placeholder="请输入密码" required>
        </div>
        <div id="loginError" class="error-msg hidden"></div>
        <button type="submit" class="btn btn-primary" id="loginBtn">登 录</button>
      </form>
      <div class="auth-switch">还没有账号？<a onclick="navigate('register')">立即注册</a></div>
    </div>
  </div>\`;
}

function bindLogin() {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('loginBtn');
    const errEl = document.getElementById('loginError');
    btn.disabled = true;
    btn.textContent = '登录中...';
    errEl.classList.add('hidden');
    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          login: document.getElementById('loginInput').value.trim(),
          password: document.getElementById('loginPassword').value
        })
      });
      currentToken = data.token;
      currentUser = data.user;
      localStorage.setItem('cc_token', data.token);
      localStorage.setItem('cc_user', JSON.stringify(data.user));
      navigate('main');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.textContent = '登 录';
    }
  });
}

function renderRegister() {
  return \`<div class="auth-container">
    <div class="auth-box">
      <div class="auth-logo">
        <h1>CyberCupid</h1>
        <p>创建账号，开始你的成长之旅</p>
      </div>
      <form id="registerForm">
        <div class="form-group">
          <label>用户名</label>
          <input type="text" id="regUsername" placeholder="3-30位字母、数字或下划线" required pattern="[a-zA-Z0-9_]{3,30}">
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" id="regEmail" placeholder="your@email.com" required>
        </div>
        <div class="form-group">
          <label>昵称（可选）</label>
          <input type="text" id="regNickname" placeholder="你想被怎么称呼？">
        </div>
        <div class="form-group">
          <label>密码</label>
          <input type="password" id="regPassword" placeholder="至少6位" required minlength="6">
        </div>
        <div id="regError" class="error-msg hidden"></div>
        <button type="submit" class="btn btn-primary" id="regBtn">注 册</button>
      </form>
      <div class="auth-switch">已有账号？<a onclick="navigate('login')">去登录</a></div>
    </div>
  </div>\`;
}

function bindRegister() {
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('regBtn');
    const errEl = document.getElementById('regError');
    btn.disabled = true;
    btn.textContent = '注册中...';
    errEl.classList.add('hidden');
    try {
      const data = await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: document.getElementById('regUsername').value.trim(),
          email: document.getElementById('regEmail').value.trim(),
          nickname: document.getElementById('regNickname').value.trim() || undefined,
          password: document.getElementById('regPassword').value
        })
      });
      currentToken = data.token;
      currentUser = data.user;
      localStorage.setItem('cc_token', data.token);
      localStorage.setItem('cc_user', JSON.stringify(data.user));
      navigate('main');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
      btn.disabled = false;
      btn.textContent = '注 册';
    }
  });
}

// ========== Main layout ==========
function renderMainLayout() {
  return \`<div class="main-layout">
    <div class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h2>CyberCupid</h2>
        <button class="new-chat-btn" onclick="startNewChat('chat')" title="新对话">+</button>
      </div>
      <div class="sidebar-modules">
        <button class="module-btn" onclick="startNewChat('interview')"><span class="icon">🔍</span>深度访谈</button>
        <button class="module-btn" onclick="startNewChat('mock-date')"><span class="icon">💕</span>模拟约会</button>
        <button class="module-btn" onclick="startNewChat('mission')"><span class="icon">📋</span>任务清单</button>
        <button class="module-btn" onclick="startNewChat('checkin')"><span class="icon">✅</span>打卡验收</button>
        <button class="module-btn" onclick="startNewChat('date-plan')"><span class="icon">📅</span>约会方案</button>
        <button class="module-btn" onclick="startNewChat('debrief')"><span class="icon">📝</span>战后复盘</button>
      </div>
      <div class="conversation-list" id="convList"></div>
      <div class="sidebar-footer">
        <button onclick="showDashboard()">📊 仪表盘</button>
        <button onclick="showSettings()">⚙️ 设置</button>
        <button onclick="logout()">🚪 退出</button>
      </div>
    </div>
    <div class="chat-area" id="chatArea">
      <div class="chat-header">
        <button class="mobile-menu-btn" onclick="toggleSidebar()">☰</button>
        <h3 id="chatTitle">CyberCupid</h3>
        <div></div>
      </div>
      <div id="chatContent">
        \${renderWelcomeScreen()}
      </div>
      <div class="chat-input-area">
        <div class="chat-input-wrapper">
          <textarea id="chatInput" placeholder="输入消息... (Enter 发送，Shift+Enter 换行)" rows="1"></textarea>
          <button class="send-btn" id="sendBtn" onclick="sendMessage()">➤</button>
        </div>
      </div>
    </div>
  </div>\`;
}

function renderWelcomeScreen() {
  return \`<div class="welcome-screen">
    <h2>欢迎回来，\${currentUser?.nickname || currentUser?.username || '朋友'}</h2>
    <p>我是你的 AI 约会教练——毒舌但真诚。选择一个模块开始，或直接发消息跟我聊。</p>
    <div class="welcome-modules">
      <div class="welcome-module-btn" onclick="startNewChat('interview')">
        <div class="wm-icon">🔍</div>
        <div class="wm-title">深度访谈</div>
        <div class="wm-desc">认识真实的自己</div>
      </div>
      <div class="welcome-module-btn" onclick="startNewChat('mock-date')">
        <div class="wm-icon">💕</div>
        <div class="wm-title">模拟约会</div>
        <div class="wm-desc">实战对话练习</div>
      </div>
      <div class="welcome-module-btn" onclick="startNewChat('mission')">
        <div class="wm-icon">📋</div>
        <div class="wm-title">任务清单</div>
        <div class="wm-desc">定制成长计划</div>
      </div>
      <div class="welcome-module-btn" onclick="startNewChat('checkin')">
        <div class="wm-icon">✅</div>
        <div class="wm-title">打卡验收</div>
        <div class="wm-desc">汇报任务成果</div>
      </div>
      <div class="welcome-module-btn" onclick="startNewChat('date-plan')">
        <div class="wm-icon">📅</div>
        <div class="wm-title">约会方案</div>
        <div class="wm-desc">定制约会计划</div>
      </div>
      <div class="welcome-module-btn" onclick="startNewChat('debrief')">
        <div class="wm-icon">📝</div>
        <div class="wm-title">战后复盘</div>
        <div class="wm-desc">分析约会经验</div>
      </div>
    </div>
  </div>\`;
}

function bindMainLayout() {
  const input = document.getElementById('chatInput');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 150) + 'px';
  });
}

// ========== Conversations ==========
async function loadConversations() {
  try {
    const data = await api('/api/chat/conversations');
    conversations = data.conversations || [];
    renderConversationList();
  } catch (err) {
    console.error('加载对话列表失败:', err);
  }
}

function renderConversationList() {
  const list = document.getElementById('convList');
  if (!list) return;
  if (conversations.length === 0) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted);font-size:13px;">暂无对话记录</div>';
    return;
  }
  list.innerHTML = conversations.map(c => \`
    <div class="conv-item \${c.id === currentConvId ? 'active' : ''}" onclick="loadConversation(\${c.id})">
      <span class="conv-title">\${escapeHtml(c.title)}</span>
      <button class="conv-delete" onclick="event.stopPropagation();deleteConversation(\${c.id})" title="删除">×</button>
    </div>
  \`).join('');
}

async function loadConversation(id) {
  try {
    const data = await api('/api/chat/conversations/' + id);
    currentConvId = id;
    currentModule = data.conversation.module || 'chat';
    renderConversationList();
    const content = document.getElementById('chatContent');
    content.innerHTML = '<div class="chat-messages" id="messageList"></div>';
    const title = document.getElementById('chatTitle');
    title.textContent = data.conversation.title;
    const msgList = document.getElementById('messageList');
    (data.messages || []).forEach(m => {
      if (m.role !== 'system') appendMessage(m.role, m.content);
    });
    msgList.scrollTop = msgList.scrollHeight;
    closeSidebar();
  } catch (err) {
    console.error('加载对话失败:', err);
  }
}

async function deleteConversation(id) {
  if (!confirm('确定删除这个对话吗？')) return;
  try {
    await api('/api/chat/conversations/' + id, { method: 'DELETE' });
    if (currentConvId === id) {
      currentConvId = null;
      const content = document.getElementById('chatContent');
      if (content) content.innerHTML = renderWelcomeScreen();
      const title = document.getElementById('chatTitle');
      if (title) title.textContent = 'CyberCupid';
    }
    await loadConversations();
  } catch (err) {
    console.error('删除对话失败:', err);
  }
}

function startNewChat(module) {
  currentConvId = null;
  currentModule = module || 'chat';
  const content = document.getElementById('chatContent');
  if (content) {
    content.innerHTML = '<div class="chat-messages" id="messageList"></div>';
  }
  const title = document.getElementById('chatTitle');
  const titles = {
    chat: '💬 自由对话', interview: '🔍 深度访谈', 'mock-date': '💕 模拟约会',
    mission: '📋 任务清单', checkin: '✅ 打卡验收', 'date-plan': '📅 约会方案', debrief: '📝 战后复盘'
  };
  if (title) title.textContent = titles[module] || 'CyberCupid';
  renderConversationList();
  closeSidebar();
  const input = document.getElementById('chatInput');
  if (input) input.focus();

  const starters = {
    interview: '我想做一次深度访谈，重新认识自己。',
    'mock-date': '我想做一次模拟约会练习。',
    mission: '请帮我生成一份任务清单。',
    checkin: '我来打卡，汇报任务完成情况。',
    'date-plan': '我想生成一个约会方案。',
    debrief: '我想复盘一次约会经历。'
  };

  if (starters[module]) {
    sendMessageText(starters[module]);
  }
}

// ========== Chat ==========
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || isLoading) return;
  input.value = '';
  input.style.height = 'auto';
  await sendMessageText(text);
}

async function sendMessageText(text) {
  if (isLoading) return;
  isLoading = true;
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.disabled = true;

  let msgList = document.getElementById('messageList');
  if (!msgList) {
    const content = document.getElementById('chatContent');
    content.innerHTML = '<div class="chat-messages" id="messageList"></div>';
    msgList = document.getElementById('messageList');
  }

  appendMessage('user', text);
  const typingEl = showTypingIndicator();

  try {
    const data = await api('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify({
        content: text,
        conversation_id: currentConvId || undefined,
        module: currentConvId ? undefined : currentModule
      })
    });

    if (!currentConvId && data.conversation_id) {
      currentConvId = data.conversation_id;
      await loadConversations();
    }

    removeTypingIndicator(typingEl);
    appendMessage('assistant', data.message.content);
    msgList.scrollTop = msgList.scrollHeight;
  } catch (err) {
    removeTypingIndicator(typingEl);
    appendMessage('assistant', '❌ ' + (err.message || '发送失败，请重试'));
  } finally {
    isLoading = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

function appendMessage(role, content) {
  const msgList = document.getElementById('messageList');
  if (!msgList) return;
  const div = document.createElement('div');
  div.className = 'message ' + role;
  const avatar = role === 'assistant' ? '💘' : '👤';
  div.innerHTML = \`
    <div class="message-avatar">\${avatar}</div>
    <div class="message-content">\${renderMarkdown(content)}</div>
  \`;
  msgList.appendChild(div);
  msgList.scrollTop = msgList.scrollHeight;
}

function showTypingIndicator() {
  const msgList = document.getElementById('messageList');
  if (!msgList) return null;
  const div = document.createElement('div');
  div.className = 'message assistant';
  div.id = 'typingMsg';
  div.innerHTML = \`
    <div class="message-avatar">💘</div>
    <div class="message-content">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  \`;
  msgList.appendChild(div);
  msgList.scrollTop = msgList.scrollHeight;
  return div;
}

function removeTypingIndicator(el) {
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

// ========== Markdown renderer ==========
function renderMarkdown(text) {
  if (!text) return '';
  let html = escapeHtml(text);

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  html = html.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
  html = html.replace(/\\*(.+?)\\*/g, '<em>$1</em>');
  html = html.replace(/\\\`([^\\\`]+)\\\`/g, '<code>$1</code>');

  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  html = html.replace(/^---$/gm, '<hr>');

  // tables
  html = html.replace(/^\\|(.+)\\|\\s*\\n\\|[-|\\s]+\\|\\s*\\n((?:\\|.+\\|\\s*\\n?)*)/gm, function(match, header, body) {
    const ths = header.split('|').map(h => '<th>' + h.trim() + '</th>').join('');
    const rows = body.trim().split('\\n').map(row => {
      const tds = row.replace(/^\\|/, '').replace(/\\|$/, '').split('|').map(c => '<td>' + c.trim() + '</td>').join('');
      return '<tr>' + tds + '</tr>';
    }).join('');
    return '<table><thead><tr>' + ths + '</tr></thead><tbody>' + rows + '</tbody></table>';
  });

  html = html.replace(/^- \\[ \\] (.+)$/gm, '<li>☐ $1</li>');
  html = html.replace(/^- \\[x\\] (.+)$/gm, '<li>☑ $1</li>');
  html = html.replace(/^[\\-\\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^(\\d+)\\. (.+)$/gm, '<li>$1. $2</li>');

  html = html.replace(/((<li>.*<\\/li>\\s*)+)/g, '<ul>$1</ul>');

  html = html.replace(/\\n\\n/g, '</p><p>');
  html = html.replace(/\\n/g, '<br>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\\/p>/g, '');
  html = html.replace(/<p>(<h[123]>)/g, '$1');
  html = html.replace(/(<\\/h[123]>)<\\/p>/g, '$1');
  html = html.replace(/<p>(<table>)/g, '$1');
  html = html.replace(/(<\\/table>)<\\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\\/ul>)<\\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\\/blockquote>)<\\/p>/g, '$1');
  html = html.replace(/<p><hr><\\/p>/g, '<hr>');

  return html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== Settings ==========
async function showSettings() {
  try {
    const data = await api('/api/settings');
    const s = data.settings || {};
    const models = data.models || [];

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'settingsModal';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    let modelOptionsHtml = '';
    const currentProvider = s.llm_provider || 'deepseek';
    const providerModels = models.find(m => m.provider === currentProvider);
    if (providerModels) {
      modelOptionsHtml = providerModels.models.map(m =>
        '<option value="' + m.value + '" ' + (m.value === s.model_name ? 'selected' : '') + '>' + m.label + '</option>'
      ).join('');
    }

    overlay.innerHTML = \`<div class="modal">
      <div class="modal-header">
        <h3>⚙️ 设置</h3>
        <button class="modal-close" onclick="document.getElementById('settingsModal').remove()">×</button>
      </div>
      <div class="modal-body">
        <div class="settings-section">
          <h4>模型提供商</h4>
          <div class="provider-cards">
            <div class="provider-card \${currentProvider==='deepseek'?'selected':''}" onclick="selectProvider('deepseek', this)">
              <div class="pc-icon">🐋</div>
              <div class="pc-name">DeepSeek</div>
            </div>
            <div class="provider-card \${currentProvider==='gemini'?'selected':''}" onclick="selectProvider('gemini', this)">
              <div class="pc-icon">✨</div>
              <div class="pc-name">Gemini</div>
            </div>
            <div class="provider-card \${currentProvider==='custom'?'selected':''}" onclick="selectProvider('custom', this)">
              <div class="pc-icon">🔧</div>
              <div class="pc-name">自定义</div>
            </div>
          </div>
        </div>
        <div class="settings-section" id="modelSection">
          <h4>模型选择</h4>
          <div class="form-group">
            <label>模型</label>
            <select id="settingsModel">\${modelOptionsHtml}</select>
          </div>
        </div>
        <div class="settings-section">
          <h4>API 密钥</h4>
          <div class="form-group">
            <label>API Key</label>
            <input type="password" id="settingsApiKey" placeholder="输入你的 API Key" value="\${s.api_key || ''}">
          </div>
        </div>
        <div class="settings-section \${currentProvider==='custom'?'':'hidden'}" id="customSection">
          <h4>自定义配置</h4>
          <div class="form-group">
            <label>API 地址</label>
            <input type="text" id="settingsCustomUrl" placeholder="https://api.example.com/v1/chat/completions" value="\${s.custom_provider_url || ''}">
          </div>
          <div class="form-group">
            <label>模型名称</label>
            <input type="text" id="settingsCustomModel" placeholder="模型名称" value="\${s.custom_model_name || ''}">
          </div>
        </div>
        <button class="btn btn-primary" onclick="saveSettings()">保存设置</button>
      </div>
    </div>\`;

    document.body.appendChild(overlay);
  } catch (err) {
    alert('加载设置失败: ' + err.message);
  }
}

window._settingsProvider = null;

function selectProvider(provider, el) {
  window._settingsProvider = provider;
  document.querySelectorAll('.provider-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');

  const customSection = document.getElementById('customSection');
  if (provider === 'custom') {
    customSection.classList.remove('hidden');
  } else {
    customSection.classList.add('hidden');
  }

  api('/api/settings').then(data => {
    const models = data.models || [];
    const pm = models.find(m => m.provider === provider);
    const sel = document.getElementById('settingsModel');
    if (pm && sel) {
      sel.innerHTML = pm.models.map(m => '<option value="' + m.value + '">' + m.label + '</option>').join('');
    }
  });
}

async function saveSettings() {
  try {
    const body = {};
    if (window._settingsProvider) body.llm_provider = window._settingsProvider;

    const model = document.getElementById('settingsModel');
    if (model) body.model_name = model.value;

    const apiKey = document.getElementById('settingsApiKey');
    if (apiKey && apiKey.value && !apiKey.value.startsWith('••')) body.api_key = apiKey.value;

    const customUrl = document.getElementById('settingsCustomUrl');
    if (customUrl) body.custom_provider_url = customUrl.value;

    const customModel = document.getElementById('settingsCustomModel');
    if (customModel) body.custom_model_name = customModel.value;

    await api('/api/settings', { method: 'PUT', body: JSON.stringify(body) });
    document.getElementById('settingsModal').remove();
    alert('设置已保存 ✓');
  } catch (err) {
    alert('保存失败: ' + err.message);
  }
}

// ========== Dashboard ==========
async function showDashboard() {
  try {
    const data = await api('/api/profile');
    const p = data.profile || {};
    const level = data.level || {};
    const radar = data.radar || {};
    const badges = data.badges || [];

    const allBadges = [
      { id: 'first_interview', name: '初次觉醒', icon: '🌟', desc: '完成深度访谈' },
      { id: 'first_mission', name: '行动派', icon: '🚀', desc: '完成首个任务' },
      { id: 'streak_7', name: '钢铁意志', icon: '💪', desc: '连续打卡7天' },
      { id: 'mock_king', name: '模拟王者', icon: '👑', desc: '模拟评分≥8' },
      { id: 'debrief_3', name: '复盘达人', icon: '🧠', desc: '完成3次复盘' },
      { id: 'plan_3', name: '方案大师', icon: '📐', desc: '生成3个方案' },
      { id: 'max_radar', name: '满级人类', icon: '⚡', desc: '雷达全≥8' },
      { id: 'graduate', name: '毕业典礼', icon: '🎓', desc: '达到Lv.10' },
    ];

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'dashboardModal';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    overlay.innerHTML = \`<div class="modal">
      <div class="modal-header">
        <h3>📊 战绩仪表盘</h3>
        <button class="modal-close" onclick="document.getElementById('dashboardModal').remove()">×</button>
      </div>
      <div class="modal-body">
        <div class="dashboard-grid">
          <div class="stat-card">
            <div class="stat-label">等级</div>
            <div class="stat-value">Lv.\${level.level || 1}</div>
            <div class="stat-sub">\${level.title || '恋爱小白'}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">经验值</div>
            <div class="stat-value">\${level.currentExp || 0}</div>
            <div class="stat-sub">下一级需要 \${level.nextLevelExp || 100} EXP</div>
            <div class="exp-bar"><div class="exp-bar-fill" style="width:\${level.progress || 0}%"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">连续活跃</div>
            <div class="stat-value">\${p.streak_days || 0}</div>
            <div class="stat-sub">天</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">上次活跃</div>
            <div class="stat-value" style="font-size:16px;">\${p.last_active ? new Date(p.last_active).toLocaleDateString('zh-CN') : '—'}</div>
          </div>
        </div>

        <div class="radar-chart">
          <h4>五维能力雷达</h4>
          <div class="radar-item">
            <span class="radar-label">形象管理</span>
            <div class="radar-bar"><div class="radar-bar-fill" style="width:\${(radar.image_mgmt||5)*10}%"></div></div>
            <span class="radar-score">\${radar.image_mgmt||5}</span>
          </div>
          <div class="radar-item">
            <span class="radar-label">情绪稳定</span>
            <div class="radar-bar"><div class="radar-bar-fill" style="width:\${(radar.emotional_stability||5)*10}%"></div></div>
            <span class="radar-score">\${radar.emotional_stability||5}</span>
          </div>
          <div class="radar-item">
            <span class="radar-label">沟通表达</span>
            <div class="radar-bar"><div class="radar-bar-fill" style="width:\${(radar.communication||5)*10}%"></div></div>
            <span class="radar-score">\${radar.communication||5}</span>
          </div>
          <div class="radar-item">
            <span class="radar-label">行动执行</span>
            <div class="radar-bar"><div class="radar-bar-fill" style="width:\${(radar.execution||5)*10}%"></div></div>
            <span class="radar-score">\${radar.execution||5}</span>
          </div>
          <div class="radar-item">
            <span class="radar-label">生活丰盈</span>
            <div class="radar-bar"><div class="radar-bar-fill" style="width:\${(radar.life_richness||5)*10}%"></div></div>
            <span class="radar-score">\${radar.life_richness||5}</span>
          </div>
        </div>

        <h4 style="margin-bottom:12px;">🏆 成就墙</h4>
        <div class="badges-grid">
          \${allBadges.map(b => \`
            <div class="badge-item \${badges.includes(b.id) ? 'earned' : 'locked'}">
              <div class="badge-icon">\${b.icon}</div>
              <div class="badge-name">\${b.name}</div>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>\`;

    document.body.appendChild(overlay);
  } catch (err) {
    alert('加载仪表盘失败: ' + err.message);
  }
}

// ========== Sidebar ==========
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', init);
`;
