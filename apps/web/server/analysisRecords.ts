import type { IncomingMessage, ServerResponse } from "node:http";
import {
  buildGearboxWorkflowCase,
  gearboxCaseCatalog,
  gearboxWorkflowCase,
  type GearboxWorkflowCase,
} from "../src/workflow/gearboxWorkflow";

export type AnalysisPageKey = "cms" | "fusion" | "maintenance" | "scada" | "structure" | "workorders";

export type AnalysisParameter = {
  label: string;
  value: string;
};

export type AnalysisRunPayload = {
  caseId?: string;
  pageKey: AnalysisPageKey;
  parameters?: AnalysisParameter[];
};

export type AnalysisAdoptPayload = {
  caseId?: string;
  pageKey: AnalysisPageKey;
  runId?: string;
};

export type AnalysisRunRecord = {
  adoptedAt?: string;
  caseId: string;
  conclusion: string;
  createdAt: string;
  evidence: string[];
  evidenceState: "adopted" | "computed";
  eventCode: string;
  humanBoundary: string;
  id: string;
  inputSummary: string;
  model: string;
  nextAction: string;
  pageKey: AnalysisPageKey;
  parameters: AnalysisParameter[];
  status: "adopted" | "computed";
  turbineId: string;
};

type AnalysisContext = {
  caseId: string;
  workflowCase: GearboxWorkflowCase;
};

type MiddlewareNext = () => void;

const records: AnalysisRunRecord[] = [];
let runSequence = 1;

export function resolveAnalysisContext(caseId?: string): AnalysisContext {
  const entry = caseId ? gearboxCaseCatalog.find((item) => item.id === caseId) : undefined;
  if (!entry) {
    return {
      caseId: gearboxCaseCatalog[0]?.id ?? "default",
      workflowCase: gearboxWorkflowCase,
    };
  }

  return {
    caseId: entry.id,
    workflowCase: buildGearboxWorkflowCase(entry.input),
  };
}

export function getAnalysisRecords(): AnalysisRunRecord[] {
  return records.map((record) => ({ ...record, parameters: [...record.parameters], evidence: [...record.evidence] }));
}

export function resetAnalysisRecordsForTest(): void {
  records.length = 0;
  runSequence = 1;
}

export function runAnalysisModel(payload: AnalysisRunPayload): AnalysisRunRecord {
  const context = resolveAnalysisContext(payload.caseId);
  const pageKey = normalizeAnalysisPageKey(payload.pageKey);
  const parameters = payload.parameters?.filter((item) => item.label.trim() && item.value.trim()) ?? [];
  const now = new Date().toISOString();
  const profile = buildAnalysisProfile(pageKey, context.workflowCase, parameters);
  const record: AnalysisRunRecord = {
    caseId: context.caseId,
    conclusion: profile.conclusion,
    createdAt: now,
    evidence: profile.evidence,
    evidenceState: "computed",
    eventCode: context.workflowCase.eventCode,
    humanBoundary: profile.humanBoundary,
    id: `RUN-${now.slice(0, 10).replaceAll("-", "")}-${String(runSequence).padStart(3, "0")}`,
    inputSummary: profile.inputSummary,
    model: profile.model,
    nextAction: profile.nextAction,
    pageKey,
    parameters,
    status: "computed",
    turbineId: context.workflowCase.turbineId,
  };
  runSequence += 1;
  records.unshift(record);
  return cloneRecord(record);
}

export function adoptAnalysisEvidence(payload: AnalysisAdoptPayload): AnalysisRunRecord {
  const context = resolveAnalysisContext(payload.caseId);
  const pageKey = normalizeAnalysisPageKey(payload.pageKey);
  const record =
    records.find((item) => item.id === payload.runId && item.caseId === context.caseId) ??
    records.find((item) => item.caseId === context.caseId && item.pageKey === pageKey) ??
    runAnalysisModel({ caseId: context.caseId, pageKey });
  record.status = "adopted";
  record.evidenceState = "adopted";
  record.adoptedAt = new Date().toISOString();
  return cloneRecord(record);
}

