import type { IncomingMessage, ServerResponse } from "node:http";

export type AiDiagnosisPayload = {
  caseId?: string;
  diagnosis: {
    conclusion?: string;
    evidence?: string[];
    primaryFinding?: string;
    recommendedAction?: string;
  };
  question?: string;
  turbineId: string;
};

export type AiDiagnosisConfig = {
  apiKey?: string;
  baseUrl?: string;
  maxTokens?: string;
  model?: string;
  provider?: string;
  timeoutSeconds?: string;
};

export type AiDiagnosisResult = {
  answer: string;
  model: string;
  source: "llm" | "fallback";
  status: "ok" | "fallback";
  toolsUsed: string[];
};

type FetchLike = (url: string, init: RequestInit) => Promise<Response>;
type MiddlewareNext = () => void;

const DEFAULT_MODEL = "mimo-v2.5-pro";

export function anthropicMessagesUrl(baseUrl = ""): string {
  const normalized = baseUrl.trim().replace(/\/+$/, "");
  if (!normalized) return "";
  if (normalized.endsWith("/v1/messages") || normalized.endsWith("/messages")) return normalized;
  return `${normalized}/v1/messages`;
}

export function buildAiDiagnosisPrompt(payload: AiDiagnosisPayload): string {
  return [
    "你是黔风智维的风电运维 AI 值班助手。",
    "只基于输入的结构化诊断包回答，不编造真实风场接入、准确率、自动停机或自动控制结论。",
    "用中文输出五段：当前判断、关键证据、机理解释、处置建议、边界。",
    "面向风电运维工程师，解释 SCADA 功率残差、CMS 振动频谱、油温和结构监测之间的关系。",
    "每段不超过两句话，避免空泛营销话术。",
    "",
    `用户问题：${payload.question || "生成当前风险诊断摘要"}`,
    `风机编号：${payload.turbineId}`,
    `疑似部件：${payload.diagnosis.primaryFinding || "未知"}`,
    `系统结论：${payload.diagnosis.conclusion || "未提供"}`,
    `建议动作：${payload.diagnosis.recommendedAction || "未提供"}`,
    `证据链：${(payload.diagnosis.evidence || []).map((item, index) => `${index + 1}. ${item}`).join("；")}`,
  ].join("\n");
}

export function fallbackAiDiagnosis(payload: AiDiagnosisPayload, reason = "外部模型暂不可用"): AiDiagnosisResult {
  const evidence = payload.diagnosis.evidence?.slice(0, 3) ?? [];
  const evidenceText = evidence.length > 0 ? evidence.join("；") : "当前诊断包暂无证据明细";
  return {
    answer: [
      `当前判断：${payload.turbineId} ${payload.diagnosis.primaryFinding || "存在设备健康风险"}，${payload.diagnosis.conclusion || "建议进入诊断包复核"}`,
      `关键证据：${evidenceText}`,
      `建议动作：${payload.diagnosis.recommendedAction || "生成巡检工单并安排现场复核"}`,
      `边界：${reason}；本结论来自规则诊断包，需经现场工程师按规程复核。`,
    ].join("\n"),
    model: DEFAULT_MODEL,
    source: "fallback",
    status: "fallback",
    toolsUsed: ["local-diagnosis-package"],
  };
}

export async function generateAiDiagnosis(
  payload: AiDiagnosisPayload,
  config: AiDiagnosisConfig,
  fetchImpl: FetchLike = fetch,
): Promise<AiDiagnosisResult> {
  const apiKey = config.apiKey?.trim();
  const url = anthropicMessagesUrl(config.baseUrl);
  const model = config.model?.trim() || DEFAULT_MODEL;
  if (!apiKey || !url) {
    return fallbackAiDiagnosis(payload, "大模型未配置");
  }

  const timeoutMs = Math.max(1, Number(config.timeoutSeconds || 30)) * 1000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, {
      body: JSON.stringify({
        max_tokens: Math.max(256, Math.min(1600, Number(config.maxTokens || 1000))),
        messages: [{ role: "user", content: buildAiDiagnosisPrompt(payload) }],
        model,
        system: "你是风电运维诊断助手。只输出最终答案，不输出思考过程。",
        temperature: 0.2,
      }),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": apiKey,
        "Authorization": `Bearer ${apiKey}`,
      },
      method: "POST",
      signal: controller.signal,
    });

    if (!response.ok) {
      return fallbackAiDiagnosis(payload, `大模型接口返回 HTTP ${response.status}`);
    }

    const data = await response.json() as { content?: Array<{ text?: string }>; completion?: string; message?: string; text?: string };
    const answer = extractAnthropicText(data);
    if (!answer) {
      return fallbackAiDiagnosis(payload, "大模型返回为空");
    }

    return {
      answer,
      model,
      source: "llm",
      status: "ok",
      toolsUsed: ["mimo-anthropic-compatible", "diagnosis-package"],
    };
  } catch (error) {
    const reason = error instanceof Error && error.name === "AbortError" ? "大模型连接超时" : "大模型网络不可达";
    return fallbackAiDiagnosis(payload, reason);
  } finally {
    clearTimeout(timeout);
  }
}

export function extractAnthropicText(payload: { content?: Array<{ text?: string }>; completion?: string; message?: string; text?: string }): string {
  if (Array.isArray(payload.content)) {
    return payload.content
      .map((item) => item.text?.trim() ?? "")
      .filter(Boolean)
      .join("\n")
      .trim();
  }

  return (payload.text || payload.message || payload.completion || "").trim();
}

export function createAiDiagnosisMiddleware(config: AiDiagnosisConfig) {
  return async (req: IncomingMessage, res: ServerResponse, next: MiddlewareNext) => {
    const url = req.url?.split("?")[0] ?? "";
    if (req.method === "GET" && url === "/api/ai/status") {
      sendJson(res, 200, {
        configured: Boolean(config.apiKey && config.baseUrl),
        model: config.model || DEFAULT_MODEL,
        provider: config.provider || "anthropic-compatible",
      });
      return;
    }

    if (req.method !== "POST" || url !== "/api/ai/diagnosis") {
      next();
      return;
    }

    try {
      const payload = JSON.parse(await readBody(req)) as AiDiagnosisPayload;
      const result = await generateAiDiagnosis(payload, config);
      sendJson(res, 200, result);
    } catch {
      sendJson(res, 400, {
        answer: "AI 诊断请求格式异常，请重新生成诊断包。",
        model: config.model || DEFAULT_MODEL,
        source: "fallback",
        status: "fallback",
        toolsUsed: ["request-guard"],
      } satisfies AiDiagnosisResult);
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
