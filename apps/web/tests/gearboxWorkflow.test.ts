import { describe, expect, it } from "vitest";
import {
  buildGearboxWorkflowCase,
  gearboxCaseInputs,
  gearboxWorkflowCase,
  getGearboxCaseDiagnostics,
} from "../src/workflow/gearboxWorkflow";

describe("gearbox workflow case", () => {
  it("keeps the operator flow in evidence-to-work-order order", () => {
    expect(gearboxWorkflowCase.moduleOrder).toEqual([
      "health",
      "scada",
      "cms",
      "bolts",
      "alerts",
      "maintenance",
      "workorder",
    ]);
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
});
