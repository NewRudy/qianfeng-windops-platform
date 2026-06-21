import { describe, expect, it } from "vitest";
import {
  buildGearboxWorkflowCase,
  gearboxCaseCatalog,
  gearboxCaseInputs,
  gearboxWorkflowCase,
  getGearboxCaseDiagnostics,
} from "../src/workflow/gearboxWorkflow";

describe("gearbox workflow case", () => {
  it("keeps the operator flow in evidence-to-work-order order", () => {
    expect(gearboxWorkflowCase.moduleOrder).toEqual([
      "brief",
      "health",
      "fusion",
      "scada",
      "cms",
      "bolts",
      "alerts",
      "inspection",
      "maintenance",
      "workorder",
    ]);
  });

  it("starts with an AI diagnosis package that summarizes the operational decision", () => {
    const brief = gearboxWorkflowCase.modules.brief;
    const aiBrief = brief.aiBrief;

    expect(brief.action?.module).toBe("fusion");
    expect(aiBrief?.broadcast).toContain("2号机");
    expect(aiBrief?.broadcast).toContain("黔风智维提示");
    expect(aiBrief?.primaryFinding).toContain("齿轮箱");
    expect(aiBrief?.evidence).toHaveLength(4);
    expect(aiBrief?.operatorQuestions.join(" ")).toContain("为什么");
    expect(brief.metrics).toContainEqual({ label: "证据来源", value: "SCADA / CMS / 螺栓 / 油温" });
  });

  it("explains the multi-source fusion gates behind the warning", () => {
    const fusion = gearboxWorkflowCase.modules.fusion;
    const sources = fusion.fusionSignals?.map((signal) => signal.source).join(" ");
    const gateText = fusion.modelGates?.map((gate) => `${gate.layer} ${gate.method} ${gate.rule} ${gate.result}`).join(" ");

    expect(fusion.fusionSignals).toHaveLength(4);
    expect(fusion.modelGates).toHaveLength(4);
    expect(fusion.metrics).toContainEqual({ label: "融合结论", value: "齿轮箱 P1 预警" });
    expect(sources).toContain("SCADA 功率曲线");
    expect(sources).toContain("CMS 振动频谱");
    expect(sources).toContain("螺栓/结构监测");
    expect(gateText).toContain("OpenOA 风速-功率基线");
    expect(gateText).toContain("齿轮啮合频率");
  });

  it("contains multi-source evidence for the gearbox warning", () => {
    const alerts = gearboxWorkflowCase.modules.alerts;
    const evidenceText = alerts.evidenceRows
      ?.map((row) => `${row.label} ${row.value} ${row.source} ${row.model} ${row.threshold}`)
      .join(" ");

    expect(alerts.evidenceRows).toHaveLength(3);
    expect(evidenceText).toContain("功率缺口");
    expect(evidenceText).toContain("齿轮啮合侧频");
    expect(evidenceText).toContain("油温");
    expect(evidenceText).toContain("SCADA");
    expect(evidenceText).toContain("CMS");
  });

  it("turns the alarm into a hidden-risk inspection checklist before maintenance", () => {
    const alerts = gearboxWorkflowCase.modules.alerts;
    const inspection = gearboxWorkflowCase.modules.inspection;
    const statuses = inspection.inspectionItems?.map((item) => item.status);
    const inspectionText = inspection.inspectionItems?.map((item) => `${item.step} ${item.result} ${item.basis}`).join(" ");

    expect(alerts.action?.module).toBe("inspection");
    expect(inspection.action?.module).toBe("maintenance");
    expect(inspection.inspectionItems).toHaveLength(4);
    expect(statuses).toEqual(["confirmed", "excluded", "pending", "pending"]);
    expect(inspectionText).toContain("齿轮箱高速轴轴承");
    expect(inspectionText).toContain("叶根结构主故障");
    expect(inspectionText).toContain("油液取样");
  });

  it("defines professional chart axes for SCADA, CMS, and bolt monitoring", () => {
    const scadaChart = gearboxWorkflowCase.modules.scada.scadaChart;
    const cmsChart = gearboxWorkflowCase.modules.cms.cmsChart;
    const boltChart = gearboxWorkflowCase.modules.bolts.boltChart;

    expect(scadaChart?.xAxis.label).toBe("风速 m/s");
    expect(scadaChart?.yAxis.label).toBe("有功功率 kW");
    expect(scadaChart?.points.some((point) => point.abnormal)).toBe(true);

    expect(cmsChart?.xAxis.label).toBe("频率 Hz");
    expect(cmsChart?.yAxis.label).toBe("振动幅值 mm/s");
    expect(cmsChart?.threshold.value).toBeGreaterThan(0);
    expect(cmsChart?.peaks.some((peak) => peak.label.includes("啮合"))).toBe(true);

    expect(boltChart?.channels).toHaveLength(8);
    expect(boltChart?.channels.some((channel) => channel.status === "warning")).toBe(true);
  });

  it("has a closed-loop work order checklist", () => {
    const ticket = gearboxWorkflowCase.modules.workorder.ticket;

    expect(ticket?.finalCode).toBe("WO-GX-20260621-02");
    expect(ticket?.steps).toHaveLength(4);
    expect(ticket?.steps.join(" ")).toContain("油液取样");
    expect(gearboxWorkflowCase.statuses.ticketClosed).toContain("回写");
  });

  it("derives dashboard values from the diagnostic input data", () => {
    const diagnostics = getGearboxCaseDiagnostics(gearboxCaseInputs);
    const caseFromInputs = buildGearboxWorkflowCase(gearboxCaseInputs);
    const focusSample = gearboxCaseInputs.scadaSamples[gearboxCaseInputs.focusScadaSampleIndex];
    const expectedShortfall = ((focusSample.expectedKw - focusSample.powerKw) / focusSample.expectedKw) * 100;
    const boltPreloadAverage =
      caseFromInputs.modules.bolts.boltChart!.channels.reduce((sum, channel) => sum + channel.preloadKn, 0) /
      caseFromInputs.modules.bolts.boltChart!.channels.length;

    expect(diagnostics.focusShortfallPct).toBeCloseTo(expectedShortfall, 1);
    expect(caseFromInputs.modules.scada.metrics).toContainEqual({ label: "有功功率", value: `${focusSample.powerKw} kW` });
    expect(caseFromInputs.modules.alerts.evidenceRows?.[0].window).toContain(`${diagnostics.scadaAbnormalSamples} 个异常`);
    expect(caseFromInputs.modules.bolts.metrics).toContainEqual({
      label: "叶根平均预紧力",
      value: `${boltPreloadAverage.toFixed(1)} kN`,
    });
  });

  it("exposes a case catalog while keeping the active case as the dashboard default", () => {
    const ids = gearboxCaseCatalog.map((entry) => entry.id);

    expect(gearboxCaseCatalog).toHaveLength(2);
    expect(new Set(ids).size).toBe(ids.length);
    expect(gearboxCaseCatalog[0].input).toBe(gearboxCaseInputs);
    expect(gearboxWorkflowCase.turbineId).toBe(gearboxCaseCatalog[0].input.turbineId);
    expect(gearboxCaseCatalog.map((entry) => entry.severity)).toEqual(["orange", "red"]);
  });

  it("can build a distinct escalated case from the same diagnostic pipeline", () => {
    const baseCase = buildGearboxWorkflowCase(gearboxCaseCatalog[0].input);
    const severeCase = buildGearboxWorkflowCase(gearboxCaseCatalog[1].input);
    const baseDiagnostics = getGearboxCaseDiagnostics(gearboxCaseCatalog[0].input);
    const severeDiagnostics = getGearboxCaseDiagnostics(gearboxCaseCatalog[1].input);

    expect(severeCase.turbineId).toBe("HS-WTG-03");
    expect(severeCase.modules.workorder.ticket?.finalCode).toBe("WO-GX-20260621-03");
    expect(severeCase.modules.maintenance.metrics).toContainEqual({ label: "建议运行方式", value: "限功率 70%" });
    expect(severeDiagnostics.riskConfidencePct).toBeGreaterThan(baseDiagnostics.riskConfidencePct);
    expect(severeDiagnostics.healthScore).toBeLessThan(baseDiagnostics.healthScore);
  });
});
