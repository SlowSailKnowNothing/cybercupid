# CyberCupid - AI 约会教练

> 毒舌但温暖的社交成长教官，帮你从自我认知到行动执行全链路提升约会能力。

## 功能模块

| 模块 | 功能 | 触发词 |
|------|------|--------|
| 深度访谈 | Socratic 对话挖掘真实特质，生成个人社交资产诊断 | `深度访谈` `认识自己` |
| 动态任务 | 基于档案生成阶段性可执行任务，难度分级 | `任务清单` `今日任务` |
| 打卡验收 | 任务完成验收，EXP 奖励，质量评级 S/A/B/C/D | `打卡` `完成任务` |
| 模拟约会 | AI 扮演约会对象，5 回合实战练习 + 评分报告 | `模拟约会` `练习对话` |
| 约会方案 | 根据城市/预算/兴趣生成完整约会计划 | `约会方案` `约会计划` |
| 战后复盘 | 引导复盘真实约会，控制域分析 + 认知重构 | `约会复盘` `复盘` |
| 战绩仪表盘 | 等级、EXP、成就徽章、五维雷达图 | `战绩` `仪表盘` |

## 特色

- **毒舌教官人设**：犀利但真诚，用商业隐喻（社交资产/情感负债）帮你看清现实
- **游戏化系统**：10 级成长体系 + 8 枚成就徽章 + EXP 奖励机制
- **五维雷达图**：形象管理 / 情绪稳定 / 沟通表达 / 行动执行 / 生活丰盈度
- **一次一问**：Socratic 对话法，根据回答深度自适应
- **数据驱动**：所有建议基于你的个人档案，不灌鸡汤

---

## 安装

### 方式一：Plugin 安装（推荐）

在 Claude Code 中运行：

```bash
/install https://github.com/SlowSailKnowNothing/cybercupid
```

### 方式二：手动安装

```bash
git clone https://github.com/SlowSailKnowNothing/cybercupid.git /tmp/cybercupid
cp -r /tmp/cybercupid/skills/cybercupid ~/.claude/skills/
```

安装完成后重启 Claude Code，输入 `/cybercupid` 或 `约会教练` 即可启动。

<!-- AGENT-INSTALL-INSTRUCTIONS -->
```json
{
  "type": "claude-code-plugin",
  "name": "cybercupid",
  "install": {
    "method": "copy-skills",
    "source": "skills/cybercupid/",
    "target": "~/.claude/skills/cybercupid/"
  },
  "post_install": "输入 /cybercupid 或 '约会教练' 开始使用",
  "files": ["SKILL.md", "question-bank.json"]
}
```
<!-- /AGENT-INSTALL-INSTRUCTIONS -->

---

## 使用说明

### 首次使用

首次启动时，CyberCupid 会：
1. 询问数据存放位置（默认 `CyberCupid/`，也可选 PARA 结构或自定义路径）
2. 进入深度访谈，约 15-20 分钟
3. 生成你的社交资产诊断报告

### 触发词

| 输入 | 进入模块 |
|------|---------|
| `cybercupid` / `约会教练` / `脱单` | 主菜单 |
| `深度访谈` / `认识自己` | 深度价值观访谈 |
| `任务清单` / `今日任务` | 动态战略清单 |
| `打卡` / `完成任务` | 打卡验收 |
| `模拟约会` / `练习对话` | 模拟语境练习 |
| `约会方案` / `约会计划` | 约会方案生成器 |
| `复盘` / `约会复盘` | 战后复盘 |
| `战绩` / `仪表盘` | 战绩仪表盘 |

### 数据存储

所有数据存储在你的 vault 中（位置可自选），包括：
- `profile.md` — 个人社交资产诊断报告
- `radar.md` — 五维能力雷达图
- `dashboard.md` — 总仪表盘（等级、EXP、成就）
- `missions/` — 阶段任务清单
- `mock-dates/` — 模拟对话记录
- `date-plans/` — 约会方案
- `debriefs/` — 复盘日记

---

## 系统要求

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code)

## 许可证

MIT
