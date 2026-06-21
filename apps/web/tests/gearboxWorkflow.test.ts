import { describe, expect, it } from "vitest";
import { gearboxWorkflowCase } from "../src/workflow/gearboxWorkflow";

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
    const evidenceText = alerts.evidenceRows?.map((row) => `${row.label} ${row.value}`).join(" ");

    expect(alerts.evidenceRows).toHaveLength(3);
    expect(evidenceText).toContain("功率残差");
    expect(evidenceText).toContain("齿轮啮合侧频");
    expect(evidenceText).toContain("油温");
  });

  it("has a closed-loop work order checklist", () => {
    const ticket = gearboxWorkflowCase.modules.workorder.ticket;

    expect(ticket?.finalCode).toBe("WO-GX-20260621-02");
    expect(ticket?.steps).toHaveLength(4);
    expect(ticket?.steps.join(" ")).toContain("油液取样");
    expect(gearboxWorkflowCase.statuses.ticketClosed).toContain("回写");
  });
});
