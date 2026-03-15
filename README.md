# CyberCupid Web - AI 约会教练

> 毒舌但温暖的社交成长教官，帮你从自我认知到行动执行全链路提升约会能力。

## 功能模块

| 模块 | 功能 | 说明 |
|------|------|------|
| 深度访谈 | Socratic 对话挖掘真实特质 | 生成社交资产诊断报告 |
| 动态任务 | 基于档案生成阶段性任务 | 难度分级，EXP 奖励 |
| 打卡验收 | 任务完成质量评估 | S/A/B/C/D 质量评级 |
| 模拟约会 | AI 扮演约会对象 | 5 回合实战练习 + 评分 |
| 约会方案 | 定制约会计划 | 根据城市/预算/兴趣生成 |
| 战后复盘 | 分析约会经验 | 控制域分析 + 认知重构 |
| 战绩仪表盘 | 进度追踪 | 等级、EXP、徽章、雷达图 |

## 技术栈

- **运行时**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **框架**: [Hono](https://hono.dev/) — 轻量高性能 Web 框架
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/) — SQLite 边缘数据库
- **认证**: 自实现 JWT + PBKDF2 密码哈希
- **前端**: 原生 HTML/CSS/JS SPA（嵌入 Worker）
- **AI 模型**: DeepSeek / Google Gemini / 自定义 OpenAI 兼容 API

## 支持的 AI 模型

| 提供商 | 模型 |
|--------|------|
| DeepSeek | deepseek-chat (V3), deepseek-reasoner (R1) |
| Google Gemini | gemini-2.5-flash, gemini-2.5-pro, gemini-2.0-flash |
| 自定义 | 任何 OpenAI 兼容 API |

## 快速开始

### 前置条件

- [Node.js](https://nodejs.org/) 18+
- [Cloudflare 账号](https://dash.cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### 本地开发

```bash
# 安装依赖
npm install

# 初始化本地 D1 数据库
npm run db:migrate:local

# 启动本地开发服务器
npm run dev
```

访问 `http://localhost:8787` 即可使用。

### 部署到 Cloudflare

```bash
# 1. 登录 Cloudflare
npx wrangler login

# 2. 创建 D1 数据库
npx wrangler d1 create cybercupid-db

# 3. 更新 wrangler.toml 中的 database_id

# 4. 初始化远程数据库
npm run db:migrate:remote

# 5. 设置 JWT 密钥
npx wrangler secret put JWT_SECRET

# 6. 部署
npm run deploy
```

## 项目结构

```
├── src/
│   ├── index.ts          # Worker 入口，路由配置
│   ├── auth.ts           # 用户注册/登录
│   ├── chat.ts           # 对话/消息 API
│   ├── llm.ts            # LLM 提供商集成
│   ├── prompt.ts         # CyberCupid 系统提示词
│   ├── settings.ts       # 用户设置 API
│   ├── profile.ts        # 用户档案/游戏化 API
│   ├── crypto.ts         # 密码哈希/JWT
│   ├── middleware.ts     # 认证中间件
│   ├── static.ts         # 静态文件服务
│   ├── frontend.ts       # 嵌入式前端 SPA
│   └── types.ts          # TypeScript 类型
├── migrations/
│   └── 0001_init.sql     # D1 数据库初始化
├── skills/
│   └── cybercupid/       # 原始 Claude Code 插件
├── wrangler.toml         # Cloudflare Workers 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

## 特色

- **毒舌教官人设**: 犀利但真诚，用商业隐喻帮你看清现实
- **游戏化系统**: 10 级成长体系 + 8 枚成就徽章 + EXP 奖励
- **五维雷达图**: 形象管理 / 情绪稳定 / 沟通表达 / 行动执行 / 生活丰盈度
- **全球边缘部署**: Cloudflare 全球网络，低延迟访问
- **多模型支持**: DeepSeek、Gemini、自定义模型自由切换
- **数据安全**: 密码 PBKDF2 加密，JWT 认证，数据存储在 D1

## 配置说明

### 环境变量

| 变量 | 说明 | 设置方式 |
|------|------|---------|
| `JWT_SECRET` | JWT 签名密钥 | `wrangler secret put JWT_SECRET` |

### 用户设置（通过 Web 界面）

- **模型提供商**: DeepSeek / Gemini / 自定义
- **API Key**: 用户自行配置各提供商的 API Key
- **自定义模型**: 支持填写自定义 API 地址和模型名称

## API 接口

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | `/api/auth/register` | 用户注册 | ✗ |
| POST | `/api/auth/login` | 用户登录 | ✗ |
| GET | `/api/auth/me` | 获取当前用户 | ✓ |
| GET | `/api/chat/conversations` | 对话列表 | ✓ |
| GET | `/api/chat/conversations/:id` | 对话详情 | ✓ |
| DELETE | `/api/chat/conversations/:id` | 删除对话 | ✓ |
| POST | `/api/chat/send` | 发送消息 | ✓ |
| GET | `/api/settings` | 获取设置 | ✓ |
| PUT | `/api/settings` | 更新设置 | ✓ |
| GET | `/api/profile` | 获取档案 | ✓ |
| PUT | `/api/profile/radar` | 更新雷达图 | ✓ |
| POST | `/api/profile/add-exp` | 增加经验值 | ✓ |

## 许可证

MIT
