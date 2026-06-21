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
      <div>
        <p class="eyebrow">GIS+BIM 第一稳定闭环</p>
        <h1>黔风智维</h1>
        <p class="subtitle">多气候山地风电机组智驭预警及故障诊断平台</p>
      </div>
      <div class="source-pill">
        <span></span>
        老爷岭山体 3D Tiles · CC-BY-4.0
      </div>
    </header>

    <section class="scene-wrap">
      <div id="cesium-root" class="cesium-root" aria-label="山地风电 GIS+BIM 主场景"></div>

      <aside class="status-panel">
        <p class="panel-kicker">当前选中</p>
        <h2 id="selected-title">HS-WTG-01</h2>
        <p id="selected-copy">山脊线已布置 3 台风机。双击任一风机，进入该风机 BIM 细节视角。</p>
        <dl>
          <div>
            <dt>风险等级</dt>
            <dd id="selected-risk">橙色预警</dd>
          </div>
          <div>
            <dt>疑似部件</dt>
            <dd>叶根螺栓 / 传动链</dd>
          </div>
          <div>
            <dt>数据边界</dt>
            <dd>老爷岭公开 3D Tiles，运维事件为透明模拟</dd>
          </div>
        </dl>
        <button id="focus-turbine" type="button">聚焦当前风机</button>
        <button id="reset-camera" type="button" class="ghost">返回山地</button>
      </aside>

      <div class="hint">双击风机进入 BIM 详情 · 拖拽旋转 · 滚轮缩放</div>
    </section>

    <footer class="bottom-bar">
      <span>SCADA</span>
      <span>CMS 振动</span>
      <span>螺栓监测</span>
      <span>告警中心</span>
      <span>预测性维护</span>
      <span>运维工单</span>
      <span>事件复盘</span>
    </footer>
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
      copy.textContent = `已进入 ${turbine.name} BIM 细节视角：下一步将把部件树、传感器证据和工单绑定到这里。`;
    }
  },
}).then((scene) => {
  document.querySelector("#focus-turbine")?.addEventListener("click", () => scene.focusTurbine());
  document.querySelector("#reset-camera")?.addEventListener("click", () => scene.showMountainOverview());
});
