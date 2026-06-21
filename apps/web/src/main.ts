import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { BimTurbineViewer, type BimPartKey } from "./bim/BimTurbineViewer";
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

      <section class="bim-screen" aria-label="单机组 BIM 智驭诊断大屏">
        <header class="bim-header">
          <div>
            <h2>黔风智维 - 风机组智能预警与故障诊断平台</h2>
          </div>
          <strong id="bim-selected-title">HS-WTG-01</strong>
          <button id="close-bim" class="bim-back" type="button">返回 GIS 场景</button>
        </header>

        <section class="bim-stage" aria-label="风机 BIM 部件拆分视图">
          <div class="blueprint-grid" aria-hidden="true"></div>
          <div id="bim-model-root" class="first-version-bim-canvas" aria-label="风机 BIM 精细模型"></div>
          <div class="bim-stage-hud">
            <span>整机 BIM 模型</span>
            <strong id="bim-status">等待进入单机 BIM 诊断</strong>
            <em>支持部件点击高亮、整机拆解/复原、疑似构件告警闪烁。</em>
          </div>
          <div class="bim-stage-actions" aria-label="BIM 模型操作">
            <button id="bim-decompose" type="button">拆解模型</button>
            <button id="bim-compose" type="button">复原模型</button>
            <button id="bim-warning" type="button">告警闪烁</button>
          </div>
          <button class="part-label label-blade" type="button" data-bim-part="blade">叶片/变桨</button>
          <button class="part-label label-gearbox" type="button" data-bim-part="gearbox">齿轮箱</button>
          <button class="part-label label-generator" type="button" data-bim-part="nacelle">发电机</button>
          <button class="part-label label-yaw" type="button" data-bim-part="hub">转子主轴</button>
          <button class="part-label label-tower" type="button" data-bim-part="tower">塔筒结构</button>
        </section>

        <aside class="component-strip" aria-label="部件拆分">
          <button class="component active" type="button" data-component="blade-root" data-bim-part="blade">
            <span>叶根螺栓</span><strong>预紧力异常</strong>
          </button>
          <button class="component" type="button" data-component="drivetrain" data-bim-part="hub">
            <span>传动链</span><strong>振动峰值上升</strong>
          </button>
          <button class="component" type="button" data-component="gearbox" data-bim-part="gearbox">
            <span>齿轮箱</span><strong>温升趋势</strong>
          </button>
          <button class="component" type="button" data-component="tower" data-bim-part="tower">
            <span>塔筒结构</span><strong>螺栓复核</strong>
          </button>
        </aside>

        <aside class="module-drawer" aria-label="业务模块">
          <section class="module-panel module-health">
            <h3>健康评分</h3>
            <div class="score-ring"><strong>90</strong><span>健康评分</span></div>
            <dl>
              <div><dt>正常</dt><dd>7</dd></div>
              <div><dt>关注</dt><dd>1</dd></div>
              <div><dt>预警</dt><dd>1</dd></div>
              <div><dt>严重</dt><dd>0</dd></div>
            </dl>
            <p>模型：IsolationForest；异常点：2936；风险分：38.3。</p>
          </section>

          <section class="module-panel module-scada">
            <h3>SCADA 状态监测</h3>
            <div class="signal-chart">
              <i style="height:42%"></i><i style="height:72%"></i><i style="height:58%"></i>
              <i style="height:85%"></i><i style="height:46%"></i><i style="height:64%"></i>
              <i style="height:78%"></i><i style="height:52%"></i><i style="height:90%"></i>
            </div>
            <dl>
              <div><dt>风速</dt><dd>6.71 m/s</dd></div>
              <div><dt>有功功率</dt><dd>812 kW</dd></div>
              <div><dt>功率残差</dt><dd>+12.8%</dd></div>
            </dl>
          </section>

          <section class="module-panel module-cms">
            <h3>CMS 振动诊断</h3>
            <dl>
              <div><dt>RMS 振动</dt><dd>2.562 mm/s</dd></div>
              <div><dt>主频偏移</dt><dd>1P + 3P</dd></div>
              <div><dt>疑似部件</dt><dd>传动链 / 齿轮箱</dd></div>
            </dl>
            <p>机理判断：风切变载荷叠加传动链侧频，需联动油温与扭矩残差核验。</p>
          </section>

          <section class="module-panel module-bolts">
            <h3>螺栓监测</h3>
            <dl>
              <div><dt>平均预紧力</dt><dd>288.6 kN</dd></div>
              <div><dt>最低通道</dt><dd>B17 / 263.1 kN</dd></div>
              <div><dt>温漂补偿</dt><dd>已启用</dd></div>
            </dl>
            <p>隐患排查：叶根螺栓预紧力下探，建议低风速窗口复测并安排扭矩复核。</p>
          </section>

          <section class="module-panel module-alerts">
            <h3>告警中心</h3>
            <ul class="event-list">
              <li><span>P1-高</span>结构健康预警 - ORANGE</li>
              <li><span>P1-高</span>叶根螺栓预紧力下探</li>
              <li><span>P2-中</span>山地阵风切变风险升高</li>
            </ul>
          </section>

          <section class="module-panel module-maintenance">
            <h3>预测性维护</h3>
            <dl>
              <div><dt>钢绞线预应力</dt><dd>98.8 天</dd></div>
              <div><dt>连接螺栓剩余寿命</dt><dd>329.2 天</dd></div>
              <div><dt>塔筒固有频率</dt><dd>395.1 天</dd></div>
            </dl>
            <p>维护策略：常规保养；若预紧力连续 3 次低于阈值，升级为停机复检。</p>
          </section>

          <section class="module-panel module-workorder">
            <h3>运维工单</h3>
            <ol class="workflow-list">
              <li><span>01</span>冻结高载荷运行窗口</li>
              <li><span>02</span>复核叶根螺栓与温湿度漂移</li>
              <li><span>03</span>生成 48h 预测维护工单</li>
            </ol>
          </section>
        </aside>

        <nav class="bim-toolbar" aria-label="业务流程">
          <button class="module-tab active" type="button" data-module="health">健康评分</button>
          <button class="module-tab" type="button" data-module="scada">SCADA</button>
          <button class="module-tab" type="button" data-module="cms">CMS</button>
          <button class="module-tab" type="button" data-module="bolts">螺栓监测</button>
          <button class="module-tab" type="button" data-module="alerts">告警中心</button>
          <button class="module-tab" type="button" data-module="maintenance">预测维护</button>
          <button class="module-tab" type="button" data-module="workorder">运维工单</button>
        </nav>
      </section>
    </section>
  </main>
