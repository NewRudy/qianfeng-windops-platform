import {
  Cartesian3,
  Cesium3DTileset,
  Color,
  createWorldTerrainAsync,
  DirectionalLight,
  EllipsoidTerrainProvider,
  Ion,
  Matrix4,
  Rectangle,
  Transforms,
  UrlTemplateImageryProvider,
  Viewer as CesiumViewer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Viewer as XeokitViewer, WebIFCLoaderPlugin, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";
import * as WebIFC from "web-ifc";
import "./styles.css";

type AssetFormat = "ifc" | "xkt";

type BimAssetItem = {
  id: string;
  label: string;
  position?: number[];
  url: string;
};

type BimAsset = {
  id: string;
  format: AssetFormat;
  items?: BimAssetItem[];
  label: string;
  localOnly?: boolean;
  sizeLabel: string;
  sourceLabel: string;
  timeoutMs: number;
  url?: string;
};

type BimTransform = {
  east: number;
  north: number;
  up: number;
  heading: number;
  scale: number;
};

type XeokitModel = {
  destroy?: () => void;
  on?: (event: string, handler: (value?: unknown) => void) => void;
};

type XeokitHit = {
  entity?: {
    id?: string | number;
  };
};

type LoaderStats = {
  numMetaObjects?: number;
  numObjects?: number;
  numPropertySets?: number;
  numTriangles?: number;
  numVertices?: number;
};

type FusionMode = "bim" | "gis-bim";
type GisDisplayMode = "map" | "mountain" | "online-terrain";

const fusionOrigin = {
  height: 1250,
  latitude: 26.5,
  longitude: 106.6,
};

const localMountainTilesetUrl =
  "/@fs/Users/rudy/Documents/geo_agent/qianfeng-windops-platform/data/external/tilesets/laoyeling-mountain/tileset.json";

const cesiumIonToken =
  import.meta.env.VITE_CESIUM_ION_TOKEN ||
  window.localStorage.getItem("CESIUM_ION_TOKEN") ||
  "";

if (cesiumIonToken) {
  Ion.defaultAccessToken = cesiumIonToken;
}

const defaultBimTransform: BimTransform = {
  east: 0,
  north: 0,
  up: 0,
  heading: 0,
  scale: 1,
};

const mountainNearBimTransform: BimTransform = {
  east: 0,
  north: 0,
  up: -35,
  heading: 0,
  scale: 1,
};

const mountainCenterInXeokit = {
  east: 0,
  north: 0,
  up: -35,
};

const assets: BimAsset[] = [
  {
    id: "wind-turbines-xkt",
    format: "xkt",
    label: "风机 XKT / 快速加载",
    sizeLabel: "60KB XKT",
    sourceLabel: "9 个可选对象",
    timeoutMs: 30000,
    url: "/external/bim/xkt/wind-turbines.xkt",
  },
  {
    id: "factory-masterplan-xkt",
    format: "xkt",
    label: "厂房总图 XKT / 转换结果",
    sizeLabel: "17MB XKT",
    sourceLabel: "用于对比转换后对象层级",
    timeoutMs: 45000,
    url: "/external/bim/xkt/factory-masterplan.xkt",
  },
  {
    id: "wind-turbines-ifc",
    format: "ifc",
    label: "风机 IFC / 浏览器直读",
    sizeLabel: "426KB IFC",
    sourceLabel: "不经过 XKT 转换",
    timeoutMs: 60000,
    url: "/external/bim/ifc/wind-turbines.ifc",
  },
  {
    id: "factory-masterplan-ifc",
    format: "ifc",
    label: "厂房总图 IFC / 浏览器直读",
    localOnly: true,
    sizeLabel: "197MB IFC",
    sourceLabel: "本地诊断原始 IFC 是否保留构件",
    timeoutMs: 240000,
    url: "/external/bim/ifc/factory-masterplan.ifc",
  },
  {
    id: "banda-camp-core-ifc",
    format: "ifc",
    label: "班达营地 IFC / 5 文件同场景",
    localOnly: true,
    sizeLabel: "约 74MB IFC",
    sourceLabel: "办公中心、综合楼、休息楼、运动中心、值班楼直读",
    timeoutMs: 240000,
    items: [
      {
        id: "banda-ifc-office-center-architecture",
        label: "01 办公中心建筑",
        url: "/external/bim/ifc/banda-camp-core/office-center-architecture.ifc",
        position: [-120, 0, 0],
      },
      {
        id: "banda-ifc-multipurpose-building-architecture",
        label: "02 多功能综合楼建筑",
        url: "/external/bim/ifc/banda-camp-core/multipurpose-building-architecture.ifc",
        position: [0, 0, 0],
      },
      {
        id: "banda-ifc-staff-rest-building-architecture",
        label: "03 职工休息楼建筑",
        url: "/external/bim/ifc/banda-camp-core/staff-rest-building-architecture.ifc",
        position: [120, 0, 0],
      },
      {
        id: "banda-ifc-staff-sports-center",
        label: "04 职工运动中心",
        url: "/external/bim/ifc/banda-camp-core/staff-sports-center.ifc",
        position: [-60, 0, 110],
      },
      {
        id: "banda-ifc-duty-building-1",
        label: "05 1# 值班楼",
        url: "/external/bim/ifc/banda-camp-core/duty-building-1.ifc",
        position: [80, 0, 120],
      },
    ],
  },
  {
    id: "banda-camp-core-xkt",
    format: "xkt",
    label: "班达营地 XKT / 5 文件同场景",
    localOnly: true,
    sizeLabel: "转换后 XKT",
    sourceLabel: "同一批 IFC 转 XKT 后加载，对比速度和对象层级",
    timeoutMs: 90000,
    items: [
      {
        id: "banda-xkt-office-center-architecture",
        label: "01 办公中心建筑",
        url: "/external/bim/xkt/banda-camp-core/office-center-architecture.xkt",
        position: [-120, 0, 0],
      },
      {
        id: "banda-xkt-multipurpose-building-architecture",
        label: "02 多功能综合楼建筑",
        url: "/external/bim/xkt/banda-camp-core/multipurpose-building-architecture.xkt",
        position: [0, 0, 0],
      },
      {
        id: "banda-xkt-staff-rest-building-architecture",
        label: "03 职工休息楼建筑",
        url: "/external/bim/xkt/banda-camp-core/staff-rest-building-architecture.xkt",
        position: [120, 0, 0],
      },
      {
        id: "banda-xkt-staff-sports-center",
        label: "04 职工运动中心",
        url: "/external/bim/xkt/banda-camp-core/staff-sports-center.xkt",
        position: [-60, 0, 110],
      },
      {
        id: "banda-xkt-duty-building-1",
        label: "05 1# 值班楼",
        url: "/external/bim/xkt/banda-camp-core/duty-building-1.xkt",
        position: [80, 0, 120],
      },
    ],
  },
];

const isLocalHost = ["", "127.0.0.1", "localhost"].includes(window.location.hostname);
const isStaticPagesBuild = import.meta.env.MODE === "github-pages";
const visibleAssets = assets.filter((asset) => !asset.localOnly || (isLocalHost && !isStaticPagesBuild));

function appAssetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

app.innerHTML = `
  <section class="viewer-shell">
    <header class="viewer-header">
      <div>
        <span>xeokit BIM 数据验证</span>
        <h1>黔风智维 IFC / XKT 查看器</h1>
      </div>
      <strong>独立页面，不改原大屏</strong>
    </header>
    <section class="viewer-main">
      <div class="canvas-wrap">
        <div id="cesium-root" aria-label="Cesium GIS background"></div>
        <canvas id="xeokit-canvas" aria-label="xeokit BIM viewer"></canvas>
        <aside class="status-card">
          <span>当前状态</span>
          <strong data-status-title>等待加载 BIM 资产</strong>
          <span data-status-detail>先运行 npm run assets:ifc-xkt，再启动本页面。</span>
        </aside>
      </div>
      <aside class="side-panel">
        <section class="panel-section">
          <h2>资产</h2>
          <div class="asset-picker">
            <label for="asset-select">测试资产</label>
            <select id="asset-select" data-asset-select>
              ${visibleAssets
                .map(
                  (asset) => `
                    <option value="${asset.id}">
                      ${asset.label} · ${asset.sizeLabel}${asset.localOnly ? " · 本地" : ""}
                    </option>
                  `,
                )
                .join("")}
            </select>
            <button type="button" data-load-selected>加载资产</button>
          </div>
          <div class="mode-toggle" aria-label="视图模式">
            <span>视图模式</span>
            <button type="button" data-fusion-mode="bim">纯 BIM 验证</button>
            <button type="button" data-fusion-mode="gis-bim">山地 3D Tiles + BIM</button>
          </div>
          <div class="mode-toggle" aria-label="GIS 显示方式">
            <span>GIS 底座</span>
            <button type="button" data-gis-display="mountain">只看山体</button>
            <button type="button" data-gis-display="online-terrain">在线地形</button>
            <button type="button" data-gis-display="map">影像+地球</button>
          </div>
          <div class="asset-summary" data-asset-summary></div>
          <div class="fusion-summary" data-fusion-summary>
            Cesium 未启用。开启融合实验后，底层优先显示本地山地 3D Tiles，顶层保留 xeokit 构件级选择。
          </div>
          <section class="calibration-panel" aria-label="BIM 配准调参">
            <div>
              <h2>配准调参</h2>
              <span>X=东、Y=高程、Z=北；应用参数会重载当前 BIM 资产。</span>
            </div>
            <div class="calibration-grid">
              <label>
                东移 E / m
                <input type="number" data-calibration="east" min="-5000000" max="5000000" step="5" />
              </label>
              <label>
                北移 N / m
                <input type="number" data-calibration="north" min="-5000000" max="5000000" step="5" />
              </label>
              <label>
                高程 U / m
                <input type="number" data-calibration="up" min="-100000" max="100000" step="1" />
              </label>
              <label>
                航向 / °
                <input type="number" data-calibration="heading" min="-180" max="180" step="1" />
              </label>
              <label>
                比例
                <input type="number" data-calibration="scale" min="0.02" max="20" step="0.02" />
              </label>
            </div>
            <div class="calibration-actions">
              <button type="button" data-calibration-action="apply">应用配准</button>
              <button type="button" data-calibration-action="auto-align">自动配准</button>
              <button type="button" data-calibration-action="near-mountain">靠近山体</button>
              <button type="button" data-calibration-action="reset">归零</button>
            </div>
            <code data-calibration-readout></code>
          </section>
        </section>
        <section class="stats-grid" aria-label="模型统计">
          <div class="metric"><span>对象数</span><strong data-object-count>--</strong></div>
          <div class="metric"><span>类型数</span><strong data-type-count>--</strong></div>
          <div class="metric"><span>当前选择</span><strong data-selection>未选择</strong></div>
        </section>
        <section class="actions" aria-label="对象操作">
          <button type="button" data-action="fit">适配视图</button>
          <button type="button" data-action="xray">半透明</button>
          <button type="button" data-action="hide">隐藏选中</button>
          <button type="button" data-action="reset">复位显示</button>
        </section>
        <section class="panel-section">
          <h2>边界说明</h2>
          <span>这是独立 xeokit 验证页。XKT 用来验证正式轻量化加载；IFC 直读用来判断源 IFC 是否保留对象层级和属性，不经过转换。</span>
        </section>
        <section class="object-list">
          <h2>可选对象</h2>
          <div data-object-list></div>
        </section>
      </aside>
    </section>
  </section>
`;

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing xeokit viewer control: ${selector}`);
  return element;
}

const canvas = requireElement<HTMLCanvasElement>("#xeokit-canvas");
const statusTitle = requireElement<HTMLElement>("[data-status-title]");
const statusDetail = requireElement<HTMLElement>("[data-status-detail]");
const objectCount = requireElement<HTMLElement>("[data-object-count]");
const typeCount = requireElement<HTMLElement>("[data-type-count]");
const selection = requireElement<HTMLElement>("[data-selection]");
const objectList = requireElement<HTMLElement>("[data-object-list]");
const assetSelect = requireElement<HTMLSelectElement>("[data-asset-select]");
const assetSummary = requireElement<HTMLElement>("[data-asset-summary]");
const fusionSummary = requireElement<HTMLElement>("[data-fusion-summary]");
const cesiumRoot = requireElement<HTMLDivElement>("#cesium-root");
const calibrationReadout = requireElement<HTMLElement>("[data-calibration-readout]");
const calibrationInputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-calibration]"));

const viewer = new XeokitViewer({
  canvasElement: canvas,
  transparent: true,
  antialias: true,
  saoEnabled: true,
  pbrEnabled: false,
  readableGeometryEnabled: true,
});
const xktLoader = new XKTLoaderPlugin(viewer);

let currentModels: XeokitModel[] = [];
let ifcLoader: WebIFCLoaderPlugin | undefined;
let ifcLoaderInit: Promise<WebIFCLoaderPlugin> | undefined;
let selectedObjectId: string | undefined;
let loadingAssetId: string | undefined;
let activeFusionMode: FusionMode = "bim";
let activeGisDisplayMode: GisDisplayMode = "mountain";
let cesiumViewer: CesiumViewer | undefined;
let cesiumInit: Promise<CesiumViewer> | undefined;
let cesiumCameraSyncFrame: number | undefined;
let localFrame: Matrix4 | undefined;
let mountainTilesetLoaded = false;
let mountainTileset: Cesium3DTileset | undefined;
let worldTerrainProviderInit: ReturnType<typeof createWorldTerrainAsync> | undefined;
let worldTerrainProviderReady = false;
let worldTerrainProviderError: string | undefined;
let bimTransform: BimTransform = { ...mountainNearBimTransform };

viewer.camera.eye = [8, 5, 9];
viewer.camera.look = [0, 0, 0];
viewer.camera.up = [0, 1, 0];
viewer.cameraFlight.duration = 0.35;

function setStatus(title: string, detail: string): void {
  statusTitle.textContent = title;
  statusDetail.textContent = detail;
}

function setMetric(target: HTMLElement, value: string): void {
  target.textContent = value;
}

function formatTransform(transform: BimTransform): string {
  return `E ${transform.east.toFixed(1)}m / N ${transform.north.toFixed(1)}m / U ${transform.up.toFixed(1)}m / H ${transform.heading.toFixed(1)}° / S ${transform.scale.toFixed(2)}`;
}

function syncCalibrationInputs(): void {
  calibrationInputs.forEach((input) => {
    const key = input.dataset.calibration as keyof BimTransform | undefined;
    if (!key) return;
    input.value = String(bimTransform[key]);
  });
  calibrationReadout.textContent = formatTransform(bimTransform);
}

function sanitizeTransform(transform: BimTransform): BimTransform {
  return {
    ...transform,
    scale: transform.scale > 0 ? transform.scale : 0.02,
  };
}

function readCalibrationInputs(): BimTransform {
  const next = { ...bimTransform };
  calibrationInputs.forEach((input) => {
    const key = input.dataset.calibration as keyof BimTransform | undefined;
    if (!key) return;
    const parsed = Number(input.value);
    if (Number.isFinite(parsed)) next[key] = parsed;
  });
  return sanitizeTransform(next);
}

function applyTransformToPosition(position?: number[]): number[] {
  const base = position ?? [0, 0, 0];
  return [
    Number(base[0] ?? 0) + bimTransform.east,
    Number(base[1] ?? 0) + bimTransform.up,
    Number(base[2] ?? 0) + bimTransform.north,
  ];
}

function modelScale(): number[] {
  return [bimTransform.scale, bimTransform.scale, bimTransform.scale];
}

function modelRotation(): number[] {
  return [0, bimTransform.heading, 0];
}

function setAssetSelection(assetId: string): void {
  const asset = visibleAssets.find((item) => item.id === assetId) ?? visibleAssets[0];
  if (!asset) return;
  assetSelect.value = asset.id;
  assetSummary.innerHTML = `
    <strong>${escapeHtml(asset.label)}</strong>
    <span>${escapeHtml(asset.sourceLabel)} · ${escapeHtml(asset.sizeLabel)}${asset.localOnly ? " · 仅本机调试" : ""}</span>
  `;
}

function hideCesiumCredits(gisViewer: CesiumViewer): void {
  const creditContainer = gisViewer.cesiumWidget.creditContainer as HTMLElement | undefined;
  if (creditContainer) creditContainer.style.display = "none";
}

function ensureOpenStreetMapLayer(gisViewer: CesiumViewer): void {
  gisViewer.imageryLayers.removeAll();
  gisViewer.imageryLayers.addImageryProvider(
    new UrlTemplateImageryProvider({
      credit: "OpenStreetMap",
      maximumLevel: 18,
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    }),
  );
}

async function ensureWorldTerrainProvider(): Promise<void> {
  if (!cesiumViewer) return;
  if (!worldTerrainProviderInit) {
    worldTerrainProviderInit = createWorldTerrainAsync({
      requestVertexNormals: true,
      requestWaterMask: false,
    });
  }
  try {
    cesiumViewer.terrainProvider = await worldTerrainProviderInit;
    worldTerrainProviderReady = true;
    worldTerrainProviderError = undefined;
  } catch (error) {
    worldTerrainProviderReady = false;
    worldTerrainProviderError = error instanceof Error ? error.message : String(error);
    cesiumViewer.terrainProvider = new EllipsoidTerrainProvider();
  }
}

function describeGisDisplayMode(): string {
  if (activeGisDisplayMode === "online-terrain") {
    return worldTerrainProviderReady
      ? "在线地形融合实验已启用：Cesium 使用 World Terrain + OSM 影像，xeokit 顶层保留 XKT/IFC 构件级选择。"
      : `在线地形未启用：${worldTerrainProviderError || "Cesium ion token 缺失或网络不可用"}。已回退到椭球地形。可在本机 localStorage 设置 CESIUM_ION_TOKEN。`;
  }
  if (activeGisDisplayMode === "map") {
    return "影像+地球融合实验已启用：Cesium 使用 OSM 影像和椭球地形，用于观察 BIM 与地图底座的尺度、方向和漂浮问题。";
  }
  return mountainTilesetLoaded
    ? "山地 3D Tiles 融合实验已启用：Cesium 底层显示本地山体瓦片，xeokit 顶层保留 XKT/IFC 构件级选择。"
    : "山地 3D Tiles 尚未加载成功：当前只能验证 xeokit 模型与 Cesium 双画布叠加能力。";
}

async function applyGisDisplayMode(): Promise<void> {
  if (!cesiumViewer) return;
  const showMap = activeGisDisplayMode === "map";

  if (activeGisDisplayMode === "online-terrain") {
    if (mountainTileset) mountainTileset.show = false;
    cesiumViewer.scene.globe.show = true;
    ensureOpenStreetMapLayer(cesiumViewer);
    await ensureWorldTerrainProvider();
    cesiumViewer.scene.backgroundColor = Color.fromCssColorString("#06111d");
  } else if (showMap) {
    if (mountainTileset) mountainTileset.show = false;
    cesiumViewer.scene.globe.show = true;
    cesiumViewer.terrainProvider = new EllipsoidTerrainProvider();
    ensureOpenStreetMapLayer(cesiumViewer);
    cesiumViewer.scene.backgroundColor = Color.fromCssColorString("#06111d");
  } else {
    if (mountainTileset) mountainTileset.show = true;
    cesiumViewer.scene.globe.show = false;
    cesiumViewer.terrainProvider = new EllipsoidTerrainProvider();
    cesiumViewer.imageryLayers.removeAll();
    cesiumViewer.scene.backgroundColor = Color.fromCssColorString("#020a12");
  }
  document.body.classList.toggle("gis-map-enabled", showMap || activeGisDisplayMode === "online-terrain");
  document.querySelectorAll<HTMLButtonElement>("[data-gis-display]").forEach((button) => {
    button.classList.toggle("active", button.dataset.gisDisplay === activeGisDisplayMode);
  });
  fusionSummary.textContent = describeGisDisplayMode();
}

function xeokitPointToEnu(point: ArrayLike<number>): Cartesian3 {
  return new Cartesian3(Number(point[0] ?? 0), Number(point[2] ?? 0), Number(point[1] ?? 0));
}

function xeokitPointToWorld(point: ArrayLike<number>): Cartesian3 {
  if (!localFrame) {
    localFrame = Transforms.eastNorthUpToFixedFrame(
      Cartesian3.fromDegrees(fusionOrigin.longitude, fusionOrigin.latitude, fusionOrigin.height),
    );
  }
  return Matrix4.multiplyByPoint(localFrame, xeokitPointToEnu(point), new Cartesian3());
}

function xeokitDirectionToWorld(direction: ArrayLike<number>): Cartesian3 {
  if (!localFrame) {
    localFrame = Transforms.eastNorthUpToFixedFrame(
      Cartesian3.fromDegrees(fusionOrigin.longitude, fusionOrigin.latitude, fusionOrigin.height),
    );
  }
  return Matrix4.multiplyByPointAsVector(localFrame, xeokitPointToEnu(direction), new Cartesian3());
}

async function initializeCesiumViewer(): Promise<CesiumViewer> {
  if (cesiumViewer) return cesiumViewer;
  if (cesiumInit) return cesiumInit;

  cesiumInit = (async () => {
    fusionSummary.textContent = "正在初始化 Cesium：加载开放影像、椭球地形和本地山地 3D Tiles。";
    const gisViewer = new CesiumViewer(cesiumRoot, {
      animation: false,
      baseLayer: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      navigationHelpButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      skyBox: false,
      timeline: false,
      terrainProvider: new EllipsoidTerrainProvider(),
      useBrowserRecommendedResolution: false,
    });

    gisViewer.scene.globe.show = false;
    gisViewer.scene.globe.baseColor = Color.fromCssColorString("#102129");
    gisViewer.scene.globe.enableLighting = false;
    gisViewer.scene.backgroundColor = Color.fromCssColorString("#06111d");
    gisViewer.scene.highDynamicRange = false;
    gisViewer.scene.fog.enabled = false;
    gisViewer.scene.light = new DirectionalLight({
      color: Color.WHITE,
      direction: Cartesian3.normalize(new Cartesian3(0.35, 0.58, -0.74), new Cartesian3()),
      intensity: 2.4,
    });
    gisViewer.resolutionScale = 1;
    hideCesiumCredits(gisViewer);

    gisViewer.entities.add({
      id: "fusion-anchor-zone",
      rectangle: {
        coordinates: Rectangle.fromDegrees(106.585, 26.488, 106.615, 26.512),
        fill: true,
        material: Color.fromCssColorString("#1fd6ff").withAlpha(0.12),
        outline: true,
        outlineColor: Color.fromCssColorString("#42e8ff").withAlpha(0.62),
      },
    });

    try {
      const mountain = await Cesium3DTileset.fromUrl(localMountainTilesetUrl);
      mountain.maximumScreenSpaceError = 2;
      gisViewer.scene.primitives.add(mountain);
      mountainTileset = mountain;
      mountainTilesetLoaded = true;
      fusionSummary.textContent =
        "山地融合实验已启用：Cesium 底层加载本地山地 3D Tiles，xeokit 顶层保留 XKT/IFC 构件选择；相机由 xeokit 同步到 Cesium。";
    } catch (error) {
      mountainTilesetLoaded = false;
      fusionSummary.textContent = `融合实验已启用，但本地山地 3D Tiles 未加载：${error instanceof Error ? error.message : String(error)}。当前只能验证双画布和锚定范围。`;
    }

    cesiumViewer = gisViewer;
    await applyGisDisplayMode();
    return gisViewer;
  })();

  return cesiumInit;
}

function syncCesiumCamera(): void {
  if (!cesiumViewer || activeFusionMode !== "gis-bim") return;
  const eye = xeokitPointToWorld(viewer.camera.eye as ArrayLike<number>);
  const look = xeokitPointToWorld(viewer.camera.look as ArrayLike<number>);
  const up = Cartesian3.normalize(
    xeokitDirectionToWorld(viewer.camera.up as ArrayLike<number>),
    new Cartesian3(),
  );
  const direction = Cartesian3.normalize(Cartesian3.subtract(look, eye, new Cartesian3()), new Cartesian3());

  if (!Number.isFinite(direction.x) || !Number.isFinite(direction.y) || !Number.isFinite(direction.z)) return;

  cesiumViewer.camera.setView({
    destination: eye,
    orientation: {
      direction,
      up,
    },
  });
}

function stopCesiumCameraSync(): void {
  if (cesiumCameraSyncFrame !== undefined) {
    window.cancelAnimationFrame(cesiumCameraSyncFrame);
    cesiumCameraSyncFrame = undefined;
  }
}

function startCesiumCameraSync(): void {
  stopCesiumCameraSync();
  const sync = () => {
    syncCesiumCamera();
    cesiumCameraSyncFrame = window.requestAnimationFrame(sync);
  };
  sync();
}

async function setFusionMode(mode: FusionMode): Promise<void> {
  activeFusionMode = mode;
  document.body.classList.toggle("fusion-enabled", mode === "gis-bim");
  document.querySelectorAll<HTMLButtonElement>("[data-fusion-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.fusionMode === mode);
  });

  if (mode === "gis-bim") {
    await initializeCesiumViewer();
    await applyGisDisplayMode();
    startCesiumCameraSync();
    setStatus(
      activeGisDisplayMode === "online-terrain"
        ? "在线地形 + BIM 实验已开启"
        : activeGisDisplayMode === "map"
          ? "影像地球 + BIM 实验已开启"
          : "山地 3D Tiles + BIM 实验已开启",
      activeGisDisplayMode === "online-terrain"
        ? worldTerrainProviderReady
          ? "底层 Cesium 使用在线地形和影像，顶层 xeokit 负责 XKT/IFC 构件级交互。"
          : `在线地形不可用，已回退到椭球地形：${worldTerrainProviderError || "请配置 CESIUM_ION_TOKEN。"}`
        : mountainTilesetLoaded
        ? "底层 Cesium 显示本地山地 3D Tiles，顶层 xeokit 负责 XKT/IFC 构件级交互。"
        : "Cesium 已启动，但山地 3D Tiles 未加载成功，只能验证双画布叠加。",
    );
    return;
  }

  stopCesiumCameraSync();
  fusionSummary.textContent =
    "Cesium 未启用。开启融合实验后，底层优先显示本地山地 3D Tiles，顶层保留 xeokit 构件级选择。";
}

function describeStats(stats: LoaderStats): string {
  const parts = [
    typeof stats.numMetaObjects === "number" ? `元对象 ${stats.numMetaObjects}` : "",
    typeof stats.numPropertySets === "number" ? `属性集 ${stats.numPropertySets}` : "",
    typeof stats.numTriangles === "number" ? `三角面 ${stats.numTriangles}` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}

function getObjectIds(): string[] {
  return Object.keys(viewer.scene.objects);
}

async function getIfcLoader(): Promise<WebIFCLoaderPlugin> {
  if (ifcLoader) return ifcLoader;
  if (!ifcLoaderInit) {
    ifcLoaderInit = (async () => {
      setStatus("正在初始化 IFC 直读引擎", "加载 web-ifc wasm，本模式用于诊断源 IFC 语义层级。");
      const ifcAPI = new WebIFC.IfcAPI();
      ifcAPI.SetWasmPath(appAssetUrl("/external/bim/web-ifc/"));
      await ifcAPI.Init();
      ifcLoader = new WebIFCLoaderPlugin(viewer, {
        WebIFC,
        IfcAPI: ifcAPI,
        excludeTypes: ["IfcSpace"],
      });
      return ifcLoader;
    })();
  }
  return ifcLoaderInit;
}

function clearModel(): void {
  currentModels.forEach((model) => model.destroy?.());
  currentModels = [];
  selectedObjectId = undefined;
  setMetric(objectCount, "--");
  setMetric(typeCount, "--");
  setMetric(selection, "未选择");
  objectList.innerHTML = "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fitToObjects(objectIds: string[], animated: boolean): void {
  if (objectIds.length === 0) return;
  const aabb = viewer.scene.getAABB(objectIds);
  const target = { aabb, fit: true, fitFOV: 42, duration: animated ? 0.35 : 0 };
  if (animated) {
    viewer.cameraFlight.flyTo(target);
  } else {
    viewer.cameraFlight.jumpTo(target);
  }
  syncCesiumCamera();
}

function refreshObjectList(): void {
  const objectIds = getObjectIds();
  const metaObjects = Object.values(viewer.metaScene.metaObjects);
  const types = new Set(metaObjects.map((item) => item.type).filter(Boolean));

  setMetric(objectCount, String(objectIds.length));
  setMetric(typeCount, String(types.size || "--"));

  objectList.innerHTML = objectIds
    .slice(0, 80)
    .map((objectId) => {
      const meta = viewer.metaScene.metaObjects[objectId];
      const label = meta?.name || meta?.type || objectId;
      const type = meta?.type || "Object";
      return `
        <button type="button" data-object-id="${escapeHtml(objectId)}">
          <strong>${escapeHtml(label)}</strong>
          <small>${escapeHtml(type)}</small>
        </button>
      `;
    })
    .join("");

  objectList.querySelectorAll<HTMLButtonElement>("[data-object-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const objectId = button.dataset.objectId;
      if (objectId) selectObject(objectId);
    });
  });
}

function selectObject(objectId: string): void {
  const previous = viewer.scene.selectedObjectIds;
  if (previous.length > 0) viewer.scene.setObjectsSelected(previous, false);
  viewer.scene.setObjectsSelected([objectId], true);
  viewer.scene.setObjectsXRayed(getObjectIds(), true);
  viewer.scene.setObjectsXRayed([objectId], false);
  selectedObjectId = objectId;

  const meta = viewer.metaScene.metaObjects[objectId];
  const label = meta?.name || meta?.type || objectId;
  setMetric(selection, label);
  setStatus("已选择 BIM 对象", label);
  fitToObjects([objectId], true);
}

function getAssetItems(asset: BimAsset): BimAssetItem[] {
  if (asset.items) return asset.items;
  if (!asset.url) return [];
  return [
    {
      id: asset.id,
      label: asset.label,
      url: asset.url,
    },
  ];
}

async function reloadCurrentAssetWithTransform(title: string): Promise<void> {
  bimTransform = readCalibrationInputs();
  syncCalibrationInputs();
  setStatus(title, `${formatTransform(bimTransform)}。正在重载当前资产。`);
  await loadAsset(assetSelect.value);
}

function getAabbCenter(aabb: ArrayLike<number>): number[] {
  return [
    (Number(aabb[0] ?? 0) + Number(aabb[3] ?? 0)) / 2,
    (Number(aabb[1] ?? 0) + Number(aabb[4] ?? 0)) / 2,
    (Number(aabb[2] ?? 0) + Number(aabb[5] ?? 0)) / 2,
  ];
}

function formatPoint(point: ArrayLike<number>): string {
  return `X ${Number(point[0] ?? 0).toFixed(1)} / Y ${Number(point[1] ?? 0).toFixed(1)} / Z ${Number(point[2] ?? 0).toFixed(1)}`;
}

async function autoAlignLoadedModelToMountain(): Promise<void> {
  const objectIds = getObjectIds();
  if (objectIds.length === 0) {
    setStatus("无法自动配准", "当前没有已加载的 BIM 对象。");
    return;
  }

  syncCalibrationInputs();
  const center = getAabbCenter(viewer.scene.getAABB(objectIds));
  const nextTransform = sanitizeTransform({
    ...bimTransform,
    east: bimTransform.east + mountainCenterInXeokit.east - center[0],
    north: bimTransform.north + mountainCenterInXeokit.north - center[2],
    up: bimTransform.up + mountainCenterInXeokit.up - center[1],
  });

  bimTransform = nextTransform;
  syncCalibrationInputs();
  setStatus(
    "正在自动配准到山体中心附近",
    `当前 BIM 中心 ${formatPoint(center)}，目标 X 0.0 / Y -35.0 / Z 0.0。正在重载当前资产。`,
  );
  await loadAsset(assetSelect.value);
}

async function waitForModelLoaded(model: XeokitModel, timeoutMs: number, url: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(`加载超时：${url}`)), timeoutMs);
    model.on?.("loaded", () => {
      window.clearTimeout(timeout);
      resolve();
    });
    model.on?.("error", (error) => {
      window.clearTimeout(timeout);
      reject(error instanceof Error ? error : new Error(String(error)));
    });
  });
}

async function loadAsset(assetId: string): Promise<void> {
  if (loadingAssetId === assetId) return;
  const asset = visibleAssets.find((item) => item.id === assetId);
  if (!asset) return;

  loadingAssetId = assetId;
  clearModel();
  setAssetSelection(asset.id);

  const items = getAssetItems(asset);
  const loadedStats: string[] = [];

  for (const [index, item] of items.entries()) {
    const itemUrl = appAssetUrl(item.url);
    setStatus(`正在加载 ${asset.label}`, `${index + 1}/${items.length} ${item.label} · ${itemUrl}`);

    const stats: LoaderStats = {};
    let model: XeokitModel;

    if (asset.format === "ifc") {
      const loader = await getIfcLoader();
      setStatus(`正在直读 ${item.label}`, "IFC 直读会保留源语义，但浏览器解析明显更慢。");
      model = loader.load({
        id: item.id,
        src: itemUrl,
        edges: true,
        loadMetadata: true,
        position: applyTransformToPosition(item.position),
        rotation: modelRotation(),
        scale: modelScale(),
        saoEnabled: true,
        backfaces: true,
        globalizeObjectIds: true,
        stats: stats as never,
      }) as XeokitModel;
    } else {
      model = xktLoader.load({
        id: item.id,
        src: itemUrl,
        edges: asset.id === "wind-turbines-xkt",
        position: applyTransformToPosition(item.position),
        rotation: modelRotation(),
        scale: modelScale(),
        saoEnabled: true,
        globalizeObjectIds: true,
      }) as XeokitModel;
    }

    currentModels.push(model);
    await waitForModelLoaded(model, asset.timeoutMs, itemUrl);

    const statsDetail = describeStats(stats);
    if (statsDetail) loadedStats.push(`${item.label}: ${statsDetail}`);
  }

  loadingAssetId = undefined;
  refreshObjectList();
  fitToObjects(getObjectIds(), false);
  setStatus(
    `${asset.label} 已加载`,
    `${loadedStats.join("；") || `已加载 ${items.length} 个模型，可以点击模型或对象列表验证构件级选择。`} 当前配准：${formatTransform(bimTransform)}。`,
  );
}

function handleAction(action: string): void {
  const objectIds = getObjectIds();
  if (objectIds.length === 0) return;

  if (action === "fit") {
    fitToObjects(objectIds, true);
    return;
  }
  if (action === "xray") {
    viewer.scene.setObjectsXRayed(objectIds, true);
    if (selectedObjectId) viewer.scene.setObjectsXRayed([selectedObjectId], false);
    setStatus("已开启半透明", "用于验证外壳遮挡和对象选择能力。");
    return;
  }
  if (action === "hide" && selectedObjectId) {
    viewer.scene.setObjectsVisible([selectedObjectId], false);
    setStatus("已隐藏选中对象", "用于检查对象级显示控制。");
    return;
  }
  if (action === "reset") {
    viewer.scene.setObjectsVisible(objectIds, true);
    viewer.scene.setObjectsXRayed(objectIds, false);
    viewer.scene.setObjectsSelected(objectIds, false);
    selectedObjectId = undefined;
    setMetric(selection, "未选择");
    fitToObjects(objectIds, true);
    setStatus("已复位显示", "全部对象恢复可见。");
  }
}

assetSelect.addEventListener("change", () => {
  setAssetSelection(assetSelect.value);
});

requireElement<HTMLButtonElement>("[data-load-selected]").addEventListener("click", () => {
  void loadAsset(assetSelect.value).catch((error: Error) => {
    loadingAssetId = undefined;
    setStatus("加载失败", error.message);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    handleAction(button.dataset.action ?? "");
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-fusion-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.fusionMode === "gis-bim" ? "gis-bim" : "bim";
    void setFusionMode(mode);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-gis-display]").forEach((button) => {
  button.addEventListener("click", () => {
    activeGisDisplayMode =
      button.dataset.gisDisplay === "map"
        ? "map"
        : button.dataset.gisDisplay === "online-terrain"
          ? "online-terrain"
          : "mountain";
    void (async () => {
      await applyGisDisplayMode();
      syncCesiumCamera();
      if (activeFusionMode !== "gis-bim") return;
      setStatus(
        activeGisDisplayMode === "map"
          ? "已切换到影像+地球"
          : activeGisDisplayMode === "online-terrain"
            ? "已切换到 Cesium 在线地形"
            : "已切换到只看山体",
        activeGisDisplayMode === "map"
          ? "用于观察真实地图背景下的漂浮、遮挡和尺度问题。"
          : activeGisDisplayMode === "online-terrain"
            ? worldTerrainProviderReady
              ? "用于验证 XKT/IFC 在 Cesium World Terrain + 影像底座上的空间贴合度。"
              : `在线地形不可用，已回退到椭球地形：${worldTerrainProviderError || "请配置 CESIUM_ION_TOKEN。"}`
            : "用于排除影像和地球干扰，单独判断山地 3D Tiles 与 XKT/IFC 的贴合度。",
      );
    })();
  });
});

calibrationInputs.forEach((input) => {
  input.addEventListener("input", () => {
    calibrationReadout.textContent = formatTransform(readCalibrationInputs());
  });
  input.addEventListener("change", () => {
    calibrationReadout.textContent = formatTransform(readCalibrationInputs());
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-calibration-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.calibrationAction;
    if (action === "auto-align") {
      void autoAlignLoadedModelToMountain().catch((error: Error) => {
        loadingAssetId = undefined;
        setStatus("自动配准失败", error.message);
      });
      return;
    }
    if (action === "near-mountain") {
      bimTransform = { ...mountainNearBimTransform };
      syncCalibrationInputs();
      void reloadCurrentAssetWithTransform("已切换到靠近山体预设").catch((error: Error) => {
        loadingAssetId = undefined;
        setStatus("配准重载失败", error.message);
      });
      return;
    }
    if (action === "reset") {
      bimTransform = { ...defaultBimTransform };
      syncCalibrationInputs();
      void reloadCurrentAssetWithTransform("已归零 BIM 偏移").catch((error: Error) => {
        loadingAssetId = undefined;
        setStatus("配准重载失败", error.message);
      });
      return;
    }
    void reloadCurrentAssetWithTransform("正在应用 BIM 配准参数").catch((error: Error) => {
      loadingAssetId = undefined;
      setStatus("配准重载失败", error.message);
    });
  });
});

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const hit = viewer.scene.pick({
    canvasPos: [event.clientX - rect.left, event.clientY - rect.top],
  }) as XeokitHit | null;
  const objectId = hit?.entity?.id;
  if (objectId !== undefined) selectObject(String(objectId));
});

const requestedAssetId = new URLSearchParams(window.location.search).get("asset");
const searchParams = new URLSearchParams(window.location.search);
const requestedFusionMode = searchParams.get("fusion") === "1" ? "gis-bim" : "bim";
activeGisDisplayMode =
  searchParams.get("gis") === "map"
    ? "map"
    : searchParams.get("gis") === "online-terrain"
      ? "online-terrain"
      : "mountain";
const initialAssetId =
  visibleAssets.find((asset) => asset.id === requestedAssetId)?.id ?? visibleAssets[0]?.id ?? "wind-turbines-xkt";

setAssetSelection(initialAssetId);
syncCalibrationInputs();
void setFusionMode(requestedFusionMode);
void loadAsset(initialAssetId).catch((error: Error) => {
  loadingAssetId = undefined;
  setStatus("加载失败", `${error.message}。请先运行 npm run assets:ifc-xkt 和 npm run assets:ifc-publish。`);
});
