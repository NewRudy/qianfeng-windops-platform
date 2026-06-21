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
            <h2>黔风智维 - 风电机组智能预警与故障诊断平台</h2>
          </div>
          <strong id="bim-selected-title">HS-WTG-01</strong>
          <button id="close-bim" class="bim-back" type="button">返回 GIS 场景</button>
        </header>

        <section class="bim-stage" aria-label="风机 BIM 部件拆分视图">
          <div class="blueprint-grid" aria-hidden="true"></div>
          <div id="bim-model-root" class="first-version-bim-canvas" aria-label="风机 BIM 精细模型"></div>
          <div class="bim-stage-hud">
            <span>HS-WTG 单机透视</span>
            <strong id="bim-status">等待进入单机 BIM 诊断</strong>
            <em>点击部件定位；需要证据、工单或维护策略时从下方流程打开。</em>
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
          <button class="component" type="button" data-component="blade-root" data-bim-part="blade" data-module="bolts">
            <span>叶根螺栓</span><strong>稳定监视</strong>
          </button>
          <button class="component" type="button" data-component="drivetrain" data-bim-part="hub" data-module="cms">
            <span>传动链</span><strong>侧频复核</strong>
          </button>
          <button class="component active" type="button" data-component="gearbox" data-bim-part="gearbox" data-module="alerts">
            <span>齿轮箱</span><strong>P1 预警闭环</strong>
          </button>
          <button class="component" type="button" data-component="tower" data-bim-part="tower" data-module="bolts">
            <span>塔筒结构</span><strong>载荷校核</strong>
          </button>
        </aside>

        <aside class="module-drawer" aria-label="业务模块">
          <section class="module-panel module-health">
            <div class="module-kicker">Asset Health</div>
            <h3>HS-WTG-02 健康评分</h3>
            <div class="case-hero">
              <div class="score-ring"><strong>78</strong><span>综合健康</span></div>
              <div>
                <strong>齿轮箱链路进入 P1 关注</strong>
                <p>风机仍可限功率运行，但需在低风速窗口完成 CMS 复核与油液取样。</p>
              </div>
            </div>
            <dl>
              <div><dt>传动链健康</dt><dd>72 / 100</dd></div>
              <div><dt>功率曲线偏差</dt><dd>+12.8%</dd></div>
              <div><dt>风险置信度</dt><dd>84%</dd></div>
            </dl>
            <button class="module-action" type="button" data-open-module="scada">查看 SCADA 证据</button>
          </section>

          <section class="module-panel module-scada">
            <div class="module-kicker">Evidence 01 / SCADA</div>
            <h3>运行状态与模型残差</h3>
            <div class="signal-chart">
              <i style="height:42%"></i><i style="height:72%"></i><i style="height:58%"></i>
              <i style="height:85%"></i><i style="height:46%"></i><i style="height:64%"></i>
              <i style="height:78%"></i><i style="height:52%"></i><i style="height:90%"></i>
            </div>
            <dl>
              <div><dt>风速</dt><dd>6.71 m/s</dd></div>
              <div><dt>有功功率</dt><dd>812 kW</dd></div>
              <div><dt>功率残差</dt><dd>+12.8%</dd></div>
              <div><dt>齿轮箱油温</dt><dd>74.6 ℃</dd></div>
            </dl>
            <p>判断：同风速段输出偏低且油温抬升，符合传动链效率下降的早期迹象。</p>
            <button class="module-action" type="button" data-open-module="cms">联动 CMS 振动</button>
          </section>

          <section class="module-panel module-cms">
            <div class="module-kicker">Evidence 02 / CMS</div>
            <h3>齿轮箱振动诊断</h3>
            <div class="spectrum-strip" aria-label="频谱能量">
              <i style="height:28%"></i><i style="height:44%"></i><i style="height:64%"></i>
              <i style="height:38%"></i><i style="height:88%"></i><i style="height:42%"></i>
              <i style="height:74%"></i><i style="height:36%"></i><i style="height:58%"></i>
            </div>
            <dl>
              <div><dt>RMS 振动</dt><dd>2.562 mm/s</dd></div>
              <div><dt>啮合侧频</dt><dd>2.1x 基线</dd></div>
              <div><dt>疑似部件</dt><dd>齿轮箱高速轴轴承</dd></div>
            </dl>
            <p>机理+数值判断：山地阵风工况下侧频增强，结合 SCADA 残差指向齿轮箱早期磨损。</p>
            <button class="module-action" type="button" data-open-module="alerts">进入告警研判</button>
          </section>

          <section class="module-panel module-bolts">
            <div class="module-kicker">Evidence 03 / Bolt & Structure</div>
            <h3>螺栓与结构监测</h3>
            <dl>
              <div><dt>叶根平均预紧力</dt><dd>288.6 kN</dd></div>
              <div><dt>最低通道</dt><dd>B17 / 263.1 kN</dd></div>
              <div><dt>温漂补偿</dt><dd>已启用</dd></div>
              <div><dt>塔筒一阶频率</dt><dd>0.329 Hz</dd></div>
            </dl>
            <p>排查结论：当前主风险不来自叶根螺栓，但山地阵风载荷会放大传动链冲击，保留联动监视。</p>
            <button class="module-action" type="button" data-open-module="alerts">回到告警研判</button>
          </section>

          <section class="module-panel module-alerts">
            <div class="module-kicker">Decision / Alarm Center</div>
            <h3>齿轮箱 P1 预警研判</h3>
            <article class="alarm-card">
              <span>ORANGE</span>
              <strong>HS-WTG-02 gearbox_bearing_wear</strong>
              <p>SCADA 残差、油温与 CMS 侧频三项证据一致，建议转入预测维护。</p>
            </article>
            <ul class="event-list">
              <li><span>证据 1</span>同风速段功率残差 +12.8%</li>
              <li><span>证据 2</span>齿轮啮合侧频 2.1x 基线</li>
              <li><span>证据 3</span>油温 6h 均值高于同类机组 8.4 ℃</li>
            </ul>
            <button class="module-action primary" type="button" data-open-module="maintenance">生成维护建议</button>
          </section>

          <section class="module-panel module-maintenance">
            <div class="module-kicker">Action Plan / Predictive Maintenance</div>
            <h3>预测性维护建议</h3>
            <dl>
              <div><dt>建议处置窗口</dt><dd>48 - 72 h</dd></div>
              <div><dt>预计剩余可运行</dt><dd>168 h</dd></div>
              <div><dt>建议运行方式</dt><dd>限功率 80%</dd></div>
              <div><dt>备件</dt><dd>高速轴轴承 / 油液包</dd></div>
            </dl>
            <p>策略：利用明晚低风速窗口停机 2h，先做油液取样与内窥复核，若铁谱异常则升级检修。</p>
            <button class="module-action primary" type="button" data-create-workorder>生成运维工单</button>
          </section>

          <section class="module-panel module-workorder">
            <div class="module-kicker">Closed Loop / Work Order</div>
            <h3>运维工单</h3>
            <div class="workorder-ticket">
              <span id="workorder-state">待生成</span>
              <strong id="workorder-code">WO-GX-待创建</strong>
            </div>
            <ol class="workflow-list">
              <li><span>01</span>调度低风速停机窗口</li>
              <li><span>02</span>执行齿轮箱油液取样与内窥复核</li>
              <li><span>03</span>上传照片、油液报告和振动复测结果</li>
              <li><span>04</span>关闭告警并回写诊断样本</li>
            </ol>
            <button class="module-action" type="button" data-close-workorder>标记现场复核完成</button>
          </section>
        </aside>

        <nav class="bim-toolbar" aria-label="业务流程">
          <button class="module-tab" type="button" data-module="health">健康评分</button>
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

