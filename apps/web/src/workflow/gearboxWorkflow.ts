export type WorkflowModuleKey = "health" | "scada" | "cms" | "bolts" | "alerts" | "maintenance" | "workorder";

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
  body?: string;
  boltChart?: BoltChart;
  cmsChart?: CmsChart;
  evidenceRows?: WorkflowEvidence[];
  hero?: {
    score: string;
    scoreLabel: string;
    summary: string;
    text: string;
  };
  kicker: string;
  metrics?: WorkflowMetric[];
  scadaChart?: ScadaChart;
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

export function getGearboxCaseDiagnostics(input: GearboxCaseInput = gearboxCaseInputs): GearboxCaseDiagnostics {
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

export const gearboxCaseInputs: GearboxCaseInput = {
  caseDate: "20260621",
  cmsBaselineAmplitude: 0.8,
  cmsPeaks: [
    { amplitude: 0.32, frequencyHz: 18, label: "1P 转频", status: "normal" },
    { amplitude: 0.58, frequencyHz: 48, label: "轴承通过频率", status: "normal" },
    { amplitude: 1.68, frequencyHz: 96, label: "齿轮啮合频率 GMF", status: "warning" },
    { amplitude: 1.22, frequencyHz: 108, label: "GMF + 边带", status: "warning" },
    { amplitude: 0.74, frequencyHz: 142, label: "结构耦合峰", status: "normal" },
  ],
  eventCode: "gearbox_bearing_wear",
  focusScadaSampleIndex: 3,
  maintenance: {
    actionWindowHours: "48 - 72 h",
    estimatedRemainingHours: 168,
    parts: "高速轴轴承 / 油液包",
    strategy: "利用明晚低风速窗口停机 2h，先做油液取样与内窥复核，若铁谱异常则升级检修。",
    workMode: "限功率 80%",
  },
  peerOilTempC: 66.2,
  scadaSamples: [
    { expectedKw: 260, oilTempC: 66.8, powerKw: 255, timestamp: "08:00", windSpeed: 4.2 },
    { expectedKw: 430, oilTempC: 68.7, powerKw: 414, timestamp: "09:00", windSpeed: 5.1 },
    { expectedKw: 680, oilTempC: 70.1, powerKw: 648, timestamp: "10:00", windSpeed: 5.9 },
    { expectedKw: 930, oilTempC: 74.6, powerKw: 812, timestamp: "11:00", windSpeed: 6.7 },
    { expectedKw: 1120, oilTempC: 75.2, powerKw: 976, timestamp: "12:00", windSpeed: 7.4 },
    { expectedKw: 1310, oilTempC: 76.1, powerKw: 1152, timestamp: "13:00", windSpeed: 8.0 },
  ],
  thresholds: {
    boltRelaxationWarningPct: 8,
    cmsSidebandRatio: 1.8,
    oilTempDeltaC: 6,
    scadaPowerShortfallPct: 10,
  },
  turbineId: "HS-WTG-02",
};

export function buildGearboxWorkflowCase(input: GearboxCaseInput = gearboxCaseInputs): GearboxWorkflowCase {
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

  return {
    component: "齿轮箱",
    componentRisks: [
      { component: "blade-root", module: "bolts", part: "blade", status: "稳定监视", title: "叶根螺栓" },
      { component: "drivetrain", module: "cms", part: "hub", status: "侧频复核", title: "传动链" },
      { component: "gearbox", module: "alerts", part: "gearbox", status: "P1 预警闭环", title: "齿轮箱" },
      { component: "tower", module: "bolts", part: "tower", status: "载荷校核", title: "塔筒结构" },
    ],
    eventCode: input.eventCode,
    moduleOrder: ["health", "scada", "cms", "bolts", "alerts", "maintenance", "workorder"],
    modules: {
      health: {
        action: { label: "查看 SCADA 证据", module: "scada" },
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
        action: { label: "生成维护建议", module: "maintenance", primary: true },
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
          closeActionLabel: "标记现场复核完成",
          closedActionLabel: "现场复核已完成",
          closedState: "现场复核完成",
          draftCode: "WO-GX-待创建",
          finalCode: `WO-GX-${input.caseDate}-02`,
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
      locked: `齿轮箱预警闭环：已锁定 ${input.turbineId} 高速轴轴承风险`,
      ticketClosed: "工单回写完成：齿轮箱油液与内窥结果已进入复盘样本",
      ticketCreated: "已生成齿轮箱预测维护工单：等待现场复核",
    },
    turbineId: input.turbineId,
  };
};

export const gearboxWorkflowCase = buildGearboxWorkflowCase();
