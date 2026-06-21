import type { GearboxCaseInput } from "./gearboxWorkflow";

export type GearboxCaseCatalogEntry = {
  id: string;
  input: GearboxCaseInput;
  scenario: string;
  severity: "watch" | "orange" | "red";
  title: string;
};

export const primaryGearboxCaseInput: GearboxCaseInput = {
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

export const severeGearboxCaseInput: GearboxCaseInput = {
  caseDate: "20260621",
  cmsBaselineAmplitude: 0.82,
  cmsPeaks: [
    { amplitude: 0.35, frequencyHz: 18, label: "1P 转频", status: "normal" },
    { amplitude: 0.74, frequencyHz: 48, label: "轴承通过频率", status: "normal" },
    { amplitude: 1.94, frequencyHz: 96, label: "齿轮啮合频率 GMF", status: "warning" },
    { amplitude: 1.48, frequencyHz: 108, label: "GMF + 边带", status: "warning" },
    { amplitude: 0.88, frequencyHz: 142, label: "结构耦合峰", status: "normal" },
  ],
  eventCode: "gearbox_bearing_wear_escalation",
  focusScadaSampleIndex: 4,
  maintenance: {
    actionWindowHours: "24 - 48 h",
    estimatedRemainingHours: 96,
    parts: "高速轴轴承 / 齿轮箱油液 / 内窥检测包",
    strategy: "优先安排最近低风速窗口停机复核；若铁谱或内窥存在剥落痕迹，升级为计划检修。",
    workMode: "限功率 70%",
  },
  peerOilTempC: 66.4,
  scadaSamples: [
    { expectedKw: 280, oilTempC: 68.1, powerKw: 270, timestamp: "08:00", windSpeed: 4.4 },
    { expectedKw: 470, oilTempC: 70.2, powerKw: 438, timestamp: "09:00", windSpeed: 5.3 },
    { expectedKw: 710, oilTempC: 73.8, powerKw: 632, timestamp: "10:00", windSpeed: 6.0 },
    { expectedKw: 960, oilTempC: 77.6, powerKw: 812, timestamp: "11:00", windSpeed: 6.8 },
    { expectedKw: 1160, oilTempC: 79.4, powerKw: 948, timestamp: "12:00", windSpeed: 7.5 },
    { expectedKw: 1360, oilTempC: 80.3, powerKw: 1120, timestamp: "13:00", windSpeed: 8.1 },
  ],
  thresholds: {
    boltRelaxationWarningPct: 8,
    cmsSidebandRatio: 1.8,
    oilTempDeltaC: 6,
    scadaPowerShortfallPct: 10,
  },
  turbineId: "HS-WTG-03",
};

export const gearboxCaseCatalog: GearboxCaseCatalogEntry[] = [
  {
    id: "hs-wtg-02-gearbox-bearing",
    input: primaryGearboxCaseInput,
    scenario: "齿轮箱高速轴轴承早期磨损",
    severity: "orange",
    title: "HS-WTG-02 齿轮箱 P1 预警闭环",
  },
  {
    id: "hs-wtg-03-gearbox-escalation",
    input: severeGearboxCaseInput,
    scenario: "齿轮箱侧频与油温同步升级",
    severity: "red",
    title: "HS-WTG-03 齿轮箱升级复核",
  },
];

export const activeGearboxCaseInput = primaryGearboxCaseInput;
