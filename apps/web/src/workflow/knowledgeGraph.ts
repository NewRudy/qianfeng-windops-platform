import type { GearboxWorkflowCase, WorkflowModuleKey } from "./gearboxWorkflow";

export type KnowledgeGraphNodeType =
  | "AI研判"
  | "BIM定位"
  | "CMS证据"
  | "SCADA证据"
  | "处置动作"
  | "部件"
  | "反证规则"
  | "复盘样本"
  | "故障模式"
  | "机组"
  | "结构反证"
  | "融合判据"
  | "知识边界";

export type KnowledgeGraphEdgeRole = "action" | "amplify" | "boundary" | "counter" | "localize" | "support" | "writeback";

export type KnowledgeGraphNode = {
  evidence?: string;
  id: string;
  label: string;
  module?: WorkflowModuleKey;
  position: { x: number; y: number };
  status: "alarm" | "normal" | "review" | "watch";
  summary: string;
  type: KnowledgeGraphNodeType;
};

export type KnowledgeGraphEdge = {
  explanation: string;
  from: string;
  label: string;
  module?: WorkflowModuleKey;
  role: KnowledgeGraphEdgeRole;
  to: string;
};

export type KnowledgeDecisionStep = {
  conclusion: string;
  humanBoundary: string;
  module: WorkflowModuleKey;
  nodeIds: string[];
  title: string;
};

export type KnowledgeDecisionPath = {
  answer: string;
  id: "what-next" | "why-gearbox" | "why-not-bolt";
  question: string;
  recommendedModule: WorkflowModuleKey;
  steps: KnowledgeDecisionStep[];
  title: string;
};

export type WindOpsKnowledgeGraph = {
  decisionPaths: KnowledgeDecisionPath[];
  edges: KnowledgeGraphEdge[];
  nodes: KnowledgeGraphNode[];
  summary: string;
};

