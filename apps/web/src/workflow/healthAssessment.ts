import { type GearboxWorkflowCase, getGearboxCaseDiagnostics } from "./gearboxWorkflow";
import { gearboxCaseCatalog } from "./gearboxCaseData";

export type HealthDataSourceKey =
  | "uav"
  | "ai-video"
  | "scada"
  | "cms"
  | "bolt"
  | "flange-gap"
  | "weather";

export type HealthComponentStatus = "normal" | "watch" | "alarm";

export type HealthComponentKey =
  | "foundation"
  | "tower"
  | "blade"
  | "drivetrain"
  | "main-shaft"
  | "gearbox"
  | "generator"
  | "pitch"
  | "yaw"
  | "converter"
  | "electrical-joint"
  | "structural-fastener"
  | "bolt"
  | "flange-gap";

export type HealthDataSource = {
  boundary: string;
  key: HealthDataSourceKey;
  label: string;
  latest: string;
  role: string;
  status: "connected" | "demo" | "pending";
};

export type HealthComponentScore = {
  dataSources: HealthDataSourceKey[];
  key: HealthComponentKey;
  label: string;
  level: 1 | 2;
  nextAction: string;
  parentKey?: HealthComponentKey;
  reason: string;
  score: number;
  screening: string;
  specialMonitoring: string;
  status: HealthComponentStatus;
  weightPct: number;
};

