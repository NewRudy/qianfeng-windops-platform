import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { BimTurbineViewer, type BimPartKey } from "./bim/BimTurbineViewer";
import { createWindFarmScene } from "./scene/createWindFarmScene";
import { firstSliceSceneConfig, type TurbineAsset } from "./scene/sceneConfig";
import {
  gearboxWorkflowCase,
  type ComponentRisk,
  type WorkflowAction,
  type WorkflowMetric,
  type WorkflowModule,
  type WorkflowModuleKey,
} from "./workflow/gearboxWorkflow";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing app root");
}

function html(value: string | number): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderMetrics(metrics: WorkflowMetric[] = []): string {
  return metrics.map((item) => `<div><dt>${html(item.label)}</dt><dd>${html(item.value)}</dd></div>`).join("");
}

function renderListRows(metrics: WorkflowMetric[] = []): string {
  return metrics.map((item) => `<li><span>${html(item.label)}</span>${html(item.value)}</li>`).join("");
}

function renderBars(heights: number[] = []): string {
  return heights.map((height) => `<i style="height:${height}%"></i>`).join("");
}

function renderAction(action?: WorkflowAction, extraAttribute = ""): string {
  if (!action) return "";
  const primaryClass = action.primary ? " primary" : "";
  return `<button class="module-action${primaryClass}" type="button" data-open-module="${html(action.module)}"${extraAttribute}>${html(action.label)}</button>`;
}

function renderComponentButton(item: ComponentRisk): string {
  const isActive = item.component === "gearbox" ? " active" : "";
  return `
    <button class="component${isActive}" type="button" data-component="${html(item.component)}" data-bim-part="${html(item.part)}" data-module="${html(item.module)}">
      <span>${html(item.title)}</span><strong>${html(item.status)}</strong>
    </button>
  `;
}

function renderModulePanel(moduleKey: WorkflowModuleKey, module: WorkflowModule): string {
  if (moduleKey === "health" && module.hero) {
    return `
      <section class="module-panel module-health">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <div class="case-hero">
          <div class="score-ring"><strong>${html(module.hero.score)}</strong><span>${html(module.hero.scoreLabel)}</span></div>
          <div>
            <strong>${html(module.hero.summary)}</strong>
            <p>${html(module.hero.text)}</p>
          </div>
        </div>
        <dl>${renderMetrics(module.metrics)}</dl>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "scada") {
    return `
      <section class="module-panel module-scada">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <div class="signal-chart">${renderBars(module.chartHeights)}</div>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "cms") {
    return `
      <section class="module-panel module-cms">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <div class="spectrum-strip" aria-label="频谱能量">${renderBars(module.spectrumHeights)}</div>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "bolts") {
    return `
      <section class="module-panel module-bolts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "alerts") {
    return `
      <section class="module-panel module-alerts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <article class="alarm-card">
          <span>ORANGE</span>
          <strong>${html(gearboxWorkflowCase.turbineId)} ${html(gearboxWorkflowCase.eventCode)}</strong>
          <p>${html(module.body ?? "")}</p>
        </article>
        <ul class="event-list">${renderListRows(module.evidenceRows)}</ul>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "maintenance") {
    return `
      <section class="module-panel module-maintenance">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action, " data-create-workorder")}
      </section>
    `;
  }

  const ticket = module.ticket;
  return `
    <section class="module-panel module-workorder">
      <div class="module-kicker">${html(module.kicker)}</div>
      <h3>${html(module.title)}</h3>
      <div class="workorder-ticket">
        <span id="workorder-state">${html(ticket?.initialState ?? "待生成")}</span>
        <strong id="workorder-code">${html(ticket?.draftCode ?? "WO-待创建")}</strong>
      </div>
      <ol class="workflow-list">
        ${(ticket?.steps ?? []).map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${html(step)}</li>`).join("")}
      </ol>
      <button class="module-action" type="button" data-close-workorder disabled>${html(ticket?.closeActionLabel ?? "标记完成")}</button>
    </section>
  `;
}

const workflowModules = gearboxWorkflowCase.modules;

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
          ${gearboxWorkflowCase.componentRisks.map(renderComponentButton).join("")}
        </aside>

        <aside class="module-drawer" aria-label="业务模块">
          ${gearboxWorkflowCase.moduleOrder.map((moduleKey) => renderModulePanel(moduleKey, workflowModules[moduleKey])).join("")}
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

function isWorkflowModuleKey(value: string): value is WorkflowModuleKey {
  return gearboxWorkflowCase.moduleOrder.includes(value as WorkflowModuleKey);
}

function getWorkflowModule(value: string | undefined, fallback?: WorkflowModuleKey): WorkflowModuleKey | undefined {
  if (value && isWorkflowModuleKey(value)) return value;
  return fallback;
}

function openWorkflowModule(moduleName: WorkflowModuleKey, status?: string): void {
  setActiveModule(moduleName);
  if (status) setBimStatus(status);
}

function isGearboxPart(partName: string): boolean {
  return gearboxWorkflowCase.partNamePattern.test(partName);
}

function activateGearboxWorkflow(moduleName: WorkflowModuleKey = "alerts"): void {
  setActiveComponent("gearbox");
  openWorkflowModule(moduleName, gearboxWorkflowCase.statuses.locked);
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
      const nextModule = getWorkflowModule(button.dataset.module) ?? "alerts";
      if (part) {
        void getBimViewer()
          .focusPart(part)
          .then(() => openWorkflowModule(nextModule, gearboxWorkflowCase.statuses.componentEntry));
      } else {
        openWorkflowModule(nextModule, gearboxWorkflowCase.statuses.componentEntry);
      }
      return;
    }
    if (part) void getBimViewer().focusPart(part);
    const moduleName = getWorkflowModule(button.dataset.module);
    if (moduleName) openWorkflowModule(moduleName);
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
    const moduleName = getWorkflowModule(button.dataset.module) ?? "health";
    const nextModule = dashboardShell.dataset.activeModule === moduleName ? "none" : moduleName;

    setActiveModule(nextModule);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-open-module]").forEach((button) => {
  button.addEventListener("click", () => {
    const moduleName = getWorkflowModule(button.dataset.openModule);
    if (!moduleName) return;
    openWorkflowModule(moduleName);
    if (["scada", "cms", "alerts", "maintenance", "workorder"].includes(moduleName)) {
      setActiveComponent("gearbox");
      void getBimViewer().focusPart("gearbox");
    }
  });
});

document.querySelector<HTMLButtonElement>("[data-create-workorder]")?.addEventListener("click", () => {
  const ticket = gearboxWorkflowCase.modules.workorder.ticket;
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  if (state) state.textContent = ticket?.generatedState ?? "已生成";
  if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
  if (button) button.disabled = false;
  openWorkflowModule("workorder", gearboxWorkflowCase.statuses.ticketCreated);
});

document.querySelector<HTMLButtonElement>("[data-close-workorder]")?.addEventListener("click", () => {
  const ticket = gearboxWorkflowCase.modules.workorder.ticket;
  const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  if (state) state.textContent = ticket?.closedState ?? "现场复核完成";
  if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
  if (button) {
    button.textContent = ticket?.closedActionLabel ?? "现场复核已完成";
    button.disabled = true;
  }
  setBimStatus(gearboxWorkflowCase.statuses.ticketClosed);
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
