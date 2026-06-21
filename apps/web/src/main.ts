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
  type EventTimelineStage,
  type EventTimelineStep,
  type FusionSignal,
  type GearboxWorkflowCase,
  type InspectionItem,
  type ModelGate,
  type ScadaChart,
  type WorkflowAction,
  type WorkflowDecision,
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

function renderEvidenceReviewPath(signals: FusionSignal[] = [], gates: ModelGate[] = []): string {
  const pairedSignals = signals.slice(0, gates.length);
  if (!pairedSignals.length) return "";

  return `
    <section class="evidence-review-path" aria-label="证据复核路径">
      <header>
        <span>复核路径</span>
        <strong>输入 -> 判据 -> 结论</strong>
      </header>
      <ol>
        ${pairedSignals.map((signal, index) => {
          const gate = gates[index];
          return `
            <li class="${html(signal.status)}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>输入数据</small>
                <strong>${html(signal.source)}</strong>
                <p>${html(signal.metric)} / ${html(signal.window)}</p>
              </div>
              <div>
                <small>模型判据</small>
                <strong>${html(gate?.method ?? signal.rule)}</strong>
                <p>${html(gate?.rule ?? signal.rule)}</p>
              </div>
              <div>
                <small>输出结论</small>
                <strong>${html(gate?.result ?? signal.contribution)}</strong>
                <p>${html(signal.quality)}</p>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
    </section>
  `;
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
  const statusLabels: Record<InspectionItem["status"], string> = {
    confirmed: "已确认",
    excluded: "已排除",
    pending: "待复核",
  };

  return items
    .map(
      (item) => `
        <li class="${html(item.status)}">
          <span>
            <b>${html(statusLabels[item.status])}</b>
            ${html(item.step)}
          </span>
          <div>
            <strong>${html(item.result)}</strong>
            <p>${html(item.basis)}</p>
            <small>影响：${html(item.decisionEffect)}</small>
          </div>
          <em>${html(item.owner)}</em>
        </li>
      `,
    )
    .join("");
}

function renderInspectionOutcomeBoard(items: InspectionItem[] = []): string {
  if (items.length === 0) return "";

  const confirmed = items.filter((item) => item.status === "confirmed");
  const excluded = items.filter((item) => item.status === "excluded");
  const pending = items.filter((item) => item.status === "pending");

  const summarize = (matchedItems: InspectionItem[], fallback: string) =>
    matchedItems.map((item) => item.decisionEffect).join("；") || fallback;

  return `
    <section class="inspection-outcome-board" aria-label="隐患排查结果对维护策略的影响">
      <article class="confirmed">
        <span>确认 ${confirmed.length}</span>
        <strong>锁定维护对象</strong>
        <p>${html(summarize(confirmed, "等待确认主疑似部件。"))}</p>
      </article>
      <article class="excluded">
        <span>排除 ${excluded.length}</span>
        <strong>收窄工单范围</strong>
        <p>${html(summarize(excluded, "暂无可排除项。"))}</p>
      </article>
      <article class="pending">
        <span>待复核 ${pending.length}</span>
        <strong>决定升级条件</strong>
        <p>${html(summarize(pending, "等待现场复核窗口。"))}</p>
      </article>
    </section>
  `;
}

function renderMaintenanceReadinessCard(ticket?: WorkflowModule["ticket"], inspectionItems: InspectionItem[] = []): string {
  if (!ticket) return "";

  const confirmedCount = inspectionItems.filter((item) => item.status === "confirmed").length;
  const excludedCount = inspectionItems.filter((item) => item.status === "excluded").length;
  const pendingCount = inspectionItems.filter((item) => item.status === "pending").length;

  return `
    <section class="maintenance-readiness-card" aria-label="预测维护生成工单前确认">
      <header>
        <span>工单前策略</span>
        <strong>由排查结果生成可执行条件</strong>
      </header>
      <dl>
        <div><dt>维护对象</dt><dd>${html(ticket.asset)}</dd></div>
        <div><dt>作业窗口</dt><dd>${html(ticket.dueWindow)}</dd></div>
        <div><dt>运行边界</dt><dd>${html(ticket.precondition)}</dd></div>
        <div><dt>备件工器具</dt><dd>${html(ticket.materials.join(" / "))}</dd></div>
      </dl>
      <p>排查结果：${confirmedCount} 项确认、${excludedCount} 项排除、${pendingCount} 项待复核；只有窗口、许可、资源、回写责任都确认后，才进入工单草案。</p>
      <div class="maintenance-confirm-grid">
        ${ticket.confirmationChecks.map((item) => `
          <article>
            <span>${html(item.owner)}</span>
            <strong>${html(item.label)}</strong>
            <small>${html(item.detail)}</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderWorkOrderWritebackSummary(ticket?: WorkflowModule["ticket"]): string {
  if (!ticket) return "";

  return `
    <section class="workorder-writeback-summary" aria-label="复盘回写状态">
      <header>
        <span>复盘回写</span>
        <strong data-writeback-summary-state>待现场完成后回写</strong>
      </header>
      <div>
        ${ticket.writebackItems.map((item) => `
          <article data-writeback-summary-item="pending">
            <span>${html(item.label)}</span>
            <strong>${html(item.value)}</strong>
          </article>
        `).join("")}
      </div>
      <p data-writeback-summary-note>回写完成后，事件会进入复盘样本，AI 诊断记录才允许闭环。</p>
    </section>
  `;
}

function renderBimLocalizationCard(risks: ComponentRisk[] = []): string {
  const primaryRisk = risks.find((risk) => risk.component === "gearbox") ?? risks[0];
  const counterRisks = risks.filter((risk) => risk.component !== primaryRisk?.component);
  if (!primaryRisk) return "";

  return `
    <section class="bim-localization-card" aria-label="BIM 部件定位与排除项">
      <header>
        <span>BIM 定位</span>
        <strong>告警落到具体部件</strong>
      </header>
      <button class="primary" type="button" data-bim-part="${html(primaryRisk.part)}" data-open-module="${html(primaryRisk.module)}">
        <span>疑似主部件</span>
        <strong>${html(primaryRisk.title)} · ${html(primaryRisk.status)}</strong>
        <small>融合判据指向 ${html(primaryRisk.title)}，点击聚焦 BIM 部件并进入研判。</small>
      </button>
      <div>
        ${counterRisks.map((risk) => `
          <button type="button" data-bim-part="${html(risk.part)}" data-open-module="${html(risk.module)}">
            <span>反证 / 联动</span>
            <strong>${html(risk.title)}</strong>
            <small>${html(risk.status)}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderAction(action?: WorkflowAction, extraAttribute = ""): string {
  if (!action) return "";
  const primaryClass = action.primary ? " primary" : "";
  return `<button class="module-action${primaryClass}" type="button" data-open-module="${html(action.module)}"${extraAttribute}>${html(action.label)}</button>`;
}

function renderDecisionCard(decision?: WorkflowDecision): string {
  if (!decision) return "";

  return `
    <article class="workflow-decision-card">
      <header>
        <span>业务动作</span>
        <strong>${html(decision.operation)}</strong>
      </header>
      <dl>
        <div><dt>输入数据</dt><dd>${html(decision.input)}</dd></div>
        <div><dt>调用模型</dt><dd>${html(decision.model)}</dd></div>
        <div><dt>输出结论</dt><dd>${html(decision.result)}</dd></div>
      </dl>
      <details>
        <summary>展开证据与人工边界</summary>
        <p>${html(decision.evidence)}</p>
        <p><b>人工确认：</b>${html(decision.confirm)}</p>
      </details>
    </article>
  `;
}

function renderModuleEvidenceNote(body?: string): string {
  if (!body) return "";
  return `<p class="module-evidence-note">${html(body)}</p>`;
}

function renderEvidenceReviewCard(decision?: WorkflowDecision): string {
  if (!decision) return "";

  return `
    <article class="evidence-review-card">
      <header>
        <span>证据复核</span>
        <strong>${html(decision.operation)}</strong>
      </header>
      <dl>
        <div><dt>看什么</dt><dd>${html(decision.input)}</dd></div>
        <div><dt>判据</dt><dd>${html(decision.model)}</dd></div>
        <div><dt>结论</dt><dd>${html(decision.result)}</dd></div>
      </dl>
      <footer>
        <span>人工确认</span>
        <p>${html(decision.confirm)}</p>
      </footer>
      <details>
        <summary>展开证据依据</summary>
        <p>${html(decision.evidence)}</p>
      </details>
    </article>
  `;
}

function renderOperationReviewCard(decision?: WorkflowDecision, context?: string): string {
  if (!decision) return "";

  return `
    <article class="operation-review-card">
      <header>
        <span>${context ? html(context) : "操作复核"}</span>
        <strong>${html(decision.operation)}</strong>
      </header>
      <dl>
        <div><dt>为什么</dt><dd>${html(decision.evidence)}</dd></div>
        <div><dt>判据</dt><dd>${html(decision.model)}</dd></div>
        <div><dt>结论</dt><dd>${html(decision.result)}</dd></div>
      </dl>
      <footer>
        <span>人工确认</span>
        <p>${html(decision.confirm)}</p>
      </footer>
    </article>
  `;
}

function renderEventTimeline(steps: EventTimelineStep[]): string {
  return `
    <section class="event-timeline" aria-label="值班事件闭环">
      <header>
        <span>值班事件闭环</span>
        <strong>AI 预警 -> 证据复核 -> 工单复盘</strong>
      </header>
      <ol>
        ${steps.map((step, index) => `
          <li class="event-step ${html(step.status)}" data-event-stage="${html(step.id)}" data-event-order="${index}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>${html(step.title)}</strong>
              <p>${html(step.description)}</p>
              <small>${html(step.owner)} / ${html(moduleText(step.module))}</small>
            </div>
          </li>
        `).join("")}
      </ol>
    </section>
  `;
}

function renderAiBrief(module: WorkflowModule): string {
  const brief = module.aiBrief;
  if (!brief) return "";
  const primaryAction = brief.primaryAction;
  const dutyFocus = brief.operatorFocus;

  return `
    ${renderEventTimeline(activeWorkflowCase.eventTimeline)}
    <section class="ai-duty-assistant ${html(brief.riskLevel)}">
      <header>
        <div>
          <span>AI 值班助手</span>
          <strong>下一步：${html(primaryAction.label)}</strong>
        </div>
        <small id="ai-agent-status">后端智能检测中</small>
      </header>
      <article class="ai-duty-decision">
        <span>当前判断</span>
        <h4>${html(brief.primaryFinding)}</h4>
        <p>${html(brief.conclusion)}</p>
      </article>
      <section class="agent-duty-focus ai-duty-default-focus">
        <header>
          <span>值班焦点</span>
          <strong>先处理这一步</strong>
        </header>
        <div>
          <article>
            <span>当前判断</span>
            <strong>${html(dutyFocus.decision)}</strong>
          </article>
          <article>
            <span>为什么看这里</span>
            <p>${html(dutyFocus.why)}</p>
          </article>
          <article>
            <span>人工边界</span>
            <p>${html(dutyFocus.humanCheck)}</p>
          </article>
        </div>
        <button type="button" data-open-module="${html(dutyFocus.recommendedModule)}">${html(dutyFocus.primaryQuestion)}</button>
      </section>
      <div class="ai-next-actions">
        <button class="primary" type="button" data-open-module="${html(primaryAction.module)}">${html(primaryAction.label)}</button>
        <button type="button" data-ai-generate-report>让 AI 解释这次预警</button>
      </div>
      <ol class="ai-decision-chain" aria-label="AI 决策链">
        ${brief.decisionSteps.map((step, index) => `
          <li>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>${html(step.title)}</strong>
              <dl>
                <div><dt>输入</dt><dd>${html(step.input)}</dd></div>
                <div><dt>模型</dt><dd>${html(step.model)}</dd></div>
                <div><dt>结果</dt><dd>${html(step.result)}</dd></div>
              </dl>
              <details>
                <summary>查看工程细节</summary>
                <p>${html(step.detail)}</p>
                <button type="button" data-open-module="${html(step.module)}">打开${html(moduleText(step.module))}</button>
              </details>
            </div>
          </li>
        `).join("")}
      </ol>
      <details class="ai-evidence-details">
        <summary>展开本次证据明细</summary>
        <ol>
          ${brief.evidence.map((item) => `<li>${html(item)}</li>`).join("")}
        </ol>
      </details>
    </section>
    <div class="ai-question-chips" aria-label="常用追问">
      ${brief.operatorQuestions.map((question) => `<button type="button" data-ai-question="${html(question)}">${html(question)}</button>`).join("")}
    </div>
    <section class="ai-generated-report" aria-live="polite">
      <header>
        <span>AI 对话与报告</span>
        <div class="ai-report-actions">
          <button type="button" data-ai-voice-question>语音问AI</button>
          <button type="button" data-ai-generate-report>生成AI报告</button>
        </div>
      </header>
      <div class="ai-question-console">
        <input id="ai-question-input" type="text" placeholder="例如：为什么不是螺栓问题？下一步怎么处理？" />
        <button type="button" data-ai-send-question>发送问题</button>
      </div>
      <div id="ai-generated-report-text" class="ai-report-body">你可以直接追问当前事件。AI 会先读取结构化证据包，再调用后端模型生成可追溯答复；停机、登塔、检修仍必须人工确认。</div>
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
        ${renderEvidenceReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 SCADA 图表与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderScadaChart(module.scadaChart)}
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "fusion") {
    return `
      <section class="module-panel module-fusion">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开多源证据与模型门控</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderEvidenceReviewPath(module.fusionSignals, module.modelGates)}
          <div class="fusion-source-grid">${renderFusionSignals(module.fusionSignals)}</div>
          <ol class="model-gate-list">${renderModelGates(module.modelGates)}</ol>
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "cms") {
    return `
      <section class="module-panel module-cms">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 CMS 频谱与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderCmsChart(module.cmsChart)}
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "bolts") {
    return `
      <section class="module-panel module-bolts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开螺栓/结构证据与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderBoltChart(module.boltChart)}
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "alerts") {
    return `
      <section class="module-panel module-alerts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision, `${workflowCase.turbineId} ${workflowCase.eventCode}`)}
        ${renderBimLocalizationCard(workflowCase.componentRisks)}
        <details class="module-evidence-stack">
          <summary>展开告警证据链与事件说明</summary>
          ${renderModuleEvidenceNote(module.body)}
          <ul class="event-list">${renderEvidenceRows(module.evidenceRows)}</ul>
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "inspection") {
    return `
      <section class="module-panel module-inspection">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        ${renderInspectionOutcomeBoard(module.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开排查原则与清单</summary>
          ${renderModuleEvidenceNote(module.body)}
          <ol class="inspection-list">${renderInspectionItems(module.inspectionItems)}</ol>
        </details>
        ${renderAction(module.action)}
      </section>
    `;
  }

  if (moduleKey === "maintenance") {
    return `
      <section class="module-panel module-maintenance">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision)}
        <dl>${renderMetrics(module.metrics)}</dl>
        ${renderMaintenanceReadinessCard(workflowCase.modules.workorder.ticket, workflowCase.modules.inspection.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开维护策略说明</summary>
          ${renderModuleEvidenceNote(module.body)}
        </details>
        ${renderAction(module.action, " data-create-workorder")}
      </section>
    `;
  }

  const ticket = module.ticket;
  return `
    <section class="module-panel module-workorder">
      <div class="module-kicker">${html(module.kicker)}</div>
      <h3>${html(module.title)}</h3>
      ${renderOperationReviewCard(module.decision)}
      <div class="workorder-ticket">
        <span id="workorder-state">${html(ticket?.initialState ?? "待生成")}</span>
        <strong id="workorder-code">${html(ticket?.draftCode ?? "WO-待创建")}</strong>
      </div>
      <dl class="workorder-execution-card">
        <div><dt>设备对象</dt><dd>${html(ticket?.asset ?? activeWorkflowCase.turbineId)}</dd></div>
        <div><dt>作业窗口</dt><dd>${html(ticket?.dueWindow ?? "48-72 h")}</dd></div>
        <div><dt>作业前提</dt><dd>${html(ticket?.precondition ?? "限功率运行")}</dd></div>
        <div><dt>回写责任</dt><dd>${html((ticket?.writebackItems ?? []).map((item) => item.label).join(" / "))}</dd></div>
      </dl>
      ${renderWorkOrderWritebackSummary(ticket)}
      <section class="workorder-confirmation">
        <header>
          <span>人工确认门</span>
          <strong>4 项确认后才允许派发</strong>
        </header>
        <div class="workorder-confirm-grid">
          ${(ticket?.confirmationChecks ?? []).map((item) => `
            <label class="workorder-confirm">
              <input type="checkbox" data-workorder-confirm="${html(item.id)}" />
              <span>
                <b>${html(item.label)}</b>
                <small>${html(item.owner)} / ${html(item.detail)}</small>
              </span>
            </label>
          `).join("")}
        </div>
        <button class="module-action primary" type="button" data-dispatch-workorder disabled>${html(ticket?.dispatchActionLabel ?? "确认派发工单")}</button>
      </section>
      <details class="module-evidence-stack">
        <summary>展开安全要求、工器具、步骤与验收标准</summary>
        <dl class="workorder-meta">
          <div><dt>优先级</dt><dd>${html(ticket?.priority ?? "P1 高优先级")}</dd></div>
          <div><dt>责任班组</dt><dd>${html(ticket?.assignee ?? "传动链专业班组")}</dd></div>
          <div><dt>位置</dt><dd>${html(ticket?.location ?? "山地风场")}</dd></div>
        </dl>
        <section class="workorder-section">
          <span>安全要求</span>
          <p>${html(ticket?.safetyRequirement ?? "按风场登塔和停机规程执行。")}</p>
        </section>
        <section class="workorder-section">
          <span>工器具 / 备件</span>
          <p>${html((ticket?.materials ?? []).join(" / "))}</p>
        </section>
        <ol class="workorder-steps">
          ${(ticket?.steps ?? []).map((step, index) => `
            <li>
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>${html(step.action)}</strong>
                <small>${html(step.owner)} / 输出：${html(step.output)}</small>
              </div>
            </li>
          `).join("")}
        </ol>
        <section class="workorder-section">
          <span>验收标准</span>
          <ul>
            ${(ticket?.acceptanceCriteria ?? []).map((item) => `<li>${html(item)}</li>`).join("")}
          </ul>
        </section>
        <section class="workorder-writeback">
          <span>复盘回写</span>
          <ul>
            ${(ticket?.writebackItems ?? []).map((item) => `<li data-writeback-item><b>${html(item.label)}</b><small>${html(item.value)}</small></li>`).join("")}
          </ul>
        </section>
      </details>
      <button class="module-action" type="button" data-close-workorder disabled>${html(ticket?.closeActionLabel ?? "标记完成")}</button>
    </section>
  `;
}

function getAiDutyEventText(): string {
  return `${shortTurbineName(activeWorkflowCase.turbineId)}齿轮箱出现一级预警。已锁定多源证据，进入诊断包查看证据链与工单。`;
}

root.innerHTML = `
  <main class="shell" data-mode="intro" data-ai-event="standby">
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
        <p id="ai-duty-text">${html(getAiDutyEventText())}</p>
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

const eventStageOrder: EventTimelineStage[] = [
  "ai-alert",
  "evidence-review",
  "bim-location",
  "workorder-draft",
  "human-confirm",
  "review-writeback",
];

function setBimStatus(status: string): void {
  if (bimStatus) bimStatus.textContent = status;
}

function setActiveComponent(componentName: string): void {
  document.querySelectorAll<HTMLButtonElement>(".component").forEach((item) => {
    item.classList.toggle("active", item.dataset.component === componentName);
  });
}

function setEventTimelineStage(stage: EventTimelineStage): void {
  const activeIndex = eventStageOrder.indexOf(stage);
  if (activeIndex < 0) return;

  workflowModuleDrawer.querySelectorAll<HTMLElement>(".event-step").forEach((item) => {
    const itemStage = item.dataset.eventStage as EventTimelineStage | undefined;
    const itemIndex = itemStage ? eventStageOrder.indexOf(itemStage) : -1;
    item.classList.remove("done", "active", "pending", "review");

    if (itemIndex < 0) {
      item.classList.add("pending");
      return;
    }
    if (itemIndex < activeIndex) {
      item.classList.add("done");
      return;
    }
    if (itemStage === "human-confirm" && stage === "workorder-draft") {
      item.classList.add("review");
      return;
    }
    item.classList.add(itemIndex === activeIndex ? "active" : "pending");
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
  setEventTimelineStage("bim-location");
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
  if (aiDutyText) aiDutyText.textContent = getAiDutyEventText();
  if (aiDutyStatus) aiDutyStatus.textContent = "AI 已生成诊断播报，可语音复述或进入诊断包";
}

function triggerIntroAiAlert(turbine: TurbineAsset): void {
  if (hasPlayedIntroBroadcast) return;
  hasPlayedIntroBroadcast = true;
  selectWorkflowCaseForTurbine(turbine.turbineId);
  dashboardShell.dataset.aiEvent = "active";
  setEventTimelineStage("ai-alert");
  updateAiDutyCard();
  if (aiDutyStatus) aiDutyStatus.textContent = "巡航发现异常，AI 已自动生成值班提醒";
  speakAiDutyBrief(false);
}

function renderWorkflowSurfaces(): void {
  workflowComponentStrip.innerHTML = activeWorkflowCase.componentRisks.map(renderComponentButton).join("");
  workflowModuleDrawer.innerHTML = activeWorkflowCase.moduleOrder
    .map((moduleKey) => renderModulePanel(moduleKey, activeWorkflowCase.modules[moduleKey], activeWorkflowCase))
    .join("");
  bindWorkflowSurfaceEvents();
  void refreshAgentStatus();
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
  setEventTimelineStage("ai-alert");
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
  answerText: string;
  bimHighlights: Array<{
    label: string;
    part: string;
    reason: string;
    severity: "alarm" | "normal" | "watch";
  }>;
  chartRefs: Array<{
    focus: string;
    label: string;
    module: WorkflowModuleKey;
    reason: string;
  }>;
  evidenceCards: Array<{
    confidence: number;
    interpretation: string;
    module: WorkflowModuleKey;
    severity: "alarm" | "normal" | "watch";
    source: string;
    title: string;
    value: string;
  }>;
  intent: string;
  operatorFocus: {
    decision: string;
    humanCheck: string;
    primaryQuestion: string;
    recommendedModule: WorkflowModuleKey;
    why: string;
  };
  reportSections: Array<{
    body: string;
    title: string;
  }>;
  riskBoundary: string;
  source: "fallback" | "llm";
  status: "fallback" | "ok";
  title: string;
  toolTrace: Array<{
    label: string;
    output: string;
    status: "ok" | "review";
    tool: string;
  }>;
  voiceText: string;
  workOrderDraft?: {
    acceptanceCriteria: string[];
    asset: string;
    assignee: string;
    code: string;
    confirmationChecks: Array<{
      detail: string;
      id: string;
      label: string;
      owner: string;
    }>;
    dueWindow: string;
    priority: string;
    safetyRequirement: string;
    status: string;
    steps: Array<{
      action: string;
      owner: string;
      output: string;
    }>;
    writebackItems: Array<{
      label: string;
      value: string;
    }>;
  };
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

function setAiReportHtml(markup: string): void {
  const report = workflowModuleDrawer.querySelector<HTMLElement>("#ai-generated-report-text");
  if (report) {
    report.innerHTML = markup;
    bindAgentResultEvents(report);
  }
}

function setAgentStatus(text: string, mode: "checking" | "configured" | "fallback" = "checking"): void {
  workflowModuleDrawer.querySelectorAll<HTMLElement>("#ai-agent-status").forEach((item) => {
    item.textContent = text;
    item.dataset.mode = mode;
  });
}

async function refreshAgentStatus(): Promise<void> {
  setAgentStatus("后端智能检测中", "checking");
  try {
    const response = await fetch("/api/agent/status");
    const status = await response.json() as { configured?: boolean; model?: string };
    if (status.configured) {
      setAgentStatus(`已接入 ${status.model ?? "大模型"}`, "configured");
      return;
    }
    setAgentStatus("本地规则兜底", "fallback");
  } catch {
    setAgentStatus("后端未连接", "fallback");
  }
}

function getAiQuestionInput(): HTMLInputElement | null {
  return workflowModuleDrawer.querySelector<HTMLInputElement>("#ai-question-input");
}

function moduleText(moduleName: WorkflowModuleKey): string {
  const labels: Record<WorkflowModuleKey, string> = {
    alerts: "告警中心",
    bolts: "螺栓监测",
    brief: "AI诊断包",
    cms: "CMS",
    fusion: "融合判据",
    health: "健康评分",
    inspection: "隐患排查",
    maintenance: "预测维护",
    scada: "SCADA",
    workorder: "运维工单",
  };
  return labels[moduleName];
}

function intentText(intent: string): string {
  const labels: Record<string, string> = {
    counter_evidence: "反证排查",
    evidence_chain: "证据链",
    explain_alarm: "告警解释",
    maintenance_plan: "处置策略",
    report: "诊断报告",
    workorder: "工单草案",
  };
  return labels[intent] ?? "值班问答";
}

function confidenceWidth(confidence: number): string {
  return `${Math.max(0, Math.min(100, confidence)).toFixed(0)}%`;
}

function renderAiGeneratedReport(result: AiDiagnosisResponse, question: string): string {
  const sourceLabel = result.source === "llm" ? "MiMo 大模型 + 诊断工具" : "本地诊断工具兜底";
  return `
    <article class="ai-domain-report agent-report">
      <header>
        <small>${html(sourceLabel)} / ${html(intentText(result.intent))}</small>
        <strong>${html(result.title)}</strong>
        <em>${html(question)}</em>
      </header>

      <section class="agent-answer-card">
        <span>AI 答复</span>
        <p>${html(result.answerText)}</p>
      </section>

      <section class="agent-duty-focus">
        <header>
          <span>值班焦点</span>
          <strong>先处理这一步</strong>
        </header>
        <div>
          <article>
            <span>当前判断</span>
            <strong>${html(result.operatorFocus.decision)}</strong>
          </article>
          <article>
            <span>为什么看这里</span>
            <p>${html(result.operatorFocus.why)}</p>
          </article>
          <article>
            <span>人工边界</span>
            <p>${html(result.operatorFocus.humanCheck)}</p>
          </article>
        </div>
        <button type="button" data-agent-open-module="${html(result.operatorFocus.recommendedModule)}">
          ${html(result.operatorFocus.primaryQuestion)}
        </button>
      </section>

      <section class="agent-evidence-grid" aria-label="AI 证据卡">
        ${result.evidenceCards.map((card) => `
          <button class="agent-evidence-card ${html(card.severity)}" type="button" data-agent-open-module="${html(card.module)}">
            <span>${html(card.title)} · ${html(card.source)}</span>
            <strong>${html(card.value)}</strong>
            <p>${html(card.interpretation)}</p>
            <div><i style="width: ${confidenceWidth(card.confidence)}"></i><b>${html(card.confidence)}%</b></div>
          </button>
        `).join("")}
      </section>

      <details class="agent-detail-group">
        <summary>展开图表联动、BIM 定位与报告正文</summary>
        <section class="agent-link-grid" aria-label="AI 图表联动">
          <h4>图表联动</h4>
          ${result.chartRefs.map((ref) => `
            <button type="button" data-agent-open-module="${html(ref.module)}">
              <span>${html(ref.label)}</span>
              <strong>${html(ref.focus)}</strong>
              <small>${html(ref.reason)}</small>
            </button>
          `).join("")}
        </section>

        <section class="agent-link-grid" aria-label="AI BIM 定位">
          <h4>BIM 定位</h4>
          ${result.bimHighlights.map((highlight) => `
            <button class="${html(highlight.severity)}" type="button" data-agent-bim-part="${html(highlight.part)}">
              <span>${html(highlight.label)}</span>
              <strong>${html(highlight.reason)}</strong>
            </button>
          `).join("")}
        </section>

        <section class="agent-report-sections">
          ${result.reportSections.map((section) => `
            <article>
              <h4>${html(section.title)}</h4>
              <p>${html(section.body)}</p>
            </article>
          `).join("")}
        </section>
      </details>

      ${result.workOrderDraft ? `
        <section class="agent-workorder-card">
          <header>
            <span>${html(result.workOrderDraft.status)}</span>
            <strong>${html(result.workOrderDraft.code)}</strong>
          </header>
          <dl>
            <div><dt>优先级</dt><dd>${html(result.workOrderDraft.priority)}</dd></div>
            <div><dt>责任人</dt><dd>${html(result.workOrderDraft.assignee)}</dd></div>
            <div><dt>对象</dt><dd>${html(result.workOrderDraft.asset)}</dd></div>
            <div><dt>窗口</dt><dd>${html(result.workOrderDraft.dueWindow)}</dd></div>
          </dl>
          <section class="agent-confirmation-gates">
            <h4>派发前确认门</h4>
            ${result.workOrderDraft.confirmationChecks.map((check) => `
              <article>
                <span>${html(check.owner)}</span>
                <strong>${html(check.label)}</strong>
                <p>${html(check.detail)}</p>
              </article>
            `).join("")}
          </section>
          <ol>
            ${result.workOrderDraft.steps.map((step, index) => `
              <li><span>${String(index + 1).padStart(2, "0")}</span><strong>${html(step.action)}</strong><small>${html(step.owner)} / ${html(step.output)}</small></li>
            `).join("")}
          </ol>
          <details class="agent-workorder-review">
            <summary>验收与回写要求</summary>
            <div>
              <section>
                <h4>验收标准</h4>
                ${result.workOrderDraft.acceptanceCriteria.map((item) => `<p>${html(item)}</p>`).join("")}
              </section>
              <section>
                <h4>复盘回写</h4>
                ${result.workOrderDraft.writebackItems.map((item) => `<p><strong>${html(item.label)}</strong><span>${html(item.value)}</span></p>`).join("")}
              </section>
            </div>
          </details>
          <button type="button" data-agent-create-workorder>打开工单草案</button>
        </section>
      ` : ""}

      <details class="agent-detail-group">
        <summary>展开 AI 工具轨迹</summary>
        <section class="agent-tool-trace">
          <h4>AI 工具轨迹</h4>
          <ol>
            ${result.toolTrace.map((item) => `
              <li class="${html(item.status)}">
                <span>${html(item.label)}</span>
                <strong>${html(item.output)}</strong>
                <small>${html(item.tool)}</small>
              </li>
            `).join("")}
          </ol>
        </section>
      </details>

      <section class="ai-report-boundary">
        <span>边界说明</span>
        <p>${html(result.riskBoundary)}</p>
      </section>
    </article>
  `;
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

function speakAiAnswerSummary(text?: string): void {
  speakText(text || buildAiVoiceAnswerSummary(), {
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
  setEventTimelineStage("evidence-review");
  try {
    const response = await fetch("/api/agent/ask", {
      body: JSON.stringify({
        caseId: activeCaseId,
        question,
        turbineId: activeWorkflowCase.turbineId,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const result = await response.json() as AiDiagnosisResponse;
    setAiReportHtml(renderAiGeneratedReport(result, question));
    if (options.speak) speakAiAnswerSummary(result.voiceText);
    return result;
  } catch {
    const result: AiDiagnosisResponse = {
      answerText: `规则兜底：${brief.conclusion} 建议动作：${brief.recommendedAction}`,
      bimHighlights: [],
      chartRefs: [],
      evidenceCards: [],
      intent: "explain_alarm",
      operatorFocus: {
        decision: "后端不可达",
        humanCheck: "恢复后端前不得把 AI 文字当成工程处置依据。",
        primaryQuestion: "查看 AI 诊断包",
        recommendedModule: "brief",
        why: "当前只保留本地规则包，无法调用后端 Agent 汇总工具轨迹。",
      },
      reportSections: [{ title: "规则兜底", body: brief.conclusion }],
      riskBoundary: "AI 服务暂不可用，当前只展示本地规则诊断包；现场操作必须人工确认。",
      source: "fallback",
      status: "fallback",
      title: `${activeWorkflowCase.turbineId} AI 值班诊断`,
      toolTrace: [{ label: "请求后端 Agent", output: "网络不可达，使用本地规则包", status: "review", tool: "frontend_fallback" }],
      voiceText: buildAiVoiceAnswerSummary(),
      workOrderDraft: undefined,
    };
    setAiReportHtml(renderAiGeneratedReport(result, question));
    if (options.speak) speakAiAnswerSummary();
    return result;
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
    const input = getAiQuestionInput();
    if (input) input.value = question;
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

function submitTypedAiQuestion(): void {
  const input = getAiQuestionInput();
  const question = input?.value.trim() || "下一步工单应该怎么安排？";
  if (input) input.value = question;
  setBimStatus(`AI 已收到追问：${question}`);
  void requestAiDiagnosisReport(question, { speak: true });
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
  onIntroComplete: triggerIntroAiAlert,
  onTurbineSelected: openDiagnosis,
}).then((scene) => {
  document.querySelector("#close-bim")?.addEventListener("click", () => {
    closeDiagnosis();
    scene.showMountainOverview();
  });

  document.querySelector<HTMLButtonElement>("#ai-duty-open")?.addEventListener("click", () => {
    scene.focusTurbine(activeWorkflowCase.turbineId);
    scene.showTurbineAlert(activeWorkflowCase.turbineId);
  });

  window.setTimeout(() => {
    if (hasPlayedIntroBroadcast || dashboardShell.dataset.mode === "bim") return;
    scene.showTurbineAlert(activeWorkflowCase.turbineId);
    triggerIntroAiAlert(getDutyTurbine());
  }, 5200);
});

function openGeneratedWorkOrder(status = activeWorkflowCase.statuses.ticketCreated): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  const dispatchButton = document.querySelector<HTMLButtonElement>("[data-dispatch-workorder]");
  const closeButton = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  if (state) state.textContent = ticket?.generatedState ?? "已生成";
  if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
  document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]").forEach((input) => {
    input.disabled = false;
  });
  if (dispatchButton) {
    dispatchButton.disabled = !areWorkOrderConfirmationsReady();
    dispatchButton.textContent = ticket?.dispatchActionLabel ?? "确认派发工单";
  }
  if (closeButton) closeButton.disabled = true;
  setEventTimelineStage("human-confirm");
  openWorkflowModule("workorder", status);
}

function areWorkOrderConfirmationsReady(): boolean {
  const checks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]"));
  return checks.length > 0 && checks.every((input) => input.checked);
}

function updateWorkOrderConfirmationState(): void {
  const dispatchButton = document.querySelector<HTMLButtonElement>("[data-dispatch-workorder]");
  if (!dispatchButton) return;
  dispatchButton.disabled = !areWorkOrderConfirmationsReady();
}

function dispatchWorkOrder(): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const dispatchButton = document.querySelector<HTMLButtonElement>("[data-dispatch-workorder]");
  const closeButton = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  if (!areWorkOrderConfirmationsReady()) {
    setBimStatus("工单仍有人工确认项未完成，暂不能派发");
    return;
  }
  if (state) state.textContent = ticket?.dispatchedState ?? "已派发待现场复核";
  document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]").forEach((input) => {
    input.disabled = true;
  });
  if (dispatchButton) {
    dispatchButton.textContent = "工单已派发";
    dispatchButton.disabled = true;
  }
  if (closeButton) closeButton.disabled = false;
  setEventTimelineStage("workorder-draft");
  setBimStatus("工单已通过人工确认并派发，等待现场复核回写");
}

function updateWorkOrderWritebackSummary(): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const summaryState = document.querySelector<HTMLElement>("[data-writeback-summary-state]");
  const summaryNote = document.querySelector<HTMLElement>("[data-writeback-summary-note]");
  const completedValues = [
    "铁谱/颗粒度报告已上传",
    "高速轴轴承与齿面照片已归档",
    "复测频谱已形成对比结论",
    "已写入 AI 诊断样本",
  ];

  if (summaryState) summaryState.textContent = ticket?.closedState ?? "现场复核完成";
  if (summaryNote) summaryNote.textContent = activeWorkflowCase.statuses.ticketClosed;

  document.querySelectorAll<HTMLElement>("[data-writeback-summary-item]").forEach((item, index) => {
    item.dataset.writebackSummaryItem = "done";
    const statusText = item.querySelector("strong");
    if (statusText) statusText.textContent = completedValues[index] ?? "已回写";
  });

  document.querySelectorAll<HTMLElement>("[data-writeback-item]").forEach((item, index) => {
    item.dataset.status = "done";
    const statusText = item.querySelector("small");
    if (statusText) statusText.textContent = completedValues[index] ?? statusText.textContent?.replace(/^待/, "已") ?? "已回写";
  });
}

function bindAgentResultEvents(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>("[data-agent-open-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const moduleName = getWorkflowModule(button.dataset.agentOpenModule);
      if (!moduleName) return;
      openWorkflowModule(moduleName, `AI 已打开${moduleText(moduleName)}证据`);
      setEventTimelineStage(moduleName === "workorder" ? "workorder-draft" : "evidence-review");
      if (["scada", "cms", "bolts", "alerts", "workorder"].includes(moduleName)) {
        setActiveComponent(moduleName === "bolts" ? "blade-root" : "gearbox");
        void getBimViewer().focusPart(moduleName === "bolts" ? "blade" : "gearbox");
      }
    });
  });

  container.querySelectorAll<HTMLButtonElement>("[data-agent-bim-part]").forEach((button) => {
    button.addEventListener("click", () => {
      const part = button.dataset.agentBimPart as BimPartKey | undefined;
      if (!part) return;
      if (part === "gearbox") {
        activateGearboxWorkflow("alerts");
      }
      setEventTimelineStage("bim-location");
      void getBimViewer().focusPart(part);
    });
  });

  container.querySelector<HTMLButtonElement>("[data-agent-create-workorder]")?.addEventListener("click", () => {
    openGeneratedWorkOrder("AI 已打开工单草案：等待现场工程师确认");
  });
}

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
            .then(() => {
              setEventTimelineStage("bim-location");
              openWorkflowModule(nextModule, activeWorkflowCase.statuses.componentEntry);
            });
        } else {
          setEventTimelineStage("bim-location");
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
      setEventTimelineStage(moduleName === "workorder" ? "workorder-draft" : "evidence-review");
      const part = button.dataset.bimPart as BimPartKey | undefined;
      if (part) {
        const componentName = part === "gearbox" ? "gearbox" : "";
        if (componentName) setActiveComponent(componentName);
        void getBimViewer().focusPart(part);
        return;
      }
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

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-ai-generate-report]").forEach((button) => {
    button.addEventListener("click", () => {
      void requestAiDiagnosisReport();
    });
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-ai-voice-question]")?.addEventListener("click", () => {
    startVoiceAiQuestion();
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-ai-send-question]")?.addEventListener("click", () => {
    submitTypedAiQuestion();
  });

  workflowModuleDrawer.querySelector<HTMLInputElement>("#ai-question-input")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitTypedAiQuestion();
    }
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-create-workorder]")?.addEventListener("click", () => {
    openGeneratedWorkOrder();
  });

  workflowModuleDrawer.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]").forEach((input) => {
    input.addEventListener("change", () => {
      updateWorkOrderConfirmationState();
    });
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-dispatch-workorder]")?.addEventListener("click", () => {
    dispatchWorkOrder();
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
    updateWorkOrderWritebackSummary();
    setEventTimelineStage("review-writeback");
    setBimStatus(activeWorkflowCase.statuses.ticketClosed);
  });
}

bindWorkflowSurfaceEvents();
void refreshAgentStatus();

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
    if (part) {
      setEventTimelineStage("bim-location");
      void getBimViewer().focusPart(part);
    }
  });
});

document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const moduleName = getWorkflowModule(button.dataset.module) ?? "health";
    const nextModule = dashboardShell.dataset.activeModule === moduleName ? "none" : moduleName;

    if (nextModule === "workorder") {
      openGeneratedWorkOrder();
      return;
    }

    setActiveModule(nextModule);
    if (["fusion", "scada", "cms", "bolts", "alerts", "inspection", "maintenance"].includes(nextModule)) {
      setEventTimelineStage(nextModule === "alerts" ? "bim-location" : "evidence-review");
    }
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
