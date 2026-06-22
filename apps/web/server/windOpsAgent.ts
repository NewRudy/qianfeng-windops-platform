import type { IncomingMessage, ServerResponse } from "node:http";
import {
  anthropicMessagesUrl,
  extractAnthropicText,
  type AiDiagnosisConfig,
} from "./aiDiagnosisProxy";
import {
  buildGearboxWorkflowCase,
  gearboxCaseCatalog,
  gearboxWorkflowCase,
  type GearboxWorkflowCase,
  type WorkflowModuleKey,
} from "../src/workflow/gearboxWorkflow";
import { buildAgentKnowledgeContext } from "../src/workflow/knowledgeGraph";

export type AgentIntent =
  | "capability"
  | "counter_evidence"
  | "evidence_chain"
  | "explain_alarm"
  | "general_chat"
  | "maintenance_plan"
  | "report"
  | "workorder";

export type AgentAskPayload = {
  caseId?: string;
  question?: string;
  turbineId?: string;
};

export type AgentEvidenceCard = {
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
};

export type AgentChartRef = {
  focus: string;
  label: string;
  module: WorkflowModuleKey;
  reason: string;
};

export type AgentBimHighlight = {
  label: string;
  part: string;
  reason: string;
  severity: "alarm" | "normal" | "watch";
};

export type AgentReportSection = {
  body: string;
  title: string;
};

