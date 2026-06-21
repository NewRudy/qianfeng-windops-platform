import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { BimTurbineViewer, type BimPartKey } from "./bim/BimTurbineViewer";
import { createWindFarmScene } from "./scene/createWindFarmScene";
import { firstSliceSceneConfig, type TurbineAsset } from "./scene/sceneConfig";
import {
  buildGearboxWorkflowCase,
  gearboxCaseCatalog,
  gearboxWorkflowCase,
  type BoltChart,
  type ComponentRisk,
  type CmsChart,
  type FusionSignal,
  type GearboxWorkflowCase,
  type InspectionItem,
  type ModelGate,
  type ScadaChart,
  type WorkflowAction,
  type WorkflowEvidence,
  type WorkflowMetric,
  type WorkflowModule,
  type WorkflowModuleKey,
} from "./workflow/gearboxWorkflow";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing app root");
}

let activeCaseId = gearboxCaseCatalog[0]?.id ?? "";
let activeWorkflowCase: GearboxWorkflowCase = gearboxWorkflowCase;
let activeSpeechRecognition: SpeechRecognitionLike | undefined;

type SpeechRecognitionEventLike = {
  results: {
    [index: number]: {
      [index: number]: {
        transcript?: string;
      };
    };
    length: number;
  };
};

