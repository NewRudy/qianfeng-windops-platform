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
    expect(aiBrief?.broadcast).toContain("黔风智维");
    expect(aiBrief?.primaryFinding).toContain("齿轮箱");
    expect(aiBrief?.evidence).toHaveLength(4);
    expect(aiBrief?.operatorQuestions.join(" ")).toContain("为什么");
    expect(aiBrief?.primaryAction).toMatchObject({ label: "运行融合判据", module: "fusion" });
    expect(aiBrief?.decisionSteps.map((step) => step.title)).toEqual([
      "接入并对齐数据",
      "运行模型判据",
      "给出值班结论",
      "转成人工动作",
    ]);
    expect(aiBrief?.decisionSteps.map((step) => `${step.input} ${step.model} ${step.result}`).join(" ")).toContain("OpenOA");
    expect(aiBrief?.decisionSteps.at(-1)?.detail).toContain("工程师确认");
    expect(brief.metrics).toContainEqual({ label: "证据来源", value: "SCADA / CMS / 螺栓 / 油温" });
  });

  it("exposes a visible event timeline from AI warning to review writeback", () => {
    const timeline = gearboxWorkflowCase.eventTimeline;

    expect(timeline.map((step) => step.id)).toEqual([
      "ai-alert",
      "evidence-review",
      "bim-location",
      "workorder-draft",
      "human-confirm",
      "review-writeback",
    ]);
    expect(timeline[0]).toMatchObject({ module: "brief", status: "done" });
    expect(timeline[1]).toMatchObject({ module: "fusion", status: "active" });
    expect(timeline.find((step) => step.id === "human-confirm")?.description).toContain("不自动派单");
    expect(timeline.find((step) => step.id === "review-writeback")?.description).toContain("模型校准");
  });

  it("keeps voice broadcast short and scoped to the active warning turbine", () => {
    const broadcast = gearboxWorkflowCase.modules.brief.aiBrief?.broadcast ?? "";

    expect(broadcast.length).toBeLessThanOrEqual(90);
    expect(broadcast).toContain("2号机");
    expect(broadcast).toContain("一级预警");
    expect(broadcast).not.toContain("HS-WTG");
    expect(broadcast).not.toContain("SCADA");
    expect(broadcast).not.toContain("1号机");
    expect(broadcast).not.toContain("3号机");
  });

  it("explains the multi-source fusion gates behind the warning", () => {
    const fusion = gearboxWorkflowCase.modules.fusion;
    const sources = fusion.fusionSignals?.map((signal) => signal.source).join(" ");
    const gateText = fusion.modelGates?.map((gate) => `${gate.layer} ${gate.method} ${gate.rule} ${gate.result}`).join(" ");

    expect(fusion.decision).toMatchObject({
      operation: "运行融合判据",
      model: expect.stringContaining("OpenOA"),
      result: "升级为齿轮箱 P1 预测维护事件",
    });
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

  it("keeps alarm, inspection, and maintenance as operator decisions with human gates", () => {
    const decisionModules = [
      gearboxWorkflowCase.modules.alerts,
      gearboxWorkflowCase.modules.inspection,
      gearboxWorkflowCase.modules.maintenance,
    ];

    decisionModules.forEach((module) => {
      expect(module.decision?.operation).toBeTruthy();
      expect(module.decision?.evidence).toMatch(/SCADA|CMS|齿轮箱|剩余可运行/);
      expect(module.decision?.model).toMatch(/规则|故障树|策略/);
      expect(module.decision?.result).toBeTruthy();
      expect(module.decision?.confirm).toMatch(/确认|才/);
    });
    expect(gearboxWorkflowCase.modules.alerts.action?.module).toBe("inspection");
    expect(gearboxWorkflowCase.modules.inspection.action?.module).toBe("maintenance");
    expect(gearboxWorkflowCase.modules.maintenance.action?.module).toBe("workorder");
  });

  it("defines professional chart axes for SCADA, CMS, and bolt monitoring", () => {
    const scadaChart = gearboxWorkflowCase.modules.scada.scadaChart;
    const cmsChart = gearboxWorkflowCase.modules.cms.cmsChart;
    const boltChart = gearboxWorkflowCase.modules.bolts.boltChart;

    expect(gearboxWorkflowCase.modules.scada.decision?.operation).toBe("运行 SCADA 残差校核");
    expect(gearboxWorkflowCase.modules.scada.decision?.confirm).toContain("人为降载");
    expect(scadaChart?.xAxis.label).toBe("风速 m/s");
    expect(scadaChart?.yAxis.label).toBe("有功功率 kW");
    expect(scadaChart?.points.some((point) => point.abnormal)).toBe(true);

    expect(gearboxWorkflowCase.modules.cms.decision?.operation).toBe("运行 CMS 侧频复核");
    expect(gearboxWorkflowCase.modules.cms.decision?.result).toContain("齿轮箱高速轴轴承");
    expect(cmsChart?.xAxis.label).toBe("频率 Hz");
    expect(cmsChart?.yAxis.label).toBe("振动幅值 mm/s");
    expect(cmsChart?.threshold.value).toBeGreaterThan(0);
    expect(cmsChart?.peaks.some((peak) => peak.label.includes("啮合"))).toBe(true);

    expect(gearboxWorkflowCase.modules.bolts.decision?.operation).toBe("运行结构反证校核");
    expect(gearboxWorkflowCase.modules.bolts.decision?.result).toContain("不改写齿轮箱主故障判断");
    expect(boltChart?.channels).toHaveLength(8);
    expect(boltChart?.channels.some((channel) => channel.status === "warning")).toBe(true);
  });

  it("has a closed-loop work order checklist", () => {
    const ticket = gearboxWorkflowCase.modules.workorder.ticket;

    expect(gearboxWorkflowCase.modules.maintenance.decision?.operation).toBe("计算处置策略");
    expect(gearboxWorkflowCase.modules.workorder.decision?.operation).toBe("生成复核工单草案");
    expect(gearboxWorkflowCase.modules.workorder.decision?.confirm).toContain("确认后才执行");
    expect(ticket?.confirmationChecks.map((item) => item.label)).toEqual([
      "低风速作业窗口",
      "安全许可与运行方式",
      "备件与工器具",
      "复盘回写责任",
    ]);
    expect(ticket?.confirmationChecks.map((item) => item.owner).join(" ")).toContain("集控值班长");
    expect(ticket?.dispatchedState).toBe("已派发待现场复核");
    expect(ticket?.dispatchActionLabel).toBe("确认派发工单");
    expect(ticket?.writebackItems.map((item) => item.label)).toEqual([
      "油液铁谱/颗粒度",
      "内窥照片",
      "CMS 复测频谱",
      "AI 样本标签",
    ]);
    expect(ticket?.finalCode).toBe("WO-GX-20260621-02");
    expect(ticket?.priority).toBe("P1 高优先级");
    expect(ticket?.assignee).toBe("传动链专业班组");
    expect(ticket?.asset).toContain("齿轮箱高速轴轴承");
    expect(ticket?.dueWindow).toContain("低风速窗口");
    expect(ticket?.precondition).toContain("限功率");
    expect(ticket?.safetyRequirement).toContain("双人确认");
    expect(ticket?.materials.join(" ")).toContain("内窥镜");
    expect(ticket?.steps).toHaveLength(4);
    expect(ticket?.steps.map((step) => step.action).join(" ")).toContain("油液取样");
    expect(ticket?.steps[0].owner).toBe("集控值班长");
    expect(ticket?.acceptanceCriteria.join(" ")).toContain("油液");
    expect(ticket?.writebackItems).toHaveLength(4);
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
