# Agent Operating Contract

本仓库是“黔风智维”参赛平台主线。AI 助手进入本仓库时，优先保证系统稳定、功能真实、界面清楚，而不是快速堆功能。

## Workflow

1. 对大改动先追问和讨论，确认目标、用户路径、数据边界和验收标准。
2. 能从本地文件确认的事实先查本地，不凭记忆判断。
3. 旧仓库代码只能作为候选资产，迁入前必须审查、裁剪、验证。
4. 实施时按垂直闭环推进：一个用户动作、一个数据链路、一个验收信号。
5. 改完必须运行对应测试；前端和三维场景改动必须用浏览器或等价方式验证。

## Hard Rules

- 不制造假功能、假按钮、假 AI 回答、假数据接入。
- 不把合成数据、示意模型、DEM 网格包装成真实风场倾斜摄影或真实点云。
- 不让首页变成信息墙；首页的注意力必须集中在 GIS+BIM 主场景和当前风险事件。
- 不提交密钥、token、`data/raw/`、`data/external/`、`outputs/`、`node_modules/`。
- 不覆盖旧仓库或 U 盘内容，除非用户明确要求。

## Agent skills

### Issue tracker

Use GitHub Issues in `NewRudy/qianfeng-windops-platform` as the task pool. External pull requests are not a request surface by default.

### Triage labels

Use the default label vocabulary documented in `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single project context. Read `CONTEXT.md` before planning architecture, debugging, or implementing platform behavior. Architectural decisions live in `docs/adr/`.
