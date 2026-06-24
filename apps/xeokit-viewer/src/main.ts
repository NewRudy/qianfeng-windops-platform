import { Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";
import "./styles.css";

type AssetId = "factory-masterplan" | "wind-turbines";

type BimAsset = {
  id: AssetId;
  label: string;
  sizeLabel: string;
  sourceLabel: string;
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

const assets: BimAsset[] = [
  {
    id: "wind-turbines",
    label: "风机.ifc / 多风机模型",
    sizeLabel: "60KB XKT",
    sourceLabel: "9 个可选对象",
    url: "/external/bim/xkt/wind-turbines.xkt",
  },
  {
    id: "factory-masterplan",
    label: "厂房总图.ifc / 厂房总图",
    sizeLabel: "17MB XKT",
    sourceLabel: "大体量单对象",
    url: "/external/bim/xkt/factory-masterplan.xkt",
  },
];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

app.innerHTML = `
  <section class="viewer-shell">
    <header class="viewer-header">
      <div>
        <span>xeokit XKT BIM 数据验证</span>
        <h1>黔风智维 IFC 转 XKT 查看器</h1>
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
          ${assets
            .map(
              (asset) => `
                <button class="asset-button" type="button" data-asset-id="${asset.id}">
                  <strong>${asset.label}</strong>
                  <small>${asset.sourceLabel} · ${asset.sizeLabel}</small>
                </button>
              `,
            )
            .join("")}
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
          <span>这是独立 xeokit 验证页，用来确认 XKT 能加载、对象能选择、外壳能隐藏。GIS+BIM 正式融合后续再单独设计，不污染原平台。</span>
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

const viewer = new Viewer({
  canvasElement: canvas,
  transparent: true,
  antialias: true,
  saoEnabled: true,
  pbrEnabled: false,
  readableGeometryEnabled: true,
});
const loader = new XKTLoaderPlugin(viewer);

let currentModel: XeokitModel | undefined;
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

function getObjectIds(): string[] {
  return Object.keys(viewer.scene.objects);
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
  const asset = assets.find((item) => item.id === assetId);
  if (!asset) return;

  loadingAssetId = assetId;
  clearModel();
  setStatus(`正在加载 ${asset.label}`, asset.url);
  document.querySelectorAll<HTMLButtonElement>("[data-asset-id]").forEach((button) => {
    button.classList.toggle("active", button.dataset.assetId === assetId);
  });

  const model = loader.load({
    id: asset.id,
    src: asset.url,
    edges: asset.id === "wind-turbines",
    saoEnabled: true,
    globalizeObjectIds: true,
  }) as XeokitModel;
  currentModel = model;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(`加载超时：${asset.url}`)), 30000);
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
  setStatus(`${asset.label} 已加载`, "可以点击模型或对象列表验证构件级选择。");
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

document.querySelectorAll<HTMLButtonElement>("[data-asset-id]").forEach((button) => {
  button.addEventListener("click", () => {
    void loadAsset(button.dataset.assetId as AssetId).catch((error: Error) => {
      loadingAssetId = undefined;
      setStatus("加载失败", error.message);
    });
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

void loadAsset("wind-turbines").catch((error: Error) => {
  loadingAssetId = undefined;
  setStatus("加载失败", `${error.message}。请先运行 npm run assets:ifc-xkt。`);
});
