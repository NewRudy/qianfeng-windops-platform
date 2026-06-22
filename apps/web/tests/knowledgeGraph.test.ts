import { describe, expect, it } from "vitest";
import {
  buildAgentKnowledgeContext,
  buildWindOpsKnowledgeGraph,
} from "../src/workflow/knowledgeGraph";
import { gearboxWorkflowCase } from "../src/workflow/gearboxWorkflow";

describe("WindOps knowledge graph", () => {
  it("models the competition evidence objects as typed graph nodes", () => {
    const graph = buildWindOpsKnowledgeGraph(gearboxWorkflowCase);
    const nodeLabels = graph.nodes.map((node) => `${node.type}:${node.label}`);

    expect(nodeLabels).toContain(`机组:${gearboxWorkflowCase.turbineId}`);
    expect(nodeLabels).toContain("部件:齿轮箱高速轴轴承");
    expect(nodeLabels).toContain("SCADA证据:功率残差");
    expect(nodeLabels).toContain("CMS证据:GMF侧频");
    expect(nodeLabels).toContain("结构反证:叶根螺栓/塔筒结构");
    expect(nodeLabels).toContain("处置动作:现场复核工单");
    expect(graph.nodes.some((node) => node.type === "知识边界" && node.summary.includes("人工确认"))).toBe(true);
  });

  it("creates decision paths that explain support evidence, counter evidence, and human action", () => {
    const graph = buildWindOpsKnowledgeGraph(gearboxWorkflowCase);
    const supportPath = graph.decisionPaths.find((path) => path.id === "why-gearbox");
    const counterPath = graph.decisionPaths.find((path) => path.id === "why-not-bolt");
    const actionPath = graph.decisionPaths.find((path) => path.id === "what-next");

    expect(supportPath?.answer).toContain("齿轮箱");
    expect(supportPath?.steps.map((step) => step.module)).toEqual(["scada", "cms", "fusion"]);
    expect(counterPath?.answer).toContain("反证");
    expect(counterPath?.steps.map((step) => step.module)).toContain("bolts");
    expect(actionPath?.steps.at(-1)?.humanBoundary).toContain("人工确认");
  });

  it("builds a compact graph context for the AI agent prompt", () => {
    const context = buildAgentKnowledgeContext("counter_evidence", gearboxWorkflowCase);

    expect(context).toContain("图谱检索");
    expect(context).toContain("叶根螺栓/塔筒结构");
    expect(context).toContain("反证");
    expect(context).toContain("推荐模块=bolts");
    expect(context).toContain("人工确认");
  });
});