function setActiveComponent(componentName: string): void {
  document.querySelectorAll<HTMLButtonElement>(".component").forEach((item) => {
    item.classList.toggle("active", item.dataset.component === componentName);
  });
}

function openWorkflowModule(moduleName: string, status?: string): void {
  setActiveModule(moduleName);
  if (status) setBimStatus(status);
}

function isGearboxPart(partName: string): boolean {
  return /齿轮|gearbox|gear/i.test(partName);
}

function activateGearboxWorkflow(moduleName = "alerts"): void {
  setActiveComponent("gearbox");
  openWorkflowModule(moduleName, "齿轮箱预警闭环：已锁定 HS-WTG-02 高速轴轴承风险");
}

function getBimViewer(): BimTurbineViewer {
  if (!bimViewer) {
    bimViewer = new BimTurbineViewer({
      container: bimModelContainer,
      onPartPicked: (partName) => {
        if (isGearboxPart(partName)) activateGearboxWorkflow("alerts");
      },
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
  setActiveModule("none");
  window.requestAnimationFrame(() => {
    void getBimViewer().initialize();
  });

  const title = document.querySelector("#bim-selected-title");

  if (title) title.textContent = turbine.name;
}

function closeDiagnosis(): void {
  dashboardShell.dataset.mode = "intro";
  setActiveModule("none");
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
    const componentName = button.dataset.component ?? "";
    setActiveComponent(componentName);
    const part = button.dataset.bimPart as BimPartKey | undefined;
    if (componentName === "gearbox") {
      if (part) {
        void getBimViewer()
          .focusPart(part)
          .then(() => openWorkflowModule(button.dataset.module ?? "alerts", "齿轮箱预警闭环：从部件风险进入证据研判"));
      } else {
        openWorkflowModule(button.dataset.module ?? "alerts", "齿轮箱预警闭环：从部件风险进入证据研判");
      }
      return;
    }
    if (part) void getBimViewer().focusPart(part);
    if (button.dataset.module) openWorkflowModule(button.dataset.module);
  });
});

document.querySelectorAll<HTMLButtonElement>(".part-label[data-bim-part]").forEach((button) => {
  button.addEventListener("click", () => {
    const part = button.dataset.bimPart as BimPartKey | undefined;
    if (part === "gearbox") {
      void getBimViewer().focusPart(part).then(() => activateGearboxWorkflow("alerts"));
      return;
    }
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

document.querySelectorAll<HTMLButtonElement>("[data-open-module]").forEach((button) => {
  button.addEventListener("click", () => {
    const moduleName = button.dataset.openModule;
    if (!moduleName) return;
    openWorkflowModule(moduleName);
    if (["scada", "cms", "alerts", "maintenance", "workorder"].includes(moduleName)) {
      setActiveComponent("gearbox");
      void getBimViewer().focusPart("gearbox");
    }
  });
});

document.querySelector<HTMLButtonElement>("[data-create-workorder]")?.addEventListener("click", () => {
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  if (state) state.textContent = "已生成";
  if (code) code.textContent = "WO-GX-20260621-02";
  openWorkflowModule("workorder", "已生成齿轮箱预测维护工单：等待现场复核");
});

document.querySelector<HTMLButtonElement>("[data-close-workorder]")?.addEventListener("click", () => {
  const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  if (state) state.textContent = "现场复核完成";
  if (code) code.textContent = "WO-GX-20260621-02";
  if (button) {
    button.textContent = "现场复核已完成";
    button.disabled = true;
  }
  setBimStatus("工单回写完成：齿轮箱油液与内窥结果已进入复盘样本");
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
