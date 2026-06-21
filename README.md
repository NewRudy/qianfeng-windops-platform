# 黔风智维 / Qianfeng WindOps Platform

面向 2026 贵州省人工智能创业大赛行业命题“基于多气候山地风电机组智驭预警及故障诊断平台”的稳定参赛系统主线仓库。

这个仓库从干净主线开始，不直接继承旧仓库结构。旧仓库只作为候选资产池：每个前端页面、后端接口、模型、数据脚本和三维资产都必须经过验收后才能迁入。

## 目标

先做一个稳定、可信、可演示、可扩展的平台系统：

- 首页是清晰的 GIS+BIM 山地风场主场景，不是密密麻麻的假窗口。
- GIS 场景优先使用真实倾斜摄影、点云或地形 3D Tiles，不把示意 DEM 包装成真实场景。
- 风机 BIM 详情必须能展示部件、告警位置、诊断证据和工单闭环。
- SCADA、CMS、螺栓监测、气象、告警、诊断、工单必须围绕同一台风机和同一事件串起来。
- 所有公开数据、合成数据、人工模拟数据都必须在界面和接口中明确标注边界。

## 旧仓库角色

- Mac 旧仓库：`/Users/rudy/Documents/geo_agent/windops-agent`
- U 盘旧仓库：`/Volumes/RUDY/105. 风机科研项目`

这两个位置可以复用资产，但不能整体搬迁。复用前必须回答：

1. 这个东西解决哪个真实平台问题？
2. 是否能运行、能测试、能被用户看懂？
3. 是否含有假数据、假接口、假按钮或过度包装？
4. 是否会让首页更清楚，而不是更乱？

## 第一阶段验收

第一阶段只追求一个稳定闭环：

1. 打开平台首页，第一眼看到山地风场 GIS+BIM 主场景。
2. 双击场景中的风机，进入该风机 BIM 详情。
3. BIM 详情能看到疑似部件、传感器证据、风险等级和工单建议。
4. 菜单按需打开 SCADA、CMS、螺栓监测、告警中心、预测性维护、工单和事件复盘。
5. 所有按钮都可点击；未实现能力必须显示“未接入”或“待接入”，不能假装成功。

## 当前可运行入口

第一条 GIS+BIM 闭环的前端入口在 `apps/web`。山地底座统一走 3D Tiles 入口：先用 Cesium 官方 `3d-tiles-tools` 把本机老爷岭 GLTF 生成 3D Tiles 1.1 tileset，再由 CesiumJS 加载 `tileset.json`，并把首台风机放到山体上：

```bash
npm install
npm run assets:laoyeling
npm run dev
```

默认地址：

```text
http://127.0.0.1:1146/
```

当前外部资产不提交到 Git：

- 山体：`/Users/rudy/Downloads/laoyeling_mountain/scene.gltf`
- 山体 3D Tiles 输出：`data/external/tilesets/laoyeling-mountain/tileset.json`
- 首页风机模型：`/Users/rudy/Downloads/wind_turbine/scene.gltf`

老爷岭模型来自 Sketchfab，作者李延权，许可证为 CC-BY-4.0。界面必须保留来源和数据边界。
首页风机模型来自 Sketchfab，作者 Sket_h，许可证为 CC-BY-4.0，包含一个叶轮旋转动画。该模型作为 GIS 首页的可视化风机资产，构件级 BIM 详情后续仍需要 xeokit/XKT 或可查询部件树资产承载。

注意：当前 `npm run assets:laoyeling` 生成的是单瓦片 3D Tiles 1.1 包装，作用是统一 GIS+BIM 运行时数据入口；它还不是真正多级 LOD 的倾斜摄影切片。后续接入 OSGB、真实倾斜摄影或点云时，仍需要专业切片工具生成多瓦片、多层级 3D Tiles。

## 工程原则

- 先问清楚，再写代码。
- 先定义验收信号，再实现。
- 只做垂直小闭环，不堆无关页面。
- 不提交密钥、大数据、`node_modules`、原始数据和大输出。
- 每次合并旧仓库资产，都要保留来源、边界和验证结果。
