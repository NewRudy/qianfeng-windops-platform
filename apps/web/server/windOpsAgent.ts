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

export type AgentIntent =
  | "counter_evidence"
  | "evidence_chain"
  | "explain_alarm"
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
  dueWindow: string;
  priority: string;
  safetyRequirement: string;
  status: string;
  steps: Array<{
    action: string;
    owner: string;
    output: string;
  }>;
};

export type AgentToolTraceItem = {
  label: string;
  output: string;
  status: "ok" | "review";
  tool: string;
};

export type WindOpsAgentResponse = {
  answerText: string;
  bimHighlights: AgentBimHighlight[];
  caseId: string;
  chartRefs: AgentChartRef[];
  evidenceCards: AgentEvidenceCard[];
  intent: AgentIntent;
  model: string;
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
  if (/(不是|排除|反证|螺栓|叶根|塔筒|误报)/.test(text)) return "counter_evidence";
  if (/(证据|依据|数据|图|曲线|频谱|scada|cms|油温)/i.test(text)) return "evidence_chain";
  return "explain_alarm";
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
  const sourceToModule = new Map<string, WorkflowModuleKey>([
    ["SCADA", "scada"],
    ["CMS", "cms"],
    ["SCADA/Oil Temp", "scada"],
    ["螺栓/结构监测", "bolts"],
  ]);

  return evidenceRows.map((row, index) => {
    const relatedSignal = fusionSignals.find((signal) => row.source.includes(signal.source.split(" ")[0]));
    const module = sourceToModule.get(row.source) ?? (row.source.includes("CMS") ? "cms" : "scada");
    return {
      confidence: Math.round(Number(row.confidence) * 100),
      interpretation: relatedSignal?.rule ?? row.model,
      module,
      severity: index < 2 ? "alarm" : "watch",
      source: row.source,
      title: row.label,
      value: row.value,
    };
  });
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
    dueWindow: ticket.dueWindow,
    priority: ticket.priority,
    safetyRequirement: ticket.safetyRequirement,
    status: "草案待确认",
    steps: ticket.steps,
  };
}

export function buildFallbackAgentAnswer(intent: AgentIntent, workflowCase: GearboxWorkflowCase): string {
  const brief = workflowCase.modules.brief.aiBrief;
  const maintenance = workflowCase.modules.maintenance;
  const ticket = workflowCase.modules.workorder.ticket;
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
    ].join("\n");
  }
  if (intent === "workorder") {
    return [
      `工单草案建议由 ${ticket?.assignee ?? "传动链专业班组"} 执行，优先级 ${ticket?.priority ?? "P1"}。`,
      `作业窗口 ${ticket?.dueWindow ?? "48-72 h"}，完成油液、内窥、CMS 复测后再关闭告警。`,
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
  const brief = workflowCase.modules.brief.aiBrief;
  const maintenance = workflowCase.modules.maintenance;
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
      body: "SCADA 功率残差说明同风速下能量转换效率下降；CMS 齿轮啮合频率及边带抬升把风险定位到传动链；油温偏高增强润滑/摩擦异常判断；螺栓监测用于排除结构主故障并追踪山地阵风载荷。",
    },
    {
      title: intent === "workorder" ? "工单草案" : "处置建议",
      body: maintenance.body ?? brief?.recommendedAction ?? "进入预测维护流程并等待人工确认。",
    },
  ];
}

export function buildAgentPrompt(intent: AgentIntent, question: string, workflowCase: GearboxWorkflowCase): string {
  const brief = workflowCase.modules.brief.aiBrief;
  const evidence = buildAgentEvidenceCards(workflowCase);
  return [
    "你是黔风智维平台的风电运维 AI 值班诊断员。",
    "请只基于下列工具输出回答，不编造真实接入、自动停机、准确率或企业客户。",
    "回答要像现场工程师能用的结论：先判断，再给证据，再给下一步。最多 5 句。",
    "如果用户问工单，只能生成草案，必须说明待人工确认。",
    "",
    `用户问题：${question || "解释当前预警"}`,
    `意图：${intent}`,
    `风机：${workflowCase.turbineId}`,
    `诊断结论：${brief?.conclusion ?? ""}`,
    `建议动作：${brief?.recommendedAction ?? ""}`,
    `证据卡：${evidence.map((item) => `${item.source}:${item.value}:${item.interpretation}`).join("；")}`,
  ].join("\n");
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
  const riskBoundary = "AI 输出用于值班研判和工单草案；停机、检修、登塔和安全操作必须人工确认，并由现场工程师按规程执行。";
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
          max_tokens: Math.max(256, Math.min(1200, Number(config.maxTokens || 900))),
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

  const spokenId = context.workflowCase.turbineId.match(/(\d+)$/)?.[1];
  const voiceText = `${spokenId ? `${Number(spokenId)}号机` : context.workflowCase.turbineId}齿轮箱一级预警。已生成证据链和工单草案，请人工确认。`;

  return {
    answerText,
    bimHighlights,
    caseId: context.caseId,
    chartRefs,
    evidenceCards,
    intent,
    model,
    reportSections: buildAgentReportSections(intent, context.workflowCase, answerText),
    riskBoundary,
    source,
    status,
    title: `${context.workflowCase.turbineId} AI 值班诊断`,
    toolTrace,
    voiceText,
    workOrderDraft: buildAgentWorkOrderDraft(context.workflowCase),
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