type SpeechRecognitionLike = {
  abort: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

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

function scaleValue(value: number, min: number, max: number, low: number, high: number): number {
  if (max === min) return low;
  return low + ((value - min) / (max - min)) * (high - low);
}

type SvgPlotArea = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

function renderSvgTicks(axis: ScadaChart["xAxis"] | ScadaChart["yAxis"], orientation: "x" | "y", plot: SvgPlotArea): string {
  return axis.ticks
    .map((tick) => {
      if (orientation === "x") {
        const x = scaleValue(tick, axis.min, axis.max, plot.left, plot.right);
        return `
          <line class="grid-line vertical" x1="${x}" y1="${plot.top}" x2="${x}" y2="${plot.bottom}"></line>
          <text class="tick-label" x="${x}" y="164" text-anchor="middle">${html(tick)}</text>
        `;
      }
      const y = scaleValue(tick, axis.min, axis.max, plot.bottom, plot.top);
      return `
        <line class="grid-line" x1="${plot.left}" y1="${y}" x2="${plot.right}" y2="${y}"></line>
        <text class="tick-label" x="34" y="${y + 4}" text-anchor="end">${html(tick)}</text>
      `;
    })
    .join("");
}

function renderScadaChart(chart?: ScadaChart): string {
  if (!chart) return "";
  const plot = { left: 42, right: 286, top: 18, bottom: 144 };
  const pointToSvg = (windSpeed: number, powerKw: number) =>
    `${scaleValue(windSpeed, chart.xAxis.min, chart.xAxis.max, plot.left, plot.right)},${scaleValue(powerKw, chart.yAxis.min, chart.yAxis.max, plot.bottom, plot.top)}`;
  const baseline = chart.points.map((point) => pointToSvg(point.windSpeed, point.expectedKw)).join(" ");
  const measured = chart.points.map((point) => pointToSvg(point.windSpeed, point.powerKw)).join(" ");
  const points = chart.points
    .map((point) => {
      const [x, y] = pointToSvg(point.windSpeed, point.powerKw).split(",");
      const abnormalClass = point.abnormal ? " abnormal" : "";
      return `<circle class="chart-point${abnormalClass}" cx="${x}" cy="${y}" r="${point.abnormal ? 4.6 : 3.2}"><title>${html(point.timestamp)} 残差 ${html(point.residualPct)}%</title></circle>`;
    })
    .join("");

  return `
    <figure class="engineering-chart scada-diagnostic">
      <figcaption>
        <strong>${html(chart.title)}</strong>
        <span>${html(chart.sampleWindow)}</span>
      </figcaption>
      <svg viewBox="0 0 304 184" role="img" aria-label="${html(chart.title)}">
        ${renderSvgTicks(chart.yAxis, "y", plot)}
        ${renderSvgTicks(chart.xAxis, "x", plot)}
        <line class="axis-line" x1="${plot.left}" y1="${plot.bottom}" x2="${plot.right}" y2="${plot.bottom}"></line>
        <line class="axis-line" x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${plot.bottom}"></line>
        <polyline class="chart-line baseline" points="${baseline}"></polyline>
        <polyline class="chart-line measured" points="${measured}"></polyline>
        ${points}
        <text class="axis-title x-title" x="164" y="181" text-anchor="middle">${html(chart.xAxis.label)}</text>
        <text class="axis-title y-title" x="-82" y="12" text-anchor="middle" transform="rotate(-90)">${html(chart.yAxis.label)}</text>
      </svg>
      <div class="chart-legend">
        <span><i class="legend-line baseline"></i>${html(chart.baselineLabel)}</span>
        <span><i class="legend-line measured"></i>实测功率</span>
        <span><i class="legend-dot abnormal"></i>异常采样</span>
      </div>
    </figure>
  `;
}

function renderCmsChart(chart?: CmsChart): string {
  if (!chart) return "";
  const plot = { left: 42, right: 286, top: 18, bottom: 132 };
  const thresholdY = scaleValue(chart.threshold.value, chart.yAxis.min, chart.yAxis.max, plot.bottom, plot.top);
  const bars = chart.peaks
    .map((peak) => {
      const x = scaleValue(peak.frequencyHz, chart.xAxis.min, chart.xAxis.max, plot.left, plot.right);
      const y = scaleValue(peak.amplitude, chart.yAxis.min, chart.yAxis.max, plot.bottom, plot.top);
      const height = plot.bottom - y;
      return `
        <g class="spectrum-peak ${peak.status}">
          <rect x="${x - 5}" y="${y}" width="10" height="${height}"></rect>
          <text x="${x}" y="${Math.max(12, y - 5)}" text-anchor="middle">${html(peak.label)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <figure class="engineering-chart cms-spectrum">
      <figcaption>
        <strong>${html(chart.title)}</strong>
        <span>${html(chart.sampleWindow)}</span>
      </figcaption>
      <svg viewBox="0 0 304 184" role="img" aria-label="${html(chart.title)}">
        ${renderSvgTicks(chart.yAxis, "y", plot)}
        ${renderSvgTicks(chart.xAxis, "x", plot)}
        <line class="axis-line" x1="${plot.left}" y1="${plot.bottom}" x2="${plot.right}" y2="${plot.bottom}"></line>
        <line class="axis-line" x1="${plot.left}" y1="${plot.top}" x2="${plot.left}" y2="${plot.bottom}"></line>
        <line class="threshold-line" x1="${plot.left}" y1="${thresholdY}" x2="${plot.right}" y2="${thresholdY}"></line>
        <text class="threshold-label" x="${plot.right - 2}" y="${thresholdY - 4}" text-anchor="end">${html(chart.threshold.label)} ${html(chart.threshold.value)}</text>
        ${bars}
        <text class="axis-title x-title" x="164" y="181" text-anchor="middle">${html(chart.xAxis.label)}</text>
        <text class="axis-title y-title" x="-82" y="12" text-anchor="middle" transform="rotate(-90)">${html(chart.yAxis.label)}</text>
      </svg>
    </figure>
  `;
}

function renderBoltChart(chart?: BoltChart): string {
  if (!chart) return "";
  const center = { x: 152, y: 82 };
  const radius = 48;
  const channels = chart.channels
    .map((channel) => {
      const radians = (channel.angle - 90) * (Math.PI / 180);
      const x = center.x + Math.cos(radians) * radius;
      const y = center.y + Math.sin(radians) * radius;
      const labelX = center.x + Math.cos(radians) * (radius + 24);
      const labelY = center.y + Math.sin(radians) * (radius + 24);
      return `
        <g class="bolt-channel ${channel.status}">
          <line x1="${center.x}" y1="${center.y}" x2="${x}" y2="${y}"></line>
          <circle cx="${x}" cy="${y}" r="6"><title>${html(channel.id)} ${html(channel.preloadKn)} kN / 松弛 ${html(channel.relaxationPct)}%</title></circle>
          <text x="${labelX}" y="${labelY + 3}" text-anchor="middle">${html(channel.id)}</text>
        </g>
      `;
    })
    .join("");

  return `
    <figure class="engineering-chart bolt-map">
      <figcaption>
        <strong>${html(chart.title)}</strong>
        <span>标称预紧力 ${html(chart.nominalPreloadKn)} kN / 松弛预警 ${html(chart.warningRelaxationPct)}%</span>
      </figcaption>
      <svg viewBox="0 0 304 164" role="img" aria-label="${html(chart.title)}">
        <circle class="bolt-ring" cx="${center.x}" cy="${center.y}" r="${radius}"></circle>
        <circle class="bolt-hub" cx="${center.x}" cy="${center.y}" r="20"></circle>
        ${channels}
      </svg>
      <div class="chart-legend">
        <span><i class="legend-dot normal"></i>正常</span>
        <span><i class="legend-dot watch"></i>关注</span>
        <span><i class="legend-dot warning"></i>预警</span>
      </div>
    </figure>
  `;
}

function renderEvidenceRows(rows: WorkflowEvidence[] = []): string {
  return rows
    .map(
      (row) => `
        <li class="evidence-row">
          <div>
            <span>${html(row.label)} · ${html(row.source)}</span>
            <strong>${html(row.value)}</strong>
          </div>
          <small>窗口 ${html(row.window)} / 模型 ${html(row.model)} / 阈值 ${html(row.threshold)} / 置信度 ${html(row.confidence)}</small>
        </li>
      `,
    )
    .join("");
}

function renderFusionSignals(signals: FusionSignal[] = []): string {
  return signals
    .map(
      (signal) => `
        <article class="fusion-card ${html(signal.status)}">
          <div>
            <span>${html(signal.source)}</span>
            <strong>${html(signal.metric)}</strong>
          </div>
          <p>${html(signal.contribution)}</p>
          <dl>
            <div><dt>质量</dt><dd>${html(signal.quality)}</dd></div>
            <div><dt>窗口</dt><dd>${html(signal.window)}</dd></div>
            <div><dt>判据</dt><dd>${html(signal.rule)}</dd></div>
          </dl>
        </article>
      `,
    )
    .join("");
}

function renderModelGates(gates: ModelGate[] = []): string {
  return gates
    .map(
      (gate) => `
        <li class="${html(gate.status)}">
          <span>${html(gate.layer)}</span>
          <div>
            <strong>${html(gate.method)}</strong>
            <p>${html(gate.rule)}</p>
          </div>
          <em>${html(gate.result)}</em>
        </li>
      `,
    )
    .join("");
}

function renderInspectionItems(items: InspectionItem[] = []): string {
  return items
    .map(
      (item) => `
        <li class="${html(item.status)}">
          <span>${html(item.step)}</span>
          <div>
            <strong>${html(item.result)}</strong>
            <p>${html(item.basis)}</p>
          </div>
          <em>${html(item.owner)}</em>
        </li>
      `,
    )
    .join("");
}

function renderAction(action?: WorkflowAction, extraAttribute = ""): string {
  if (!action) return "";
  const primaryClass = action.primary ? " primary" : "";
  return `<button class="module-action${primaryClass}" type="button" data-open-module="${html(action.module)}"${extraAttribute}>${html(action.label)}</button>`;
}

function renderAiBrief(module: WorkflowModule): string {
  const brief = module.aiBrief;
  if (!brief) return "";

  return `
    <article class="ai-brief-card ${html(brief.riskLevel)}">
      <div>
        <span>AI 当前判断</span>
        <strong>${html(brief.primaryFinding)}</strong>
      </div>
      <p>${html(brief.conclusion)}</p>
      <ol>
        ${brief.evidence.map((item) => `<li>${html(item)}</li>`).join("")}
      </ol>
      <footer>
        <small>建议动作</small>
        <b>${html(brief.recommendedAction)}</b>
      </footer>
    </article>
    <div class="ai-question-chips" aria-label="常用追问">
      ${brief.operatorQuestions.map((question) => `<button type="button" data-ai-question="${html(question)}">${html(question)}</button>`).join("")}
    </div>
    <section class="ai-generated-report" aria-live="polite">
      <header>
        <span>AI 值班报告</span>
        <div class="ai-report-actions">
          <button type="button" data-ai-voice-question>语音问AI</button>
          <button type="button" data-ai-generate-report>生成AI报告</button>
        </div>
      </header>
      <p id="ai-generated-report-text">后端代理已准备接收诊断包。点击生成后，模型不可用时会自动返回规则兜底报告。</p>
    </section>
  `;
}

function renderCaseOptions(): string {
  return gearboxCaseCatalog
    .map((entry) => {
      const selected = entry.id === activeCaseId ? " selected" : "";
      return `<option value="${html(entry.id)}"${selected}>${html(entry.title)}</option>`;
    })
    .join("");
}

function renderComponentButton(item: ComponentRisk): string {
  const isActive = item.component === "gearbox" ? " active" : "";
  return `
    <button class="component${isActive}" type="button" data-component="${html(item.component)}" data-bim-part="${html(item.part)}" data-module="${html(item.module)}">
      <span>${html(item.title)}</span><strong>${html(item.status)}</strong>
    </button>
  `;
}

function renderModulePanel(moduleKey: WorkflowModuleKey, module: WorkflowModule, workflowCase: GearboxWorkflowCase): string {
  if (moduleKey === "brief") {
    return `
      <section class="module-panel module-brief">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderAiBrief(module)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action)}
      </section>
    `;
  }

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
        ${renderScadaChart(module.scadaChart)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "fusion") {
    return `
      <section class="module-panel module-fusion">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        <div class="fusion-source-grid">${renderFusionSignals(module.fusionSignals)}</div>
        <ol class="model-gate-list">${renderModelGates(module.modelGates)}</ol>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "cms") {
    return `
      <section class="module-panel module-cms">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderCmsChart(module.cmsChart)}
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
        ${renderBoltChart(module.boltChart)}
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
          <strong>${html(workflowCase.turbineId)} ${html(workflowCase.eventCode)}</strong>
          <p>${html(module.body ?? "")}</p>
        </article>
        <ul class="event-list">${renderEvidenceRows(module.evidenceRows)}</ul>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "inspection") {
    return `
      <section class="module-panel module-inspection">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        <dl>${renderMetrics(module.metrics)}</dl>
        <p>${html(module.body ?? "")}</p>
        <ol class="inspection-list">${renderInspectionItems(module.inspectionItems)}</ol>
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

      <section class="ai-duty-card" aria-label="AI 值班播报" aria-live="polite">
        <div>
          <span>AI 值班事件</span>
          <strong id="ai-duty-title">${html(activeWorkflowCase.modules.brief.aiBrief?.primaryFinding ?? "等待诊断事件")}</strong>
        </div>
        <p id="ai-duty-text">${html(activeWorkflowCase.modules.brief.aiBrief?.conclusion ?? "")}</p>
        <footer>
          <small id="ai-duty-status">已生成播报，等待风场巡航完成</small>
          <button id="ai-duty-speak" type="button">语音播报</button>
          <button id="ai-duty-open" type="button">进入诊断包</button>
        </footer>
      </section>

      <section class="bim-screen" aria-label="单机组 BIM 智驭诊断大屏">
        <header class="bim-header">
          <div>
            <h2>黔风智维 - 风电机组智能预警与故障诊断平台</h2>
          </div>
          <label class="case-switcher" for="case-selector">
            <span>案例</span>
            <select id="case-selector" aria-label="切换故障案例">
              ${renderCaseOptions()}
            </select>
          </label>
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
            <button id="bim-toggle-decompose" type="button" data-state="composed">拆解模型</button>
            <button id="bim-warning" type="button">告警闪烁</button>
          </div>
          <button class="part-label label-blade" type="button" data-bim-part="blade">叶片/变桨</button>
          <button class="part-label label-gearbox" type="button" data-bim-part="gearbox">齿轮箱</button>
          <button class="part-label label-generator" type="button" data-bim-part="nacelle">发电机</button>
          <button class="part-label label-yaw" type="button" data-bim-part="hub">转子主轴</button>
          <button class="part-label label-tower" type="button" data-bim-part="tower">塔筒结构</button>
        </section>

        <aside class="component-strip" aria-label="部件拆分">
          ${activeWorkflowCase.componentRisks.map(renderComponentButton).join("")}
        </aside>

        <aside class="module-drawer" aria-label="业务模块">
          ${activeWorkflowCase.moduleOrder.map((moduleKey) => renderModulePanel(moduleKey, activeWorkflowCase.modules[moduleKey], activeWorkflowCase)).join("")}
        </aside>

        <nav class="bim-toolbar" aria-label="业务流程">
          <button class="module-tab" type="button" data-module="brief">AI诊断包</button>
          <button class="module-tab" type="button" data-module="health">健康评分</button>
          <button class="module-tab" type="button" data-module="fusion">融合判据</button>
          <button class="module-tab" type="button" data-module="scada">SCADA</button>
          <button class="module-tab" type="button" data-module="cms">CMS</button>
          <button class="module-tab" type="button" data-module="bolts">螺栓监测</button>
          <button class="module-tab" type="button" data-module="alerts">告警中心</button>
          <button class="module-tab" type="button" data-module="inspection">隐患排查</button>
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
const componentStrip = document.querySelector<HTMLElement>(".component-strip");
const moduleDrawer = document.querySelector<HTMLElement>(".module-drawer");
const caseSelector = document.querySelector<HTMLSelectElement>("#case-selector");
const aiDutyTitle = document.querySelector<HTMLElement>("#ai-duty-title");
const aiDutyText = document.querySelector<HTMLElement>("#ai-duty-text");
const aiDutyStatus = document.querySelector<HTMLElement>("#ai-duty-status");

if (!shell || !sceneRoot || !bimModelRoot || !componentStrip || !moduleDrawer || !caseSelector) {
  throw new Error("Missing dashboard shell, Cesium root, BIM root, or workflow controls");
}

const dashboardShell = shell;
const bimModelContainer = bimModelRoot;
const workflowComponentStrip = componentStrip;
const workflowModuleDrawer = moduleDrawer;
const workflowCaseSelector = caseSelector;
let bimViewer: BimTurbineViewer | undefined;
let warningActive = false;
let modelDecomposed = false;
let hasPlayedIntroBroadcast = false;

function setBimStatus(status: string): void {
  if (bimStatus) bimStatus.textContent = status;
}

function setActiveComponent(componentName: string): void {
  document.querySelectorAll<HTMLButtonElement>(".component").forEach((item) => {
    item.classList.toggle("active", item.dataset.component === componentName);
  });
}

function isWorkflowModuleKey(value: string): value is WorkflowModuleKey {
  return activeWorkflowCase.moduleOrder.includes(value as WorkflowModuleKey);
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
  return activeWorkflowCase.partNamePattern.test(partName);
}

function activateGearboxWorkflow(moduleName: WorkflowModuleKey = "alerts"): void {
  setActiveComponent("gearbox");
  openWorkflowModule(moduleName, activeWorkflowCase.statuses.locked);
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

function setSelectedTurbineTitle(turbineId: string): void {
  const title = document.querySelector("#bim-selected-title");
  if (title) title.textContent = turbineId;
}

function updateAiDutyCard(): void {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (aiDutyTitle) aiDutyTitle.textContent = brief?.primaryFinding ?? "等待诊断事件";
  if (aiDutyText) aiDutyText.textContent = brief?.conclusion ?? "";
  if (aiDutyStatus) aiDutyStatus.textContent = "AI 已生成诊断播报，可语音复述或进入诊断包";
}

function renderWorkflowSurfaces(): void {
  workflowComponentStrip.innerHTML = activeWorkflowCase.componentRisks.map(renderComponentButton).join("");
  workflowModuleDrawer.innerHTML = activeWorkflowCase.moduleOrder
    .map((moduleKey) => renderModulePanel(moduleKey, activeWorkflowCase.modules[moduleKey], activeWorkflowCase))
    .join("");
  bindWorkflowSurfaceEvents();
}

function selectWorkflowCase(caseId: string): void {
  const nextCase = gearboxCaseCatalog.find((entry) => entry.id === caseId);
  if (!nextCase) return;

  const activeModule = getWorkflowModule(dashboardShell.dataset.activeModule ?? "", "brief") ?? "brief";
  activeCaseId = nextCase.id;
  workflowCaseSelector.value = activeCaseId;
  activeWorkflowCase = buildGearboxWorkflowCase(nextCase.input);
  renderWorkflowSurfaces();
  setSelectedTurbineTitle(activeWorkflowCase.turbineId);
  updateAiDutyCard();
  openWorkflowModule(activeModule, `已切换案例：${nextCase.title}`);
  setActiveComponent("gearbox");

  if (["scada", "cms", "alerts", "inspection", "maintenance", "workorder"].includes(activeModule)) {
    void getBimViewer().focusPart("gearbox");
  }
}

function selectWorkflowCaseForTurbine(turbineId: string): void {
  const nextCase = gearboxCaseCatalog.find((entry) => entry.input.turbineId === turbineId);
  if (nextCase && nextCase.id !== activeCaseId) {
    selectWorkflowCase(nextCase.id);
  }
}

function openDiagnosis(turbine: TurbineAsset, moduleName: WorkflowModuleKey = "brief"): void {
  selectWorkflowCaseForTurbine(turbine.turbineId);
  dashboardShell.dataset.mode = "bim";
  setActiveModule(moduleName);
  window.requestAnimationFrame(() => {
    void getBimViewer().initialize();
  });

  if (turbine.name === activeWorkflowCase.turbineId) {
    setSelectedTurbineTitle(turbine.name);
  } else {
    setSelectedTurbineTitle(activeWorkflowCase.turbineId);
  }
}

function getDutyTurbine(): TurbineAsset {
  return (
    firstSliceSceneConfig.turbines.find((turbine) => turbine.turbineId === activeWorkflowCase.turbineId) ??
    firstSliceSceneConfig.turbines[0]
  );
}

type SpeechStatusHandlers = {
  onEnd?: () => void;
  onError?: () => void;
  onStart?: () => void;
  onUnsupported?: () => void;
};

type AiDiagnosisResponse = {
  answer?: string;
  source?: string;
};

function shortTurbineName(turbineId: string): string {
  const numericId = turbineId.match(/(\d+)$/)?.[1];
  return numericId ? `${Number(numericId)}号机` : turbineId;
}

function speakText(text: string, handlers: SpeechStatusHandlers, rate = 1.25): boolean {
  if (!("speechSynthesis" in window)) {
    handlers.onUnsupported?.();
    return false;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = rate;
  utterance.pitch = 0.96;
  utterance.onstart = handlers.onStart ?? null;
  utterance.onend = handlers.onEnd ?? null;
  utterance.onerror = handlers.onError ?? null;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  window.speechSynthesis.resume();
  return true;
}

function speakAiDutyBrief(userInitiated = true): void {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (!brief) return;

  speakText(brief.broadcast, {
    onEnd: () => {
      if (aiDutyStatus) aiDutyStatus.textContent = "播报完成，可进入诊断包查看证据链";
    },
    onError: () => {
      if (aiDutyStatus) {
        aiDutyStatus.textContent = userInitiated ? "浏览器语音未启动，诊断包文字已同步显示" : "AI 已生成播报，可点击语音播报";
      }
    },
    onStart: () => {
      if (aiDutyStatus) aiDutyStatus.textContent = "AI 正在播报当前风机风险";
    },
    onUnsupported: () => {
      if (aiDutyStatus) aiDutyStatus.textContent = "当前浏览器不支持语音播报，已保留文字诊断包";
    },
  });
}

function setAiReportText(text: string): void {
  const report = workflowModuleDrawer.querySelector<HTMLElement>("#ai-generated-report-text");
  if (report) report.textContent = text;
}

function buildAiVoiceAnswerSummary(): string {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (!brief) return "AI 答复：当前诊断包未就绪。";

  const finding = brief.primaryFinding.includes("齿轮箱") ? "齿轮箱 P1 预警" : brief.primaryFinding;
  const action = brief.recommendedAction
    .replace(/\s+-\s+/g, "到")
    .replace(/内安排/g, "内")
    .replace(/[。；]+$/g, "");

  return `AI 答复：${shortTurbineName(activeWorkflowCase.turbineId)}${finding}。${action}，复核前按限载策略运行。`;
}

function speakAiAnswerSummary(): void {
  speakText(buildAiVoiceAnswerSummary(), {
    onError: () => setBimStatus("AI 已生成文字答复，浏览器语音未启动"),
    onStart: () => setBimStatus("AI 正在播报处置结论"),
    onUnsupported: () => setBimStatus("当前浏览器不支持语音播报，已保留文字答复"),
  }, 1.28);
}

async function requestAiDiagnosisReport(
  question = "生成当前风险诊断摘要",
  options: { speak?: boolean } = {},
): Promise<AiDiagnosisResponse | undefined> {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (!brief) return;

  setAiReportText("AI 正在读取诊断包并生成报告...");
  try {
    const response = await fetch("/api/ai/diagnosis", {
      body: JSON.stringify({
        caseId: activeCaseId,
        diagnosis: {
          conclusion: brief.conclusion,
          evidence: brief.evidence,
          primaryFinding: brief.primaryFinding,
          recommendedAction: brief.recommendedAction,
        },
        question,
        turbineId: activeWorkflowCase.turbineId,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const result = await response.json() as AiDiagnosisResponse;
    const sourceLabel = result.source === "llm" ? "MiMo 模型" : "规则兜底";
    setAiReportText(`${sourceLabel}：${result.answer || "未返回有效报告"}`);
    if (options.speak) speakAiAnswerSummary();
    return result;
  } catch {
    const fallback = `规则兜底：${brief.conclusion} 建议动作：${brief.recommendedAction}`;
    setAiReportText(fallback);
    if (options.speak) speakAiAnswerSummary();
    return { answer: fallback, source: "fallback" };
  }
}

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | undefined {
  const speechWindow = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
}

function startVoiceAiQuestion(): void {
  const fallbackQuestion = activeWorkflowCase.modules.brief.aiBrief?.operatorQuestions[0] ?? "为什么判定为齿轮箱风险？";
  const Recognition = getSpeechRecognitionConstructor();

  if (!Recognition) {
    setAiReportText(`当前浏览器暂不支持语音识别，已改用快捷追问：${fallbackQuestion}`);
    setBimStatus("AI 语音识别不可用，已使用快捷追问继续诊断");
    void requestAiDiagnosisReport(fallbackQuestion, { speak: true });
    return;
  }

  activeSpeechRecognition?.abort();
  const recognition = new Recognition();
  let handled = false;

  const submitQuestion = (question: string) => {
    if (handled) return;
    handled = true;
    activeSpeechRecognition = undefined;
    setAiReportText(`已听到：${question}\nAI 正在生成回答...`);
    void requestAiDiagnosisReport(question, { speak: true });
  };

  recognition.lang = "zh-CN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    submitQuestion(event.results[0]?.[0]?.transcript?.trim() || fallbackQuestion);
  };
  recognition.onerror = () => {
    submitQuestion(fallbackQuestion);
  };
  recognition.onend = () => {
    if (!handled) {
      submitQuestion(fallbackQuestion);
    }
  };

  activeSpeechRecognition = recognition;
  setAiReportText("正在听取语音追问，可以问：为什么报警？下一步怎么处理？");
  setBimStatus("AI 正在听取运维追问");
  try {
    recognition.start();
  } catch {
    activeSpeechRecognition = undefined;
    setAiReportText(`语音识别未能启动，已改用快捷追问：${fallbackQuestion}`);
    void requestAiDiagnosisReport(fallbackQuestion, { speak: true });
  }
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
  if (modelDecomposed) {
    void getBimViewer().compose();
    modelDecomposed = false;
    const toggleButton = document.querySelector<HTMLButtonElement>("#bim-toggle-decompose");
    if (toggleButton) {
      toggleButton.textContent = "拆解模型";
      toggleButton.dataset.state = "composed";
    }
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

  document.querySelector<HTMLButtonElement>("#ai-duty-open")?.addEventListener("click", () => {
    scene.focusTurbine(activeWorkflowCase.turbineId);
  });

  window.setTimeout(() => {
    if (hasPlayedIntroBroadcast || dashboardShell.dataset.mode === "bim") return;
    hasPlayedIntroBroadcast = true;
    speakAiDutyBrief(false);
  }, 5200);
});

function bindWorkflowSurfaceEvents(): void {
  workflowComponentStrip.querySelectorAll<HTMLButtonElement>(".component").forEach((button) => {
    button.addEventListener("click", () => {
      const componentName = button.dataset.component ?? "";
      setActiveComponent(componentName);
      const part = button.dataset.bimPart as BimPartKey | undefined;
      if (componentName === "gearbox") {
        const nextModule = getWorkflowModule(button.dataset.module) ?? "alerts";
        if (part) {
          void getBimViewer()
            .focusPart(part)
            .then(() => openWorkflowModule(nextModule, activeWorkflowCase.statuses.componentEntry));
        } else {
          openWorkflowModule(nextModule, activeWorkflowCase.statuses.componentEntry);
        }
        return;
      }
      if (part) void getBimViewer().focusPart(part);
      const moduleName = getWorkflowModule(button.dataset.module);
      if (moduleName) openWorkflowModule(moduleName);
    });
  });

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-open-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const moduleName = getWorkflowModule(button.dataset.openModule);
      if (!moduleName) return;
      openWorkflowModule(moduleName);
      if (["scada", "cms", "alerts", "inspection", "maintenance", "workorder"].includes(moduleName)) {
        setActiveComponent("gearbox");
        void getBimViewer().focusPart("gearbox");
      }
    });
  });

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-ai-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = button.dataset.aiQuestion ?? "查看证据链";
      setBimStatus(`AI 已收到追问：${question}；下一步将接入语音问答服务`);
      void requestAiDiagnosisReport(question);
    });
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-ai-generate-report]")?.addEventListener("click", () => {
    void requestAiDiagnosisReport();
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-ai-voice-question]")?.addEventListener("click", () => {
    startVoiceAiQuestion();
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-create-workorder]")?.addEventListener("click", () => {
    const ticket = activeWorkflowCase.modules.workorder.ticket;
    const state = document.querySelector<HTMLElement>("#workorder-state");
    const code = document.querySelector<HTMLElement>("#workorder-code");
    const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
    if (state) state.textContent = ticket?.generatedState ?? "已生成";
    if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
    if (button) button.disabled = false;
    openWorkflowModule("workorder", activeWorkflowCase.statuses.ticketCreated);
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-close-workorder]")?.addEventListener("click", () => {
    const ticket = activeWorkflowCase.modules.workorder.ticket;
    const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
    const state = document.querySelector<HTMLElement>("#workorder-state");
    const code = document.querySelector<HTMLElement>("#workorder-code");
    if (state) state.textContent = ticket?.closedState ?? "现场复核完成";
    if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
    if (button) {
      button.textContent = ticket?.closedActionLabel ?? "现场复核已完成";
      button.disabled = true;
    }
    setBimStatus(activeWorkflowCase.statuses.ticketClosed);
  });
}

bindWorkflowSurfaceEvents();

workflowCaseSelector.addEventListener("change", () => {
  selectWorkflowCase(workflowCaseSelector.value);
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

document.querySelector<HTMLButtonElement>("#ai-duty-speak")?.addEventListener("click", () => {
  hasPlayedIntroBroadcast = true;
  speakAiDutyBrief(true);
});

document.querySelector<HTMLButtonElement>("#bim-toggle-decompose")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  const nextAction = modelDecomposed ? getBimViewer().compose() : getBimViewer().decompose();
  void nextAction.then(() => {
    modelDecomposed = !modelDecomposed;
    button.textContent = modelDecomposed ? "复原模型" : "拆解模型";
    button.dataset.state = modelDecomposed ? "decomposed" : "composed";
  });
});

document.querySelector<HTMLButtonElement>("#bim-warning")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  warningActive = getBimViewer().toggleWarning();
  button.textContent = warningActive ? "停止告警" : "告警闪烁";
});
