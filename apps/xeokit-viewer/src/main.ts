import { Viewer, WebIFCLoaderPlugin, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";
import * as WebIFC from "web-ifc";
import "./styles.css";

type AssetId =
  | "factory-masterplan-ifc"
  | "factory-masterplan-xkt"
  | "wind-turbines-ifc"
  | "wind-turbines-xkt";

type AssetFormat = "ifc" | "xkt";

type BimAsset = {
  id: AssetId;
  format: AssetFormat;
  label: string;
  localOnly?: boolean;
  sizeLabel: string;
  sourceLabel: string;
  timeoutMs: number;
  url: string;
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
          <div class="asset-summary" data-asset-summary></div>
          <div class="asset-cards">
          ${visibleAssets
            .map(
              (asset) => `
                <article class="asset-card" data-asset-id="${asset.id}">
                  <strong>${asset.label}</strong>
                  <small><em>${asset.format.toUpperCase()}</em>${asset.sourceLabel} · ${asset.sizeLabel}</small>
                </article>
              `,
            )
            .join("")}
          </div>
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

const viewer = new Viewer({
  canvasElement: canvas,
  transparent: true,
  antialias: true,
  saoEnabled: true,
  pbrEnabled: false,
  readableGeometryEnabled: true,
});
const xktLoader = new XKTLoaderPlugin(viewer);

let currentModel: XeokitModel | undefined;
let ifcLoader: WebIFCLoaderPlugin | undefined;
let ifcLoaderInit: Promise<WebIFCLoaderPlugin> | undefined;
let selectedObjectId: string | undefined;
let loadingAssetId: AssetId | undefined;

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

function setAssetSelection(assetId: AssetId): void {
  const asset = visibleAssets.find((item) => item.id === assetId) ?? visibleAssets[0];
  if (!asset) return;
  assetSelect.value = asset.id;
  assetSummary.innerHTML = `
    <strong>${escapeHtml(asset.label)}</strong>
    <span>${escapeHtml(asset.sourceLabel)} · ${escapeHtml(asset.sizeLabel)}${asset.localOnly ? " · 仅本机调试" : ""}</span>
  `;
  document.querySelectorAll<HTMLElement>("[data-asset-id]").forEach((item) => {
    item.classList.toggle("active", item.dataset.assetId === asset.id);
  });
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
  currentModel?.destroy?.();
  currentModel = undefined;
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

async function loadAsset(assetId: AssetId): Promise<void> {
  if (loadingAssetId === assetId) return;
  const asset = visibleAssets.find((item) => item.id === assetId);
  if (!asset) return;

  loadingAssetId = assetId;
  clearModel();
  setAssetSelection(asset.id);
  const assetUrl = appAssetUrl(asset.url);
  setStatus(`正在加载 ${asset.label}`, assetUrl);

  const stats: LoaderStats = {};
  let model: XeokitModel;

  if (asset.format === "ifc") {
    const loader = await getIfcLoader();
    setStatus(`正在直读 ${asset.label}`, `${assetUrl}。大 IFC 首次解析可能需要几分钟。`);
    model = loader.load({
      id: asset.id,
      src: assetUrl,
      edges: true,
      loadMetadata: true,
      saoEnabled: true,
      backfaces: true,
      globalizeObjectIds: true,
      stats: stats as never,
    }) as XeokitModel;
  } else {
    model = xktLoader.load({
      id: asset.id,
      src: assetUrl,
      edges: asset.id === "wind-turbines-xkt",
      saoEnabled: true,
      globalizeObjectIds: true,
    }) as XeokitModel;
  }
  currentModel = model;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(`加载超时：${assetUrl}`)), asset.timeoutMs);
    model.on?.("loaded", () => {
      window.clearTimeout(timeout);
      resolve();
    });
    model.on?.("error", (error) => {
      window.clearTimeout(timeout);
      reject(error instanceof Error ? error : new Error(String(error)));
    });
  });

  loadingAssetId = undefined;
  refreshObjectList();
  fitToObjects(getObjectIds(), false);
  const statsDetail = describeStats(stats);
  setStatus(
    `${asset.label} 已加载`,
    statsDetail || "可以点击模型或对象列表验证构件级选择。",
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

document.querySelectorAll<HTMLElement>("[data-asset-id]").forEach((card) => {
  card.addEventListener("click", () => {
    const assetId = card.dataset.assetId as AssetId | undefined;
    if (!assetId) return;
    setAssetSelection(assetId);
  });
});

assetSelect.addEventListener("change", () => {
  setAssetSelection(assetSelect.value as AssetId);
});

requireElement<HTMLButtonElement>("[data-load-selected]").addEventListener("click", () => {
  void loadAsset(assetSelect.value as AssetId).catch((error: Error) => {
    loadingAssetId = undefined;
    setStatus("加载失败", error.message);
  });
});

document.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    handleAction(button.dataset.action ?? "");
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

setAssetSelection((visibleAssets[0]?.id ?? "wind-turbines-xkt") as AssetId);
void loadAsset((visibleAssets[0]?.id ?? "wind-turbines-xkt") as AssetId).catch((error: Error) => {
  loadingAssetId = undefined;
  setStatus("加载失败", `${error.message}。请先运行 npm run assets:ifc-xkt 和 npm run assets:ifc-publish。`);
});
