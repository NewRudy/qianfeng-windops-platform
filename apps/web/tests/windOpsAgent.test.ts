import { describe, expect, it } from "vitest";
import {
  buildAgentEvidenceCards,
  buildAgentPrompt,
  buildAgentToolTrace,
  classifyAgentIntent,
  runWindOpsAgent,
} from "../server/windOpsAgent";
import { gearboxWorkflowCase } from "../src/workflow/gearboxWorkflow";

describe("WindOps diagnostic agent", () => {
  it("routes operator questions to the right diagnostic intent", () => {
    expect(classifyAgentIntent("为什么不是螺栓问题？")).toBe("counter_evidence");
    expect(classifyAgentIntent("把证据链和图表给我看")).toBe("evidence_chain");
    expect(classifyAgentIntent("下一步怎么处理，需要停机吗")).toBe("maintenance_plan");
    expect(classifyAgentIntent("生成一个详细报告")).toBe("report");
    expect(classifyAgentIntent("生成工单草案")).toBe("workorder");
  });

  it("builds evidence cards from the trusted workflow package", () => {
    const cards = buildAgentEvidenceCards(gearboxWorkflowCase);

    expect(cards).toHaveLength(3);
    expect(cards.map((card) => card.source)).toEqual(["SCADA", "CMS", "SCADA/Oil Temp"]);
    expect(cards[0].module).toBe("scada");
    expect(cards[1].module).toBe("cms");
    expect(cards[0].confidence).toBeGreaterThan(80);
  });

  it("records tool trace so the AI answer is auditable", () => {
    const trace = buildAgentToolTrace(gearboxWorkflowCase);

    expect(trace.map((item) => item.tool)).toEqual([
      "get_current_event",
      "get_evidence_bundle",
      "run_diagnostic_rules",
      "prepare_visual_refs",
      "draft_work_order",
    ]);
    expect(trace.at(-1)?.status).toBe("review");
  });

  it("returns a structured fallback response when the model is not configured", async () => {
    const result = await runWindOpsAgent(
      {
        caseId: "hs-wtg-02-gearbox-bearing",
        question: "为什么不是螺栓问题？",
      },
      {},
    );

    expect(result.status).toBe("fallback");
    expect(result.intent).toBe("counter_evidence");
    expect(result.answerText).toContain("不是叶根螺栓主故障");
    expect(result.evidenceCards.length).toBeGreaterThan(0);
    expect(result.chartRefs.map((ref) => ref.module)).toContain("bolts");
    expect(result.bimHighlights.some((highlight) => highlight.part === "gearbox")).toBe(true);
    expect(result.workOrderDraft?.status).toBe("草案待确认");
    expect(result.riskBoundary).toContain("人工确认");
  });

  it("uses the model only for answer text while preserving deterministic UI structure", async () => {
    const fakeFetch = async () =>
      new Response(JSON.stringify({ content: [{ type: "text", text: "当前判断：模型答复仍指向齿轮箱早期磨损。" }] }), {
        status: 200,
      });

    const result = await runWindOpsAgent(
      {
        question: "解释当前预警",
        turbineId: "HS-WTG-02",
      },
      {
        apiKey: "test-key",
        baseUrl: "https://example.test/anthropic",
        model: "mimo-v2.5-pro",
      },
      fakeFetch,
    );

    expect(result.source).toBe("llm");
    expect(result.answerText).toContain("模型答复");
    expect(result.evidenceCards).toHaveLength(3);
    expect(result.toolTrace).toHaveLength(5);
  });

  it("builds a grounded prompt with the selected intent and trusted evidence", () => {
    const prompt = buildAgentPrompt("workorder", "生成工单草案", gearboxWorkflowCase);

    expect(prompt).toContain("黔风智维");
    expect(prompt).toContain("workorder");
    expect(prompt).toContain("HS-WTG-02");
    expect(prompt).toContain("SCADA");
    expect(prompt).toContain("待人工确认");
  });
});