export function buildWindOpsKnowledgeGraph(workflowCase: GearboxWorkflowCase): WindOpsKnowledgeGraph {
  const brief = workflowCase.modules.brief.aiBrief;
  const scadaDecision = workflowCase.modules.scada.decision;
  const cmsDecision = workflowCase.modules.cms.decision;
  const boltDecision = workflowCase.modules.bolts.decision;
  const fusionDecision = workflowCase.modules.fusion.decision;
  const maintenanceDecision = workflowCase.modules.maintenance.decision;
  const ticket = workflowCase.modules.workorder.ticket;

  const nodes: KnowledgeGraphNode[] = [
    {
      id: "turbine",
      label: workflowCase.turbineId,
      position: { x: 12, y: 18 },
      status: "watch",
      summary: "当前事件对象，连接 GIS 场景、BIM 部件、监测证据、工单和复盘样本。",
      type: "机组",
    },
    {
      id: "ai-brief",
      label: "智能值班研判",
      module: "brief",
      position: { x: 36, y: 14 },
      status: "review",
      summary: brief?.conclusion ?? "当前事件尚未形成智能值班结论。",
      type: "AI研判",
    },
    {
      evidence: scadaDecision?.evidence,
      id: "scada-power",
      label: "功率残差",
      module: "scada",
      position: { x: 17, y: 48 },
      status: "alarm",
      summary: scadaDecision?.result ?? "SCADA 运行侧证据未就绪。",
      type: "SCADA证据",
    },
    {
      evidence: workflowCase.modules.scada.metrics?.find((metric) => metric.label.includes("油温"))?.value,
      id: "oil-temp",
      label: "油温偏高",
      module: "scada",
      position: { x: 38, y: 54 },
      status: "watch",
      summary: "油温对标用于增强润滑/摩擦异常判断，不能单独确认齿轮箱故障。",
      type: "SCADA证据",
    },
    {
      evidence: cmsDecision?.evidence,
      id: "cms-gmf",
      label: "GMF侧频",
      module: "cms",
      position: { x: 28, y: 78 },
      status: "alarm",
      summary: cmsDecision?.result ?? "CMS 部件侧证据未就绪。",
      type: "CMS证据",
    },
    {
      evidence: boltDecision?.evidence,
      id: "bolt-counter",
      label: "叶根螺栓/塔筒结构",
      module: "bolts",
      position: { x: 66, y: 78 },
      status: "watch",
      summary: boltDecision?.result ?? "结构侧反证未就绪。",
      type: "结构反证",
    },
    {
      id: "gearbox-bearing",
      label: "齿轮箱高速轴轴承",
      module: "alerts",
      position: { x: 66, y: 47 },
      status: "alarm",
      summary: "当前主疑似部件；由 SCADA 功率残差、CMS 侧频、油温增强和结构反证共同指向。",
      type: "部件",
    },
    {
      id: "fault-mode",
      label: "早期磨损",
      module: "alerts",
      position: { x: 85, y: 50 },
      status: "alarm",
      summary: "当前故障模式假设，需要多源证据同向和人工复核，不能由单一阈值直接确认。",
      type: "故障模式",
    },
    {
      id: "fusion-rule",
      label: "多源融合门控",
      module: "fusion",
      position: { x: 51, y: 32 },
      status: "review",
      summary: fusionDecision?.result ?? "融合判据未运行。",
      type: "融合判据",
    },
    {
      id: "bim-location",
      label: "BIM部件定位",
      module: "alerts",
      position: { x: 78, y: 24 },
      status: "review",
      summary: "把故障假设落到齿轮箱高速轴轴承，并保留叶根/塔筒反证入口。",
      type: "BIM定位",
    },
    {
      id: "maintenance",
      label: "预测维护策略",
      module: "maintenance",
      position: { x: 63, y: 16 },
      status: "review",
      summary: maintenanceDecision?.result ?? "维护策略待确认。",
      type: "处置动作",
    },
    {
      id: "workorder",
      label: "现场复核工单",
      module: "workorder",
      position: { x: 88, y: 18 },
      status: "review",
      summary: `工单对象：${ticket?.asset ?? workflowCase.turbineId}；状态为草案，派发前必须过人工确认门。`,
      type: "处置动作",
    },
    {
      id: "human-boundary",
      label: "人工确认门",
      module: "workorder",
      position: { x: 88, y: 78 },
      status: "review",
      summary: "AI 只辅助研判和生成草案；停机、登塔、检修、派工和关闭必须人工确认。",
      type: "知识边界",
    },
    {
      id: "review-writeback",
      label: "复盘回写样本",
      module: "workorder",
      position: { x: 51, y: 90 },
      status: "normal",
      summary: "油液、内窥、CMS 复测和 AI 标签回写后，才进入相似案例库和模型校准样本。",
      type: "复盘样本",
    },
  ];

  const edges: KnowledgeGraphEdge[] = [
    {
      explanation: "当前告警绑定同一台机组，避免跨机组拼接证据。",
      from: "turbine",
      label: "触发",
      role: "support",
      to: "ai-brief",
    },
    {
      explanation: scadaDecision?.evidence ?? "SCADA 功率曲线用于判断运行异常是否成立。",
      from: "scada-power",
      label: "支持",
      module: "scada",
      role: "support",
      to: "fault-mode",
    },
    {
      explanation: cmsDecision?.evidence ?? "CMS 侧频用于把异常定位到传动链/齿轮箱。",
      from: "cms-gmf",
      label: "定位",
      module: "cms",
      role: "localize",
      to: "gearbox-bearing",
    },
    {
      explanation: "油温偏高增强润滑/摩擦异常判断，但不能单独作为主故障。",
      from: "oil-temp",
      label: "增强",
      module: "scada",
      role: "amplify",
      to: "fault-mode",
    },
    {
      explanation: boltDecision?.evidence ?? "结构监测用于排除叶根结构主故障。",
      from: "bolt-counter",
      label: "反证",
      module: "bolts",
      role: "counter",
      to: "fault-mode",
    },
    {
      explanation: fusionDecision?.evidence ?? "融合门控把支持项和反证项放入同一事件窗口。",
      from: "fusion-rule",
      label: "融合判据",
      module: "fusion",
      role: "support",
      to: "fault-mode",
    },
    {
      explanation: "故障模式需要落到可检查的 BIM 部件，才进入隐患排查和工单。",
      from: "fault-mode",
      label: "映射",
      module: "alerts",
      role: "localize",
      to: "bim-location",
    },
    {
      explanation: "BIM 定位把当前主疑似锁定到齿轮箱高速轴轴承。",
      from: "bim-location",
      label: "锁定部件",
      module: "alerts",
      role: "localize",
      to: "gearbox-bearing",
    },
    {
      explanation: maintenanceDecision?.evidence ?? "预测维护策略承接隐患排查结论。",
      from: "fault-mode",
      label: "生成策略",
      module: "maintenance",
      role: "action",
      to: "maintenance",
    },
    {
      explanation: "策略只生成现场复核工单草案，不能自动派发。",
      from: "maintenance",
      label: "生成草案",
      module: "workorder",
      role: "action",
      to: "workorder",
    },
    {
      explanation: "工单派发、停机、登塔、检修和关闭都必须过人工确认门。",
      from: "workorder",
      label: "必须确认",
      module: "workorder",
      role: "boundary",
      to: "human-boundary",
    },
    {
      explanation: "现场结果回写后才进入复盘样本和模型校准。",
      from: "human-boundary",
      label: "回写",
      module: "workorder",
      role: "writeback",
      to: "review-writeback",
    },
  ];

  return {
    decisionPaths: buildKnowledgeDecisionPaths(workflowCase),
    edges,
    nodes,
    summary: `${workflowCase.turbineId} 图谱把机组、部件、SCADA/CMS/结构证据、融合判据、BIM 定位、工单和人工边界串成同一条可追溯链。`,
  };
}

