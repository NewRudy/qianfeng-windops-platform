import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";
import { BimTurbineViewer, type BimPartKey } from "./bim/BimTurbineViewer";
import { createWindFarmScene } from "./scene/createWindFarmScene";
import { firstSliceSceneConfig, type TurbineAsset } from "./scene/sceneConfig";
import {
  buildHealthAssessment,
  type HealthAssessment,
  type HealthComponentScore,
  type HealthComponentStatus,
  type HealthDataSource,
} from "./workflow/healthAssessment";
import {
  buildWindOpsKnowledgeGraph,
  type KnowledgeDecisionPath,
  type KnowledgeGraphEdge,
  type KnowledgeGraphNode,
} from "./workflow/knowledgeGraph";
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

type WorkflowStageKey = "ai" | "evidence" | "locate" | "close";

type WorkflowStage = {
  description: string;
  focusLabel: string;
  key: WorkflowStageKey;
  modules: WorkflowModuleKey[];
  nextAction: string;
  primaryModule: WorkflowModuleKey;
  title: string;
};

type ManagementPageKey =
  | "event"
  | "health"
  | "scada"
  | "cms"
  | "structure"
  | "fusion"
  | "workorders"
  | "maintenance"
  | "knowledge";

type AnalysisActionPageKey = Exclude<ManagementPageKey, "event" | "knowledge">;

type ManagementPage = {
  key: ManagementPageKey;
  label: string;
  module: WorkflowModuleKey;
  subtitle: string;
  title: string;
};

type AnalysisRunRecord = {
  adoptedAt?: string;
  conclusion: string;
  evidenceState: "adopted" | "computed";
  humanBoundary: string;
  id: string;
  inputSummary: string;
  model: string;
  nextAction: string;
  status: "adopted" | "computed";
};

type AnalysisParameter = {
  label: string;
  value: string;
};

const workflowStages: WorkflowStage[] = [
  {
    description: "确认当前预警是否成立，明确等级、疑似部件和复核边界。",
    focusLabel: "当前预警",
    key: "ai",
    modules: ["brief", "health"],
    nextAction: "复核多源证据",
    primaryModule: "brief",
    title: "告警研判",
  },
  {
    description: "核对 SCADA、CMS、油温和结构监测是否在同一事件窗口内同向。",
    focusLabel: "数据一致性",
    key: "evidence",
    modules: ["scada", "cms", "bolts", "fusion"],
    nextAction: "查看关键证据",
    primaryModule: "fusion",
    title: "证据复核",
  },
  {
    description: "把风险落到 BIM 部件，记录主疑似对象和排除项。",
    focusLabel: "疑似部件",
    key: "locate",
    modules: ["alerts", "inspection"],
    nextAction: "定位齿轮箱",
    primaryModule: "alerts",
    title: "BIM定位",
  },
  {
    description: "形成处置策略、工单草案、人工签核和现场回写要求。",
    focusLabel: "人工闭环",
    key: "close",
    modules: ["maintenance", "workorder"],
    nextAction: "打开处置闭环",
    primaryModule: "maintenance",
    title: "处置闭环",
  },
];

const managementPages: ManagementPage[] = [
  {
    key: "event",
    label: "事件工作台",
    module: "brief",
    subtitle: "围绕当前告警组织证据、定位、工单和复盘状态。",
    title: "当前事件处置",
  },
  {
    key: "health",
    label: "健康管理",
    module: "health",
    subtitle: "按系统层级、部件权重和数据覆盖口径评估整机健康状态。",
    title: "风机健康管理",
  },
  {
    key: "scada",
    label: "SCADA",
    module: "scada",
    subtitle: "调整时间窗、基线和残差阈值后重新计算运行异常。",
    title: "SCADA 运行分析",
  },
  {
    key: "cms",
    label: "CMS",
    module: "cms",
    subtitle: "复核频谱、包络谱峰值和转速工况，输出部件侧证据。",
    title: "CMS 振动分析",
  },
  {
    key: "structure",
    label: "结构监测",
    module: "bolts",
    subtitle: "查看叶根螺栓、塔筒频率和结构侧反证。",
    title: "螺栓与结构监测",
  },
  {
    key: "fusion",
    label: "融合诊断",
    module: "fusion",
    subtitle: "把多源证据输入融合判据，明确支持项和反证项。",
    title: "多源融合诊断",
  },
  {
    key: "workorders",
    label: "工单中心",
    module: "workorder",
    subtitle: "管理待签核、已派发、执行中、验收和复盘回写记录。",
    title: "运维工单记录",
  },
  {
    key: "maintenance",
    label: "维护计划",
    module: "maintenance",
    subtitle: "管理预测维护策略、作业窗口、备件和班组资源。",
    title: "预测维护计划",
  },
  {
    key: "knowledge",
    label: "知识图谱",
    module: "alerts",
    subtitle: "查看机组、部件、故障模式、证据和处置规则的关系。",
    title: "风机故障知识图谱",
  },
];

const managementPageByKey = new Map(managementPages.map((page) => [page.key, page]));

function getWorkflowStageForModule(moduleName: string | undefined): WorkflowStage {
  return workflowStages.find((stage) => stage.modules.includes(moduleName as WorkflowModuleKey)) ?? workflowStages[0];
}

function getManagementPageForModule(moduleName: string | undefined): ManagementPageKey {
  const moduleToPage: Partial<Record<WorkflowModuleKey, ManagementPageKey>> = {
    alerts: "event",
    bolts: "structure",
    brief: "event",
    cms: "cms",
    fusion: "fusion",
    health: "health",
    inspection: "event",
    maintenance: "maintenance",
    scada: "scada",
    workorder: "workorders",
  };
  return moduleToPage[moduleName as WorkflowModuleKey] ?? "event";
}

function renderWorkflowCommandCard(): string {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  const stage = getWorkflowStageForModule("brief");

  return `
    <section class="workflow-command-card" aria-label="当前值班任务" data-workflow-command-card>
      <header>
        <span>当前事件</span>
        <strong data-command-title>${html(activeWorkflowCase.turbineId)} · ${html(brief?.primaryFinding ?? activeWorkflowCase.component)}</strong>
      </header>
      <div>
        <article>
          <span>值班步骤</span>
          <strong data-command-stage>${html(`${stage.title} / ${stage.focusLabel}`)}</strong>
        </article>
        <article>
          <span>本步目标</span>
          <p data-command-description>${html(stage.description)}</p>
        </article>
        <article>
          <span>下一步</span>
          <p data-command-next>${html(stage.nextAction)}</p>
        </article>
      </div>
    </section>
  `;
}

function renderWorkflowStageTabs(): string {
  return workflowStages.map((stage, index) => `
    <button class="workflow-stage-tab module-tab" type="button" data-stage="${html(stage.key)}" data-module="${html(stage.primaryModule)}">
      <span>${String(index + 1).padStart(2, "0")} ${html(stage.title)}</span>
      <strong>${html(stage.nextAction)}</strong>
      <small>${html(stage.description)}</small>
    </button>
  `).join("");
}

