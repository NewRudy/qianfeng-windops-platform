export type WorkflowModuleKey = "health" | "scada" | "cms" | "bolts" | "alerts" | "maintenance" | "workorder";

export type WorkflowMetric = {
  label: string;
  value: string;
};

export type WorkflowAction = {
  label: string;
  module: WorkflowModuleKey;
  primary?: boolean;
};

export type WorkflowModule = {
  action?: WorkflowAction;
  body?: string;
  chartHeights?: number[];
  evidenceRows?: WorkflowMetric[];
  hero?: {
    score: string;
    scoreLabel: string;
    summary: string;
    text: string;
  };
  kicker: string;
  metrics?: WorkflowMetric[];
  spectrumHeights?: number[];
  ticket?: {
    closeActionLabel: string;
    closedActionLabel: string;
    closedState: string;
    draftCode: string;
    finalCode: string;
    generatedState: string;
    initialState: string;
    steps: string[];
  };
  title: string;
};

export type ComponentRisk = {
  component: string;
  module: WorkflowModuleKey;
  part: string;
  status: string;
  title: string;
};

export type GearboxWorkflowCase = {
  component: string;
  componentRisks: ComponentRisk[];
  eventCode: string;
  moduleOrder: WorkflowModuleKey[];
  modules: Record<WorkflowModuleKey, WorkflowModule>;
  partNamePattern: RegExp;
  statuses: {
    componentEntry: string;
    locked: string;
    ticketClosed: string;
    ticketCreated: string;
  };
  turbineId: string;
};

export const gearboxWorkflowCase: GearboxWorkflowCase = {
  component: "齿轮箱",
  componentRisks: [
    { component: "blade-root", module: "bolts", part: "blade", status: "稳定监视", title: "叶根螺栓" },
    { component: "drivetrain", module: "cms", part: "hub", status: "侧频复核", title: "传动链" },
    { component: "gearbox", module: "alerts", part: "gearbox", status: "P1 预警闭环", title: "齿轮箱" },
    { component: "tower", module: "bolts", part: "tower", status: "载荷校核", title: "塔筒结构" },
  ],
  eventCode: "gearbox_bearing_wear",
  moduleOrder: ["health", "scada", "cms", "bolts", "alerts", "maintenance", "workorder"],
  modules: {
    health: {
      action: { label: "查看 SCADA 证据", module: "scada" },
      hero: {
        score: "78",
        scoreLabel: "综合健康",
        summary: "齿轮箱链路进入 P1 关注",
        text: "风机仍可限功率运行，但需在低风速窗口完成 CMS 复核与油液取样。",
      },
      kicker: "Asset Health",
      metrics: [
        { label: "传动链健康", value: "72 / 100" },
        { label: "功率曲线偏差", value: "+12.8%" },
        { label: "风险置信度", value: "84%" },
      ],
      title: "HS-WTG-02 健康评分",
    },
    scada: {
      action: { label: "联动 CMS 振动", module: "cms" },
      body: "判断：同风速段输出偏低且油温抬升，符合传动链效率下降的早期迹象。",
      chartHeights: [42, 72, 58, 85, 46, 64, 78, 52, 90],
      kicker: "Evidence 01 / SCADA",
      metrics: [
        { label: "风速", value: "6.71 m/s" },
        { label: "有功功率", value: "812 kW" },
        { label: "功率残差", value: "+12.8%" },
        { label: "齿轮箱油温", value: "74.6 ℃" },
      ],
      title: "运行状态与模型残差",
    },
    cms: {
      action: { label: "进入告警研判", module: "alerts" },
      body: "机理+数值判断：山地阵风工况下侧频增强，结合 SCADA 残差指向齿轮箱早期磨损。",
      kicker: "Evidence 02 / CMS",
      metrics: [
        { label: "RMS 振动", value: "2.562 mm/s" },
        { label: "啮合侧频", value: "2.1x 基线" },
        { label: "疑似部件", value: "齿轮箱高速轴轴承" },
      ],
      spectrumHeights: [28, 44, 64, 38, 88, 42, 74, 36, 58],
      title: "齿轮箱振动诊断",
    },
    bolts: {
      action: { label: "回到告警研判", module: "alerts" },
      body: "排查结论：当前主风险不来自叶根螺栓，但山地阵风载荷会放大传动链冲击，保留联动监视。",
      kicker: "Evidence 03 / Bolt & Structure",
      metrics: [
        { label: "叶根平均预紧力", value: "288.6 kN" },
        { label: "最低通道", value: "B17 / 263.1 kN" },
        { label: "温漂补偿", value: "已启用" },
        { label: "塔筒一阶频率", value: "0.329 Hz" },
      ],
      title: "螺栓与结构监测",
    },
    alerts: {
      action: { label: "生成维护建议", module: "maintenance", primary: true },
      body: "SCADA 残差、油温与 CMS 侧频三项证据一致，建议转入预测维护。",
      evidenceRows: [
        { label: "证据 1", value: "同风速段功率残差 +12.8%" },
        { label: "证据 2", value: "齿轮啮合侧频 2.1x 基线" },
        { label: "证据 3", value: "油温 6h 均值高于同类机组 8.4 ℃" },
      ],
      kicker: "Decision / Alarm Center",
      title: "齿轮箱 P1 预警研判",
    },
    maintenance: {
      action: { label: "生成运维工单", module: "workorder", primary: true },
      body: "策略：利用明晚低风速窗口停机 2h，先做油液取样与内窥复核，若铁谱异常则升级检修。",
      kicker: "Action Plan / Predictive Maintenance",
      metrics: [
        { label: "建议处置窗口", value: "48 - 72 h" },
        { label: "预计剩余可运行", value: "168 h" },
        { label: "建议运行方式", value: "限功率 80%" },
        { label: "备件", value: "高速轴轴承 / 油液包" },
      ],
      title: "预测性维护建议",
    },
    workorder: {
      kicker: "Closed Loop / Work Order",
      ticket: {
        closeActionLabel: "标记现场复核完成",
        closedActionLabel: "现场复核已完成",
        closedState: "现场复核完成",
        draftCode: "WO-GX-待创建",
        finalCode: "WO-GX-20260621-02",
        generatedState: "已生成",
        initialState: "待生成",
        steps: [
          "调度低风速停机窗口",
          "执行齿轮箱油液取样与内窥复核",
          "上传照片、油液报告和振动复测结果",
          "关闭告警并回写诊断样本",
        ],
      },
      title: "运维工单",
    },
  },
  partNamePattern: /齿轮|gearbox|gear/i,
  statuses: {
    componentEntry: "齿轮箱预警闭环：从部件风险进入证据研判",
    locked: "齿轮箱预警闭环：已锁定 HS-WTG-02 高速轴轴承风险",
    ticketClosed: "工单回写完成：齿轮箱油液与内窥结果已进入复盘样本",
    ticketCreated: "已生成齿轮箱预测维护工单：等待现场复核",
  },
  turbineId: "HS-WTG-02",
};