export function buildAgentKnowledgeContext(intent: string, workflowCase: GearboxWorkflowCase): string {
  const graph = buildWindOpsKnowledgeGraph(workflowCase);
  const selectedPath = selectDecisionPath(intent, graph.decisionPaths);
  const pathSteps = selectedPath.steps
    .map((step) => `${step.title}:${step.conclusion};人工边界:${step.humanBoundary}`)
    .join(" -> ");
  const relevantEdges = graph.edges
    .filter((edge) => selectedPath.steps.some((step) => step.nodeIds.includes(edge.from) || step.nodeIds.includes(edge.to)))
    .map((edge) => `${nodeLabel(graph, edge.from)}-${edge.label}-${nodeLabel(graph, edge.to)}(${edge.role})`)
    .join("；");

  return [
    `图谱检索：${selectedPath.question}`,
    `推荐模块=${selectedPath.recommendedModule}`,
    `图谱答案=${selectedPath.answer}`,
    `关系链=${relevantEdges}`,
    `决策步骤=${pathSteps}`,
  ].join("\n");
}

function buildKnowledgeDecisionPaths(workflowCase: GearboxWorkflowCase): KnowledgeDecisionPath[] {
  const scada = workflowCase.modules.scada.decision;
  const cms = workflowCase.modules.cms.decision;
  const bolts = workflowCase.modules.bolts.decision;
  const fusion = workflowCase.modules.fusion.decision;
  const maintenance = workflowCase.modules.maintenance.decision;
  const workorder = workflowCase.modules.workorder.decision;

  return [
    {
      answer: "主疑似为齿轮箱高速轴轴承，因为运行异常、部件振动定位和融合门控同向支持齿轮箱早期磨损。",
      id: "why-gearbox",
      question: "为什么判定为齿轮箱风险？",
      recommendedModule: "fusion",
      steps: [
        {
          conclusion: scada?.result ?? "运行侧异常成立",
          humanBoundary: humanBoundary(scada?.confirm ?? "值班员确认数据质量后才采纳 SCADA 证据。"),
          module: "scada",
          nodeIds: ["scada-power", "oil-temp"],
          title: "运行异常成立",
        },
        {
          conclusion: cms?.result ?? "CMS 定位到传动链",
          humanBoundary: humanBoundary(cms?.confirm ?? "诊断工程师确认采样质量后才用于部件定位。"),
          module: "cms",
          nodeIds: ["cms-gmf", "gearbox-bearing"],
          title: "部件侧定位",
        },
        {
          conclusion: fusion?.result ?? "融合判据支持齿轮箱风险",
          humanBoundary: humanBoundary(fusion?.confirm ?? "融合结论需人工确认后才升级告警。"),
          module: "fusion",
          nodeIds: ["fusion-rule", "fault-mode"],
          title: "融合门控升级",
        },
      ],
      title: "齿轮箱风险解释链",
    },
    {
      answer: "螺栓/塔筒当前是反证项和载荷放大因素，不足以改写齿轮箱主疑似。",
      id: "why-not-bolt",
      question: "为什么不是螺栓或塔筒结构主故障？",
      recommendedModule: "bolts",
      steps: [
        {
          conclusion: bolts?.result ?? "结构侧作为反证项",
          humanBoundary: humanBoundary(bolts?.confirm ?? "结构工程师确认后才排除结构主故障。"),
          module: "bolts",
          nodeIds: ["bolt-counter", "fault-mode"],
          title: "结构侧反证",
        },
        {
          conclusion: fusion?.result ?? "融合判据未改写主故障",
          humanBoundary: humanBoundary(fusion?.confirm ?? "诊断工程师确认反证后才进入告警研判。"),
          module: "fusion",
          nodeIds: ["fusion-rule", "gearbox-bearing"],
          title: "主疑似未改写",
        },
      ],
      title: "结构反证解释链",
    },
    {
      answer: "下一步不是直接检修，而是进入预测维护策略、生成工单草案并等待人工确认门。",
      id: "what-next",
      question: "下一步怎么处理？",
      recommendedModule: "workorder",
      steps: [
        {
          conclusion: maintenance?.result ?? "形成预测维护策略",
          humanBoundary: humanBoundary(maintenance?.confirm ?? "值长确认后才生成可执行工单。"),
          module: "maintenance",
          nodeIds: ["maintenance", "fault-mode"],
          title: "形成处置策略",
        },
        {
          conclusion: workorder?.result ?? "生成现场复核工单草案",
          humanBoundary: humanBoundary(workorder?.confirm ?? "派发、停机、登塔和关闭必须人工确认。"),
          module: "workorder",
          nodeIds: ["workorder", "human-boundary", "review-writeback"],
          title: "工单草案与回写",
        },
      ],
      title: "处置闭环解释链",
    },
  ];
}

function selectDecisionPath(intent: string, paths: KnowledgeDecisionPath[]): KnowledgeDecisionPath {
  if (intent === "counter_evidence") return paths.find((path) => path.id === "why-not-bolt") ?? paths[0];
  if (["maintenance_plan", "workorder"].includes(intent)) return paths.find((path) => path.id === "what-next") ?? paths[0];
  return paths.find((path) => path.id === "why-gearbox") ?? paths[0];
}

function humanBoundary(text: string): string {
  return text.includes("人工确认") ? text : `人工确认：${text}`;
}

function nodeLabel(graph: WindOpsKnowledgeGraph, nodeId: string): string {
  return graph.nodes.find((node) => node.id === nodeId)?.label ?? nodeId;
}