function renderManagementNav(): string {
  return `
    <nav class="management-nav" aria-label="管理端功能模块">
      ${managementPages.map((page) => `
        <button type="button" data-manager-page-button="${html(page.key)}">
          <span>${html(page.label)}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderManagementConsole(): string {
  return `
    <section class="management-console" aria-label="管理端页面">
      <header class="management-workbench-header">
        <div>
          <span>管理工作台</span>
          <strong>证据复核、模型复算、工单闭环</strong>
        </div>
        <button type="button" data-close-manager-workspace>返回BIM视图</button>
      </header>
      ${renderManagementNav()}
      <section class="management-pages">
        ${renderEventWorkbenchPage()}
        ${renderHealthManagementPage()}
        ${renderScadaManagementPage()}
        ${renderCmsManagementPage()}
        ${renderStructureManagementPage()}
        ${renderFusionManagementPage()}
        ${renderWorkOrderManagementPage()}
        ${renderMaintenanceManagementPage()}
        ${renderKnowledgeGraphPage()}
      </section>
    </section>
  `;
}

function renderManagementPageFrame(pageKey: ManagementPageKey, body: string): string {
  const page = managementPageByKey.get(pageKey) ?? managementPages[0];
  return `
    <article class="management-page" data-management-page="${html(page.key)}">
      <header class="management-page-header">
        <div>
          <span>${html(page.label)}</span>
          <h3>${html(page.title)}</h3>
          <p>${html(page.subtitle)}</p>
        </div>
        <button type="button" data-open-module="${html(page.module)}">打开关联证据</button>
      </header>
      ${body}
    </article>
  `;
}

function renderRecordTable(rows: Array<{ code: string; meta: string; result: string; status: string }>): string {
  return `
    <section class="record-list" aria-label="业务记录">
      ${rows.map((row) => `
        <article>
          <span>${html(row.status)}</span>
          <strong>${html(row.code)}</strong>
          <p>${html(row.result)}</p>
          <small>${html(row.meta)}</small>
        </article>
      `).join("")}
    </section>
  `;
}

function renderParameterPanel(
  pageKey: ManagementPageKey,
  params: Array<{ label: string; value: string; type?: "number" | "select"; options?: string[] }>,
): string {
  return `
    <section class="parameter-panel" aria-label="模型参数">
      <header>
        <span>模型参数</span>
        <strong>本页参数只影响本次复算记录</strong>
      </header>
      <div>
        ${params.map((param, index) => {
          if (param.type === "select") {
            return `
              <label>
                <span>${html(param.label)}</span>
                <select data-analysis-param="${html(pageKey)}-${index}">
                  ${(param.options ?? [param.value]).map((option) => `<option${option === param.value ? " selected" : ""}>${html(option)}</option>`).join("")}
                </select>
              </label>
            `;
          }
          return `
            <label>
              <span>${html(param.label)}</span>
              <input type="${param.type ?? "text"}" value="${html(param.value)}" data-analysis-param="${html(pageKey)}-${index}" />
            </label>
          `;
        }).join("")}
      </div>
      <footer>
        <button type="button" data-run-analysis="${html(pageKey)}">重新计算</button>
        <button type="button" data-adopt-evidence="${html(pageKey)}">采纳为当前事件证据</button>
      </footer>
      <section class="analysis-result" data-analysis-result="${html(pageKey)}">等待参数确认，尚未形成新的复算记录。</section>
    </section>
  `;
}

function renderEventWorkbenchPage(): string {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const rows = [
    {
      code: activeWorkflowCase.eventCode,
      meta: `${activeWorkflowCase.turbineId} / ${activeWorkflowCase.component}`,
      result: brief?.primaryFinding ?? "等待告警研判",
      status: "处置中",
    },
    {
      code: ticket?.draftCode ?? "WO-待创建",
      meta: ticket?.assignee ?? "传动链专业班组",
      result: ticket?.initialState ?? "等待生成工单草案",
      status: "工单",
    },
  ];
  return renderManagementPageFrame("event", `
    <section class="event-workbench-grid">
      <article class="event-primary-card">
        <span>当前告警</span>
        <strong>${html(activeWorkflowCase.turbineId)} · ${html(brief?.primaryFinding ?? activeWorkflowCase.component)}</strong>
        <p>${html(brief?.conclusion ?? "等待当前事件研判。")}</p>
      </article>
      <article class="event-primary-card">
        <span>下一步</span>
        <strong>${html(brief?.primaryAction.label ?? "复核证据")}</strong>
        <p>${html(brief?.operatorFocus.why ?? "先确认多源证据是否支持同一故障假设。")}</p>
      </article>
    </section>
    ${renderRecordTable(rows)}
    <section class="quick-module-grid">
      ${managementPages.filter((page) => page.key !== "event").map((page) => `
        <button type="button" data-manager-page-button="${html(page.key)}">
          <span>${html(page.label)}</span>
          <strong>${html(page.title)}</strong>
          <small>${html(page.subtitle)}</small>
        </button>
      `).join("")}
    </section>
  `);
}

function healthStatusLabel(status: HealthComponentStatus): string {
  if (status === "alarm") return "预警";
  if (status === "watch") return "关注";
  return "正常";
}

function renderHealthSourceCard(source: HealthDataSource): string {
  const statusLabel = source.status === "connected" ? "已接入" : source.status === "demo" ? "演示接口" : "待接入";
  return `
    <article class="health-source-card" data-source-status="${html(source.status)}">
      <header>
        <span>${html(statusLabel)}</span>
        <strong>${html(source.label)}</strong>
      </header>
      <p>${html(source.role)}</p>
      <small>${html(source.latest)} · ${html(source.boundary)}</small>
    </article>
  `;
}

function renderHealthComponentRow(component: HealthComponentScore): string {
  const sourceText = component.dataSources.map((source) => {
    const sourceLabelMap: Record<string, string> = {
      "ai-video": "AI视频",
      bolt: "螺栓",
      cms: "CMS",
      "flange-gap": "法兰",
      scada: "SCADA",
      uav: "无人机",
      weather: "气象",
    };
    return sourceLabelMap[source] ?? source;
  }).join(" / ");

  return `
    <article class="health-component-row" data-health-status="${html(component.status)}" data-health-level="${component.level}">
      <div class="health-component-main">
        <span>${component.level === 1 ? "系统层级" : "子部件"} · 权重 ${component.weightPct}%</span>
        <strong>${html(component.label)}</strong>
        <p>${html(component.reason)}</p>
      </div>
      <div class="health-score-meter" aria-label="${html(component.label)}健康度">
        <strong>${component.score}</strong>
        <span>${html(healthStatusLabel(component.status))}</span>
        <i style="--score: ${component.score}%;"></i>
      </div>
      <div class="health-component-evidence">
        <span>${html(sourceText)}</span>
        <p>${html(component.screening)}</p>
        <small>${html(component.nextAction)}</small>
      </div>
    </article>
  `;
}

function renderHealthSystemWeight(assessment: HealthAssessment): string {
  return assessment.systemWeights.map((component) => `
    <article>
      <span>${html(component.label)}</span>
      <strong>${component.score}</strong>
      <i style="--score: ${component.score}%;"></i>
      <small>权重 ${component.weightPct}%</small>
    </article>
  `).join("");
}

function renderHealthManagementPage(): string {
  const assessment = buildHealthAssessment(activeWorkflowCase);
  const primaryFocus = assessment.componentScores.find((component) => component.key === "gearbox") ?? assessment.componentScores[0];
  return renderManagementPageFrame("health", `
    <section class="health-overview">
      <article class="health-score-card" data-health-status="${html(assessment.status)}">
        <span>${html(assessment.turbineId)} 综合健康</span>
        <strong>${assessment.overallScore}</strong>
        <p>${html(assessment.broadScreeningSummary)}</p>
      </article>
      <article class="health-focus-card">
        <span>专项重点监测</span>
        <strong>${html(primaryFocus.label)} · ${html(healthStatusLabel(primaryFocus.status))}</strong>
        <p>${html(assessment.specialMonitoringSummary)}</p>
      </article>
    </section>
    ${renderParameterPanel("health", [
      { label: "权重版本", value: "赛题十三部件权重", type: "select", options: ["赛题十三部件权重", "传动链加权", "结构安全加权"] },
      { label: "广谱筛查范围", value: "全部主要部件", type: "select", options: ["全部主要部件", "传动链专项", "结构专项"] },
      { label: "模拟接入口径", value: "公开/模拟边界显示", type: "select", options: ["公开/模拟边界显示", "只看已接入样例", "真实场站接入位"] },
    ])}
    <section class="health-source-grid" aria-label="数据源覆盖">
      ${assessment.dataSources.map(renderHealthSourceCard).join("")}
    </section>
    <section class="health-weight-grid" aria-label="系统权重健康评分">
      ${renderHealthSystemWeight(assessment)}
    </section>
    <section class="health-component-list" aria-label="部件层级健康评分">
      ${assessment.componentScores.map(renderHealthComponentRow).join("")}
    </section>
    <section class="health-gap-note">
      <strong>边界说明</strong>
      <p>${html(assessment.coverageGap)}</p>
    </section>
  `);
}

function renderScadaManagementPage(): string {
  const module = activeWorkflowCase.modules.scada;
  const chart = module.scadaChart;
  const abnormalCount = chart?.points.filter((point) => point.abnormal).length ?? 0;
  return renderManagementPageFrame("scada", `
    ${renderRecordTable([
      {
        code: "SCADA-RUN-240615-01",
        meta: chart?.sampleWindow ?? "10 min SCADA",
        result: module.decision?.result ?? "等待复算",
        status: `${abnormalCount} 个异常窗`,
      },
      {
        code: "SCADA-HIS-240612-03",
        meta: "同机型功率曲线对标",
        result: "历史复核记录，未升级为主故障证据",
        status: "已归档",
      },
    ])}
    ${renderParameterPanel("scada", [
      { label: "时间窗", value: "最近 6 个 10 min 窗口", type: "select", options: ["最近 6 个 10 min 窗口", "最近 12 个 10 min 窗口", "告警前后 2 h"] },
      { label: "功率残差阈值 %", value: "8", type: "number" },
      { label: "基线模型", value: "OpenOA 同场基线", type: "select", options: ["OpenOA 同场基线", "同机型分位数曲线", "上月健康曲线"] },
    ])}
    ${renderScadaChart(chart)}
  `);
}

function renderCmsManagementPage(): string {
  const module = activeWorkflowCase.modules.cms;
  const warningPeak = module.cmsChart?.peaks.find((peak) => peak.status === "warning");
  return renderManagementPageFrame("cms", `
    ${renderRecordTable([
      {
        code: "CMS-ENV-240615-02",
        meta: module.cmsChart?.sampleWindow ?? "CMS 高频采样",
        result: module.decision?.result ?? "等待复算",
        status: warningPeak ? "侧频关注" : "待复核",
      },
      {
        code: "CMS-HIS-240601-01",
        meta: "高速轴侧频历史对比",
        result: "趋势较月初抬升，需结合 SCADA 工况过滤",
        status: "趋势记录",
      },
    ])}
    ${renderParameterPanel("cms", [
      { label: "频谱类型", value: "包络谱", type: "select", options: ["包络谱", "阶次谱", "原始频谱"] },
      { label: "侧频阈值倍数", value: "1.2", type: "number" },
      { label: "转速工况过滤", value: "额定转速附近", type: "select", options: ["额定转速附近", "全工况", "剔除启停段"] },
    ])}
    ${renderCmsChart(module.cmsChart)}
  `);
}

function renderStructureManagementPage(): string {
  const module = activeWorkflowCase.modules.bolts;
  const warningChannels = module.boltChart?.channels.filter((channel) => channel.status === "warning").length ?? 0;
  return renderManagementPageFrame("structure", `
    ${renderRecordTable([
      {
        code: "BOLT-RING-240615-01",
        meta: module.boltChart?.title ?? "叶根螺栓预紧力",
        result: module.decision?.result ?? "等待复核",
        status: `${warningChannels} 路关注`,
      },
      {
        code: "TOWER-FREQ-240615-01",
        meta: "塔筒一阶频率 / 山地阵风载荷",
        result: "作为载荷放大因素跟踪，暂不改写主疑似部件",
        status: "反证项",
      },
    ])}
    ${renderParameterPanel("structure", [
      { label: "温漂补偿", value: "启用", type: "select", options: ["启用", "关闭"] },
      { label: "预紧力松弛阈值 %", value: "8", type: "number" },
      { label: "结构侧角色", value: "反证项", type: "select", options: ["反证项", "主风险", "持续跟踪"] },
    ])}
    ${renderBoltChart(module.boltChart)}
  `);
}

function renderFusionManagementPage(): string {
  const module = activeWorkflowCase.modules.fusion;
  return renderManagementPageFrame("fusion", `
    ${renderRecordTable([
      {
        code: "FUSION-GATE-240615-01",
        meta: "SCADA / CMS / 油温 / 结构反证",
        result: module.decision?.result ?? "等待融合",
        status: "当前版本",
      },
    ])}
    ${renderParameterPanel("fusion", [
      { label: "融合策略", value: "三主证据同向", type: "select", options: ["三主证据同向", "二主证据 + 一反证通过", "专家复核模式"] },
      { label: "最低置信度 %", value: "80", type: "number" },
      { label: "结构反证权重", value: "中", type: "select", options: ["低", "中", "高"] },
    ])}
    ${renderEvidenceReviewPath(module.fusionSignals, module.modelGates)}
    <div class="fusion-source-grid">${renderFusionSignals(module.fusionSignals)}</div>
  `);
}

function renderWorkOrderManagementPage(): string {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  return renderManagementPageFrame("workorders", `
    ${renderRecordTable([
      {
        code: ticket?.draftCode ?? "WO-待创建",
        meta: `${ticket?.asset ?? activeWorkflowCase.turbineId} / ${ticket?.dueWindow ?? "48-72 h"}`,
        result: ticket?.initialState ?? "等待生成工单草案",
        status: "待签核",
      },
      {
        code: "WO-HS-20240612-018",
        meta: "HS-WTG-03 / 振动复测",
        result: "现场复测完成，等待复盘标签确认",
        status: "待验收",
      },
      {
        code: "WO-HS-20240528-011",
        meta: "HS-WTG-01 / 叶根螺栓复核",
        result: "已关闭并进入相似案例库",
        status: "已关闭",
      },
    ])}
    <section class="workorder-page-actions">
      <button type="button" data-open-module="workorder">进入当前工单确认门</button>
      <button type="button" data-run-analysis="workorders">刷新工单门控</button>
    </section>
    <p class="analysis-result" data-analysis-result="workorders">当前工单尚未派发；需完成作业窗口、安全许可、备件和复盘责任签核。</p>
    ${renderWorkOrderWritebackSummary(ticket)}
  `);
}

function renderMaintenanceManagementPage(): string {
  const module = activeWorkflowCase.modules.maintenance;
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  return renderManagementPageFrame("maintenance", `
    ${renderRecordTable([
      {
        code: "PM-PLAN-240615-01",
        meta: ticket?.dueWindow ?? "48-72 h / 低风速窗口优先",
        result: module.decision?.result ?? "等待策略",
        status: "待确认",
      },
      {
        code: "PM-WEEK-240624",
        meta: "下周预测维护排程",
        result: "2 台传动链复测，1 台结构侧持续跟踪",
        status: "计划中",
      },
    ])}
    ${renderParameterPanel("maintenance", [
      { label: "策略", value: "限功率 + 现场复核", type: "select", options: ["限功率 + 现场复核", "计划停机检修", "继续跟踪观察"] },
      { label: "最低风速窗口 h", value: "6", type: "number" },
      { label: "备件状态", value: "可调拨", type: "select", options: ["可调拨", "待采购", "需跨场借用"] },
    ])}
    ${renderMaintenanceReadinessCard(ticket, activeWorkflowCase.modules.inspection.inspectionItems)}
  `);
}

function renderKnowledgeGraphPage(): string {
  const graph = buildWindOpsKnowledgeGraph(activeWorkflowCase);
  const primaryNode = graph.nodes.find((node) => node.id === "gearbox-bearing") ?? graph.nodes[0];
  return renderManagementPageFrame("knowledge", `
    <section class="knowledge-summary-card">
      <span>图谱作用</span>
      <strong>让 AI 回答可追溯到关系链</strong>
      <p>${html(graph.summary)}</p>
    </section>
    <section class="knowledge-graph">
      <div class="knowledge-node-map" aria-label="知识图谱节点">
        ${graph.nodes.map((node) => `
          <button type="button" data-kg-node="${html(node.id)}" data-kg-status="${html(node.status)}" style="--x: ${node.position.x}%; --y: ${node.position.y}%;">
            <span>${html(`${node.type} · ${knowledgeStatusLabel(node.status)}`)}</span>
            <strong>${html(node.label)}</strong>
          </button>
        `).join("")}
      </div>
      <article class="knowledge-detail">
        <span>节点说明</span>
        <strong data-kg-detail-title>${html(primaryNode.label)}</strong>
        <p data-kg-detail>${html(primaryNode.summary)}</p>
        <small data-kg-detail-evidence>${html(primaryNode.evidence ?? "点击节点查看它在 AI 决策链中的角色。")}</small>
      </article>
    </section>
    <section class="knowledge-edge-list">
      <span>关键关系</span>
      <ul>${graph.edges.map(renderKnowledgeEdge).join("")}</ul>
    </section>
    <section class="knowledge-decision-paths">
      <span>AI 决策路径</span>
      ${graph.decisionPaths.map(renderKnowledgeDecisionPath).join("")}
    </section>
  `);
}

function knowledgeStatusLabel(status: KnowledgeGraphNode["status"]): string {
  if (status === "alarm") return "告警";
  if (status === "watch") return "关注";
  if (status === "review") return "需确认";
  return "正常";
}

function knowledgeRoleLabel(role: KnowledgeGraphEdge["role"]): string {
  const labels: Record<KnowledgeGraphEdge["role"], string> = {
    action: "处置",
    amplify: "增强",
    boundary: "边界",
    counter: "反证",
    localize: "定位",
    support: "支持",
    writeback: "回写",
  };
  return labels[role];
}

function renderKnowledgeEdge(edge: KnowledgeGraphEdge): string {
  return `
    <li data-kg-edge-role="${html(edge.role)}">
      <strong>${html(`${edge.label} / ${knowledgeRoleLabel(edge.role)}`)}</strong>
      <span>${html(edge.explanation)}</span>
    </li>
  `;
}

function renderKnowledgeDecisionPath(path: KnowledgeDecisionPath): string {
  return `
    <article>
      <header>
        <span>${html(path.question)}</span>
        <strong>${html(path.title)}</strong>
      </header>
      <p>${html(path.answer)}</p>
      <ol>
        ${path.steps.map((step, index) => `
          <li>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>${html(step.title)}</strong>
              <p>${html(step.conclusion)}</p>
              <small>${html(step.humanBoundary)}</small>
            </div>
          </li>
        `).join("")}
      </ol>
      <button type="button" data-manager-page-button="${html(getManagementPageForModule(path.recommendedModule))}">
        打开${html(moduleText(path.recommendedModule))}
      </button>
    </article>
  `;
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
        <span>${html(chart.sampleWindow)} · 诊断回放</span>
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
        <span>${html(chart.sampleWindow)} · 频谱回放</span>
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
        <span>标称预紧力 ${html(chart.nominalPreloadKn)} kN / 松弛预警 ${html(chart.warningRelaxationPct)}% · 巡检回放</span>
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
        ${ticket.writebackItems.map((item, index) => `
          <label class="workorder-writeback-gate" data-writeback-summary-item="pending">
            <input type="checkbox" data-workorder-writeback="${index}" disabled />
            <span>${html(item.label)}</span>
            <strong>${html(item.value)}</strong>
            <em data-workorder-writeback-state>待派发</em>
          </label>
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

function renderStageAction(action?: WorkflowAction, extraAttribute = ""): string {
  if (!action) return "";
  const primaryClass = action.primary ? " primary" : "";
  return `
    <button class="module-action stage-next-action${primaryClass}" type="button" data-open-module="${html(action.module)}"${extraAttribute}>
      <span>下一步</span>
      <strong>${html(action.label)}</strong>
    </button>
  `;
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

function renderStageFocusCard(
  decision?: WorkflowDecision,
  action?: WorkflowAction,
  options: { actionAttribute?: string; context?: string; mode?: "evidence" | "operation" } = {},
): string {
  if (!decision) return "";
  const mode = options.mode ?? "evidence";
  const cardClass = mode === "operation" ? "operation-review-card operation" : "evidence-review-card evidence";
  const context = options.context ?? (mode === "operation" ? "操作复核" : "证据复核");

  return `
    <article class="stage-focus-card ${cardClass}">
      <header>
        <span>${html(context)}</span>
        <strong>${html(decision.operation)}</strong>
      </header>
      <dl class="stage-focus-grid">
        <div><dt>输入数据</dt><dd>${html(decision.input)}</dd></div>
        <div><dt>调用判据</dt><dd>${html(decision.model)}</dd></div>
        <div><dt>输出结论</dt><dd>${html(decision.result)}</dd></div>
      </dl>
      <footer class="stage-human-gate">
        <span>人工确认</span>
        <p>${html(decision.confirm)}</p>
      </footer>
      ${renderStageAction(action, options.actionAttribute ?? "")}
      <details>
        <summary>展开证据依据</summary>
        <p>${html(decision.evidence)}</p>
      </details>
    </article>
  `;
}

function renderEvidenceReviewCard(decision?: WorkflowDecision, action?: WorkflowAction): string {
  return renderStageFocusCard(decision, action, { mode: "evidence" });
}

function renderOperationReviewCard(
  decision?: WorkflowDecision,
  context?: string,
  action?: WorkflowAction,
  actionAttribute = "",
): string {
  return renderStageFocusCard(decision, action, { actionAttribute, context, mode: "operation" });
}

function renderEventTimeline(steps: EventTimelineStep[]): string {
  return `
    <section class="event-timeline" aria-label="值班事件闭环">
      <header>
        <span>值班事件闭环</span>
        <strong>预警发现 -> 证据复核 -> 工单复盘</strong>
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
  const evidenceScope = brief.evidence.slice(0, 4);

  return `
    <section class="ai-duty-assistant ${html(brief.riskLevel)}">
      <header>
        <div>
          <span>智能值班员</span>
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
        <button type="button" data-ai-generate-report>生成研判说明</button>
      </div>
      <details class="ai-progress-details">
        <summary>
          <span>闭环进度</span>
          <strong>查看预警到复盘回写</strong>
        </summary>
        ${renderEventTimeline(activeWorkflowCase.eventTimeline)}
      </details>
      <details class="ai-reasoning-details">
        <summary>
          <span>研判依据</span>
          <strong>展开输入 / 模型 / 结果</strong>
        </summary>
        <ol class="ai-decision-chain" aria-label="研判决策链">
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
      </details>
      <details class="ai-evidence-details">
        <summary>展开本次证据明细</summary>
        <ol>
          ${brief.evidence.map((item) => `<li>${html(item)}</li>`).join("")}
        </ol>
      </details>
    </section>
    <section class="ai-generated-report ai-duty-console" aria-live="polite">
      <header>
        <div>
          <span>值班问答</span>
          <strong>围绕当前预警追问，不做泛聊</strong>
        </div>
        <div class="ai-report-actions">
          <button type="button" data-ai-voice-question>语音追问</button>
          <button type="button" data-ai-generate-report>生成研判报告</button>
        </div>
      </header>
      <div class="ai-duty-console-grid">
        <section class="ai-recommended-questions" aria-label="推荐追问">
          <span>推荐追问</span>
          <div class="ai-question-chips">
            ${brief.operatorQuestions.map((question) => `<button type="button" data-ai-question="${html(question)}">${html(question)}</button>`).join("")}
          </div>
        </section>
        <section class="ai-assistant-guardrail">
          <span>人工边界</span>
          <p>${html(dutyFocus.humanCheck)}</p>
        </section>
      </div>
      <section class="ai-evidence-scope" aria-label="已读取的证据范围">
        <span>证据范围</span>
        <ul>
          ${evidenceScope.map((item) => `<li>${html(item)}</li>`).join("")}
        </ul>
      </section>
      <div class="ai-question-console">
        <input id="ai-question-input" type="text" placeholder="例如：为什么不是螺栓问题？下一步怎么处理？" />
        <button type="button" data-ai-send-question>发送问题</button>
      </div>
      <div id="ai-generated-report-text" class="ai-report-body">已载入当前事件的 SCADA、CMS、油温、螺栓/结构证据包。请选择上方追问或输入问题；回答会标注证据来源和人工确认边界。</div>
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

function getBimPanelContext(componentName = "gearbox"): {
  module: WorkflowModuleKey;
  nextPage: ManagementPageKey;
  risk: ComponentRisk;
} {
  const fallbackRisk: ComponentRisk = {
    component: "gearbox",
    module: "alerts",
    part: "gearbox",
    status: "P1 预警闭环",
    title: "齿轮箱",
  };
  const risk =
    activeWorkflowCase.componentRisks.find((item) => item.component === componentName) ??
    activeWorkflowCase.componentRisks.find((item) => item.component === "gearbox") ??
    activeWorkflowCase.componentRisks[0] ??
    fallbackRisk;
  const module = risk.module;
  return {
    module,
    nextPage: getManagementPageForModule(module),
    risk,
  };
}

function getMetricValue(moduleName: WorkflowModuleKey, label: string, fallback: string): string {
  return activeWorkflowCase.modules[moduleName].metrics?.find((metric) => metric.label === label)?.value ?? fallback;
}

function renderBimDiagnosticPanel(): string {
  const { module, nextPage, risk } = getBimPanelContext();
  const finding = activeWorkflowCase.modules.brief.aiBrief?.primaryFinding ?? activeWorkflowCase.component;
  const scadaResidual = getMetricValue("scada", "功率残差", "待复核");
  const cmsSideband = getMetricValue("cms", "啮合侧频", "待复核");
  const boltCounter = getMetricValue("bolts", "最低通道", "结构反证");
  return `
    <aside class="bim-diagnostic-panel" aria-label="BIM 诊断摘要">
      <header>
        <span>当前定位</span>
        <strong data-bim-panel-title>${html(risk?.title ?? finding)}</strong>
        <small data-bim-panel-status>${html(risk?.status ?? "待研判")} / ${html(moduleText(module))}</small>
      </header>
      <div class="bim-panel-evidence">
        <article>
          <span>SCADA</span>
          <strong>${html(scadaResidual)}</strong>
          <small>功率残差</small>
        </article>
        <article>
          <span>CMS</span>
          <strong>${html(cmsSideband)}</strong>
          <small>侧频定位</small>
        </article>
        <article>
          <span>结构</span>
          <strong>${html(boltCounter)}</strong>
          <small>反证项</small>
        </article>
      </div>
      <p data-bim-panel-summary>${html(finding)}；先在 BIM 中确认部件位置，再进入管理工作台查看可复算证据。</p>
      <footer>
        <button type="button" data-bim-panel-page="${html(nextPage)}">打开证据页</button>
        <button type="button" data-bim-panel-module="workorder">工单确认门</button>
      </footer>
    </aside>
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
        ${renderEvidenceReviewCard(module.decision, module.action)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 SCADA 图表与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderScadaChart(module.scadaChart)}
        </details>
      </section>
    `;
  }

  if (moduleKey === "fusion") {
    return `
      <section class="module-panel module-fusion">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision, module.action)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开多源证据与模型门控</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderEvidenceReviewPath(module.fusionSignals, module.modelGates)}
          <div class="fusion-source-grid">${renderFusionSignals(module.fusionSignals)}</div>
          <ol class="model-gate-list">${renderModelGates(module.modelGates)}</ol>
        </details>
      </section>
    `;
  }

  if (moduleKey === "cms") {
    return `
      <section class="module-panel module-cms">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision, module.action)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开 CMS 频谱与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderCmsChart(module.cmsChart)}
        </details>
      </section>
    `;
  }

  if (moduleKey === "bolts") {
    return `
      <section class="module-panel module-bolts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderEvidenceReviewCard(module.decision, module.action)}
        <dl>${renderMetrics(module.metrics)}</dl>
        <details class="module-evidence-stack">
          <summary>展开螺栓/结构证据与工程解释</summary>
          ${renderModuleEvidenceNote(module.body)}
          ${renderBoltChart(module.boltChart)}
        </details>
      </section>
    `;
  }

  if (moduleKey === "alerts") {
    return `
      <section class="module-panel module-alerts">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision, `${workflowCase.turbineId} ${workflowCase.eventCode}`, module.action)}
        ${renderBimLocalizationCard(workflowCase.componentRisks)}
        <details class="module-evidence-stack">
          <summary>展开告警证据链与事件说明</summary>
          ${renderModuleEvidenceNote(module.body)}
          <ul class="event-list">${renderEvidenceRows(module.evidenceRows)}</ul>
        </details>
      </section>
    `;
  }

  if (moduleKey === "inspection") {
    return `
      <section class="module-panel module-inspection">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision, undefined, module.action)}
        <dl>${renderMetrics(module.metrics)}</dl>
        ${renderInspectionOutcomeBoard(module.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开排查原则与清单</summary>
          ${renderModuleEvidenceNote(module.body)}
          <ol class="inspection-list">${renderInspectionItems(module.inspectionItems)}</ol>
        </details>
      </section>
    `;
  }

  if (moduleKey === "maintenance") {
    return `
      <section class="module-panel module-maintenance">
        <div class="module-kicker">${html(module.kicker)}</div>
        <h3>${html(module.title)}</h3>
        ${renderOperationReviewCard(module.decision, undefined, module.action, " data-create-workorder")}
        <dl>${renderMetrics(module.metrics)}</dl>
        ${renderMaintenanceReadinessCard(workflowCase.modules.workorder.ticket, workflowCase.modules.inspection.inspectionItems)}
        <details class="module-evidence-stack">
          <summary>展开维护策略说明</summary>
          ${renderModuleEvidenceNote(module.body)}
        </details>
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
        <section class="workorder-gate-summary" data-workorder-gate-summary>
          <article>
            <span>当前阻塞点</span>
            <strong data-workorder-blocker>等待生成工单草案</strong>
          </article>
          <article>
            <span>下一动作</span>
            <strong data-workorder-next-action>由告警研判或预测维护模块生成工单</strong>
          </article>
          <article>
            <span>人工边界</span>
            <strong data-workorder-human-boundary>系统只给草案，派发和关闭必须人工确认</strong>
          </article>
        </section>
        <div class="workorder-confirm-grid">
          ${(ticket?.confirmationChecks ?? []).map((item) => `
            <label class="workorder-confirm" data-workorder-confirm-card="${html(item.id)}" data-state="pending">
              <input type="checkbox" data-workorder-confirm="${html(item.id)}" />
              <span class="workorder-confirm-body">
                <span class="workorder-confirm-row">
                  <small>${html(item.owner)}</small>
                  <em data-workorder-confirm-state>待签核</em>
                </span>
                <b>${html(item.label)}</b>
                <p>${html(item.detail)}</p>
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
  return `${shortTurbineName(activeWorkflowCase.turbineId)}齿轮箱出现一级预警。已锁定多源证据，进入告警研判查看证据链与工单。`;
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

      <section class="ai-duty-card" aria-label="值班播报" aria-live="polite">
        <div>
          <span>值班提醒</span>
          <strong id="ai-duty-title">${html(activeWorkflowCase.modules.brief.aiBrief?.primaryFinding ?? "等待诊断事件")}</strong>
        </div>
        <p id="ai-duty-text">${html(getAiDutyEventText())}</p>
        <footer>
          <small id="ai-duty-status">已生成播报，等待风场巡航完成</small>
          <button id="ai-duty-speak" type="button">语音播报</button>
          <button id="ai-duty-open" type="button">进入BIM诊断</button>
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
          <button id="open-manager-workspace" class="bim-back manager-open" type="button">管理工作台</button>
          <button id="close-bim" class="bim-back" type="button">返回 GIS 场景</button>
        </header>

        <section class="bim-stage" aria-label="风机 BIM 部件拆分视图">
          <div class="blueprint-grid" aria-hidden="true"></div>
          <div id="bim-model-root" class="first-version-bim-canvas" aria-label="风机 BIM 精细模型"></div>
          <div class="bim-stage-hud">
            <span>HS-WTG 单机透视</span>
            <strong id="bim-status">等待进入单机 BIM 诊断</strong>
            <em>先在 BIM 中定位疑似部件；需要证据、模型复算或工单时进入管理工作台。</em>
          </div>
          <div class="bim-stage-actions" aria-label="BIM 模型操作">
            <button id="bim-toggle-decompose" type="button" data-state="composed">拆解模型</button>
            <button id="bim-warning" type="button">告警闪烁</button>
          </div>
          ${renderBimDiagnosticPanel()}
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
          ${renderWorkflowCommandCard()}
          ${activeWorkflowCase.moduleOrder.map((moduleKey) => renderModulePanel(moduleKey, activeWorkflowCase.modules[moduleKey], activeWorkflowCase)).join("")}
        </aside>

        <nav class="bim-toolbar" aria-label="业务流程">
          ${renderWorkflowStageTabs()}
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
const bimDiagnosticPanel = document.querySelector<HTMLElement>(".bim-diagnostic-panel");
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

renderWorkflowSurfaces();
setActiveModule("brief");
setEventTimelineStage("ai-alert");
setActiveComponent("gearbox");

function setBimStatus(status: string): void {
  if (bimStatus) bimStatus.textContent = status;
}

function setActiveComponent(componentName: string): void {
  document.querySelectorAll<HTMLButtonElement>(".component").forEach((item) => {
    item.classList.toggle("active", item.dataset.component === componentName);
  });
  updateBimDiagnosticPanel(componentName);
}

function updateBimDiagnosticPanel(componentName = "gearbox"): void {
  if (!bimDiagnosticPanel) return;
  const { module, nextPage, risk } = getBimPanelContext(componentName);
  const summaryByModule: Record<WorkflowModuleKey, string> = {
    alerts: "BIM 已定位主疑似部件，进入告警中心确认等级、反证项和人工边界。",
    bolts: "结构侧用于排除叶根/塔筒主故障，并跟踪山地阵风载荷放大影响。",
    brief: "先让智能值班员给出当前判断，再进入证据复核。",
    cms: "CMS 用于把运行异常定位到传动链和齿轮箱部件。",
    fusion: "融合判据把 SCADA、CMS、油温和结构反证放入同一事件窗口。",
    health: "健康管理用于按部件层级和权重查看当前筛查结果。",
    inspection: "隐患排查只保留会改变处置策略的现场检查项。",
    maintenance: "预测维护根据风险窗口、备件和班组资源形成策略。",
    scada: "SCADA 用于判断同风速段功率和油温是否偏离基线。",
    workorder: "工单中心只生成草案，派发和关闭必须人工确认。",
  };
  const title = bimDiagnosticPanel.querySelector<HTMLElement>("[data-bim-panel-title]");
  const status = bimDiagnosticPanel.querySelector<HTMLElement>("[data-bim-panel-status]");
  const summary = bimDiagnosticPanel.querySelector<HTMLElement>("[data-bim-panel-summary]");
  if (title) title.textContent = risk.title;
  if (status) status.textContent = `${risk.status} / ${moduleText(module)}`;
  if (summary) summary.textContent = summaryByModule[module];
  const pageButton = bimDiagnosticPanel.querySelector<HTMLButtonElement>("[data-bim-panel-page]");
  if (pageButton) pageButton.dataset.bimPanelPage = nextPage;
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

function openManagementWorkspace(): void {
  dashboardShell.dataset.workspace = "manager";
}

function closeManagementWorkspace(): void {
  dashboardShell.dataset.workspace = "bim";
}

function isManagementPageKey(value: string | undefined): value is ManagementPageKey {
  return Boolean(value && managementPageByKey.has(value as ManagementPageKey));
}

function setActiveManagementPage(pageKey: ManagementPageKey): void {
  const nextPage = isManagementPageKey(pageKey) ? pageKey : "event";
  dashboardShell.dataset.managerPage = nextPage;
  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-manager-page-button]").forEach((button) => {
    button.classList.toggle("active", button.dataset.managerPageButton === nextPage);
  });
}

function openManagementPage(pageKey: ManagementPageKey, status?: string): void {
  const page = managementPageByKey.get(pageKey) ?? managementPages[0];
  openManagementWorkspace();
  setActiveModule(page.module);
  setActiveManagementPage(page.key);
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
  const stage = getWorkflowStageForModule(moduleName);
  dashboardShell.dataset.activeStage = moduleName === "none" ? "none" : stage.key;
  if (moduleName !== "none") setActiveManagementPage(getManagementPageForModule(moduleName));

  document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((tab) => {
    const tabStage = tab.dataset.stage;
    const tabModule = tab.dataset.module;
    const active = tabStage ? tabStage === dashboardShell.dataset.activeStage : tabModule === moduleName;
    tab.classList.toggle("active", active);
  });

  updateWorkflowCommandCard(moduleName);
}

function updateWorkflowCommandCard(moduleName: string): void {
  const card = workflowModuleDrawer.querySelector<HTMLElement>("[data-workflow-command-card]");
  if (!card) return;

  const stage = getWorkflowStageForModule(moduleName);
  const title = card.querySelector<HTMLElement>("[data-command-title]");
  const stageLabel = card.querySelector<HTMLElement>("[data-command-stage]");
  const description = card.querySelector<HTMLElement>("[data-command-description]");
  const next = card.querySelector<HTMLElement>("[data-command-next]");

  if (title) {
    title.textContent = `${activeWorkflowCase.turbineId} · ${activeWorkflowCase.modules.brief.aiBrief?.primaryFinding ?? activeWorkflowCase.component}`;
  }
  if (stageLabel) stageLabel.textContent = `${stage.title} / ${stage.focusLabel}`;
  if (description) description.textContent = stage.description;
  if (next) next.textContent = stage.nextAction;
}

function setSelectedTurbineTitle(turbineId: string): void {
  const title = document.querySelector("#bim-selected-title");
  if (title) title.textContent = turbineId;
}

function updateAiDutyCard(): void {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (aiDutyTitle) aiDutyTitle.textContent = brief?.primaryFinding ?? "等待诊断事件";
  if (aiDutyText) aiDutyText.textContent = getAiDutyEventText();
  if (aiDutyStatus) aiDutyStatus.textContent = "已生成值班播报，可语音复述或进入告警研判";
}

function triggerIntroAiAlert(turbine: TurbineAsset): void {
  if (hasPlayedIntroBroadcast) return;
  hasPlayedIntroBroadcast = true;
  selectWorkflowCaseForTurbine(turbine.turbineId);
  dashboardShell.dataset.aiEvent = "active";
  setEventTimelineStage("ai-alert");
  updateAiDutyCard();
  if (aiDutyStatus) aiDutyStatus.textContent = "巡航发现异常，已生成值班提醒";
  speakAiDutyBrief(false);
}

function renderWorkflowSurfaces(): void {
  workflowComponentStrip.innerHTML = activeWorkflowCase.componentRisks.map(renderComponentButton).join("");
  workflowModuleDrawer.innerHTML = [
    renderWorkflowCommandCard(),
    renderManagementConsole(),
    `<details class="linked-evidence-drawer">
      <summary>展开当前页面的关联证据抽屉</summary>
      ${activeWorkflowCase.moduleOrder.map((moduleKey) => renderModulePanel(moduleKey, activeWorkflowCase.modules[moduleKey], activeWorkflowCase)).join("")}
    </details>`,
  ].join("");
  bindWorkflowSurfaceEvents();
  updateWorkflowCommandCard(dashboardShell.dataset.activeModule ?? "brief");
  setActiveManagementPage((dashboardShell.dataset.managerPage as ManagementPageKey | undefined) ?? "event");
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
  dashboardShell.dataset.workspace = "bim";
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
    gate: {
      decision: string;
      humanCheck: string;
      label: string;
      role: "amplify" | "counter" | "review" | "support";
    };
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
  status: "fallback" | "ok" | "pending";
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

type AgentOperatorFocus = AiDiagnosisResponse["operatorFocus"];
type AiAnswerRuntime = Pick<AiDiagnosisResponse, "answerText" | "operatorFocus" | "source" | "status">;

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
      if (aiDutyStatus) aiDutyStatus.textContent = "播报完成，可进入告警研判查看证据链";
    },
    onError: () => {
      if (aiDutyStatus) {
        aiDutyStatus.textContent = userInitiated ? "浏览器语音未启动，研判文字已同步显示" : "已生成播报，可点击语音播报";
      }
    },
    onStart: () => {
      if (aiDutyStatus) aiDutyStatus.textContent = "正在播报当前风机风险";
    },
    onUnsupported: () => {
      if (aiDutyStatus) aiDutyStatus.textContent = "当前浏览器不支持语音播报，已保留文字研判";
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
    brief: "告警研判",
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

function readWorkOrderClosureSnapshot() {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const confirmationChecks = ticket?.confirmationChecks ?? [];
  const writebackItems = ticket?.writebackItems ?? [];
  const workOrderState = document.querySelector<HTMLElement>("#workorder-state")?.textContent?.trim() ?? ticket?.initialState ?? "待生成";
  const confirmedChecks = confirmationChecks.filter((item) => {
    const input = document.querySelector<HTMLInputElement>(`[data-workorder-confirm="${item.id}"]`);
    return Boolean(input?.checked);
  });
  const writebackStates = writebackItems.map((item, index) => {
    const input = document.querySelector<HTMLInputElement>(`[data-workorder-writeback="${index}"]`);
    return {
      checked: Boolean(input?.checked),
      disabled: Boolean(input?.disabled),
      item,
    };
  });
  const completedWritebacks = writebackStates.filter((item) => item.checked);
  const pendingWritebacks = writebackStates.filter((item) => !item.checked);
  const pendingChecks = confirmationChecks.filter((item) => !confirmedChecks.includes(item));
  const summaryState = document.querySelector<HTMLElement>("[data-writeback-summary-state]")?.textContent?.trim() ?? "待现场完成后回写";
  const isClosed = workOrderState.includes("现场复核完成");

  return {
    completedWritebacks,
    confirmedChecks,
    isClosed,
    pendingChecks,
    pendingWritebacks,
    summaryState,
    totalChecks: confirmationChecks.length,
    totalWritebacks: writebackItems.length,
    workOrderState,
  };
}

function renderAgentClosureStatusContent(): string {
  const snapshot = readWorkOrderClosureSnapshot();
  const sampleItems = snapshot.completedWritebacks
    .map(({ item }) => `<li>${html(item.label)} 已进入复盘样本</li>`)
    .join("") || "<li>等待现场回写，暂不进入复盘样本。</li>";
  const pendingItems = [
    ...snapshot.pendingChecks.map((item) => `${item.label}（${item.owner}）`),
    ...snapshot.pendingWritebacks.map(({ item, disabled }) => `${item.label}${disabled ? "（派发后回写）" : "（待现场回写）"}`),
  ];
  const humanReviewItems = pendingItems.map((item) => `<li>${html(item)}</li>`).join("")
    || "<li>签核、回写和关闭门控已完成，等待复盘审核。</li>";

  return `
    <header>
      <span>工单闭环状态</span>
      <strong>${html(snapshot.isClosed ? "复盘样本已回写" : snapshot.summaryState)}</strong>
    </header>
    <div class="agent-closure-metrics">
      <article>
        <span>工单状态</span>
        <strong>${html(snapshot.workOrderState)}</strong>
      </article>
      <article>
        <span>人工签核</span>
        <strong>${snapshot.confirmedChecks.length}/${snapshot.totalChecks}</strong>
      </article>
      <article>
        <span>现场回写</span>
        <strong>${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}</strong>
      </article>
    </div>
    <div class="agent-closure-lists">
      <section>
        <h4>已进入复盘样本</h4>
        <ul>${sampleItems}</ul>
      </section>
      <section>
        <h4>仍需人工复核</h4>
        <ul>${humanReviewItems}</ul>
      </section>
    </div>
    <p>研判报告只引用已确认的结构化证据和现场回写状态；未回写项不会被当成已验证事实。</p>
  `;
}

function renderAgentClosureStatusCard(): string {
  return `<section class="agent-closure-card" data-agent-closure-card>${renderAgentClosureStatusContent()}</section>`;
}

function renderAgentClosureSummaryContent(): string {
  const snapshot = readWorkOrderClosureSnapshot();
  const nextGate = snapshot.isClosed
    ? "复盘审核"
    : snapshot.workOrderState.includes("已派发")
      ? (snapshot.pendingWritebacks.length > 0 ? "现场回写门" : "关闭确认门")
      : "工单确认门";

  return `
    <header>
      <span>工单状态摘要</span>
      <strong>${html(snapshot.isClosed ? "已回写复盘样本" : snapshot.workOrderState)}</strong>
    </header>
    <div class="agent-closure-summary-row">
      <article>
        <span>人工签核</span>
        <strong>${snapshot.confirmedChecks.length}/${snapshot.totalChecks}</strong>
      </article>
      <article>
        <span>现场回写</span>
        <strong>${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}</strong>
      </article>
      <article>
        <span>下一门控</span>
        <strong>${html(nextGate)}</strong>
      </article>
    </div>
    <p>完整派发、回写和关闭门控已收起；当前问题先处理上方值班焦点。需要安排现场动作时，再打开工单确认门。</p>
    <button type="button" data-agent-open-module="workorder">打开工单确认门</button>
  `;
}

function renderAgentClosureSummaryCard(): string {
  return `<section class="agent-closure-summary" data-agent-closure-summary>${renderAgentClosureSummaryContent()}</section>`;
}

function updateAgentClosureStatusCard(): void {
  workflowModuleDrawer.querySelectorAll<HTMLElement>("[data-agent-closure-card]").forEach((card) => {
    card.innerHTML = renderAgentClosureStatusContent();
  });
  workflowModuleDrawer.querySelectorAll<HTMLElement>("[data-agent-closure-summary]").forEach((card) => {
    card.innerHTML = renderAgentClosureSummaryContent();
  });
}

function isClosureStatusQuestion(question: string): boolean {
  return /(还差|缺什么|能不能|能否|可以.*吗|能.*吗|派发|派单|关闭|闭环|回写|签核|确认门|现场复核|复盘样本)/.test(question);
}

function buildClosureStatusAnswer(question: string): string {
  const snapshot = readWorkOrderClosureSnapshot();
  const pendingCheckText = snapshot.pendingChecks.map((item) => `${item.label}（${item.owner}）`);
  const pendingWritebackText = snapshot.pendingWritebacks.map(({ item, disabled }) =>
    `${item.label}${disabled ? "（派发后才能回写）" : "（待现场回写确认）"}`);
  const pendingAll = [...pendingCheckText, ...pendingWritebackText];

  if (/派发|派单/.test(question)) {
    if (snapshot.workOrderState.includes("已派发") || snapshot.isClosed) {
      return `当前工单状态为“${snapshot.workOrderState}”，不需要重复派发。下一步看现场回写和复盘关闭状态；AI 只提示门控结果，派发动作必须由值班人员确认。`;
    }
    if (snapshot.pendingChecks.length > 0) {
      return `现在还不能派发工单。派发前还有 ${snapshot.pendingChecks.length} 项人工签核未完成：${pendingCheckText.join("；")}。这些确认完成后，系统才会解锁派发按钮。`;
    }
    return "派发前 4 项人工签核已经完成，可以由值班人员确认是否派发工单。AI 不能替代值长派发，也不能自动停机或登塔。";
  }

  if (/关闭|闭环|现场复核/.test(question)) {
    if (snapshot.isClosed) {
      return "本次工单已标记现场复核完成，4 项现场回写已进入复盘样本。后续只保留复盘审核和模型样本校准，不需要再次关闭。";
    }
    if (!snapshot.workOrderState.includes("已派发")) {
      return `现在不能关闭工单。当前状态为“${snapshot.workOrderState}”，需要先完成派发前签核并由人工派发，之后才能进行现场回写和关闭。`;
    }
    if (snapshot.pendingWritebacks.length > 0) {
      return `现在还不能关闭工单。现场回写还有 ${snapshot.pendingWritebacks.length} 项未完成：${pendingWritebackText.join("；")}。全部回写后，关闭按钮才会解锁。`;
    }
    return "4 项现场回写已经确认，可以由运维主管人工关闭本次工单。AI 只说明闭环条件已满足，最终关闭仍需人工确认。";
  }

  if (pendingAll.length === 0) {
    return `当前闭环状态为“${snapshot.workOrderState}”：签核 ${snapshot.confirmedChecks.length}/${snapshot.totalChecks}，回写 ${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}，没有未完成门控项。仍需人工完成复盘审核。`;
  }

  return `当前还差 ${pendingAll.length} 项：${pendingAll.join("；")}。系统只把已签核、已回写的内容纳入 AI 报告，未确认项不会被当成已验证事实。`;
}

function buildClosureStatusAiResponse(question: string): AiDiagnosisResponse {
  const result = buildLocalAiDiagnosisResponse(question, "fallback", "AI 已读取当前工单门控状态。");
  const snapshot = readWorkOrderClosureSnapshot();
  const answerText = buildClosureStatusAnswer(question);
  return {
    ...result,
    answerText,
    intent: "workorder",
    operatorFocus: {
      decision: snapshot.isClosed ? "工单已进入复盘样本" : snapshot.summaryState,
      humanCheck: "派发、关闭、停机、登塔和检修动作必须由值班人员与现场工程师确认。",
      primaryQuestion: snapshot.pendingWritebacks.length > 0 ? "先完成现场回写" : "查看工单确认门",
      recommendedModule: "workorder",
      why: "用户问的是当前工单能否进入下一步，这必须读取系统门控状态，而不是重新解释故障原因。",
    },
    reportSections: [
      {
        body: `人工签核 ${snapshot.confirmedChecks.length}/${snapshot.totalChecks}，现场回写 ${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}，工单状态：${snapshot.workOrderState}。`,
        title: "输入数据",
      },
      {
        body: "读取工单签核门、派发状态、现场回写门和复盘样本状态；不把未回写证据当成已验证事实。",
        title: "模型判据",
      },
      {
        body: answerText,
        title: "人工确认",
      },
    ],
    riskBoundary: "AI 只解释当前门控状态和下一步人工动作；不能自动派发、关闭、停机、登塔或检修。",
    title: `${activeWorkflowCase.turbineId} 工单闭环问答`,
    toolTrace: [
      { label: "读取工单状态", output: snapshot.workOrderState, status: "ok", tool: "read_workorder_state" },
      { label: "读取人工签核门", output: `${snapshot.confirmedChecks.length}/${snapshot.totalChecks}`, status: "ok", tool: "read_confirmation_gates" },
      { label: "读取现场回写门", output: `${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}`, status: "ok", tool: "read_writeback_gates" },
    ],
    voiceText: answerText.replace(/\n/g, " "),
  };
}

function renderAiGeneratedReport(result: AiDiagnosisResponse, question: string): string {
  const showWorkOrderDetails = result.intent === "workorder";
  const sourceLabel = result.status === "pending"
    ? "本地证据包已就绪，等待大模型"
    : result.source === "llm"
      ? "MiMo 大模型 + 诊断工具"
      : "本地诊断工具兜底";
  const reportSectionBody = (keyword: string): string =>
    result.reportSections.find((section) => section.title.includes(keyword))?.body ?? "";
  const judgementChain = [
    {
      body: reportSectionBody("输入") || "SCADA、CMS、螺栓/结构与气象证据包。",
      label: "输入数据",
    },
    {
      body: reportSectionBody("模型") || "规则判据、机理反证与 AI 归纳只用于辅助研判。",
      label: "模型判据",
    },
    {
      body: result.operatorFocus.decision,
      label: "输出结论",
    },
    {
      body: reportSectionBody("人工") || result.operatorFocus.humanCheck,
      label: "人工确认",
    },
  ];

  return `
    <article class="ai-domain-report agent-report">
      <header>
        <small>${html(sourceLabel)} / ${html(intentText(result.intent))}</small>
        <strong>${html(result.title)}</strong>
        <em>${html(question)}</em>
      </header>

      <section class="agent-answer-card">
        <span>值班答复</span>
        <p>${html(result.answerText)}</p>
      </section>

      ${showWorkOrderDetails ? renderAgentClosureStatusCard() : renderAgentClosureSummaryCard()}

      <section class="agent-judgement-strip" aria-label="研判链">
        ${judgementChain.map((item) => `
          <article>
            <span>${html(item.label)}</span>
            <p>${html(item.body)}</p>
          </article>
        `).join("")}
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

      <details class="agent-detail-group agent-evidence-details">
        <summary>展开证据卡（${result.evidenceCards.length}）</summary>
        <section class="agent-evidence-grid" aria-label="证据卡">
          ${result.evidenceCards.map((card) => `
            <button class="agent-evidence-card ${html(card.severity)}" type="button" data-agent-open-module="${html(card.module)}">
              <span>${html(card.title)} · ${html(card.source)}</span>
              <strong>${html(card.value)}</strong>
              <section class="agent-evidence-gate ${html(card.gate.role)}">
                <span>${html(card.gate.label)}</span>
                <strong>${html(card.gate.decision)}</strong>
              </section>
              <section class="agent-evidence-review-chain" aria-label="证据复核步骤">
                <article>
                  <span>输入数据</span>
                  <strong>${html(card.value)}</strong>
                </article>
                <article>
                  <span>模型判据</span>
                  <p>${html(card.interpretation)}</p>
                </article>
                <article>
                  <span>输出结论</span>
                  <p>${html(card.gate.decision)}</p>
                </article>
                <article>
                  <span>人工确认</span>
                  <p>${html(card.gate.humanCheck)}</p>
                </article>
              </section>
              <div><i style="width: ${confidenceWidth(card.confidence)}"></i><b>${html(card.confidence)}%</b></div>
            </button>
          `).join("")}
        </section>
      </details>

      <details class="agent-detail-group">
        <summary>展开图表联动、BIM 定位与报告正文（${result.chartRefs.length + result.bimHighlights.length} 个联动）</summary>
        <section class="agent-link-grid" aria-label="图表联动">
          <h4>图表联动</h4>
          ${result.chartRefs.map((ref) => `
            <button type="button" data-agent-open-module="${html(ref.module)}">
              <span>${html(ref.label)}</span>
              <strong>${html(ref.focus)}</strong>
              <small>${html(ref.reason)}</small>
            </button>
          `).join("")}
        </section>

        <section class="agent-link-grid" aria-label="BIM 定位">
          <h4>BIM 定位</h4>
          ${result.bimHighlights.map((highlight) => `
            <button class="${html(highlight.severity)}" type="button" data-agent-bim-part="${html(highlight.part)}">
              <span>${html(highlight.label)}</span>
              <strong>${html(highlight.reason)}</strong>
            </button>
          `).join("")}
        </section>

        <section class="agent-handoff-card">
          <span>定位后动作</span>
          <strong>先打开工单人工确认门，不自动派发</strong>
          <p>齿轮箱部件定位只说明疑似对象已收窄；低风速窗口、安全许可、备件工器具和复盘回写责任确认后，才允许派发现场工单。</p>
          <button type="button" data-agent-create-workorder>打开工单确认门</button>
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

      ${showWorkOrderDetails && result.workOrderDraft ? `
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
          <details class="agent-workorder-steps">
            <summary>展开现场操作步骤（${result.workOrderDraft.steps.length}）</summary>
            <ol>
              ${result.workOrderDraft.steps.map((step, index) => `
                <li><span>${String(index + 1).padStart(2, "0")}</span><strong>${html(step.action)}</strong><small>${html(step.owner)} / ${html(step.output)}</small></li>
              `).join("")}
            </ol>
          </details>
          <details class="agent-workorder-review">
            <summary>展开验收与复盘回写（${result.workOrderDraft.acceptanceCriteria.length + result.workOrderDraft.writebackItems.length}）</summary>
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
        <summary>展开工具轨迹</summary>
        <section class="agent-tool-trace">
          <h4>工具轨迹</h4>
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
  if (!brief) return "值班答复：当前研判未就绪。";

  const finding = brief.primaryFinding.includes("齿轮箱") ? "齿轮箱 P1 预警" : brief.primaryFinding;
  const action = brief.recommendedAction
    .replace(/\s+-\s+/g, "到")
    .replace(/内安排/g, "内")
    .replace(/[。；]+$/g, "");

  return `值班答复：${shortTurbineName(activeWorkflowCase.turbineId)}${finding}。${action}，复核前按限载策略运行。`;
}

function inferAgentIntent(question: string): string {
  if (/螺栓|叶根|反证|不是/.test(question)) return "counter_evidence";
  if (/证据|图表|来源|传感器/.test(question)) return "evidence_chain";
  if (/报告|摘要/.test(question)) return "report";
  if (/工单|派单|安排/.test(question)) return "workorder";
  if (/维护|处理|下一步|停机|检修/.test(question)) return "maintenance_plan";
  return "explain_alarm";
}

function buildStageAwareOperatorFocus(intent: string, fallback: AgentOperatorFocus): AgentOperatorFocus {
  const snapshot = readWorkOrderClosureSnapshot();

  if (intent === "workorder") {
    if (snapshot.isClosed) {
      return {
        decision: "本次事件已进入复盘样本",
        humanCheck: "复盘审核和模型样本标注仍需运维主管确认，AI 不能自动关闭事件。",
        primaryQuestion: "查看复盘回写",
        recommendedModule: "workorder",
        why: "用户问的是工单安排，系统先展示闭环状态，避免重复派发或重复关闭。",
      };
    }
    if (snapshot.workOrderState.includes("已派发")) {
      return {
        decision: snapshot.summaryState,
        humanCheck: "现场回写、关闭工单和复盘入库必须由现场工程师与运维主管确认。",
        primaryQuestion: snapshot.pendingWritebacks.length > 0 ? "查看现场回写门" : "查看关闭确认门",
        recommendedModule: "workorder",
        why: "工单已经派发，下一步不是继续看图表，而是核对现场证据回写是否满足关闭条件。",
      };
    }
    return {
      decision: `工单派发前签核 ${snapshot.confirmedChecks.length}/${snapshot.totalChecks}`,
      humanCheck: "低风速窗口、安全许可、备件工器具和复盘责任确认后，才允许值班人员派发。",
      primaryQuestion: "打开工单确认门",
      recommendedModule: "workorder",
      why: "用户问的是现场安排，系统应先进入人工门控，而不是直接给出派发结论。",
    };
  }

  if (intent === "counter_evidence") {
    return {
      decision: activeWorkflowCase.modules.bolts.decision?.result ?? "先排除螺栓/结构反证",
      humanCheck: activeWorkflowCase.modules.bolts.decision?.confirm ?? "结构工程师确认后才排除结构主故障。",
      primaryQuestion: "先看螺栓/结构反证",
      recommendedModule: "bolts",
      why: "用户问的是是否可能不是齿轮箱，先看螺栓、塔筒和山地阵风载荷是否能解释异常。",
    };
  }

  if (intent === "evidence_chain" || intent === "report") {
    return {
      decision: activeWorkflowCase.modules.fusion.decision?.result ?? "先复核多源证据是否同向",
      humanCheck: activeWorkflowCase.modules.fusion.decision?.confirm ?? "值班员确认数据质量后，系统结论才进入告警研判。",
      primaryQuestion: "运行融合判据",
      recommendedModule: "fusion",
      why: "用户需要看证据或报告，第一步应先核对 SCADA、CMS、结构监测是否在同一事件窗口内相互支持。",
    };
  }

  if (intent === "maintenance_plan") {
    return {
      decision: activeWorkflowCase.modules.maintenance.decision?.result ?? "先形成预测维护策略",
      humanCheck: activeWorkflowCase.modules.maintenance.decision?.confirm ?? "维护策略必须经过值长、检修班组和安全许可确认。",
      primaryQuestion: "查看维护策略",
      recommendedModule: "maintenance",
      why: "用户问的是处置策略，系统应先展示低风速窗口、备件和风险收益，再进入工单确认。",
    };
  }

  if (intent === "explain_alarm") {
    return {
      decision: activeWorkflowCase.modules.alerts.decision?.result ?? "先看告警成立条件",
      humanCheck: activeWorkflowCase.modules.alerts.decision?.confirm ?? "告警确认后才允许进入工单草案，系统不能自动派发。",
      primaryQuestion: "打开告警研判",
      recommendedModule: "alerts",
      why: "用户问的是为什么报警，先看融合结论如何进入告警等级，避免直接跳到派单。",
    };
  }

  return fallback;
}

function buildStageAwareAnswerText(
  intent: string,
  result: AiAnswerRuntime,
  reason = "已先展开本地结构化证据包。",
): string {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  if (!brief) return `${reason} 当前研判未就绪，请重新进入告警研判。`;

  const alerts = activeWorkflowCase.modules.alerts.decision;
  const cms = activeWorkflowCase.modules.cms.decision;
  const scada = activeWorkflowCase.modules.scada.decision;
  const bolts = activeWorkflowCase.modules.bolts.decision;
  const maintenance = activeWorkflowCase.modules.maintenance.decision;
  const snapshot = readWorkOrderClosureSnapshot();

  if (result.source === "llm" && result.status === "ok") {
    const focus = buildStageAwareOperatorFocus(intent, result.operatorFocus);
    const nextStep = `下一步：${focus.primaryQuestion}。${focus.why} ${focus.humanCheck}`;
    return result.answerText.includes(focus.primaryQuestion)
      ? result.answerText
      : `${result.answerText}\n\n${nextStep}`;
  }

  if (intent === "workorder") {
    if (snapshot.isClosed) {
      return `${reason} 事件已进入复盘样本，当前不应重复派单。下一步由运维主管复核现场回写、故障标签和模型样本标注，确认后才把本次事件写入复盘库。`;
    }
    if (snapshot.workOrderState.includes("已派发")) {
      const pending = snapshot.pendingWritebacks.length > 0
        ? snapshot.pendingWritebacks.join("、")
        : "关闭确认";
      return `${reason} 工单已经派发，下一步不是继续生成建议，而是现场回写门：${pending}。回写完成前不能关闭工单，系统只提示缺口，关闭动作必须人工确认。`;
    }
    return `${reason} 现场安排先进入工单确认门：低风速窗口、安全许可、备件工器具、复盘责任 ${snapshot.totalChecks} 项签核，目前已确认 ${snapshot.confirmedChecks.length} 项。签核未齐前不能派发，系统不自动下发检修命令。`;
  }

  if (intent === "evidence_chain" || intent === "report") {
    return `${reason} 证据链按同一事件窗口复核：SCADA 看功率残差和油温趋势，CMS 看高速轴侧频/齿轮啮合频率，螺栓与结构监测作为反证项，山地气象用于解释阵风载荷。下一步先运行融合判据，确认多源数据是否同向；数据质量未确认前，系统结论不能进入派单。`;
  }

  if (intent === "counter_evidence") {
    return `${reason} 先看反证：${bolts?.result ?? "螺栓/结构侧未触发主故障改写"}。如果预紧力衰减、塔筒一阶频率漂移或阵风载荷能解释异常，就需要调整主疑似；如果不能解释，则维持齿轮箱风险判断，只把结构侧作为载荷放大因素跟踪。`;
  }

  if (intent === "maintenance_plan") {
    return `${reason} 处置策略按预测维护执行，不直接跳到停机检修。建议先按 ${maintenance?.result ?? "低风速窗口复测与限载观察"} 组织：限功率运行、油液取样/内窥检查、CMS 复测和备件准备；若复测证据继续恶化，再由值长人工升级检修级别。`;
  }

  return `${reason} 这不是单阈值报警，而是融合判据升级：${scada?.result ?? "SCADA 运行残差异常"}、${cms?.result ?? "CMS 振动特征异常"} 与油温趋势共同指向齿轮箱，${bolts?.result ?? "结构侧暂不改写主疑似"}。下一步打开告警研判，确认 ${alerts?.result ?? brief.primaryFinding} 后再进入隐患排查和工单确认。`;
}

function withStageAwareAgentGuidance(result: AiDiagnosisResponse, question: string): AiDiagnosisResponse {
  const intent = inferAgentIntent(question);
  const operatorFocus = buildStageAwareOperatorFocus(intent, result.operatorFocus);
  const answerText = result.source === "llm" && result.status === "ok"
    ? buildStageAwareAnswerText(intent, result)
    : result.answerText;
  return {
    ...result,
    answerText,
    operatorFocus,
  };
}

function confidenceToPercent(value: string): number {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 80;
  return numeric <= 1 ? Math.round(numeric * 100) : Math.round(numeric);
}

function evidenceModuleFromSource(source: string): WorkflowModuleKey {
  if (/CMS|振动/.test(source)) return "cms";
  if (/螺栓|结构/.test(source)) return "bolts";
  return "scada";
}

function evidenceGateFromSource(source: string): AiDiagnosisResponse["evidenceCards"][number]["gate"] {
  if (/CMS|振动/.test(source)) {
    return {
      decision: "支持齿轮箱高速轴轴承定位。",
      humanCheck: "诊断工程师确认采样质量和转速工况后，才把侧频作为部件定位依据。",
      label: "支持定位",
      role: "support",
    };
  }
  if (/Oil|油温/.test(source)) {
    return {
      decision: "增强润滑/摩擦异常判断。",
      humanCheck: "结合环境温度、散热状态和同类机组温升后，再作为风险增强证据。",
      label: "增强判断",
      role: "amplify",
    };
  }
  if (/螺栓|结构/.test(source)) {
    return {
      decision: "结构侧作为反证项，不直接派发叶根检修。",
      humanCheck: activeWorkflowCase.modules.bolts.decision?.confirm ?? "结构工程师确认后才排除结构主故障。",
      label: "结构反证",
      role: "counter",
    };
  }
  return {
    decision: "支持运行异常成立。",
    humanCheck: "值班员确认非限电、非通信异常、非人为降载后，才把功率残差作为有效主证据。",
    label: "支持主故障",
    role: "support",
  };
}

function buildLocalWorkOrderDraft(): AiDiagnosisResponse["workOrderDraft"] {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  if (!ticket) return undefined;

  return {
    acceptanceCriteria: ticket.acceptanceCriteria,
    asset: ticket.asset,
    assignee: ticket.assignee,
    code: ticket.draftCode,
    confirmationChecks: ticket.confirmationChecks,
    dueWindow: ticket.dueWindow,
    priority: ticket.priority,
    safetyRequirement: ticket.safetyRequirement,
    status: ticket.initialState,
    steps: ticket.steps,
    writebackItems: ticket.writebackItems,
  };
}

function buildLocalAiDiagnosisResponse(
  question: string,
  status: "pending" | "fallback",
  reason = "已先展开本地结构化证据包，后端大模型答复生成中。",
): AiDiagnosisResponse {
  const brief = activeWorkflowCase.modules.brief.aiBrief;
  const alerts = activeWorkflowCase.modules.alerts;
  const fusion = activeWorkflowCase.modules.fusion;
  const boltDecision = activeWorkflowCase.modules.bolts.decision;
  const intent = inferAgentIntent(question);
  const includeWorkOrder = ["maintenance_plan", "workorder"].includes(intent);
  const evidenceCards: AiDiagnosisResponse["evidenceCards"] = (alerts.evidenceRows ?? []).map((row) => ({
    confidence: confidenceToPercent(row.confidence),
    gate: evidenceGateFromSource(row.source),
    interpretation: `${row.model}；${row.threshold}；${row.window}`,
    module: evidenceModuleFromSource(row.source),
    severity: row.source.includes("SCADA") || row.source.includes("CMS") ? "alarm" : "watch",
    source: row.source,
    title: row.label,
    value: row.value,
  }));

  if (boltDecision) {
    evidenceCards.push({
      confidence: 72,
      gate: {
        decision: "未改写齿轮箱主故障，只作为载荷放大因素跟踪。",
        humanCheck: boltDecision.confirm,
        label: "结构反证",
        role: "counter",
      },
      interpretation: boltDecision.evidence,
      module: "bolts",
      severity: "watch",
      source: "螺栓/结构监测",
      title: "反证 1",
      value: boltDecision.result,
    });
  }

  return {
    answerText: buildStageAwareAnswerText(intent, {
      answerText: "",
      operatorFocus: brief?.operatorFocus ?? {
        decision: "等待告警研判",
        humanCheck: "研判恢复前不得形成工程处置结论。",
        primaryQuestion: "重新进入告警研判",
        recommendedModule: "brief",
        why: "当前没有可追踪证据包。",
      },
      source: "fallback",
      status,
    }, reason),
    bimHighlights: activeWorkflowCase.componentRisks.map((item) => ({
      label: item.title,
      part: item.part,
      reason: `${item.status} / ${moduleText(item.module)}`,
      severity: item.component === "gearbox" ? "alarm" : "watch",
    })),
    chartRefs: [
      {
        focus: fusion.decision?.result ?? "查看融合判据",
        label: "融合判据",
        module: "fusion",
        reason: fusion.decision?.evidence ?? "先确认多源证据是否同向。",
      },
      {
        focus: activeWorkflowCase.modules.scada.decision?.result ?? "查看运行残差",
        label: "SCADA",
        module: "scada",
        reason: activeWorkflowCase.modules.scada.decision?.confirm ?? "确认非限电、非通信异常。",
      },
      {
        focus: activeWorkflowCase.modules.cms.decision?.result ?? "查看振动证据",
        label: "CMS",
        module: "cms",
        reason: activeWorkflowCase.modules.cms.decision?.confirm ?? "确认采样质量和转速工况。",
      },
      {
        focus: activeWorkflowCase.modules.bolts.decision?.result ?? "查看结构反证",
        label: "螺栓/结构",
        module: "bolts",
        reason: activeWorkflowCase.modules.bolts.decision?.confirm ?? "确认结构侧是否改写主故障。",
      },
    ],
    evidenceCards,
    intent,
    operatorFocus: brief?.operatorFocus ?? {
      decision: "等待告警研判",
      humanCheck: "研判恢复前不得形成工程处置结论。",
      primaryQuestion: "重新进入告警研判",
      recommendedModule: "brief",
      why: "当前没有可追踪证据包。",
    },
    reportSections: [
      {
        body: fusion.decision?.input ?? "等待多源证据接入。",
        title: "输入数据",
      },
      {
        body: fusion.decision?.model ?? "等待模型判据。",
        title: "模型判据",
      },
      {
        body: fusion.decision?.confirm ?? "停机、登塔、检修和派单必须人工确认。",
        title: "人工确认",
      },
    ],
    riskBoundary: "本地证据包只用于等待大模型期间的值班复核；停机、登塔、检修和派单必须人工确认。",
    source: "fallback",
    status,
    title: `${activeWorkflowCase.turbineId} 值班研判`,
    toolTrace: [
      { label: "读取当前事件", output: activeWorkflowCase.eventCode, status: "ok", tool: "frontend_event_context" },
      { label: "展开结构化证据", output: `${alerts.evidenceRows?.length ?? 0} 张证据卡`, status: "ok", tool: "frontend_evidence_bundle" },
      { label: "请求后端 Agent", output: status === "pending" ? "等待大模型答复" : reason, status: "review", tool: "agent_ask" },
    ],
    voiceText: buildAiVoiceAnswerSummary(),
    workOrderDraft: includeWorkOrder ? buildLocalWorkOrderDraft() : undefined,
  };
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

  if (isClosureStatusQuestion(question)) {
    const result = buildClosureStatusAiResponse(question);
    setAiReportHtml(renderAiGeneratedReport(result, question));
    setBimStatus("AI 已基于当前工单门控状态生成回答");
    if (options.speak) speakAiAnswerSummary(result.voiceText);
    return result;
  }

  const requestCaseId = activeCaseId;
  const pendingResult = withStageAwareAgentGuidance(buildLocalAiDiagnosisResponse(question, "pending"), question);
  setAiReportHtml(renderAiGeneratedReport(pendingResult, question));
  setBimStatus("AI 已先展开本地证据包，等待大模型答复");
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
    if (!response.ok) throw new Error("Agent request failed");
    const result = await response.json() as AiDiagnosisResponse;
    if (requestCaseId !== activeCaseId) return result;
    const focusedResult = withStageAwareAgentGuidance(result, question);
    setAiReportHtml(renderAiGeneratedReport(focusedResult, question));
    if (options.speak) speakAiAnswerSummary(focusedResult.voiceText);
    return focusedResult;
  } catch {
    const result = withStageAwareAgentGuidance(
      buildLocalAiDiagnosisResponse(question, "fallback", "后端智能服务暂未返回，已保留本地规则研判。"),
      question,
    );
    if (requestCaseId !== activeCaseId) return result;
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
  delete dashboardShell.dataset.workspace;
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

  document.querySelector<HTMLButtonElement>("#open-manager-workspace")?.addEventListener("click", () => {
    openManagementPage((dashboardShell.dataset.managerPage as ManagementPageKey | undefined) ?? "event", "已打开管理工作台");
  });

  document.querySelector<HTMLButtonElement>("#ai-duty-open")?.addEventListener("click", () => {
    const turbine = getDutyTurbine();
    scene.focusTurbine(activeWorkflowCase.turbineId);
    scene.showTurbineAlert(activeWorkflowCase.turbineId);
    openDiagnosis(turbine, "brief");
    setBimStatus("已进入单机 BIM 诊断，请先确认疑似部件位置");
  });

  window.setTimeout(() => {
    if (hasPlayedIntroBroadcast || dashboardShell.dataset.mode === "bim") return;
    scene.showTurbineAlert(activeWorkflowCase.turbineId);
    triggerIntroAiAlert(getDutyTurbine());
  }, 5200);
});

function getCurrentWorkOrderState(): string {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  return document.querySelector<HTMLElement>("#workorder-state")?.textContent?.trim() ?? ticket?.initialState ?? "待生成";
}

function isGeneratedWorkOrderState(state = getCurrentWorkOrderState()): boolean {
  return state !== "待生成";
}

function isDispatchedWorkOrderState(state = getCurrentWorkOrderState()): boolean {
  return state.includes("已派发") || state.includes("现场复核完成");
}

function isClosedWorkOrderState(state = getCurrentWorkOrderState()): boolean {
  return state.includes("现场复核完成");
}

function openGeneratedWorkOrder(status = activeWorkflowCase.statuses.ticketCreated): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const state = document.querySelector<HTMLElement>("#workorder-state");
  const code = document.querySelector<HTMLElement>("#workorder-code");
  const dispatchButton = document.querySelector<HTMLButtonElement>("[data-dispatch-workorder]");
  const closeButton = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  const currentState = getCurrentWorkOrderState();
  if (isGeneratedWorkOrderState(currentState)) {
    openWorkflowModule("workorder", status);
    updateWorkOrderConfirmationState();
    updateWorkOrderWritebackGateState();
    updateAgentClosureStatusCard();
    return;
  }

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
  document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]").forEach((input) => {
    input.checked = false;
    input.disabled = true;
  });
  setEventTimelineStage("human-confirm");
  openWorkflowModule("workorder", status);
  updateWorkOrderConfirmationState();
  updateWorkOrderWritebackGateState();
  updateAgentClosureStatusCard();
}

function areWorkOrderConfirmationsReady(): boolean {
  const checks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]"));
  return checks.length > 0 && checks.every((input) => input.checked);
}

function updateWorkOrderGateSummary(): void {
  const blocker = document.querySelector<HTMLElement>("[data-workorder-blocker]");
  const nextAction = document.querySelector<HTMLElement>("[data-workorder-next-action]");
  const boundary = document.querySelector<HTMLElement>("[data-workorder-human-boundary]");
  if (!blocker || !nextAction || !boundary) return;

  const state = getCurrentWorkOrderState();
  const confirmationChecks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]"));
  const pendingConfirmations = confirmationChecks.filter((input) => !input.checked);
  const writebackChecks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]"));
  const pendingWritebacks = writebackChecks.filter((input) => !input.checked);
  const enabledWritebacks = writebackChecks.some((input) => !input.disabled);

  if (isClosedWorkOrderState(state)) {
    blocker.textContent = "工单已关闭，等待复盘审核";
    nextAction.textContent = "复核样本标签与现场记录";
    boundary.textContent = "模型样本入库仍需运维主管确认";
    return;
  }

  if (isDispatchedWorkOrderState(state)) {
    blocker.textContent = pendingWritebacks.length > 0
      ? `现场回写缺 ${pendingWritebacks.length} 项`
      : "回写已齐，可关闭工单";
    nextAction.textContent = pendingWritebacks.length > 0
      ? "上传油液、内窥、CMS 复测和样本标签"
      : "由运维主管执行关闭确认";
    boundary.textContent = "未回写项不能作为 AI 样本事实";
    return;
  }

  if (isGeneratedWorkOrderState(state)) {
    blocker.textContent = pendingConfirmations.length > 0
      ? `派发前签核缺 ${pendingConfirmations.length} 项`
      : "签核已齐，可人工派发";
    nextAction.textContent = pendingConfirmations.length > 0
      ? "逐项确认窗口、许可、备件与复盘责任"
      : "由值班长确认派发工单";
    boundary.textContent = "AI 不能自动派发或触发停机登塔";
    return;
  }

  blocker.textContent = enabledWritebacks ? "等待现场回写" : "等待生成工单草案";
  nextAction.textContent = "从告警研判或预测维护模块进入工单确认门";
  boundary.textContent = "派发、关闭、停机、登塔必须人工确认";
}

function updateWorkOrderConfirmationState(): void {
  const dispatchButton = document.querySelector<HTMLButtonElement>("[data-dispatch-workorder]");
  if (!dispatchButton) return;
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const currentState = getCurrentWorkOrderState();
  const isDispatched = isDispatchedWorkOrderState(currentState);
  const checks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-confirm]"));
  checks.forEach((input) => {
    const card = input.closest<HTMLElement>(".workorder-confirm");
    const state = card?.querySelector<HTMLElement>("[data-workorder-confirm-state]");
    const isConfirmed = input.checked;
    if (card) card.dataset.state = isConfirmed ? "confirmed" : "pending";
    if (state) state.textContent = isConfirmed ? "已签核" : "待签核";
  });
  if (isDispatched) {
    dispatchButton.disabled = true;
    dispatchButton.textContent = currentState.includes("现场复核完成")
      ? (ticket?.closedActionLabel ?? "现场复核已完成")
      : "工单已派发";
  } else {
    dispatchButton.disabled = !areWorkOrderConfirmationsReady();
    dispatchButton.textContent = ticket?.dispatchActionLabel ?? "确认派发工单";
  }
  updateWorkOrderGateSummary();
  updateAgentClosureStatusCard();
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
  if (closeButton) closeButton.disabled = true;
  document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]").forEach((input) => {
    input.disabled = false;
  });
  updateWorkOrderWritebackGateState();
  updateAgentClosureStatusCard();
  setEventTimelineStage("workorder-draft");
  setBimStatus("工单已通过人工确认并派发，等待现场复核回写");
}

const writebackCompletedValues = [
  "铁谱/颗粒度报告已上传",
  "高速轴轴承与齿面照片已归档",
  "复测频谱已形成对比结论",
  "已写入 AI 诊断样本",
];

function areWorkOrderWritebacksReady(): boolean {
  const checks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]"));
  return checks.length > 0 && checks.every((input) => input.checked);
}

function updateWorkOrderWritebackGateState(): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const checks = Array.from(document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]"));
  const closeButton = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
  const summaryState = document.querySelector<HTMLElement>("[data-writeback-summary-state]");
  const summaryNote = document.querySelector<HTMLElement>("[data-writeback-summary-note]");
  const isClosed = isClosedWorkOrderState();
  const isEnabled = checks.some((input) => !input.disabled);
  const completedCount = checks.filter((input) => input.checked).length;
  const ready = areWorkOrderWritebacksReady();

  checks.forEach((input, index) => {
    const item = input.closest<HTMLElement>("[data-writeback-summary-item]");
    const stateText = item?.querySelector<HTMLElement>("[data-workorder-writeback-state]");
    const valueText = item?.querySelector<HTMLElement>("strong");
    const detailItem = document.querySelectorAll<HTMLElement>("[data-writeback-item]")[index];
    const detailText = detailItem?.querySelector<HTMLElement>("small");
    const sourceValue = ticket?.writebackItems[index]?.value ?? "待现场回写";
    const doneValue = writebackCompletedValues[index] ?? "已回写";
    const isDone = input.checked;

    if (item) item.dataset.writebackSummaryItem = isDone ? "done" : "pending";
    if (stateText) stateText.textContent = isDone ? "已回写" : isEnabled ? "待回写" : "待派发";
    if (valueText) valueText.textContent = isDone ? doneValue : sourceValue;
    if (detailItem) detailItem.dataset.status = isDone ? "done" : "pending";
    if (detailText) detailText.textContent = isDone ? doneValue : sourceValue;
  });

  if (summaryState) {
    summaryState.textContent = isClosed
      ? (ticket?.closedState ?? "现场复核完成")
      : ready
      ? "回写已确认，可关闭工单"
      : isEnabled
        ? `现场回写待确认 ${checks.length - completedCount} 项`
        : "待现场完成后回写";
  }
  if (summaryNote) {
    summaryNote.textContent = isClosed
      ? activeWorkflowCase.statuses.ticketClosed
      : ready
      ? "油液、内窥照片、CMS 复测和 AI 样本标签均已回写，允许人工关闭本次事件。"
      : isEnabled
        ? "现场复核完成后逐项回写证据；未完成回写前，AI 诊断记录不能闭环。"
        : "回写完成后，事件会进入复盘样本，AI 诊断记录才允许闭环。";
  }
  if (closeButton) {
    closeButton.disabled = isClosed || !ready;
    if (isClosed) closeButton.textContent = ticket?.closedActionLabel ?? "现场复核已完成";
  }
  updateWorkOrderGateSummary();
  updateAgentClosureStatusCard();
}

function finalizeWorkOrderWritebackSummary(): void {
  const ticket = activeWorkflowCase.modules.workorder.ticket;
  const summaryState = document.querySelector<HTMLElement>("[data-writeback-summary-state]");
  const summaryNote = document.querySelector<HTMLElement>("[data-writeback-summary-note]");
  const closeButton = document.querySelector<HTMLButtonElement>("[data-close-workorder]");

  document.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]").forEach((input) => {
    input.disabled = true;
  });
  updateWorkOrderWritebackGateState();
  if (summaryState) summaryState.textContent = ticket?.closedState ?? "现场复核完成";
  if (summaryNote) summaryNote.textContent = activeWorkflowCase.statuses.ticketClosed;
  if (closeButton) closeButton.disabled = true;
  updateAgentClosureStatusCard();
}

function bindAgentResultEvents(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>("[data-agent-open-module]").forEach((button) => {
    button.addEventListener("click", () => {
      const moduleName = getWorkflowModule(button.dataset.agentOpenModule);
      if (!moduleName) return;
      openWorkflowModule(moduleName, `AI 已打开${moduleText(moduleName)}证据`);
      openManagementWorkspace();
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

  container.querySelectorAll<HTMLButtonElement>("[data-agent-create-workorder]").forEach((button) => {
    button.addEventListener("click", () => {
      openGeneratedWorkOrder("AI 已从 BIM 定位进入工单确认门：等待值长与现场工程师确认");
    });
  });
}

function getAnalysisParamValue(pageKey: ManagementPageKey, index: number): string {
  const input = workflowModuleDrawer.querySelector<HTMLInputElement | HTMLSelectElement>(`[data-analysis-param="${pageKey}-${index}"]`);
  return input?.value?.trim() ?? "";
}

function isAnalysisActionPageKey(value: string | undefined): value is AnalysisActionPageKey {
  return Boolean(value && ["cms", "fusion", "health", "maintenance", "scada", "structure", "workorders"].includes(value));
}

function getAnalysisParameters(pageKey: AnalysisActionPageKey): AnalysisParameter[] {
  return Array.from(
    workflowModuleDrawer.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[data-analysis-param^="${pageKey}-"]`),
  ).map((input, index) => ({
    label: input.closest("label")?.querySelector("span")?.textContent?.trim() || `参数 ${index + 1}`,
    value: input.value.trim(),
  }));
}

function renderAnalysisRecord(record: AnalysisRunRecord): string {
  const stateLabel = record.status === "adopted" ? "已采纳为当前事件证据" : "模型复算完成";
  return `
    <header>
      <span>${html(stateLabel)}</span>
      <strong>${html(record.id)}</strong>
    </header>
    <dl>
      <div><dt>输入</dt><dd>${html(record.inputSummary)}</dd></div>
      <div><dt>模型</dt><dd>${html(record.model)}</dd></div>
      <div><dt>结论</dt><dd>${html(record.conclusion)}</dd></div>
      <div><dt>下一步</dt><dd>${html(record.nextAction)}</dd></div>
      <div><dt>人工边界</dt><dd>${html(record.humanBoundary)}</dd></div>
    </dl>
  `;
}

function buildAnalysisRunSummary(pageKey: ManagementPageKey): string {
  if (pageKey === "health") {
    const assessment = buildHealthAssessment(activeWorkflowCase);
    const alarmComponents = assessment.componentScores
      .filter((component) => component.level === 1 && component.status !== "normal")
      .map((component) => component.label)
      .join("、");
    return `已按“${getAnalysisParamValue("health", 0)}”复算：综合健康 ${assessment.overallScore}，关注系统 ${alarmComponents || "无"}；广谱筛查范围为 ${getAnalysisParamValue("health", 1)}，数据边界口径为 ${getAnalysisParamValue("health", 2)}。`;
  }

  if (pageKey === "scada") {
    const threshold = Number(getAnalysisParamValue("scada", 1) || "8");
    const chart = activeWorkflowCase.modules.scada.scadaChart;
    const abnormalCount = chart?.points.filter((point) => point.residualPct >= threshold).length ?? 0;
    return `已按 ${getAnalysisParamValue("scada", 0)}、${getAnalysisParamValue("scada", 2)} 复算：功率残差阈值 ${threshold}% 下，异常窗口 ${abnormalCount}/${chart?.points.length ?? 0}，结论 ${activeWorkflowCase.modules.scada.decision?.result ?? "等待人工复核"}。`;
  }

  if (pageKey === "cms") {
    const threshold = Number(getAnalysisParamValue("cms", 1) || "1.2");
    const chart = activeWorkflowCase.modules.cms.cmsChart;
    const peakCount = chart?.peaks.filter((peak) => peak.amplitude >= threshold).length ?? 0;
    return `已按 ${getAnalysisParamValue("cms", 0)} 与 ${getAnalysisParamValue("cms", 2)} 复算：超过 ${threshold} mm/s 的峰值 ${peakCount} 个，结论 ${activeWorkflowCase.modules.cms.decision?.result ?? "等待人工复核"}。`;
  }

  if (pageKey === "structure") {
    const threshold = Number(getAnalysisParamValue("structure", 1) || "8");
    const chart = activeWorkflowCase.modules.bolts.boltChart;
    const warningCount = chart?.channels.filter((channel) => channel.relaxationPct >= threshold).length ?? 0;
    return `已按温漂补偿=${getAnalysisParamValue("structure", 0)} 复算：松弛阈值 ${threshold}% 下，关注通道 ${warningCount}/${chart?.channels.length ?? 0}，结构侧角色为 ${getAnalysisParamValue("structure", 2)}。`;
  }

  if (pageKey === "fusion") {
    const passCount = activeWorkflowCase.modules.fusion.modelGates?.filter((gate) => gate.status === "pass").length ?? 0;
    return `已按“${getAnalysisParamValue("fusion", 0)}”复算融合门控：通过 ${passCount}/${activeWorkflowCase.modules.fusion.modelGates?.length ?? 0} 层，最低置信度 ${getAnalysisParamValue("fusion", 1)}%，结论 ${activeWorkflowCase.modules.fusion.decision?.result ?? "等待融合"}。`;
  }

  if (pageKey === "maintenance") {
    return `已按策略“${getAnalysisParamValue("maintenance", 0)}”刷新维护计划：最低低风速窗口 ${getAnalysisParamValue("maintenance", 1)} h，备件状态 ${getAnalysisParamValue("maintenance", 2)}，仍需人工确认窗口、许可、资源与回写责任。`;
  }

  if (pageKey === "workorders") {
    const snapshot = readWorkOrderClosureSnapshot();
    return `已刷新工单门控：人工签核 ${snapshot.confirmedChecks.length}/${snapshot.totalChecks}，现场回写 ${snapshot.completedWritebacks.length}/${snapshot.totalWritebacks}；未满足门控前不能派发或关闭。`;
  }

  return "已刷新当前页面记录。";
}

async function requestAnalysisRun(pageKey: AnalysisActionPageKey): Promise<AnalysisRunRecord> {
  const response = await fetch("/api/analysis/run", {
    body: JSON.stringify({
      caseId: activeCaseId,
      pageKey,
      parameters: getAnalysisParameters(pageKey),
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error("Analysis run failed");
  return response.json() as Promise<AnalysisRunRecord>;
}

async function requestEvidenceAdoption(pageKey: AnalysisActionPageKey, runId?: string): Promise<AnalysisRunRecord> {
  const response = await fetch("/api/analysis/adopt", {
    body: JSON.stringify({
      caseId: activeCaseId,
      pageKey,
      runId,
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error("Evidence adoption failed");
  return response.json() as Promise<AnalysisRunRecord>;
}

async function runManagementAnalysis(pageKey: ManagementPageKey): Promise<void> {
  const result = workflowModuleDrawer.querySelector<HTMLElement>(`[data-analysis-result="${pageKey}"]`);
  if (!result) return;
  if (!isAnalysisActionPageKey(pageKey)) {
    result.textContent = buildAnalysisRunSummary(pageKey);
    return;
  }
  result.textContent = "正在请求后端模型运行记录...";
  result.dataset.state = "loading";
  try {
    const record = await requestAnalysisRun(pageKey);
    result.innerHTML = renderAnalysisRecord(record);
    result.dataset.runId = record.id;
  } catch {
    result.textContent = `${buildAnalysisRunSummary(pageKey)} 后端记录暂不可用，当前仅为本地兜底结果。`;
  }
  result.dataset.state = "computed";
  setBimStatus(`${managementPageByKey.get(pageKey)?.label ?? "管理端"}已完成模型复算`);
}

async function adoptManagementEvidence(pageKey: ManagementPageKey): Promise<void> {
  const result = workflowModuleDrawer.querySelector<HTMLElement>(`[data-analysis-result="${pageKey}"]`);
  if (!result) return;
  if (!isAnalysisActionPageKey(pageKey)) {
    result.textContent = `${buildAnalysisRunSummary(pageKey)} 已采纳为 ${activeWorkflowCase.eventCode} 的当前证据记录，等待人工复核签字。`;
    return;
  }
  result.textContent = "正在写入当前事件证据记录...";
  result.dataset.state = "loading";
  try {
    const record = await requestEvidenceAdoption(pageKey, result.dataset.runId);
    result.innerHTML = renderAnalysisRecord(record);
    result.dataset.runId = record.id;
  } catch {
    result.textContent = `${buildAnalysisRunSummary(pageKey)} 后端采纳暂不可用，当前仅为本地兜底记录。`;
  }
  result.dataset.state = "adopted";
  setEventTimelineStage(pageKey === "workorders" ? "workorder-draft" : "evidence-review");
  setBimStatus(`${managementPageByKey.get(pageKey)?.label ?? "证据"}已采纳到当前事件`);
}

function updateKnowledgeGraphDetail(nodeId: string): void {
  const graph = buildWindOpsKnowledgeGraph(activeWorkflowCase);
  const detail = graph.nodes.find((node) => node.id === nodeId) ?? graph.nodes.find((node) => node.id === "gearbox-bearing") ?? graph.nodes[0];
  const title = workflowModuleDrawer.querySelector<HTMLElement>("[data-kg-detail-title]");
  const body = workflowModuleDrawer.querySelector<HTMLElement>("[data-kg-detail]");
  const evidence = workflowModuleDrawer.querySelector<HTMLElement>("[data-kg-detail-evidence]");
  if (title) title.textContent = detail.label;
  if (body) body.textContent = detail.summary;
  if (evidence) evidence.textContent = detail.evidence ?? `${detail.type} / ${knowledgeStatusLabel(detail.status)}`;
  workflowModuleDrawer.querySelectorAll<HTMLElement>("[data-kg-node]").forEach((item) => {
    item.classList.toggle("active", item.dataset.kgNode === nodeId);
  });
}

function bindWorkflowSurfaceEvents(): void {
  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-manager-page-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const pageKey = button.dataset.managerPageButton;
      if (!isManagementPageKey(pageKey)) return;
      openManagementPage(pageKey, `已打开${managementPageByKey.get(pageKey)?.label ?? "管理端页面"}`);
    });
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-close-manager-workspace]")?.addEventListener("click", () => {
    closeManagementWorkspace();
    setBimStatus("已返回 BIM 部件定位视图");
  });

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-run-analysis]").forEach((button) => {
    button.addEventListener("click", () => {
      const pageKey = button.dataset.runAnalysis;
      if (!isManagementPageKey(pageKey)) return;
      void runManagementAnalysis(pageKey);
    });
  });

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-adopt-evidence]").forEach((button) => {
    button.addEventListener("click", () => {
      const pageKey = button.dataset.adoptEvidence;
      if (!isManagementPageKey(pageKey)) return;
      void adoptManagementEvidence(pageKey);
    });
  });

  workflowModuleDrawer.querySelectorAll<HTMLButtonElement>("[data-kg-node]").forEach((button) => {
    button.addEventListener("click", () => {
      updateKnowledgeGraphDetail(button.dataset.kgNode ?? "gearbox");
    });
  });

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
      openManagementWorkspace();
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

  workflowModuleDrawer.querySelectorAll<HTMLInputElement>("[data-workorder-writeback]").forEach((input) => {
    input.addEventListener("change", () => {
      updateWorkOrderWritebackGateState();
    });
  });

  workflowModuleDrawer.querySelector<HTMLButtonElement>("[data-close-workorder]")?.addEventListener("click", () => {
    const ticket = activeWorkflowCase.modules.workorder.ticket;
    const button = document.querySelector<HTMLButtonElement>("[data-close-workorder]");
    const state = document.querySelector<HTMLElement>("#workorder-state");
    const code = document.querySelector<HTMLElement>("#workorder-code");
    if (!areWorkOrderWritebacksReady()) {
      setBimStatus("现场复核回写仍有未完成项，暂不能关闭工单");
      return;
    }
    if (state) state.textContent = ticket?.closedState ?? "现场复核完成";
    if (code) code.textContent = ticket?.finalCode ?? "WO-GX-20260621-02";
    if (button) {
      button.textContent = ticket?.closedActionLabel ?? "现场复核已完成";
      button.disabled = true;
    }
    finalizeWorkOrderWritebackSummary();
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

document.querySelector<HTMLButtonElement>("[data-bim-panel-page]")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  const pageKey = button.dataset.bimPanelPage;
  if (!isManagementPageKey(pageKey)) return;
  const page = managementPageByKey.get(pageKey);
  openManagementPage(pageKey, `已打开${page?.label ?? "管理端页面"}，请按输入-模型-结论-证据复核`);
});

document.querySelector<HTMLButtonElement>("[data-bim-panel-module]")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  const moduleName = getWorkflowModule(button.dataset.bimPanelModule, "workorder");
  if (!moduleName) return;
  openWorkflowModule(moduleName, "已进入工单确认门，派发前需要人工确认");
  openManagementWorkspace();
  setActiveManagementPage(getManagementPageForModule(moduleName));
  setEventTimelineStage("workorder-draft");
});

document.querySelectorAll<HTMLButtonElement>(".module-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const moduleName = getWorkflowModule(button.dataset.module) ?? "health";

    if (moduleName === "workorder") {
      openGeneratedWorkOrder();
      openManagementWorkspace();
      return;
    }

    setActiveModule(moduleName);
    openManagementWorkspace();
    if (["fusion", "scada", "cms", "bolts", "alerts", "inspection", "maintenance"].includes(moduleName)) {
      setEventTimelineStage(moduleName === "alerts" ? "bim-location" : "evidence-review");
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