export function createAnalysisRecordsMiddleware() {
  return async (req: IncomingMessage, res: ServerResponse, next: MiddlewareNext) => {
    const url = req.url?.split("?")[0] ?? "";

    if (req.method === "GET" && url === "/api/analysis/records") {
      sendJson(res, 200, { records: getAnalysisRecords() });
      return;
    }

    if (req.method === "POST" && url === "/api/analysis/run") {
      try {
        const payload = JSON.parse(await readBody(req)) as AnalysisRunPayload;
        sendJson(res, 200, runAnalysisModel(payload));
      } catch {
        sendJson(res, 400, {
          error: "analysis_run_bad_request",
          message: "模型运行请求格式异常。",
        });
      }
      return;
    }

    if (req.method === "POST" && url === "/api/analysis/adopt") {
      try {
        const payload = JSON.parse(await readBody(req)) as AnalysisAdoptPayload;
        sendJson(res, 200, adoptAnalysisEvidence(payload));
      } catch {
        sendJson(res, 400, {
          error: "analysis_adopt_bad_request",
          message: "证据采纳请求格式异常。",
        });
      }
      return;
    }

    next();
  };
}

function buildAnalysisProfile(
  pageKey: AnalysisPageKey,
  workflowCase: GearboxWorkflowCase,
  parameters: AnalysisParameter[],
): Pick<AnalysisRunRecord, "conclusion" | "evidence" | "humanBoundary" | "inputSummary" | "model" | "nextAction"> {
  const parameterText = formatParameterText(parameters);
  const module = pageKey === "structure" ? workflowCase.modules.bolts : workflowCase.modules[pageKey === "workorders" ? "workorder" : pageKey];

  if (pageKey === "scada") {
    const chart = workflowCase.modules.scada.scadaChart;
    const abnormalCount = chart?.points.filter((point) => point.abnormal).length ?? 0;
    const maxResidual = Math.max(...(chart?.points.map((point) => Math.abs(point.residualPct)) ?? [0]));
    return {
      conclusion: `运行侧异常成立：${abnormalCount}/${chart?.points.length ?? 0} 个采样窗越限，最大功率残差 ${maxResidual.toFixed(1)}%，需转入 CMS 部件证据复核。`,
      evidence: [
        workflowCase.modules.scada.decision?.evidence ?? "SCADA 残差证据未就绪。",
        `本次参数：${parameterText}`,
      ],
      humanBoundary: workflowCase.modules.scada.decision?.confirm ?? "值班员复核后才采纳为主证据。",
      inputSummary: chart?.sampleWindow ?? "10 min SCADA 窗口",
      model: workflowCase.modules.scada.decision?.model ?? "OpenOA 风速-功率基线",
      nextAction: "打开 CMS 振动分析，确认是否能定位到传动链部件。",
    };
  }

  if (pageKey === "cms") {
    const chart = workflowCase.modules.cms.cmsChart;
    const warningPeak = chart?.peaks.find((peak) => peak.status === "warning");
    return {
      conclusion: workflowCase.modules.cms.decision?.result ?? "CMS 复核完成。",
      evidence: [
        workflowCase.modules.cms.decision?.evidence ?? "CMS 侧频证据未就绪。",
        warningPeak ? `预警峰值：${warningPeak.label} / ${warningPeak.frequencyHz} Hz / ${warningPeak.amplitude} mm/s。` : "未发现预警峰值。",
        `本次参数：${parameterText}`,
      ],
      humanBoundary: workflowCase.modules.cms.decision?.confirm ?? "诊断工程师确认采样质量后才用于部件定位。",
      inputSummary: chart?.sampleWindow ?? "CMS 高频采样",
      model: workflowCase.modules.cms.decision?.model ?? "GMF + 边带幅值比",
      nextAction: "把 CMS 证据送入融合诊断，和 SCADA 残差、油温共同判断。",
    };
  }

  if (pageKey === "structure") {
    const chart = workflowCase.modules.bolts.boltChart;
    const warningChannels = chart?.channels.filter((channel) => channel.status === "warning") ?? [];
    return {
      conclusion: workflowCase.modules.bolts.decision?.result ?? "结构侧反证完成。",
      evidence: [
        workflowCase.modules.bolts.decision?.evidence ?? "螺栓与结构证据未就绪。",
        `关注通道：${warningChannels.map((item) => `${item.id} ${item.relaxationPct.toFixed(1)}%`).join("、") || "无"}`,
        `本次参数：${parameterText}`,
      ],
      humanBoundary: workflowCase.modules.bolts.decision?.confirm ?? "结构工程师确认后才作为反证项。",
      inputSummary: `${chart?.channels.length ?? 0} 路叶根螺栓预紧力 + 塔筒结构频率`,
      model: workflowCase.modules.bolts.decision?.model ?? "预紧力松弛阈值 + 结构反证",
      nextAction: "把结构侧结论作为反证项进入融合诊断，避免误派叶根检修。",
    };
  }

  if (pageKey === "fusion") {
    return {
      conclusion: workflowCase.modules.fusion.decision?.result ?? "融合诊断完成。",
      evidence: [
        workflowCase.modules.fusion.decision?.evidence ?? "融合证据未就绪。",
        `判据门：${workflowCase.modules.fusion.modelGates?.map((gate) => `${gate.method}:${gate.status}`).join("；") ?? "未配置"}`,
        `本次参数：${parameterText}`,
      ],
      humanBoundary: workflowCase.modules.fusion.decision?.confirm ?? "诊断工程师复核后才升级告警。",
      inputSummary: workflowCase.modules.fusion.decision?.input ?? "多源证据包",
      model: workflowCase.modules.fusion.decision?.model ?? "多源融合判据",
      nextAction: "进入 BIM 定位和隐患排查清单。",
    };
  }

  if (pageKey === "maintenance") {
    return {
      conclusion: workflowCase.modules.maintenance.decision?.result ?? "维护策略计算完成。",
      evidence: [
        workflowCase.modules.maintenance.decision?.evidence ?? "维护证据未就绪。",
        `本次参数：${parameterText}`,
      ],
      humanBoundary: workflowCase.modules.maintenance.decision?.confirm ?? "值长确认后才生成可执行工单。",
      inputSummary: workflowCase.modules.maintenance.decision?.input ?? "隐患排查结果和资源窗口",
      model: workflowCase.modules.maintenance.decision?.model ?? "预测维护策略规则",
      nextAction: "转入工单中心，等待人工签核。",
    };
  }

  return {
    conclusion: module.decision?.result ?? "工单门控刷新完成。",
    evidence: [module.decision?.evidence ?? "工单证据未就绪。", `本次参数：${parameterText}`],
    humanBoundary: module.decision?.confirm ?? "人工确认后才允许派发和关闭。",
    inputSummary: module.decision?.input ?? "AI 诊断结论、维护策略、安全许可和资源",
    model: module.decision?.model ?? "工单模板 + 人工确认门",
    nextAction: "完成低风速窗口、安全许可、备件和复盘回写责任签核。",
  };
}

function normalizeAnalysisPageKey(pageKey: AnalysisPageKey): AnalysisPageKey {
  const allowed = new Set<AnalysisPageKey>(["cms", "fusion", "maintenance", "scada", "structure", "workorders"]);
  if (!allowed.has(pageKey)) throw new Error("Unsupported analysis page");
  return pageKey;
}

function cloneRecord(record: AnalysisRunRecord): AnalysisRunRecord {
  return {
    ...record,
    evidence: [...record.evidence],
    parameters: [...record.parameters],
  };
}

function formatParameterText(parameters: AnalysisParameter[]): string {
  if (parameters.length === 0) return "采用当前页面默认参数";
  return parameters.map((item) => `${item.label}=${item.value}`).join("；");
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
