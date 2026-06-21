import { describe, expect, it } from "vitest";
import {
  anthropicMessagesUrl,
  buildAiDiagnosisPrompt,
  extractAnthropicText,
  fallbackAiDiagnosis,
  generateAiDiagnosis,
  type AiDiagnosisPayload,
} from "../server/aiDiagnosisProxy";

const payload: AiDiagnosisPayload = {
  caseId: "hs-wtg-02-gearbox-bearing",
  diagnosis: {
    conclusion: "运行残差、振动频谱和热异常共同指向齿轮箱高速轴轴承早期磨损。",
    evidence: ["SCADA 最大功率缺口 +14.1%", "CMS 齿轮啮合侧频 2.1x 基线", "油温较同类机组偏高 8.4 ℃"],
    primaryFinding: "齿轮箱高速轴轴承早期磨损风险",
    recommendedAction: "48 - 72 h 内安排现场复核",
  },
  turbineId: "HS-WTG-02",
};

describe("AI diagnosis proxy", () => {
  it("builds Anthropic-compatible message URLs without leaking frontend configuration", () => {
    expect(anthropicMessagesUrl("https://example.test/anthropic")).toBe("https://example.test/anthropic/v1/messages");
    expect(anthropicMessagesUrl("https://example.test/v1/messages")).toBe("https://example.test/v1/messages");
  });

  it("builds a grounded diagnosis prompt from a structured diagnosis package", () => {
    const prompt = buildAiDiagnosisPrompt(payload);

    expect(prompt).toContain("黔风智维");
    expect(prompt).toContain("HS-WTG-02");
    expect(prompt).toContain("齿轮箱高速轴轴承");
    expect(prompt).toContain("SCADA 最大功率缺口");
    expect(prompt).toContain("机理解释");
    expect(prompt).toContain("不编造真实风场接入");
  });

  it("falls back to the local diagnosis package when the model is not configured", async () => {
    const result = await generateAiDiagnosis(payload, {});

    expect(result.source).toBe("fallback");
    expect(result.answer).toContain("规则诊断包");
    expect(result.answer).toContain("HS-WTG-02");
  });

  it("parses Anthropic content blocks returned by MiMo-compatible routes", async () => {
    const fakeFetch = async () =>
      new Response(JSON.stringify({ content: [{ type: "text", text: "当前判断：齿轮箱 P1 预警" }] }), { status: 200 });

    const result = await generateAiDiagnosis(
      payload,
      {
        apiKey: "test-key",
        baseUrl: "https://example.test/anthropic",
        model: "mimo-v2.5-pro",
      },
      fakeFetch,
    );

    expect(result.source).toBe("llm");
    expect(result.answer).toContain("齿轮箱 P1 预警");
  });

  it("extracts fallback text shapes without assuming a single provider response", () => {
    expect(extractAnthropicText({ text: "plain text" })).toBe("plain text");
    expect(fallbackAiDiagnosis(payload).toolsUsed).toContain("local-diagnosis-package");
  });
});