export type AgentWorkOrderDraft = {
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

export type AgentToolTraceItem = {
  label: string;
  output: string;
  status: "ok" | "review";
  tool: string;
};

export type AgentOperatorFocus = {
  decision: string;
  humanCheck: string;
  primaryQuestion: string;
  recommendedModule: WorkflowModuleKey;
  why: string;
};

export type WindOpsAgentResponse = {
  answerText: string;
  bimHighlights: AgentBimHighlight[];
  caseId: string;
  chartRefs: AgentChartRef[];
  evidenceCards: AgentEvidenceCard[];
  intent: AgentIntent;
  model: string;
  operatorFocus: AgentOperatorFocus;
  reportSections: AgentReportSection[];
  riskBoundary: string;
  source: "fallback" | "llm";
  status: "fallback" | "ok";
  title: string;
  toolTrace: AgentToolTraceItem[];
  voiceText: string;
  workOrderDraft?: AgentWorkOrderDraft;
};

type AgentContext = {
  caseId: string;
  workflowCase: GearboxWorkflowCase;
};

type FetchLike = (url: string, init: RequestInit) => Promise<Response>;
type MiddlewareNext = () => void;

const DEFAULT_MODEL = "mimo-v2.5-pro";

export function classifyAgentIntent(question = ""): AgentIntent {
  const text = question.trim().toLowerCase();
  if (!text) return "explain_alarm";
  if (/(工单|派单|巡检单|作业票|谁去|验收|闭环)/.test(text)) return "workorder";
  if (/(报告|汇报|材料|图文|导出|总结)/.test(text)) return "report";
  if (/(怎么处理|怎么办|下一步|处置|维护|检修|备件|停机|限功率)/.test(text)) return "maintenance_plan";
  if (/(你是谁|你是|你能|能做什么|怎么用|是不是.*假|真假|真的假的|大模型|智能助手|ai|对话|语音|能力|可用)/i.test(text)) return "capability";
  if (/(不是|排除|反证|螺栓|叶根|塔筒|误报)/.test(text)) return "counter_evidence";
  if (/(证据|依据|数据|图|曲线|频谱|scada|cms|油温)/i.test(text)) return "evidence_chain";
  if (/(报警|预警|故障|风险|风机|机组|齿轮箱|轴承|叶片|塔筒|山地|运维|诊断|健康|隐患|bim|gis)/i.test(text)) {
    return "explain_alarm";
  }
  return "general_chat";
}

export function resolveAgentContext(payload: AgentAskPayload): AgentContext {
  const byCaseId = payload.caseId ? gearboxCaseCatalog.find((entry) => entry.id === payload.caseId) : undefined;
  const byTurbine = payload.turbineId
    ? gearboxCaseCatalog.find((entry) => entry.input.turbineId === payload.turbineId)
    : undefined;
  const entry = byCaseId ?? byTurbine ?? gearboxCaseCatalog[0];
  if (!entry) {
    return {
      caseId: "default",
      workflowCase: gearboxWorkflowCase,
    };
  }

  return {
    caseId: entry.id,
    workflowCase: buildGearboxWorkflowCase(entry.input),
  };
}

export function buildAgentEvidenceCards(workflowCase: GearboxWorkflowCase): AgentEvidenceCard[] {
  const evidenceRows = workflowCase.modules.alerts.evidenceRows ?? [];
  const fusionSignals = workflowCase.modules.fusion.fusionSignals ?? [];
  const boltDecision = workflowCase.modules.bolts.decision;
  const sourceToModule = new Map<string, WorkflowModuleKey>([
    ["SCADA", "scada"],
    ["CMS", "cms"],
    ["SCADA/Oil Temp", "scada"],
    ["螺栓/结构监测", "bolts"],
  ]);

  const cards: AgentEvidenceCard[] = evidenceRows.map((row, index) => {
    const relatedSignal = fusionSignals.find((signal) => row.source.includes(signal.source.split(" ")[0]));
    const module = sourceToModule.get(row.source) ?? (row.source.includes("CMS") ? "cms" : "scada");
    return {
      confidence: Math.round(Number(row.confidence) * 100),
      gate: evidenceGateForSource(row.source),
      interpretation: relatedSignal?.rule ?? row.model,
      module,
      severity: index < 2 ? "alarm" : "watch",
      source: row.source,
      title: row.label,
      value: row.value,
    };
  });

  if (boltDecision) {
    cards.push({
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

  return cards;
}

function evidenceGateForSource(source: string): AgentEvidenceCard["gate"] {
  if (source.includes("CMS")) {
    return {
      decision: "支持齿轮箱高速轴轴承定位。",
      humanCheck: "诊断工程师确认采样质量和转速工况后，才把侧频作为部件定位依据。",
      label: "支持定位",
      role: "support",
    };
  }
  if (source.includes("Oil") || source.includes("油温")) {
    return {
      decision: "增强润滑/摩擦异常判断。",
      humanCheck: "结合环境温度、散热状态和同类机组温升后，再作为风险增强证据。",
      label: "增强判断",
      role: "amplify",
    };
  }
  if (source.includes("螺栓") || source.includes("结构")) {
    return {
      decision: "结构侧作为反证项，不直接派发叶根检修。",
      humanCheck: "结构工程师确认螺栓松弛未形成环向扩展后，才排除结构主故障。",
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

export function buildAgentChartRefs(workflowCase: GearboxWorkflowCase): AgentChartRef[] {
  const scada = workflowCase.modules.scada.scadaChart;
  const cms = workflowCase.modules.cms.cmsChart;
  const bolts = workflowCase.modules.bolts.boltChart;
  const warningPeak = cms?.peaks.find((peak) => peak.status === "warning");
  const warningBolt = bolts?.channels.find((channel) => channel.status === "warning");
  return [
    {
      focus: scada?.points.find((point) => point.abnormal)?.timestamp ?? "异常采样窗",
      label: "查看 SCADA 功率残差",
      module: "scada",
      reason: "确认同风速段功率低于 OpenOA 基线，不是单点波动。",
    },
    {
      focus: warningPeak ? `${warningPeak.frequencyHz} Hz / ${warningPeak.label}` : "GMF 侧频",
      label: "查看 CMS 频谱侧频",
      module: "cms",
      reason: "确认齿轮啮合频率和边带同步抬升，定位到传动链。",
    },
    {
      focus: warningBolt ? `${warningBolt.id} 松弛 ${warningBolt.relaxationPct}%` : "叶根通道",
      label: "查看螺栓反证",
      module: "bolts",
      reason: "确认结构监测作为载荷放大因素跟踪，不把主故障误判到叶根。",
    },
  ];
}

export function buildAgentBimHighlights(workflowCase: GearboxWorkflowCase): AgentBimHighlight[] {
  return workflowCase.componentRisks.map((risk) => ({
    label: risk.title,
    part: risk.part,
    reason: risk.status,
    severity: risk.component === "gearbox" ? "alarm" : risk.status.includes("关注") ? "watch" : "normal",
  }));
}

export function buildAgentToolTrace(workflowCase: GearboxWorkflowCase): AgentToolTraceItem[] {
  const brief = workflowCase.modules.brief.aiBrief;
  const fusion = workflowCase.modules.fusion;
  const ticket = workflowCase.modules.workorder.ticket;
  return [
    {
      label: "读取当前预警事件",
      output: `${workflowCase.turbineId} / ${brief?.primaryFinding ?? workflowCase.component}`,
      status: "ok",
      tool: "get_current_event",
    },
    {
      label: "汇总多源证据",
      output: `${brief?.evidence.length ?? 0} 条证据：SCADA、CMS、油温、螺栓/结构`,
      status: "ok",
      tool: "get_evidence_bundle",
    },
    {
      label: "运行机理+数值判据",
      output: `${fusion.modelGates?.length ?? 0} 个判据门：功率基线、GMF 侧频、热平衡、结构排查`,
      status: "ok",
      tool: "run_diagnostic_rules",
    },
    {
      label: "检索故障知识图谱",
      output: "返回机组-部件-故障模式-证据-反证-工单-人工边界关系链",
      status: "ok",
      tool: "query_knowledge_graph",
    },
    {
      label: "准备可视化联动",
      output: "返回 SCADA、CMS、螺栓图表入口和 BIM 部件高亮",
      status: "ok",
      tool: "prepare_visual_refs",
    },
    {
      label: "生成工单草案",
      output: `${ticket?.priority ?? "P1"} / ${ticket?.dueWindow ?? "48-72 h"} / 待人工确认`,
      status: "review",
      tool: "draft_work_order",
    },
  ];
}

export function buildAgentWorkOrderDraft(workflowCase: GearboxWorkflowCase): AgentWorkOrderDraft | undefined {
  const ticket = workflowCase.modules.workorder.ticket;
  if (!ticket) return undefined;
  return {
    acceptanceCriteria: ticket.acceptanceCriteria,
    asset: ticket.asset,
    assignee: ticket.assignee,
    code: ticket.finalCode,
    confirmationChecks: ticket.confirmationChecks,
    dueWindow: ticket.dueWindow,
    priority: ticket.priority,
    safetyRequirement: ticket.safetyRequirement,
    status: "草案待确认",
    steps: ticket.steps,
    writebackItems: ticket.writebackItems,
  };
}

export function buildAgentOperatorFocus(intent: AgentIntent, workflowCase: GearboxWorkflowCase): AgentOperatorFocus {
  const brief = workflowCase.modules.brief.aiBrief;
  const ticket = workflowCase.modules.workorder.ticket;
  const maintenanceWindow = workflowCase.modules.maintenance.metrics?.find((item) => item.label === "建议处置窗口")?.value ?? "48 - 72 h";
  const baseDecision = brief?.primaryFinding ?? `${workflowCase.component}风险`;

  const focusByIntent: Record<AgentIntent, AgentOperatorFocus> = {
    capability: {
      decision: "AI 值班员负责研判、解释和安全导航",
      humanCheck: "AI 不能替代值长完成停机、登塔、检修、派发或关闭工单；这些动作必须人工确认。",
      primaryQuestion: "试试：帮我定位齿轮箱",
      recommendedModule: "brief",
      why: "用户问的是系统智能是否真实可用，先说明 AI 能读哪些证据、能打开哪些工作台、哪些操作不能越权。",
    },
    general_chat: {
      decision: "普通对话，不强行套用诊断流程",
      humanCheck: "涉及停机、登塔、检修、派发或关闭工单时，仍必须进入人工确认门。",
      primaryQuestion: "继续追问或切到当前预警",
      recommendedModule: "brief",
      why: "用户问的是基础对话问题，系统应直接回答，而不是把所有问题都解释成风机告警。",
    },
    counter_evidence: {
      decision: "先确认是不是结构侧误报",
      humanCheck: "结构工程师确认螺栓松弛未形成环向扩展后，才能把齿轮箱作为主闭环。",
      primaryQuestion: "先看螺栓/结构反证",
      recommendedModule: "bolts",
      why: "用户问“为什么不是螺栓问题”时，先看反证，避免把传动链风险误派成叶根检修。",
    },
    evidence_chain: {
      decision: "先确认多源证据是否同向",
      humanCheck: "诊断工程师复核同一时间窗和数据质量后，才允许升级告警级别。",
      primaryQuestion: "先看融合判据",
      recommendedModule: "fusion",
      why: "SCADA、CMS、油温和结构监测必须在同一事件窗口内互相解释，不能只看单条曲线。",
    },
    explain_alarm: {
      decision: baseDecision,
      humanCheck: "值班员确认非限电、非人为降载、非通信异常后，再进入证据复核。",
      primaryQuestion: "先看告警为什么成立",
      recommendedModule: "alerts",
      why: "当前不是普通阈值闪烁，而是运行残差、振动侧频和油温同向触发的预测维护事件。",
    },
    maintenance_plan: {
      decision: `按 ${maintenanceWindow} 安排复核窗口`,
      humanCheck: "值长确认低风速窗口、运行方式和安全许可后，处置策略才可转工单。",
      primaryQuestion: "先看预测维护策略",
      recommendedModule: "maintenance",
      why: "运维用户关心的不是再看更多曲线，而是是否限功率、什么时候复核、需要哪些资源。",
    },
    report: {
      decision: "报告只汇总已验证证据",
      humanCheck: "报告可用于交接班和汇报，但停机、登塔、检修仍需人工签核。",
      primaryQuestion: "先看 AI 诊断包",
      recommendedModule: "brief",
      why: "图文报告必须从结构化证据包生成，不能把大模型回答当成新的事实来源。",
    },
    workorder: {
      decision: `只生成 ${ticket?.priority ?? "P1"} 工单草案`,
      humanCheck: "低风速窗口、安全许可、备件工器具、复盘回写责任全部确认后才允许派发。",
      primaryQuestion: "先看工单人工确认门",
      recommendedModule: "workorder",
      why: "AI 可以把证据转成工单草案，但不能替值长和现场工程师派发停机/登塔动作。",
    },
  };

  return focusByIntent[intent];
}

export function buildFallbackAgentAnswer(intent: AgentIntent, workflowCase: GearboxWorkflowCase): string {
  const brief = workflowCase.modules.brief.aiBrief;
  const maintenance = workflowCase.modules.maintenance;
  const ticket = workflowCase.modules.workorder.ticket;
  if (intent === "capability") {
    return [
      "我不是只会播报固定文案的装饰层。当前我能读取本次预警事件、SCADA/CMS/油温/螺栓结构证据、知识图谱关系链和工单门控状态。",
      "你可以直接说“帮我定位齿轮箱”“打开 SCADA 证据”“工单能派发吗”，我会在系统里执行安全导航或给出门控判断。",
      "边界是：我可以生成研判和工单草案，但停机、登塔、派发、关闭工单必须由值班人员和现场工程师人工确认。",
    ].join("\n");
  }
  if (intent === "general_chat") {
    return [
      "我在。你可以直接问普通问题，也可以让我解释当前风机预警。",
      "如果问题涉及当前事件，我会切换到 SCADA、CMS、结构监测、知识图谱和工单门控；如果只是普通对话，我不会强行套用诊断流程。",
    ].join("\n");
  }
  if (intent === "counter_evidence") {
    return [
      `${workflowCase.turbineId} 当前主风险仍指向齿轮箱，不是叶根螺栓主故障。`,
      "理由是 SCADA 功率残差、CMS 齿轮啮合侧频、油温偏高三项同向；螺栓通道只有局部关注，作为山地阵风载荷放大因素跟踪。",
    ].join("\n");
  }
  if (intent === "evidence_chain") {
    return [
      `证据链按“运行异常 -> 部件定位 -> 热异常增强 -> 结构反证”组织。`,
      `${brief?.evidence.join("；") ?? "当前证据包未就绪"}`,
    ].join("\n");
  }
  if (intent === "maintenance_plan") {
    return [
      `建议先按 ${maintenance.metrics?.find((item) => item.label === "建议运行方式")?.value ?? "限功率"} 运行，等待低风速窗口复核。`,
      maintenance.body ?? "复核动作包含油液取样、内窥检查和 CMS 复测。",
      "值长确认低风速窗口、安全许可和现场资源后，处置策略才可转工单；AI 不负责停机、登塔或检修。",
    ].join("\n");
  }
  if (intent === "workorder") {
    return [
      `工单草案建议由 ${ticket?.assignee ?? "传动链专业班组"} 执行，优先级 ${ticket?.priority ?? "P1"}。`,
      `作业窗口 ${ticket?.dueWindow ?? "48-72 h"}，完成油液、内窥、CMS 复测后再关闭告警。`,
      "这只是草案；低风速作业窗口、安全许可与运行方式、备件工器具、复盘回写责任四项确认后才允许派发，AI 不负责停机、登塔或执行。",
    ].join("\n");
  }
  if (intent === "report") {
    return [
      `图文报告建议按当前判断、证据链、机理解释、处置策略和边界说明五段组织。`,
      brief?.conclusion ?? "当前诊断包未就绪。",
    ].join("\n");
  }
  return [
    brief?.conclusion ?? `${workflowCase.turbineId} 存在 ${workflowCase.component} 风险。`,
    `这不是单个阈值报警，而是多源证据和机理判据共同触发的预测维护事件。`,
  ].join("\n");
}

export function buildAgentReportSections(intent: AgentIntent, workflowCase: GearboxWorkflowCase, answerText: string): AgentReportSection[] {
  if (intent === "general_chat") {
    return [
      {
        title: "对话回答",
        body: answerText,
      },
      {
        title: "可切换上下文",
        body: "如果继续询问当前风机预警、SCADA、CMS、BIM 定位、知识图谱或工单门控，AI 会切回黔风智维业务工具链。",
      },
      {
        title: "人工边界",
        body: "涉及停机、登塔、检修、派发或关闭工单时，必须由值班人员和现场工程师人工确认。",
      },
    ];
  }

  const brief = workflowCase.modules.brief.aiBrief;
  const maintenance = workflowCase.modules.maintenance;
  const ticket = workflowCase.modules.workorder.ticket;
  const confirmationSummary = ticket?.confirmationChecks.map((item) => `${item.label}（${item.owner}）`).join("；");
  const acceptanceSummary = ticket?.acceptanceCriteria.join("；");
  return [
    {
      title: "当前判断",
      body: answerText,
    },
    {
      title: "关键证据",
      body: brief?.evidence.join("；") ?? "当前证据包未就绪。",
    },
    {
      title: "机理解释",
      body: `${buildAgentKnowledgeContext(intent, workflowCase)}\nSCADA 功率残差说明同风速下能量转换效率下降；CMS 齿轮啮合频率及边带抬升把风险定位到传动链；油温偏高增强润滑/摩擦异常判断；螺栓监测用于排除结构主故障并追踪山地阵风载荷。`,
    },
    {
      title: intent === "workorder" ? "工单草案" : "处置建议",
      body:
        intent === "workorder"
          ? `派发前确认：${confirmationSummary ?? "低风速窗口、安全许可、资源和回写责任"}。验收标准：${acceptanceSummary ?? "现场复核材料上传并完成模型样本回写"}。`
          : maintenance.body ?? brief?.recommendedAction ?? "进入预测维护流程并等待人工确认。",
    },
  ];
}

export function buildAgentPrompt(intent: AgentIntent, question: string, workflowCase: GearboxWorkflowCase): string {
  if (intent === "general_chat") {
    return [
      "你是黔风智维平台内嵌的 AI 值班助手，也可以进行普通中文对话。",
      "请直接回答用户问题。不要把普通问题强行解释成风机故障、证据链或工单流程。",
      "如果问题需要实时外部信息而你无法确定，请说明不能实时查询。",
      "如果用户转而询问风电运维、预警、SCADA、CMS、BIM、知识图谱或工单，再引导其进入平台业务流程。",
      "安全边界：停机、登塔、检修、派发、关闭工单必须人工确认。",
      "",
      `用户问题：${question || "你好"}`,
    ].join("\n");
  }

  const brief = workflowCase.modules.brief.aiBrief;
  const evidence = buildAgentEvidenceCards(workflowCase);
  const ticket = workflowCase.modules.workorder.ticket;
  const confirmationChecks = ticket?.confirmationChecks.map((item) => `${item.label}/${item.owner}:${item.detail}`).join("；");
  const acceptanceCriteria = ticket?.acceptanceCriteria.join("；");
  const knowledgeContext = buildAgentKnowledgeContext(intent, workflowCase);
  return [
    "你是黔风智维平台的风电运维 AI 值班诊断员。",
    "请只基于下列工具输出回答，不编造真实接入、自动停机、准确率或企业客户。",
    "回答要像现场工程师能用的结论：先判断，再给证据，再给下一步人工动作。最多 5 句。",
    "如果用户问你能做什么、是不是假的或怎么使用，请诚实说明：可读取结构化证据、知识图谱和工单门控，可导航页面和定位 BIM，但不能自动执行安全动作。",
    "如果用户问工单，只能生成草案，必须说明待人工确认，并列出派发前确认门。",
    "除非用户明确问工单或处置策略，不要说已经生成工单；严禁说自动生成、自动派发、自动派单、自动停机、自动登塔、立即执行。",
    "",
    `用户问题：${question || "解释当前预警"}`,
    `意图：${intent}`,
    `风机：${workflowCase.turbineId}`,
    `诊断结论：${brief?.conclusion ?? ""}`,
    `建议动作：${brief?.recommendedAction ?? ""}`,
    `证据卡：${evidence.map((item) => `${item.source}:${item.value}:${item.gate.label}:${item.gate.decision}:${item.interpretation}`).join("；")}`,
    `知识图谱上下文：${knowledgeContext}`,
    `工单确认门：${confirmationChecks ?? "低风速窗口、安全许可、备件工器具、复盘回写责任"}`,
    `工单验收标准：${acceptanceCriteria ?? "现场复核材料上传并完成样本回写"}`,
  ].join("\n");
}

export function enforceAgentAnswerBoundaries(answerText: string, intent: AgentIntent): string {
  let guarded = answerText
    .replace(/自动生成/g, "生成草案")
    .replace(/自动派发/g, "人工确认后派发")
    .replace(/自动派单/g, "人工确认后派单")
    .replace(/自动停机/g, "人工确认后停机")
    .replace(/自动登塔/g, "人工确认后登塔")
    .replace(/自动检修/g, "人工确认后检修")
    .replace(/自动执行/g, "人工确认后执行")
    .replace(/正式派发/g, "人工确认后派发")
    .replace(/立即执行/g, "人工确认后执行");

  if (intent === "general_chat") return guarded;

  if (!["maintenance_plan", "workorder"].includes(intent)) {
    guarded = guarded.replace(
      /已[^。！？]*工单草案[^。！？]*[。！？]?/g,
      "如需处置，先完成证据复核和人工确认，再由值长确认是否打开工单草案。",
    );
  }

  if (!/人工确认|人工审核|值长确认|现场工程师确认/.test(guarded)) {
    guarded = `${guarded}\n边界：AI 只辅助研判，停机、登塔、检修和派单必须人工确认。`;
  }

  return guarded;
}

export async function runWindOpsAgent(
  payload: AgentAskPayload,
  config: AiDiagnosisConfig,
  fetchImpl: FetchLike = fetch,
): Promise<WindOpsAgentResponse> {
  const context = resolveAgentContext(payload);
  const question = payload.question?.trim() || "解释当前预警";
  const intent = classifyAgentIntent(question);
  const evidenceCards = buildAgentEvidenceCards(context.workflowCase);
  const chartRefs = buildAgentChartRefs(context.workflowCase);
  const bimHighlights = buildAgentBimHighlights(context.workflowCase);
  const toolTrace = buildAgentToolTrace(context.workflowCase);
  const operatorFocus = buildAgentOperatorFocus(intent, context.workflowCase);
  const riskBoundary = intent === "general_chat"
    ? "这是普通对话回答，不形成工程处置结论；涉及停机、检修、登塔、派发或关闭工单时必须人工确认。"
    : "AI 输出用于值班研判和工单草案；停机、检修、登塔和安全操作必须人工确认，并由现场工程师按规程执行。";
  const model = config.model?.trim() || DEFAULT_MODEL;
  let answerText = buildFallbackAgentAnswer(intent, context.workflowCase);
  let source: WindOpsAgentResponse["source"] = "fallback";
  let status: WindOpsAgentResponse["status"] = "fallback";

  const apiKey = config.apiKey?.trim();
  const url = anthropicMessagesUrl(config.baseUrl);
  if (apiKey && url) {
    const timeoutMs = Math.max(1, Number(config.timeoutSeconds || 30)) * 1000;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        body: JSON.stringify({
          max_tokens: intent === "general_chat" ? 360 : Math.max(256, Math.min(1200, Number(config.maxTokens || 900))),
          messages: [{ role: "user", content: buildAgentPrompt(intent, question, context.workflowCase) }],
          model,
          system: "你是风电运维诊断助手。只输出最终中文答复，不输出思考过程。",
          temperature: 0.15,
        }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "x-api-key": apiKey,
        },
        method: "POST",
        signal: controller.signal,
      });
      if (response.ok) {
        const text = extractAnthropicText(await response.json());
        if (text) {
          answerText = text;
          source = "llm";
          status = "ok";
        }
      }
    } catch {
      answerText = buildFallbackAgentAnswer(intent, context.workflowCase);
    } finally {
      clearTimeout(timeout);
    }
  }
  answerText = enforceAgentAnswerBoundaries(answerText, intent);

  const spokenId = context.workflowCase.turbineId.match(/(\d+)$/)?.[1];
  const voiceText = intent === "general_chat"
    ? "已生成对话回答。"
    : `${spokenId ? `${Number(spokenId)}号机` : context.workflowCase.turbineId}齿轮箱一级预警。已生成证据链和工单草案，请人工确认。`;

  return {
    answerText,
    bimHighlights,
    caseId: context.caseId,
    chartRefs,
    evidenceCards,
    intent,
    model,
    operatorFocus,
    reportSections: buildAgentReportSections(intent, context.workflowCase, answerText),
    riskBoundary,
    source,
    status,
    title: `${context.workflowCase.turbineId} AI 值班诊断`,
    toolTrace,
    voiceText,
    workOrderDraft: ["maintenance_plan", "workorder"].includes(intent) ? buildAgentWorkOrderDraft(context.workflowCase) : undefined,
  };
}

export function createWindOpsAgentMiddleware(config: AiDiagnosisConfig) {
  return async (req: IncomingMessage, res: ServerResponse, next: MiddlewareNext) => {
    const url = req.url?.split("?")[0] ?? "";
    if (req.method === "GET" && url === "/api/agent/status") {
      sendJson(res, 200, {
        configured: Boolean(config.apiKey && config.baseUrl),
        model: config.model || DEFAULT_MODEL,
        provider: config.provider || "anthropic-compatible",
      });
      return;
    }

    if (req.method !== "POST" || url !== "/api/agent/ask") {
      next();
      return;
    }

    try {
      const payload = JSON.parse(await readBody(req)) as AgentAskPayload;
      sendJson(res, 200, await runWindOpsAgent(payload, config));
    } catch {
      sendJson(res, 400, {
        answerText: "AI 值班诊断请求格式异常，请重新进入诊断包。",
        bimHighlights: [],
        caseId: "invalid",
        chartRefs: [],
        evidenceCards: [],
        intent: "explain_alarm",
        model: config.model || DEFAULT_MODEL,
        operatorFocus: {
          decision: "请求异常",
          humanCheck: "请求恢复前不得形成工程处置结论。",
          primaryQuestion: "重新进入诊断包",
          recommendedModule: "brief",
          why: "后端未获得有效问题和事件上下文。",
        },
        reportSections: [],
        riskBoundary: "请求格式异常，无法形成工程判断。",
        source: "fallback",
        status: "fallback",
        title: "AI 值班诊断",
        toolTrace: [{ label: "请求校验", output: "JSON 格式异常", status: "review", tool: "request_guard" }],
        voiceText: "AI 请求异常，请重新进入诊断包。",
      } satisfies WindOpsAgentResponse);
    }
  };
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, statusCode: number, body: unknown): void {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