`;

const shell = document.querySelector<HTMLElement>(".shell");
const sceneRoot = document.querySelector<HTMLDivElement>("#cesium-root");
const bimModelRoot = document.querySelector<HTMLDivElement>("#bim-model-root");
const bimStatus = document.querySelector<HTMLElement>("#bim-status");

if (!shell || !sceneRoot || !bimModelRoot) {
  throw new Error("Missing dashboard shell, Cesium root, or BIM root");
}

const dashboardShell = shell;
const bimModelContainer = bimModelRoot;
let bimViewer: BimTurbineViewer | undefined;
let warningActive = false;

function setBimStatus(status: string): void {
  if (bimStatus) bimStatus.textContent = status;
}

function getBimViewer(): BimTurbineViewer {
  if (!bimViewer) {
    bimViewer = new BimTurbineViewer({
      container: bimModelContainer,
      onStatus: setBimStatus,
    });
  }

  return bimViewer;
}

function setActiveModule(moduleName: string): void {
  dashboardShell.dataset.activeModule = moduleName;

  document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.module === moduleName);
  });
}

function openDiagnosis(turbine: TurbineAsset): void {
  dashboardShell.dataset.mode = "bim";
  setActiveModule("health");
  window.requestAnimationFrame(() => {
    void getBimViewer().initialize();
  });

  const title = document.querySelector("#bim-selected-title");

  if (title) title.textContent = turbine.name;
}

function closeDiagnosis(): void {
  dashboardShell.dataset.mode = "intro";
  setActiveModule("health");
  if (warningActive) {
    getBimViewer().stopWarning();
    warningActive = false;
    const warningButton = document.querySelector<HTMLButtonElement>("#bim-warning");
    if (warningButton) warningButton.textContent = "告警闪烁";
  }
}

void createWindFarmScene({
  container: sceneRoot,
  config: firstSliceSceneConfig,
  onTurbineSelected: openDiagnosis,
}).then((scene) => {
  document.querySelector("#close-bim")?.addEventListener("click", () => {
    closeDiagnosis();
    scene.showMountainOverview();
  });
});

document.querySelectorAll<HTMLButtonElement>(".component").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".component").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const part = button.dataset.bimPart as BimPartKey | undefined;
    if (part) void getBimViewer().focusPart(part);
  });
});

document.querySelectorAll<HTMLButtonElement>(".part-label[data-bim-part]").forEach((button) => {
  button.addEventListener("click", () => {
    const part = button.dataset.bimPart as BimPartKey | undefined;
    if (part) void getBimViewer().focusPart(part);
  });
});

document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const moduleName = button.dataset.module ?? "health";
    const nextModule = dashboardShell.dataset.activeModule === moduleName ? "none" : moduleName;

    setActiveModule(nextModule);
  });
});

document.querySelector<HTMLButtonElement>("#bim-decompose")?.addEventListener("click", () => {
  void getBimViewer().decompose();
});

document.querySelector<HTMLButtonElement>("#bim-compose")?.addEventListener("click", () => {
  void getBimViewer().compose();
});

document.querySelector<HTMLButtonElement>("#bim-warning")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  warningActive = getBimViewer().toggleWarning();
  button.textContent = warningActive ? "停止告警" : "告警闪烁";
});
