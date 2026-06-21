import { activeGearboxCaseInput, gearboxCaseCatalog } from "./gearboxCaseData";

export type WorkflowModuleKey =
  | "brief"
  | "health"
  | "fusion"
  | "scada"
  | "cms"
  | "bolts"
  | "alerts"
  | "inspection"
  | "maintenance"
  | "workorder";

export type WorkflowMetric = {
  label: string;
  value: string;
};

export type WorkflowEvidence = WorkflowMetric & {
  confidence: string;
  model: string;
  source: string;
  threshold: string;
  window: string;
};

export type WorkflowAction = {
  label: string;
  module: WorkflowModuleKey;
  primary?: boolean;
};

export type EventTimelineStage =
  | "ai-alert"
  | "evidence-review"
  | "bim-location"
  | "workorder-draft"
  | "human-confirm"
  | "review-writeback";

export type EventTimelineStep = {
  description: string;
  id: EventTimelineStage;
  module: WorkflowModuleKey;
  owner: string;
  status: "active" | "done" | "pending" | "review";
  title: string;
};

export type AiDiagnosisBrief = {
  broadcast: string;
  conclusion: string;
  decisionSteps: Array<{
    detail: string;
    id: string;
    input: string;
    model: string;
    module: WorkflowModuleKey;
    result: string;
    title: string;
  }>;
  evidence: string[];
  operatorQuestions: string[];
  primaryAction: WorkflowAction;
  primaryFinding: string;
  recommendedAction: string;
  riskLevel: "watch" | "orange" | "red";
};

export type FusionSignal = {
  contribution: string;
  metric: string;
  quality: string;
  rule: string;
  source: string;
  status: "normal" | "watch" | "alarm";
  window: string;
};

export type ModelGate = {
  layer: string;
  method: string;
  result: string;
  rule: string;
  status: "pass" | "watch" | "block";
};

export type InspectionItem = {
  basis: string;
  owner: string;
  result: string;
  status: "confirmed" | "excluded" | "pending";
  step: string;
};

export type ChartAxis = {
  label: string;
  max: number;
  min: number;
  ticks: number[];
};

export type ScadaChartPoint = {
  abnormal?: boolean;
  expectedKw: number;
  powerKw: number;
  residualPct: number;
  timestamp: string;
  windSpeed: number;
};

export type ScadaChart = {
  baselineLabel: string;
  points: ScadaChartPoint[];
  sampleWindow: string;
  title: string;
  xAxis: ChartAxis;
  yAxis: ChartAxis;
};

export type CmsSpectrumPeak = {
  amplitude: number;
  frequencyHz: number;
  label: string;
  status: "normal" | "warning";
};

export type CmsChart = {
  peaks: CmsSpectrumPeak[];
  sampleWindow: string;
  threshold: {
    label: string;
    value: number;
  };
  title: string;
  xAxis: ChartAxis;
  yAxis: ChartAxis;
};

export type BoltChannel = {
  angle: number;
  id: string;
  preloadKn: number;
  relaxationPct: number;
  status: "normal" | "watch" | "warning";
};

export type BoltChart = {
  channels: BoltChannel[];
  nominalPreloadKn: number;
  title: string;
  warningRelaxationPct: number;
};

