import { describe, expect, it } from "vitest";
import { buildHealthAssessment } from "../src/workflow/healthAssessment";
import { buildGearboxWorkflowCase, gearboxCaseCatalog } from "../src/workflow/gearboxWorkflow";

describe("wind turbine health assessment", () => {
  it("covers the official competition data sources with explicit boundaries", () => {
    const assessment = buildHealthAssessment(buildGearboxWorkflowCase(gearboxCaseCatalog[0].input));
    const sourceKeys = assessment.dataSources.map((source) => source.key);
    const simulatedSources = assessment.dataSources.filter((source) => source.status !== "connected");

    expect(sourceKeys).toEqual(["scada", "cms", "bolt", "flange-gap", "uav", "ai-video", "weather"]);
    expect(assessment.coverageGap).toContain("无人机");
    expect(assessment.coverageGap).toContain("法兰间隙");
    expect(simulatedSources.every((source) => source.boundary.length > 0)).toBe(true);
  });

  it("scores the required major components by hierarchy and weight", () => {
    const assessment = buildHealthAssessment(buildGearboxWorkflowCase(gearboxCaseCatalog[0].input));
    const labels = assessment.componentScores.map((component) => component.label);
    const topLevelWeight = assessment.systemWeights.reduce((sum, component) => sum + component.weightPct, 0);

    expect(topLevelWeight).toBe(100);
    expect(labels).toEqual(
      expect.arrayContaining([
        "基础",
        "塔筒",
        "叶片",
        "传动链",
        "主轴",
        "齿轮箱",
        "发电机",
        "变桨系统",
        "偏航系统",
        "变流器",
        "电气接头过热",
        "螺栓监测",
        "法兰间隙监测",
      ]),
    );
  });

  it("keeps the gearbox as the current special monitoring focus", () => {
    const assessment = buildHealthAssessment(buildGearboxWorkflowCase(gearboxCaseCatalog[0].input));
    const gearbox = assessment.componentScores.find((component) => component.key === "gearbox");
    const tower = assessment.componentScores.find((component) => component.key === "tower");
    const specialText = assessment.componentScores.map((component) => `${component.label} ${component.specialMonitoring}`).join(" ");

    expect(gearbox?.status).not.toBe("normal");
    expect(gearbox?.score).toBeLessThan(tower?.score ?? 100);
    expect(gearbox?.dataSources).toEqual(expect.arrayContaining(["scada", "cms"]));
    expect(specialText).toContain("高速轴轴承");
    expect(specialText).toContain("法兰间隙");
  });

  it("reduces health when the severe case is selected", () => {
    const base = buildHealthAssessment(buildGearboxWorkflowCase(gearboxCaseCatalog[0].input));
    const severe = buildHealthAssessment(buildGearboxWorkflowCase(gearboxCaseCatalog[1].input));
    const baseGearbox = base.componentScores.find((component) => component.key === "gearbox");
    const severeGearbox = severe.componentScores.find((component) => component.key === "gearbox");

    expect(severe.overallScore).toBeLessThan(base.overallScore);
    expect(severeGearbox?.score).toBeLessThan(baseGearbox?.score ?? 100);
    expect(severe.status).toBe("alarm");
  });
});
