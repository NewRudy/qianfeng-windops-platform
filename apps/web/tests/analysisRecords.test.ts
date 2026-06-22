import { beforeEach, describe, expect, it } from "vitest";
import {
  adoptAnalysisEvidence,
  getAnalysisRecords,
  resetAnalysisRecordsForTest,
  runAnalysisModel,
} from "../server/analysisRecords";

describe("analysis model run records", () => {
  beforeEach(() => {
    resetAnalysisRecordsForTest();
  });

  it("creates a traceable SCADA model run from operator parameters", () => {
    const record = runAnalysisModel({
      caseId: "hs-wtg-02-gearbox-bearing",
      pageKey: "scada",
      parameters: [
        { label: "时间窗", value: "最近 12 个 10 min 窗口" },
        { label: "功率残差阈值 %", value: "8" },
        { label: "基线模型", value: "OpenOA 同场基线" },
      ],
    });

    expect(record.id).toMatch(/^RUN-\d{8}-001$/);
    expect(record.status).toBe("computed");
    expect(record.evidenceState).toBe("computed");
    expect(record.caseId).toBe("hs-wtg-02-gearbox-bearing");
    expect(record.turbineId).toBe("HS-WTG-02");
    expect(record.model).toContain("OpenOA");
    expect(record.inputSummary).toContain("SCADA");
    expect(record.conclusion).toContain("运行侧异常成立");
    expect(record.evidence.join(" ")).toContain("功率残差阈值 %");
    expect(record.humanBoundary).toContain("确认");
    expect(record.nextAction).toContain("CMS");
  });

  it("keeps CMS and structure runs as different evidence roles", () => {
    const cms = runAnalysisModel({
      caseId: "hs-wtg-02-gearbox-bearing",
      pageKey: "cms",
      parameters: [{ label: "频谱类型", value: "包络谱" }],
    });
    const structure = runAnalysisModel({
      caseId: "hs-wtg-02-gearbox-bearing",
      pageKey: "structure",
      parameters: [{ label: "结构侧角色", value: "反证项" }],
    });

    expect(cms.id).toMatch(/-001$/);
    expect(structure.id).toMatch(/-002$/);
    expect(cms.conclusion).toContain("齿轮箱高速轴轴承");
    expect(cms.nextAction).toContain("融合诊断");
    expect(structure.conclusion).toContain("不改写齿轮箱主故障判断");
    expect(structure.nextAction).toContain("反证项");
    expect(structure.evidence.join(" ")).toContain("关注通道");
  });

  it("adopts the latest run as current-event evidence without claiming automatic execution", () => {
    const run = runAnalysisModel({
      caseId: "hs-wtg-02-gearbox-bearing",
      pageKey: "scada",
      parameters: [{ label: "时间窗", value: "告警前后 2 h" }],
    });
    const adopted = adoptAnalysisEvidence({
      caseId: "hs-wtg-02-gearbox-bearing",
      pageKey: "scada",
      runId: run.id,
    });

    expect(adopted.id).toBe(run.id);
    expect(adopted.status).toBe("adopted");
    expect(adopted.evidenceState).toBe("adopted");
    expect(adopted.adoptedAt).toBeTruthy();
    expect(adopted.humanBoundary).toContain("确认");
    expect(adopted.humanBoundary).not.toContain("自动");
    expect(getAnalysisRecords()).toHaveLength(1);
    expect(getAnalysisRecords()[0].status).toBe("adopted");
  });
});
