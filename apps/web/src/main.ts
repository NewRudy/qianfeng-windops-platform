import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { createWindFarmScene } from "./scene/createWindFarmScene";
import { firstSliceSceneConfig } from "./scene/sceneConfig";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing app root");
}

root.innerHTML = `
  <main class="shell">
    <header class="topbar">
      <div class="topbar-left">
        <p class="eyebrow">Guizhou Mountain WindOps Twin</p>
        <h1>黔风智维</h1>
      </div>
      <div class="topbar-center">
        <p class="subtitle">多气候山地风电机组智驭预警及故障诊断平台</p>
      </div>
      <div class="topbar-right">
        <span class="live-dot"></span>
        <span>示范场 HS-WF-01</span>
        <strong>接入 4 类数据</strong>
      </div>
    </header>

    <section class="scene-wrap">
      <div id="cesium-root" class="cesium-root" aria-label="山地风电 GIS+BIM 主场景"></div>
      <div class="scene-vignette" aria-hidden="true"></div>

      <aside class="left-rail" aria-label="风场态势">
        <section class="glass-panel health-panel">
          <div class="panel-title">
            <span>风场态势</span>
            <strong>运行中</strong>
          </div>
          <div class="health-grid">
            <div class="hero-score">
              <span>综合健康</span>
              <strong>86</strong>
              <small>较昨日 -3</small>
            </div>
            <div class="metric-tile">
              <span>装机</span>
              <strong>3 台</strong>
              <small>山脊线</small>
            </div>
            <div class="metric-tile">
              <span>预警</span>
              <strong>2 起</strong>
              <small>橙色</small>
            </div>
            <div class="metric-tile">
              <span>可利用率</span>
              <strong>97.2%</strong>
              <small>近 24h</small>
            </div>
          </div>
        </section>

        <section class="glass-panel climate-panel">
          <div class="panel-title">
            <span>山地多气候风险</span>
            <strong>中等</strong>
          </div>
          <div class="risk-row">
            <span>阵风切变</span>
            <div><i style="width: 76%"></i></div>
            <strong>76</strong>
          </div>
          <div class="risk-row">
            <span>凝冰概率</span>
            <div><i style="width: 41%"></i></div>
            <strong>41</strong>
          </div>
          <div class="risk-row">
            <span>雷暴邻近</span>
            <div><i style="width: 28%"></i></div>
            <strong>28</strong>
          </div>
        </section>

        <section class="glass-panel source-panel">
          <div class="panel-title">
            <span>可信数据边界</span>
            <strong>透明</strong>
          </div>
          <p>山体为老爷岭 3D Tiles，本轮风机为本地 GLTF 动画模型；SCADA/CMS/螺栓与工单为演示数据。</p>
        </section>
      </aside>

      <aside class="right-rail" aria-label="诊断处置">
        <section class="glass-panel selected-panel">
          <div class="panel-title">
            <span>当前风机</span>
            <strong id="selected-risk">橙色预警</strong>
          </div>
          <h2 id="selected-title">HS-WTG-01</h2>
          <p id="selected-copy">传动链与叶根螺栓出现联合异常，建议进入单机视角核验证据。</p>
          <div class="evidence-stack">
            <div>
              <span>SCADA 功率残差</span>
              <strong>+12.8%</strong>
            </div>
            <div>
              <span>CMS 振动峰值</span>
              <strong>2.56 mm/s</strong>
            </div>
            <div>
              <span>螺栓预紧力</span>
              <strong>288.6 kN</strong>
            </div>
          </div>
          <div class="action-row">
            <button id="focus-turbine" type="button">单机诊断</button>
            <button id="reset-camera" type="button" class="ghost">风场总览</button>
          </div>
        </section>

        <section class="glass-panel workorder-panel">
          <div class="panel-title">
            <span>处置链路</span>
            <strong>待派发</strong>
          </div>
          <ol class="workorder-list">
            <li><span>01</span><p>冻结 HS-WTG-01 高载荷运行窗口</p></li>
            <li><span>02</span><p>复核叶根螺栓预紧力与温湿度漂移</p></li>
            <li><span>03</span><p>生成 48h 预测性维护工单</p></li>
          </ol>
        </section>
      </aside>

      <section class="bottom-console" aria-label="业务模块">
        <div class="module-tabs">
          <button class="module-tab active" type="button" data-module="fusion">多源融合</button>
          <button class="module-tab" type="button" data-module="warning">预警诊断</button>
          <button class="module-tab" type="button" data-module="maintenance">预测维护</button>
          <button class="module-tab" type="button" data-module="replay">事件复盘</button>
        </div>
        <div class="module-card">
          <p id="module-kicker">SCADA / CMS / 螺栓 / 山地气象</p>
          <h3 id="module-title">多源数据融合</h3>
          <p id="module-copy">把运行、振动、结构预紧力与气象风险合到同一台风机和同一条处置链，不再只是分散图表。</p>
        </div>
        <div class="flow-strip" aria-label="当前业务闭环">
          <span class="done">采集</span>
          <span class="done">识别</span>
          <span class="active">诊断</span>
          <span>派工</span>
          <span>复盘</span>
        </div>
      </section>
    </section>
  </main>
`;