export type WorkflowModule = {
  action?: WorkflowAction;
  aiBrief?: AiDiagnosisBrief;
  body?: string;
  boltChart?: BoltChart;
  cmsChart?: CmsChart;
  evidenceRows?: WorkflowEvidence[];
  fusionSignals?: FusionSignal[];
  hero?: {
    score: string;
    scoreLabel: string;
    summary: string;
    text: string;
  };
  kicker: string;
  inspectionItems?: InspectionItem[];
  modelGates?: ModelGate[];
  metrics?: WorkflowMetric[];
  scadaChart?: ScadaChart;
  ticket?: {
    acceptanceCriteria: string[];
    asset: string;
    assignee: string;
    closeActionLabel: string;
    closedActionLabel: string;
    closedState: string;
    draftCode: string;
    dueWindow: string;
    finalCode: string;
    generatedState: string;
    initialState: string;
    location: string;
    materials: string[];
    precondition: string;
    priority: string;
    safetyRequirement: string;
    steps: Array<{
      action: string;
      owner: string;
      output: string;
    }>;
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
  eventTimeline: EventTimelineStep[];
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

export type GearboxScadaSample = {
  expectedKw: number;
  oilTempC: number;
  powerKw: number;
  timestamp: string;
  windSpeed: number;
};

export type GearboxCmsPeakInput = CmsSpectrumPeak & {
  baselineAmplitude?: number;
};

export type GearboxCaseInput = {
  caseDate: string;
  cmsBaselineAmplitude: number;
  cmsPeaks: GearboxCmsPeakInput[];
  eventCode: string;
  focusScadaSampleIndex: number;
  maintenance: {
    actionWindowHours: string;
    estimatedRemainingHours: number;
    parts: string;
    strategy: string;
    workMode: string;
  };
  peerOilTempC: number;
  scadaSamples: GearboxScadaSample[];
  thresholds: {
    boltRelaxationWarningPct: number;
    cmsSidebandRatio: number;
    oilTempDeltaC: number;
    scadaPowerShortfallPct: number;
  };
  turbineId: string;
};

export type GearboxCaseDiagnostics = {
  boltAveragePreloadKn: number;
  boltLowestChannel: BoltChannel;
  boltWarningChannels: number;
  cmsSidebandRatio: number;
  focusSample: GearboxScadaSample;
  focusShortfallPct: number;
  healthScore: number;
  maxPowerShortfallPct: number;
  oilTempDeltaC: number;
  riskConfidencePct: number;
  scadaAbnormalSamples: number;
};

function round(value: number, digits = 1): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function formatFixed(value: number, digits = 1): string {
  return value.toFixed(digits);
}

function formatSignedPct(value: number): string {
  return `${value >= 0 ? "+" : ""}${formatFixed(value)}%`;
}

function workOrderSuffix(turbineId: string): string {
  return turbineId.match(/(\d+)$/)?.[1]?.padStart(2, "0") ?? "00";
}

function spokenTurbineName(turbineId: string): string {
  const numericId = turbineId.match(/(\d+)$/)?.[1];
  return numericId ? `${Number(numericId)}号机` : turbineId;
}

function calculatePowerShortfallPct(sample: GearboxScadaSample): number {
  if (sample.expectedKw <= 0) return 0;
  return round(((sample.expectedKw - sample.powerKw) / sample.expectedKw) * 100);
}

function createScadaChart(input: GearboxCaseInput): ScadaChart {
  return {
    baselineLabel: "OpenOA 风速-功率基线",
    points: input.scadaSamples.map((sample) => {
      const residualPct = calculatePowerShortfallPct(sample);
      return {
        expectedKw: sample.expectedKw,
        powerKw: sample.powerKw,
        residualPct,
        timestamp: sample.timestamp,
        windSpeed: sample.windSpeed,
        abnormal: residualPct >= input.thresholds.scadaPowerShortfallPct,
      };
    }),
    sampleWindow: "10 min SCADA / 最近 6 个采样窗",
    title: "风速-功率残差诊断",
    xAxis: { label: "风速 m/s", max: 9, min: 3, ticks: [3, 5, 7, 9] },
    yAxis: { label: "有功功率 kW", max: 1500, min: 0, ticks: [0, 500, 1000, 1500] },
  };
}

function createBoltChart(input: GearboxCaseInput): BoltChart {
  const baseChannels: BoltChannel[] = [
    { angle: 0, id: "B01", preloadKn: 291.4, relaxationPct: 2.1, status: "normal" },
    { angle: 45, id: "B05", preloadKn: 287.9, relaxationPct: 3.4, status: "normal" },
    { angle: 90, id: "B09", preloadKn: 282.5, relaxationPct: 5.2, status: "watch" },
    { angle: 135, id: "B13", preloadKn: 279.1, relaxationPct: 6.4, status: "watch" },
    { angle: 180, id: "B17", preloadKn: 263.1, relaxationPct: 9.6, status: "warning" },
    { angle: 225, id: "B21", preloadKn: 284.2, relaxationPct: 4.8, status: "normal" },
    { angle: 270, id: "B25", preloadKn: 289.6, relaxationPct: 2.9, status: "normal" },
    { angle: 315, id: "B29", preloadKn: 292.3, relaxationPct: 1.8, status: "normal" },
  ];
  const channels: BoltChannel[] = baseChannels.map((channel) => ({
    ...channel,
    status: channel.relaxationPct >= input.thresholds.boltRelaxationWarningPct ? "warning" : channel.status,
  }));

  return {
    channels,
    nominalPreloadKn: 290,
    title: "叶根螺栓预紧力环形监测",
    warningRelaxationPct: input.thresholds.boltRelaxationWarningPct,
  };
}

function getLowestBoltChannel(channels: BoltChannel[]): BoltChannel {
  return channels.reduce((lowest, channel) => (channel.preloadKn < lowest.preloadKn ? channel : lowest), channels[0]);
}

export function getGearboxCaseDiagnostics(input: GearboxCaseInput = activeGearboxCaseInput): GearboxCaseDiagnostics {
  const scadaChart = createScadaChart(input);
  const focusSample = input.scadaSamples[input.focusScadaSampleIndex] ?? input.scadaSamples[0];
  const focusShortfallPct = calculatePowerShortfallPct(focusSample);
  const maxPowerShortfallPct = Math.max(...scadaChart.points.map((point) => point.residualPct));
  const warningPeak = input.cmsPeaks.find((peak) => peak.status === "warning") ?? input.cmsPeaks[0];
  const cmsSidebandRatio = round(warningPeak.amplitude / (warningPeak.baselineAmplitude ?? input.cmsBaselineAmplitude));
  const boltChart = createBoltChart(input);
  const boltLowestChannel = getLowestBoltChannel(boltChart.channels);
  const boltAveragePreloadKn = round(
    boltChart.channels.reduce((sum, channel) => sum + channel.preloadKn, 0) / boltChart.channels.length,
  );
  const boltWarningChannels = boltChart.channels.filter((channel) => channel.status === "warning").length;
  const oilTempDeltaC = round(focusSample.oilTempC - input.peerOilTempC);
  const healthScore = Math.max(
    0,
    Math.round(100 - maxPowerShortfallPct * 0.55 - (cmsSidebandRatio - 1) * 8 - boltWarningChannels * 4 - oilTempDeltaC * 0.4),
  );
  const riskConfidencePct = Math.min(96, Math.round(65 + maxPowerShortfallPct * 0.7 + (cmsSidebandRatio - 1) * 10 + boltWarningChannels * 2));

  return {
    boltAveragePreloadKn,
    boltLowestChannel,
    boltWarningChannels,
    cmsSidebandRatio,
    focusSample,
    focusShortfallPct,
    healthScore,
    maxPowerShortfallPct,
    oilTempDeltaC,
    riskConfidencePct,
    scadaAbnormalSamples: scadaChart.points.filter((point) => point.abnormal).length,
  };
}

export function buildGearboxWorkflowCase(input: GearboxCaseInput = activeGearboxCaseInput): GearboxWorkflowCase {
  const diagnostics = getGearboxCaseDiagnostics(input);
  const scadaChart = createScadaChart(input);
  const cmsChart: CmsChart = {
    peaks: input.cmsPeaks.map(({ baselineAmplitude: _baselineAmplitude, ...peak }) => peak),
    sampleWindow: "CMS 高频采样 / 20 kHz / 60 s 包络谱",
    threshold: { label: "ISO 10816 关注线", value: 1.2 },
    title: "齿轮箱包络频谱",
    xAxis: { label: "频率 Hz", max: 160, min: 0, ticks: [0, 40, 80, 120, 160] },
    yAxis: { label: "振动幅值 mm/s", max: 2, min: 0, ticks: [0, 0.5, 1, 1.5, 2] },
  };
  const boltChart = createBoltChart(input);
  const scadaAlarm = diagnostics.maxPowerShortfallPct >= input.thresholds.scadaPowerShortfallPct;
  const cmsAlarm = diagnostics.cmsSidebandRatio >= input.thresholds.cmsSidebandRatio;
  const oilTempAlarm = diagnostics.oilTempDeltaC >= input.thresholds.oilTempDeltaC;
  const boltWatch = diagnostics.boltWarningChannels > 0;
  const exceededCoreSignals = [scadaAlarm, cmsAlarm, oilTempAlarm].filter(Boolean).length;

  return {
    component: "齿轮箱",
    componentRisks: [
      { component: "blade-root", module: "bolts", part: "blade", status: "稳定监视", title: "叶根螺栓" },
      { component: "drivetrain", module: "cms", part: "hub", status: "侧频复核", title: "传动链" },
      { component: "gearbox", module: "alerts", part: "gearbox", status: "P1 预警闭环", title: "齿轮箱" },
      { component: "tower", module: "bolts", part: "tower", status: "载荷校核", title: "塔筒结构" },
    ],
    eventCode: input.eventCode,
    eventTimeline: [
      {
        description: `${spokenTurbineName(input.turbineId)}触发齿轮箱一级预警，AI 已生成短播报并锁定当前事件。`,
        id: "ai-alert",
        module: "brief",
        owner: "AI 值班员",
        status: "done",
        title: "预警触发",
      },
      {
        description: `SCADA、CMS、油温与螺栓/结构监测进入同一证据包，核心证据越限 ${exceededCoreSignals}/3。`,
        id: "evidence-review",
        module: "fusion",
        owner: "诊断工程师",
        status: "active",
        title: "证据复核",
      },
      {
        description: "BIM 定位到齿轮箱与传动链，辅助现场人员理解疑似部件和反证部件。",
        id: "bim-location",
        module: "alerts",
        owner: "可视化系统",
        status: "pending",
        title: "BIM 定位",
      },
      {
        description: `按 ${input.maintenance.actionWindowHours} 生成现场复核工单草案，包含油液、内窥和 CMS 复测。`,
        id: "workorder-draft",
        module: "workorder",
        owner: "集控值班长",
        status: "pending",
        title: "工单草案",
      },
      {
        description: "停机、登塔和检修动作必须由现场工程师确认后执行，AI 不自动派单或自动停机。",
        id: "human-confirm",
        module: "workorder",
        owner: "现场工程师",
        status: "review",
        title: "人工确认",
      },
      {
        description: "复核完成后回写油液、内窥、复测频谱和样本标签，用于下一次模型校准。",
        id: "review-writeback",
        module: "workorder",
        owner: "运维主管",
        status: "pending",
        title: "复盘回写",
      },
    ],
    moduleOrder: ["brief", "health", "fusion", "scada", "cms", "bolts", "alerts", "inspection", "maintenance", "workorder"],
    modules: {
      brief: {
        action: { label: "展开证据链", module: "fusion", primary: true },
        aiBrief: {
          broadcast: `黔风智维提醒：${spokenTurbineName(input.turbineId)}齿轮箱出现一级预警，请进入诊断包查看证据链。`,
          conclusion: `${input.turbineId} 当前不是孤立阈值报警，而是运行残差、振动频谱和热异常共同指向齿轮箱高速轴轴承早期磨损。系统建议按预测维护流程生成巡检工单，复核前执行 ${input.maintenance.workMode}。`,
          decisionSteps: [
            {
              detail: "只把同一时间窗内可互相解释的数据放进本次事件，避免把不同时间的零散告警拼成假结论。",
              id: "data-ingest",
              input: `SCADA ${input.scadaSamples.length} 个 10 min 窗口、CMS 60 s 高频包、螺栓 ${boltChart.channels.length} 路、油温对标`,
              model: "数据质量门 + 时间窗对齐",
              module: "fusion",
              result: "形成同一事件证据包",
              title: "接入并对齐数据",
            },
            {
              detail: "SCADA 先发现性能残差，CMS 再定位传动链特征，油温增强摩擦/润滑异常判断，螺栓作为结构反证。",
              id: "model-run",
              input: "功率残差、GMF 侧频、油温残差、叶根预紧力",
              model: "OpenOA 基线 + GMF 包络谱 + 热平衡残差 + 结构排查",
              module: "fusion",
              result: `核心证据越限 ${exceededCoreSignals}/3`,
              title: "运行模型判据",
            },
            {
              detail: "只有当运行异常和部件机理证据同向时，才升级为预测维护事件；结构监测未把主故障转移到叶根。",
              id: "decision",
              input: `置信度 ${diagnostics.riskConfidencePct}%、健康评分 ${diagnostics.healthScore}`,
              model: "证据融合门控",
              module: "alerts",
              result: "齿轮箱 P1 预警闭环",
              title: "给出值班结论",
            },
            {
              detail: "AI 只生成工单草案和复核建议；限功率、停机、登塔和检修仍由值长与现场工程师确认。",
              id: "human-action",
              input: `${input.maintenance.actionWindowHours}、${input.maintenance.workMode}、备件 ${input.maintenance.parts}`,
              model: "预测维护规则 + 人工确认边界",
              module: "workorder",
              result: "生成复核工单草案",
              title: "转成人工动作",
            },
          ],
          evidence: [
            `SCADA 最大功率缺口 ${formatSignedPct(diagnostics.maxPowerShortfallPct)}，异常窗口 ${diagnostics.scadaAbnormalSamples}/${input.scadaSamples.length}`,
            `CMS 齿轮啮合侧频达到 ${formatFixed(diagnostics.cmsSidebandRatio)}x 基线`,
            `油温较同场同机型偏高 ${formatFixed(diagnostics.oilTempDeltaC)} ℃`,
            `螺栓/结构监测发现 ${diagnostics.boltWarningChannels} 路关注项，用于排除叶根结构主故障并跟踪山地阵风载荷`,
          ],
          operatorQuestions: [
            "为什么判定为齿轮箱风险？",
            "关键证据来自哪些传感器？",
            "下一步工单应该怎么安排？",
          ],
          primaryAction: { label: "运行融合判据", module: "fusion", primary: true },
          primaryFinding: "齿轮箱高速轴轴承早期磨损风险",
          recommendedAction: `进入证据链并生成 ${input.maintenance.actionWindowHours} 现场复核工单`,
          riskLevel: exceededCoreSignals >= 3 ? "red" : "orange",
        },
        body: "AI 将多源监测结果整理成值班可读的诊断包：先给结论，再列证据、反证和下一步动作。大模型后续只基于该结构化证据生成专业报告，不直接替代安全决策。",
        kicker: "AI Duty Officer",
        metrics: [
          { label: "AI 结论", value: "P1 预测维护" },
          { label: "疑似部件", value: "齿轮箱高速轴轴承" },
          { label: "证据来源", value: "SCADA / CMS / 螺栓 / 油温" },
          { label: "置信度", value: `${diagnostics.riskConfidencePct}%` },
        ],
        title: `${input.turbineId} AI 诊断包`,
      },
      health: {
        action: { label: "查看融合判据", module: "fusion" },
        hero: {
          score: String(diagnostics.healthScore),
          scoreLabel: "综合健康",
          summary: "齿轮箱链路进入 P1 关注",
          text: "风机仍可限功率运行，但需在低风速窗口完成 CMS 复核与油液取样。",
        },
        kicker: "Asset Health",
        metrics: [
          { label: "传动链健康", value: `${Math.max(0, diagnostics.healthScore - 5)} / 100` },
          { label: "功率曲线偏差", value: formatSignedPct(diagnostics.maxPowerShortfallPct) },
          { label: "风险置信度", value: `${diagnostics.riskConfidencePct}%` },
        ],
        title: `${input.turbineId} 健康评分`,
      },
      fusion: {
        action: { label: "进入告警研判", module: "alerts", primary: true },
        body: `判定门槛：SCADA 功率残差、CMS 侧频、油温热平衡三项核心证据中 ${exceededCoreSignals}/3 项越限；螺栓/结构监测用于排除叶根主风险并保留山地阵风载荷联动。`,
        fusionSignals: [
          {
            contribution: "运行异常主证据",
            metric: `最大功率缺口 ${formatSignedPct(diagnostics.maxPowerShortfallPct)}`,
            quality: `${input.scadaSamples.length}/${input.scadaSamples.length} 个 10 min 窗口有效`,
            rule: `残差 >= ${input.thresholds.scadaPowerShortfallPct}%`,
            source: "SCADA 功率曲线",
            status: scadaAlarm ? "alarm" : "normal",
            window: "最近 60 min",
          },
          {
            contribution: "部件故障主证据",
            metric: `GMF 侧频 ${formatFixed(diagnostics.cmsSidebandRatio)}x 基线`,
            quality: "20 kHz 高频采样 / 60 s 包络谱",
            rule: `侧频 >= ${formatFixed(input.thresholds.cmsSidebandRatio)}x 基线`,
            source: "CMS 振动频谱",
            status: cmsAlarm ? "alarm" : "watch",
            window: "最近一次高频包",
          },
          {
            contribution: "热异常辅助证据",
            metric: `油温同场偏高 ${formatFixed(diagnostics.oilTempDeltaC)} ℃`,
            quality: "同场同机型对标完成",
            rule: `温差 >= ${input.thresholds.oilTempDeltaC} ℃`,
            source: "SCADA 油温",
            status: oilTempAlarm ? "alarm" : "watch",
            window: "最近 6 h",
          },
          {
            contribution: "结构风险排查",
            metric: `${diagnostics.boltWarningChannels} 路预紧力关注`,
            quality: `${boltChart.channels.length} 路叶根螺栓通道在线`,
            rule: `单通道松弛 >= ${input.thresholds.boltRelaxationWarningPct}% 进入结构关注，不直接归因为齿轮箱主故障`,
            source: "螺栓/结构监测",
            status: boltWatch ? "watch" : "normal",
            window: "日内滚动",
          },
        ],
        kicker: "Fusion / Mechanism + Data Model",
        metrics: [
          { label: "核心证据越限", value: `${exceededCoreSignals} / 3` },
          { label: "融合结论", value: "齿轮箱 P1 预警" },
          { label: "处置门槛", value: exceededCoreSignals >= 2 ? "进入现场复核" : "继续观察" },
        ],
        modelGates: [
          {
            layer: "数值模型",
            method: "OpenOA 风速-功率基线",
            result: `残差 ${formatSignedPct(diagnostics.maxPowerShortfallPct)}`,
            rule: "同风速段功率低于期望曲线且连续越限",
            status: scadaAlarm ? "block" : "pass",
          },
          {
            layer: "机理模型",
            method: "齿轮啮合频率 + 边带",
            result: `${formatFixed(diagnostics.cmsSidebandRatio)}x 基线`,
            rule: "GMF 与边带同步抬升指向齿轮箱轴承/啮合异常",
            status: cmsAlarm ? "block" : "watch",
          },
          {
            layer: "热平衡校核",
            method: "同场同机型油温对标",
            result: `${formatFixed(diagnostics.oilTempDeltaC)} ℃`,
            rule: "油温偏高用于增强传动链摩擦/润滑异常判断",
            status: oilTempAlarm ? "block" : "watch",
          },
          {
            layer: "排查项",
            method: "叶根螺栓预紧力",
            result: `${diagnostics.boltLowestChannel.id} ${formatFixed(diagnostics.boltLowestChannel.relaxationPct)}% 松弛`,
            rule: "若螺栓松弛未形成环向扩展，则作为载荷放大因素跟踪，主闭环仍指向齿轮箱",
            status: boltWatch ? "watch" : "pass",
          },
        ],
        title: "多源融合与模型判据",
      },
      scada: {
        action: { label: "联动 CMS 振动", module: "cms" },
        body: `判断：同风速段输出持续低于期望功率曲线，最大功率缺口 ${formatFixed(diagnostics.maxPowerShortfallPct)}%，超过 ${input.thresholds.scadaPowerShortfallPct}% 预警线，同时油温较同类机组高 ${formatFixed(diagnostics.oilTempDeltaC)} ℃。`,
        kicker: "Evidence 01 / SCADA",
        metrics: [
          { label: "风速", value: `${formatFixed(diagnostics.focusSample.windSpeed)} m/s` },
          { label: "有功功率", value: `${diagnostics.focusSample.powerKw} kW` },
          { label: "功率残差", value: formatSignedPct(diagnostics.focusShortfallPct) },
          { label: "齿轮箱油温", value: `${formatFixed(diagnostics.focusSample.oilTempC)} ℃` },
        ],
        scadaChart,
        title: "运行状态与模型残差",
      },
      cms: {
        action: { label: "进入告警研判", module: "alerts" },
        body: `机理+数值判断：啮合频率及两侧边带同步抬升，当前侧频 ${formatFixed(diagnostics.cmsSidebandRatio)}x 基线，超过 ${formatFixed(input.thresholds.cmsSidebandRatio)}x 关注阈值；结合 SCADA 残差，指向齿轮箱早期磨损。`,
        cmsChart,
        kicker: "Evidence 02 / CMS",
        metrics: [
          { label: "RMS 振动", value: "2.562 mm/s" },
          { label: "啮合侧频", value: `${formatFixed(diagnostics.cmsSidebandRatio)}x 基线` },
          { label: "疑似部件", value: "齿轮箱高速轴轴承" },
        ],
        title: "齿轮箱振动诊断",
      },
      bolts: {
        action: { label: "回到告警研判", module: "alerts" },
        body: "排查结论：当前主风险不来自叶根螺栓，但山地阵风载荷会放大传动链冲击，保留联动监视。",
        boltChart,
        kicker: "Evidence 03 / Bolt & Structure",
        metrics: [
          { label: "叶根平均预紧力", value: `${formatFixed(diagnostics.boltAveragePreloadKn)} kN` },
          { label: "最低通道", value: `${diagnostics.boltLowestChannel.id} / ${formatFixed(diagnostics.boltLowestChannel.preloadKn)} kN` },
          { label: "温漂补偿", value: "已启用" },
          { label: "塔筒一阶频率", value: "0.329 Hz" },
        ],
        title: "螺栓与结构监测",
      },
      alerts: {
        action: { label: "进入隐患排查", module: "inspection", primary: true },
        body: "SCADA 残差、油温与 CMS 侧频三项证据一致，建议转入预测维护。",
        evidenceRows: [
          {
            confidence: "0.84",
            label: "证据 1",
            model: "OpenOA 风速-功率基线 + 同场同机型对标",
            source: "SCADA",
            threshold: `残差预警线 ${input.thresholds.scadaPowerShortfallPct}%`,
            value: `同风速段最大功率缺口 ${formatSignedPct(diagnostics.maxPowerShortfallPct)}`,
            window: `${input.scadaSamples.length} 个 10 min 采样窗 / ${diagnostics.scadaAbnormalSamples} 个异常`,
          },
          {
            confidence: "0.87",
            label: "证据 2",
            model: "包络谱 / GMF 侧频诊断",
            source: "CMS",
            threshold: `啮合侧频 > ${formatFixed(input.thresholds.cmsSidebandRatio)}x 基线`,
            value: `齿轮啮合侧频 ${formatFixed(diagnostics.cmsSidebandRatio)}x 基线`,
            window: "60 s 高频采样",
          },
          {
            confidence: "0.76",
            label: "证据 3",
            model: "热平衡残差 + 环境温度补偿",
            source: "SCADA/Oil Temp",
            threshold: `同类机组温差 > ${input.thresholds.oilTempDeltaC} ℃`,
            value: `油温高于同类机组 ${formatFixed(diagnostics.oilTempDeltaC)} ℃`,
            window: "最近 6 h",
          },
        ],
        kicker: "Decision / Alarm Center",
        title: "齿轮箱 P1 预警研判",
      },
      inspection: {
        action: { label: "形成维护策略", module: "maintenance", primary: true },
        body: "排查原则：先锁定传动链主风险，再排除叶根/塔筒结构主风险；现场复核只保留能改变处置策略的动作。",
        inspectionItems: [
          {
            basis: `SCADA 最大功率缺口 ${formatSignedPct(diagnostics.maxPowerShortfallPct)}，CMS 侧频 ${formatFixed(diagnostics.cmsSidebandRatio)}x 基线`,
            owner: "诊断工程师",
            result: "齿轮箱高速轴轴承早期磨损作为主隐患",
            status: "confirmed",
            step: "锁定主风险",
          },
          {
            basis: `最低螺栓通道 ${diagnostics.boltLowestChannel.id}，松弛 ${formatFixed(diagnostics.boltLowestChannel.relaxationPct)}%`,
            owner: "结构工程师",
            result: "作为载荷放大因素跟踪，暂不升级为叶根结构主故障",
            status: "excluded",
            step: "排除结构主故障",
          },
          {
            basis: `油温同场偏高 ${formatFixed(diagnostics.oilTempDeltaC)} ℃，建议 ${input.maintenance.actionWindowHours} 内复核`,
            owner: "现场班组",
            result: "停机窗口执行油液取样、铁谱和内窥复核",
            status: "pending",
            step: "现场复核动作",
          },
          {
            basis: `预计剩余可运行 ${input.maintenance.estimatedRemainingHours} h，当前策略 ${input.maintenance.workMode}`,
            owner: "值长/调度",
            result: "复核前按建议限功率运行，若铁谱异常则升级计划检修",
            status: "pending",
            step: "运行限制与升级",
          },
        ],
        kicker: "Troubleshooting / Hidden Risk",
        metrics: [
          { label: "主风险", value: "齿轮箱高速轴轴承" },
          { label: "排除项", value: "叶根结构主故障" },
          { label: "复核动作", value: "油液 + 内窥 + CMS 复测" },
        ],
        title: "隐患排查清单",
      },
      maintenance: {
        action: { label: "生成运维工单", module: "workorder", primary: true },
        body: `策略：${input.maintenance.strategy}`,
        kicker: "Action Plan / Predictive Maintenance",
        metrics: [
          { label: "建议处置窗口", value: input.maintenance.actionWindowHours },
          { label: "预计剩余可运行", value: `${input.maintenance.estimatedRemainingHours} h` },
          { label: "建议运行方式", value: input.maintenance.workMode },
          { label: "备件", value: input.maintenance.parts },
        ],
        title: "预测性维护建议",
      },
      workorder: {
        kicker: "Closed Loop / Work Order",
        ticket: {
          acceptanceCriteria: [
            "油液铁谱/颗粒度报告完成上传",
            "内窥照片覆盖高速轴轴承与齿面",
            "复测 CMS 侧频低于预警线或形成检修建议",
            "AI 诊断样本回写完成",
          ],
          asset: `${input.turbineId} / 齿轮箱高速轴轴承`,
          assignee: "传动链专业班组",
          closeActionLabel: "标记现场复核完成",
          closedActionLabel: "现场复核已完成",
          closedState: "现场复核完成",
          draftCode: "WO-GX-待创建",
          dueWindow: `${input.maintenance.actionWindowHours} / 低风速窗口优先`,
          finalCode: `WO-GX-${input.caseDate}-${workOrderSuffix(input.turbineId)}`,
          generatedState: "已生成",
          initialState: "待生成",
          location: "黔西南山地风场 / 3 号山脊检修道路",
          materials: ["内窥镜", "油液取样瓶", "振动复测采集器", input.maintenance.parts],
          precondition: input.maintenance.workMode,
          priority: input.eventCode.includes("RED") ? "P0 紧急" : "P1 高优先级",
          safetyRequirement: "复核前保持限载策略；登塔作业执行双人确认和风速许可。",
          steps: [
            {
              action: "调度低风速停机窗口并锁定远程运行策略",
              owner: "集控值班长",
              output: "停机/限载许可记录",
            },
            {
              action: "执行齿轮箱油液取样与内窥复核",
              owner: "传动链检修工程师",
              output: "油液报告、内窥照片",
            },
            {
              action: "完成 CMS 振动复测并与告警前窗口对比",
              owner: "诊断工程师",
              output: "复测频谱和结论",
            },
            {
              action: "关闭告警并回写诊断样本",
              owner: "运维主管",
              output: "闭环记录和样本标签",
            },
          ],
        },
        title: "运维工单",
      },
    },
    partNamePattern: /齿轮|gearbox|gear/i,
    statuses: {
      componentEntry: "齿轮箱预警闭环：从部件风险进入证据研判",
      locked: `齿轮箱预警闭环：已锁定 ${input.turbineId} 高速轴轴承风险`,
      ticketClosed: "工单回写完成：齿轮箱油液与内窥结果已进入复盘样本",
      ticketCreated: "已生成齿轮箱预测维护工单：等待现场复核",
    },
    turbineId: input.turbineId,
  };
};

export { activeGearboxCaseInput as gearboxCaseInputs, gearboxCaseCatalog };

export const gearboxWorkflowCase = buildGearboxWorkflowCase();
