import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { createWindFarmScene } from "./scene/createWindFarmScene";
import { firstSliceSceneConfig, type TurbineAsset } from "./scene/sceneConfig";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing app root");
}

root.innerHTML = `
  <main class="shell" data-mode="intro">
    <section class="scene-wrap">
      <div id="cesium-root" class="cesium-root" aria-label="山地风电 GIS+BIM 主场景"></div>
      <div class="scene-grade" aria-hidden="true"></div>
      <div class="wind-streaks" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <header class="hero-title">
        <p>Guizhou Mountain WindOps Twin</p>
        <h1>黔风智维</h1>
        <strong>多气候山地风电机组智驭预警及故障诊断平台</strong>
      </header>

      <aside class="diagnosis-dock" aria-label="风机诊断业务面板">
        <button id="close-diagnosis" class="dock-close" type="button" aria-label="关闭诊断面板">×</button>
        <div class="dock-kicker">Wind Turbine Diagnosis</div>
        <h2 id="selected-title">HS-WTG-01</h2>
        <p id="selected-copy">双击山脊线上的风机后，打开该机组的部件剖分、证据链和工单闭环。</p>

        <section class="health-band">
          <div>
            <span>健康评分</span>
            <strong>86</strong>
          </div>
          <div>
            <span>风险等级</span>
            <strong id="selected-risk">橙色预警</strong>
          </div>
          <div>
            <span>建议动作</span>
            <strong>降载核验</strong>
          </div>
        </section>

        <section class="bim-breakdown">
          <div class="bim-visual" aria-hidden="true">
            <i class="blade blade-a"></i>
            <i class="blade blade-b"></i>
            <i class="blade blade-c"></i>
            <i class="hub"></i>
            <i class="nacelle"></i>
            <i class="tower"></i>
          </div>
          <div class="component-stack">
            <button class="component active" type="button" data-component="blade-root">
              <span>叶根螺栓</span><strong>预紧力异常</strong>
            </button>
            <button class="component" type="button" data-component="drivetrain">
              <span>传动链</span><strong>振动峰值上升</strong>
            </button>
            <button class="component" type="button" data-component="gearbox">
              <span>齿轮箱</span><strong>温升趋势</strong>
            </button>
            <button class="component" type="button" data-component="tower">
              <span>塔筒结构</span><strong>螺栓复核</strong>
            </button>
          </div>
        </section>

        <section class="evidence-panel">
          <h3>多源证据链</h3>
          <div><span>SCADA 功率残差</span><strong>+12.8%</strong></div>
          <div><span>CMS 振动峰值</span><strong>2.56 mm/s</strong></div>
          <div><span>螺栓预紧力</span><strong>288.6 kN</strong></div>
          <div><span>山地气象</span><strong>阵风切变 76</strong></div>
        </section>

        <section class="workflow-panel">
          <h3>处置闭环</h3>
          <ol>
            <li><span>01</span>冻结高载荷运行窗口</li>
            <li><span>02</span>复核叶根螺栓与温湿度漂移</li>
            <li><span>03</span>生成 48h 预测维护工单</li>
          </ol>
        </section>
      </aside>

      <nav class="mission-nav" aria-label="业务流程">
        <button class="mission active" type="button" data-module="scene">风场总览</button>
        <button class="mission" type="button" data-module="fusion">多源融合</button>
        <button class="mission" type="button" data-module="warning">预警诊断</button>
        <button class="mission" type="button" data-module="workorder">工单闭环</button>
      </nav>
    </section>
  </main>
`;

const shell = document.querySelector<HTMLElement>(".shell");
const sceneRoot = document.querySelector<HTMLDivElement>("#cesium-root");

if (!shell || !sceneRoot) {
  throw new Error("Missing dashboard shell or Cesium root");
}

const dashboardShell = shell;

function openDiagnosis(turbine: TurbineAsset): void {
  dashboardShell.dataset.mode = "diagnosis";

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
    copy.textContent = `${turbine.name} 已进入部件剖分诊断：叶根螺栓、传动链、齿轮箱与塔筒结构证据联动。`;
  }
}

function closeDiagnosis(): void {
  dashboardShell.dataset.mode = "intro";
}

void createWindFarmScene({
  container: sceneRoot,
  config: firstSliceSceneConfig,
  onTurbineSelected: openDiagnosis,
}).then((scene) => {
  document.querySelector("#close-diagnosis")?.addEventListener("click", () => {
    closeDiagnosis();
    scene.showMountainOverview();
  });

  document.querySelectorAll<HTMLButtonElement>(".mission").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mission").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      if (button.dataset.module === "scene") {
        closeDiagnosis();
        scene.showMountainOverview();
        return;
      }

      scene.focusTurbine();
    });
  });
});

document.querySelectorAll<HTMLButtonElement>(".component").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".component").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