export type HealthAssessment = {
  broadScreeningSummary: string;
  componentScores: HealthComponentScore[];
  coverageGap: string;
  dataSources: HealthDataSource[];
  overallScore: number;
  specialMonitoringSummary: string;
  status: HealthComponentStatus;
  systemWeights: Array<{
    component: HealthComponentKey;
    label: string;
    score: number;
    weightPct: number;
  }>;
  turbineId: string;
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreStatus(score: number): HealthComponentStatus {
  if (score < 70) return "alarm";
  if (score < 85) return "watch";
  return "normal";
}

function getSeverityOffset(workflowCase: GearboxWorkflowCase): number {
  return workflowCase.turbineId.endsWith("03") ? 8 : 0;
}

function weightedScore(components: HealthComponentScore[]): number {
  const topLevel = components.filter((component) => component.level === 1);
  const totalWeight = topLevel.reduce((sum, component) => sum + component.weightPct, 0);
  if (totalWeight === 0) return 0;
  return clampScore(topLevel.reduce((sum, component) => sum + component.score * component.weightPct, 0) / totalWeight);
}

export function buildHealthAssessment(workflowCase: GearboxWorkflowCase): HealthAssessment {
  const catalogInput = gearboxCaseCatalog.find((entry) => entry.input.turbineId === workflowCase.turbineId)?.input ?? gearboxCaseCatalog[0].input;
  const diagnostics = getGearboxCaseDiagnostics(catalogInput);
  const severityOffset = getSeverityOffset(workflowCase);
  const gearboxScore = clampScore(diagnostics.healthScore - 6 - severityOffset);
  const drivetrainScore = clampScore(gearboxScore + 5);
  const boltScore = clampScore(83 - diagnostics.boltWarningChannels * 5 - severityOffset / 2);
  const flangeScore = clampScore(82 - Math.max(0, diagnostics.oilTempDeltaC - 5) * 1.5 - severityOffset / 2);

  const componentScores: HealthComponentScore[] = [
    {
      dataSources: ["uav", "ai-video", "weather"],
      key: "foundation",
      label: "基础",
      level: 1,
      nextAction: "结合无人机巡检影像复核基础沉降、冲刷和道路边坡风险。",
      reason: "当前无基础沉降越限证据，山地降雨与边坡风险保持例行跟踪。",
      score: clampScore(92 - severityOffset / 3),
      screening: "广谱筛查通过",
      specialMonitoring: "雨后边坡与基础外观专项巡检",
      status: "normal",
      weightPct: 8,
    },
    {
      dataSources: ["scada", "bolt", "flange-gap", "weather"],
      key: "tower",
      label: "塔筒",
      level: 1,
      nextAction: "维持塔筒一阶频率和法兰间隙趋势跟踪，异常扩大时进入结构专项。",
      reason: "塔筒结构侧未形成主故障证据，但山地阵风会放大结构载荷。",
      score: clampScore(88 - diagnostics.boltWarningChannels * 2 - severityOffset / 2),
      screening: "结构侧作为反证项",
      specialMonitoring: "塔筒频率、法兰间隙、振动响应联动监测",
      status: "normal",
      weightPct: 10,
    },
    {
      dataSources: ["uav", "ai-video", "scada", "weather"],
      key: "blade",
      label: "叶片",
      level: 1,
      nextAction: "保留无人机叶片巡检入口；若视频识别裂纹或覆冰，转为叶片专项。",
      reason: "当前功率残差不能单独解释为叶片气动退化，需与影像证据联合判断。",
      score: clampScore(86 - diagnostics.scadaAbnormalSamples - severityOffset / 3),
      screening: "未升级为主疑似",
      specialMonitoring: "叶片裂纹、覆冰、雷击点 AI 视频/无人机复核",
      status: "normal",
      weightPct: 14,
    },
    {
      dataSources: ["scada", "cms"],
      key: "drivetrain",
      label: "传动链",
      level: 1,
      nextAction: "进入齿轮箱与高速轴专项监测，复核 CMS 包络谱和油液铁谱。",
      reason: "SCADA 功率残差、CMS 侧频和油温残差同向，传动链为当前主风险系统。",
      score: drivetrainScore,
      screening: "广谱筛查异常",
      specialMonitoring: "主轴、齿轮箱、发电机专项重点监测",
      status: scoreStatus(drivetrainScore),
      weightPct: 32,
    },
    {
      dataSources: ["scada", "cms"],
      key: "pitch",
      label: "变桨系统",
      level: 1,
      nextAction: "对比桨距角偏差与变桨电机电流，确认是否存在跟随误差。",
      reason: "当前无桨距跟随异常主证据，保留为运行侧解释项。",
      score: clampScore(89 - severityOffset / 3),
      screening: "广谱筛查通过",
      specialMonitoring: "桨距角偏差和变桨电流专项",
      status: "normal",
      weightPct: 8,
    },
    {
      dataSources: ["scada", "weather"],
      key: "yaw",
      label: "偏航系统",
      level: 1,
      nextAction: "结合山地风向切变查看偏航误差，避免把偏航损失误判为传动链故障。",
      reason: "偏航误差未解释当前 CMS 侧频，作为反证项持续监控。",
      score: clampScore(87 - severityOffset / 3),
      screening: "反证项通过",
      specialMonitoring: "偏航误差与风向切变监测",
      status: "normal",
      weightPct: 7,
    },
    {
      dataSources: ["scada", "ai-video"],
      key: "converter",
      label: "变流器",
      level: 1,
      nextAction: "复核柜内温度与故障码，确认功率缺口不是电气限载导致。",
      reason: "当前功率残差需排除电气侧限载，但没有变流器主告警。",
      score: clampScore(88 - severityOffset / 4),
      screening: "未发现主故障",
      specialMonitoring: "变流器温度、故障码、谐波异常监测",
      status: "normal",
      weightPct: 8,
    },
    {
      dataSources: ["ai-video", "scada"],
      key: "electrical-joint",
      label: "电气接头过热",
      level: 1,
      nextAction: "接入红外/AI 视频后复核柜内接头温升，当前不作为主故障。",
      reason: "无电气接头过热证据；该项保留为安全边界监测。",
      score: clampScore(85 - severityOffset / 3),
      screening: "安全项跟踪",
      specialMonitoring: "红外热像与柜内视频识别",
      status: "normal",
      weightPct: 6,
    },
    {
      dataSources: ["bolt", "flange-gap", "weather"],
      key: "structural-fastener",
      label: "螺栓/法兰",
      level: 1,
      nextAction: "对松弛通道和法兰间隙进行趋势复核，确认是否需要登塔复检。",
      reason: `${diagnostics.boltWarningChannels} 路螺栓关注项存在，但当前更多支持结构侧跟踪和反证。`,
      score: clampScore((boltScore * 0.55 + flangeScore * 0.45)),
      screening: "结构紧固件关注",
      specialMonitoring: "螺栓预紧力与法兰间隙专项",
      status: scoreStatus(clampScore((boltScore * 0.55 + flangeScore * 0.45))),
      weightPct: 7,
    },
    {
      dataSources: ["cms"],
      key: "main-shaft",
      label: "主轴",
      level: 2,
      nextAction: "用阶次谱排除主轴不平衡或对中异常。",
      parentKey: "drivetrain",
      reason: "CMS 未显示主轴转频为最高风险峰。",
      score: clampScore(82 - severityOffset / 2),
      screening: "传动链子项关注",
      specialMonitoring: "1P/2P 阶次复核",
      status: "watch",
      weightPct: 25,
    },
    {
      dataSources: ["scada", "cms"],
      key: "gearbox",
      label: "齿轮箱",
      level: 2,
      nextAction: "安排油液取样、内窥复核和 CMS 复测，确认高速轴轴承早期磨损。",
      parentKey: "drivetrain",
      reason: `GMF 侧频 ${diagnostics.cmsSidebandRatio.toFixed(1)}x 基线，油温偏高 ${diagnostics.oilTempDeltaC.toFixed(1)} ℃。`,
      score: gearboxScore,
      screening: "主疑似部件",
      specialMonitoring: "高速轴轴承、油液铁谱、内窥专项",
      status: scoreStatus(gearboxScore),
      weightPct: 45,
    },
    {
      dataSources: ["scada", "cms"],
      key: "generator",
      label: "发电机",
      level: 2,
      nextAction: "核对发电机轴承与温升，作为传动链相邻部件排查。",
      parentKey: "drivetrain",
      reason: "发电机侧没有成为当前主峰，但需防止相邻部件误归因。",
      score: clampScore(86 - severityOffset / 3),
      screening: "相邻部件排查",
      specialMonitoring: "发电机轴承温升和振动复核",
      status: "normal",
      weightPct: 30,
    },
    {
      dataSources: ["bolt"],
      key: "bolt",
      label: "螺栓监测",
      level: 2,
      nextAction: "复核最低预紧力通道和温漂补偿参数。",
      parentKey: "structural-fastener",
      reason: `最低通道 ${diagnostics.boltLowestChannel.id}，预紧力 ${diagnostics.boltLowestChannel.preloadKn.toFixed(1)} kN。`,
      score: boltScore,
      screening: "紧固件关注",
      specialMonitoring: "叶根/塔筒螺栓预紧力趋势",
      status: scoreStatus(boltScore),
      weightPct: 55,
    },
    {
      dataSources: ["flange-gap"],
      key: "flange-gap",
      label: "法兰间隙监测",
      level: 2,
      nextAction: "接入真实法兰间隙系统后，与螺栓松弛和塔筒频率做联合判据。",
      parentKey: "structural-fastener",
      reason: "当前为演示接入位，用于体现赛题要求的数据融合边界。",
      score: flangeScore,
      screening: "待真实系统校准",
      specialMonitoring: "法兰间隙趋势与螺栓松弛联动",
      status: scoreStatus(flangeScore),
      weightPct: 45,
    },
  ];

  const overallScore = weightedScore(componentScores);
  const alarmComponents = componentScores.filter((component) => component.level === 1 && component.status === "alarm");
  const watchComponents = componentScores.filter((component) => component.level === 1 && component.status === "watch");

  return {
    broadScreeningSummary: `广谱健康筛查覆盖 ${componentScores.filter((component) => component.level === 1).length} 个系统层级；当前主异常集中在传动链，结构紧固件作为关注与反证项。`,
    componentScores,
    coverageGap: "无人机、AI视频和法兰间隙当前为演示接入位；真实参赛交付需接入场站边缘视频流、无人机巡检结果和法兰间隙监测系统，不能把模拟数据说成现场实测。",
    dataSources: [
      {
        boundary: "样例数据来自当前诊断包，可替换为场站实时 SCADA。",
        key: "scada",
        label: "SCADA",
        latest: `${catalogInput.scadaSamples.length} 个 10 min 窗口`,
        role: "运行残差、功率曲线、偏航/变桨/变流器排查",
        status: "connected",
      },
      {
        boundary: "样例频谱用于演示 CMS 机理判据。",
        key: "cms",
        label: "CMS",
        latest: "20 kHz / 60 s 包络谱",
        role: "传动链部件定位与振动特征提取",
        status: "connected",
      },
      {
        boundary: "样例通道用于演示螺栓预紧力趋势。",
        key: "bolt",
        label: "螺栓监测",
        latest: `${diagnostics.boltWarningChannels} 路关注`,
        role: "结构紧固件健康与反证",
        status: "connected",
      },
      {
        boundary: "当前无真实法兰间隙设备接入，先保留标准接口与判据位。",
        key: "flange-gap",
        label: "法兰间隙",
        latest: "接口待接入",
        role: "塔筒/法兰结构专项监测",
        status: "demo",
      },
      {
        boundary: "当前为巡检结果入口，后续接无人机缺陷识别输出。",
        key: "uav",
        label: "无人机巡检",
        latest: "示例缺陷清单",
        role: "叶片、基础、道路边坡外观证据",
        status: "demo",
      },
      {
        boundary: "当前为边缘视频识别入口，后续接红外和可见光算法。",
        key: "ai-video",
        label: "AI视频",
        latest: "边缘识别接口位",
        role: "覆冰、烟雾、过热、人员安全监控",
        status: "demo",
      },
      {
        boundary: "山地气象为场景和风险修正项，当前使用演示气象。",
        key: "weather",
        label: "山地气象",
        latest: "阵风/降雨风险",
        role: "复杂地形载荷修正和作业窗口判断",
        status: "demo",
      },
    ],
    overallScore,
    specialMonitoringSummary: `专项重点监测建议聚焦齿轮箱高速轴轴承、螺栓预紧力和法兰间隙；停机、登塔、检修仍需人工确认。`,
    status: alarmComponents.length > 0 ? "alarm" : watchComponents.length > 0 ? "watch" : "normal",
    systemWeights: componentScores
      .filter((component) => component.level === 1)
      .map((component) => ({
        component: component.key,
        label: component.label,
        score: component.score,
        weightPct: component.weightPct,
      })),
    turbineId: workflowCase.turbineId,
  };
}