const sceneRoot = document.querySelector<HTMLDivElement>("#cesium-root");

if (!sceneRoot) {
  throw new Error("Missing Cesium scene root");
}

void createWindFarmScene({
  container: sceneRoot,
  config: firstSliceSceneConfig,
  onTurbineSelected: (turbine) => {
    const title = document.querySelector("#selected-title");
    const copy = document.querySelector("#selected-copy");
    const risk = document.querySelector("#selected-risk");
    if (title) title.textContent = turbine.name;
    if (risk) {
      risk.textContent =
        turbine.riskLevel === "critical"
          ? "红色告警"
          : turbine.riskLevel === "warning"
            ? "橙色预警"
            : "运行正常";
    }
    if (copy) {
      copy.textContent = `${turbine.name} 已进入单机诊断视角，右侧证据链保留 SCADA、CMS、螺栓和工单关联。`;
    }
  },
}).then((scene) => {
  document.querySelector("#focus-turbine")?.addEventListener("click", () => scene.focusTurbine());
  document.querySelector("#reset-camera")?.addEventListener("click", () => scene.showMountainOverview());
});

const moduleCopy: Record<string, { kicker: string; title: string; copy: string }> = {
  fusion: {
    kicker: "SCADA / CMS / 螺栓 / 山地气象",
    title: "多源数据融合",
    copy: "把运行、振动、结构预紧力与气象风险合到同一台风机和同一条处置链，不再只是分散图表。",
  },
  warning: {
    kicker: "机理阈值 + 异常检测",
    title: "预警诊断",
    copy: "先锁定异常部件，再给出证据强度、可信边界和下一步核验动作。",
  },
  maintenance: {
    kicker: "寿命窗口 / 作业窗口 / 备件",
    title: "预测性维护",
    copy: "把可用作业窗口、风险等级和备件优先级合成一张可派发的维护建议。",
  },
  replay: {
    kicker: "告警时间线 / 证据快照 / 工单结果",
    title: "事件复盘",
    copy: "复盘从异常出现到工单闭环的关键节点，用于路演讲清楚业务价值。",
  },
};

document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const module = moduleCopy[button.dataset.module ?? "fusion"] ?? moduleCopy.fusion;
    document.querySelectorAll(".module-tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const kicker = document.querySelector("#module-kicker");
    const title = document.querySelector("#module-title");
    const copy = document.querySelector("#module-copy");
    if (kicker) kicker.textContent = module.kicker;
    if (title) title.textContent = module.title;
    if (copy) copy.textContent = module.copy;
  });
});
