import { Viewer, XKTLoaderPlugin } from "@xeokit/xeokit-sdk";

type XktAssetKey = "factory-masterplan" | "wind-turbines";

type XktAsset = {
  id: XktAssetKey;
  label: string;
  publicUrl: string;
  role: string;
  sizeLabel: string;
};

const assets: Record<XktAssetKey, XktAsset> = {
  "wind-turbines": {
    id: "wind-turbines",
    label: "多风机 IFC / XKT",
    publicUrl: "/external/bim/xkt/wind-turbines.xkt",
    role: "风机资产映射",
    sizeLabel: "60KB XKT",
  },
  "factory-masterplan": {
    id: "factory-masterplan",
    label: "厂房总图 IFC / XKT",
    publicUrl: "/external/bim/xkt/factory-masterplan.xkt",
    role: "大型场站模型边界",
    sizeLabel: "17MB XKT",
  },
};

type XktBimAssetViewerOptions = {
  container: HTMLElement;
  onStatus?: (status: string) => void;
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

export class XktBimAssetViewer {
  private readonly container: HTMLElement;
  private readonly onStatus?: (status: string) => void;
  private canvas?: HTMLCanvasElement;
  private viewer?: Viewer;
  private loader?: XKTLoaderPlugin;
  private currentModel?: XeokitModel;
  private currentAsset?: XktAsset;
  private selectedObjectId?: string;
  private initialized = false;
  private loadingAssetId?: XktAssetKey;
  private resizeObserver?: ResizeObserver;

  constructor(options: XktBimAssetViewerOptions) {
    this.container = options.container;
    this.onStatus = options.onStatus;
  }

  initialize(): void {
    if (this.initialized) return;

    this.container.innerHTML = `
      <div class="xkt-viewer-shell">
        <canvas class="xkt-viewer-canvas" aria-label="真实 IFC 转换 XKT 模型"></canvas>
        <aside class="xkt-viewer-panel" aria-label="真实 BIM 数据资产">
          <header>
            <span>真实 BIM 数据</span>
            <strong data-xkt-title>等待加载 XKT</strong>
            <small data-xkt-status>IFC 已转换为 XKT，本地资产不进入 Git。</small>
          </header>
          <div class="xkt-asset-switch" aria-label="切换 BIM 资产">
            ${Object.values(assets)
              .map(
                (asset) => `
                  <button type="button" data-xkt-asset="${asset.id}">
                    <strong>${asset.label}</strong>
                    <small>${asset.role} · ${asset.sizeLabel}</small>
                  </button>
                `,
              )
              .join("")}
          </div>
          <dl class="xkt-stats">
            <div><dt>对象数</dt><dd data-xkt-objects>--</dd></div>
            <div><dt>类型数</dt><dd data-xkt-types>--</dd></div>
            <div><dt>当前选择</dt><dd data-xkt-selected>未选择</dd></div>
          </dl>
          <div class="xkt-actions" aria-label="BIM 对象操作">
            <button type="button" data-xkt-action="fit">适配视图</button>
            <button type="button" data-xkt-action="xray">半透明</button>
            <button type="button" data-xkt-action="hide">隐藏选中</button>
            <button type="button" data-xkt-action="reset">复位显示</button>
          </div>
          <section class="xkt-object-list" aria-label="BIM 构件列表">
            <strong>可选对象</strong>
            <div data-xkt-object-list></div>
          </section>
        </aside>
      </div>
    `;

    this.canvas = this.container.querySelector<HTMLCanvasElement>(".xkt-viewer-canvas") ?? undefined;
    if (!this.canvas) throw new Error("Missing XKT viewer canvas");

    this.viewer = new Viewer({
      canvasElement: this.canvas,
      transparent: true,
      antialias: true,
      saoEnabled: true,
      pbrEnabled: false,
      readableGeometryEnabled: true,
    });
    this.loader = new XKTLoaderPlugin(this.viewer);
    this.configureCamera();
    this.bindEvents();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    this.initialized = true;
  }

  async loadAsset(assetId: XktAssetKey = "wind-turbines"): Promise<void> {
    this.initialize();
    if (!this.viewer || !this.loader) return;
    if (this.loadingAssetId === assetId) return;

    const asset = assets[assetId];
    this.loadingAssetId = assetId;
    this.currentAsset = asset;
    this.setStatus(`正在加载 ${asset.label} ...`);
    this.setText("[data-xkt-title]", asset.label);
    this.markActiveAsset(assetId);
    this.clearModel();

    const model = this.loader.load({
      id: asset.id,
      src: asset.publicUrl,
      edges: asset.id === "wind-turbines",
      saoEnabled: true,
      globalizeObjectIds: true,
    }) as XeokitModel;

    this.currentModel = model;

    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error(`XKT 加载超时：${asset.publicUrl}`)), 30000);
      model.on?.("loaded", () => {
        window.clearTimeout(timeout);
        resolve();
      });
      model.on?.("error", (error) => {
        window.clearTimeout(timeout);
        reject(error instanceof Error ? error : new Error(String(error)));
      });
    })
      .then(() => {
        this.loadingAssetId = undefined;
        this.refreshStats();
        this.fitToVisibleObjects(false);
        this.setStatus(`${asset.label} 已加载，可点击模型或列表选择构件。`);
      })
      .catch((error: Error) => {
        this.loadingAssetId = undefined;
        this.setStatus(`XKT 加载失败：${error.message}`);
        throw error;
      });
  }

  resize(): void {
    if (!this.canvas || !this.viewer) return;
    const rect = this.container.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) return;
    this.canvas.style.width = `${Math.max(rect.width, 320)}px`;
    this.canvas.style.height = `${Math.max(rect.height, 240)}px`;
    this.viewer.scene.render(true);
  }

  destroy(): void {
    this.resizeObserver?.disconnect();
    this.clearModel();
    this.viewer?.destroy();
    this.initialized = false;
  }

  private configureCamera(): void {
    if (!this.viewer) return;
    this.viewer.camera.eye = [8, 5, 9];
    this.viewer.camera.look = [0, 0, 0];
    this.viewer.camera.up = [0, 1, 0];
    this.viewer.cameraFlight.duration = 0.35;
  }

  private bindEvents(): void {
    this.container.querySelectorAll<HTMLButtonElement>("[data-xkt-asset]").forEach((button) => {
      button.addEventListener("click", () => {
        const assetId = button.dataset.xktAsset as XktAssetKey | undefined;
        if (assetId) void this.loadAsset(assetId);
      });
    });

    this.container.querySelectorAll<HTMLButtonElement>("[data-xkt-action]").forEach((button) => {
      button.addEventListener("click", () => {
        this.handleAction(button.dataset.xktAction ?? "");
      });
    });

    this.canvas?.addEventListener("click", (event) => {
      if (!this.viewer || !this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      const hit = this.viewer.scene.pick({
        canvasPos: [event.clientX - rect.left, event.clientY - rect.top],
      }) as XeokitHit | null;
      const objectId = hit?.entity?.id;
      if (objectId !== undefined) this.selectObject(String(objectId));
    });
  }

  private handleAction(action: string): void {
    if (!this.viewer) return;
    const objectIds = this.getObjectIds();
    if (objectIds.length === 0) return;

    if (action === "fit") {
      this.fitToVisibleObjects(true);
      return;
    }
    if (action === "xray") {
      this.viewer.scene.setObjectsXRayed(objectIds, true);
      if (this.selectedObjectId) this.viewer.scene.setObjectsXRayed([this.selectedObjectId], false);
      this.setStatus("已将未选对象半透明，便于查看构件层级。");
      return;
    }
    if (action === "hide" && this.selectedObjectId) {
      this.viewer.scene.setObjectsVisible([this.selectedObjectId], false);
      this.setStatus("已隐藏当前选中对象，用于排查外壳遮挡。");
      return;
    }
    if (action === "reset") {
      this.viewer.scene.setObjectsVisible(objectIds, true);
      this.viewer.scene.setObjectsXRayed(objectIds, false);
      this.viewer.scene.setObjectsSelected(objectIds, false);
      this.selectedObjectId = undefined;
      this.setText("[data-xkt-selected]", "未选择");
      this.fitToVisibleObjects(true);
      this.setStatus("已恢复全部对象显示。");
    }
  }

  private clearModel(): void {
    this.currentModel?.destroy?.();
    this.currentModel = undefined;
    this.selectedObjectId = undefined;
    this.setText("[data-xkt-objects]", "--");
    this.setText("[data-xkt-types]", "--");
    this.setText("[data-xkt-selected]", "未选择");
    const list = this.container.querySelector<HTMLElement>("[data-xkt-object-list]");
    if (list) list.innerHTML = "";
  }

  private refreshStats(): void {
    if (!this.viewer) return;
    const objectIds = this.getObjectIds();
    const metaObjects = Object.values(this.viewer.metaScene.metaObjects);
    const types = new Set(metaObjects.map((item) => item.type).filter(Boolean));
    this.setText("[data-xkt-objects]", String(objectIds.length));
    this.setText("[data-xkt-types]", String(types.size || "--"));
    this.renderObjectList(objectIds.slice(0, 14));
  }

  private renderObjectList(objectIds: string[]): void {
    if (!this.viewer) return;
    const list = this.container.querySelector<HTMLElement>("[data-xkt-object-list]");
    if (!list) return;
    if (objectIds.length === 0) {
      list.innerHTML = "<small>当前 XKT 没有可独立选择对象。</small>";
      return;
    }
    list.innerHTML = objectIds
      .map((objectId) => {
        const meta = this.viewer?.metaScene.metaObjects[objectId];
        const label = meta?.name || meta?.type || objectId;
        const type = meta?.type || "Object";
        return `
          <button type="button" data-xkt-object="${objectId}">
            <strong>${this.escapeHtml(label)}</strong>
            <small>${this.escapeHtml(type)}</small>
          </button>
        `;
      })
      .join("");

    list.querySelectorAll<HTMLButtonElement>("[data-xkt-object]").forEach((button) => {
      button.addEventListener("click", () => {
        const objectId = button.dataset.xktObject;
        if (objectId) this.selectObject(objectId);
      });
    });
  }

  private selectObject(objectId: string): void {
    if (!this.viewer) return;
    const allSelected = this.viewer.scene.selectedObjectIds;
    if (allSelected.length > 0) this.viewer.scene.setObjectsSelected(allSelected, false);
    this.viewer.scene.setObjectsSelected([objectId], true);
    this.viewer.scene.setObjectsXRayed(this.getObjectIds(), true);
    this.viewer.scene.setObjectsXRayed([objectId], false);
    this.selectedObjectId = objectId;

    const meta = this.viewer.metaScene.metaObjects[objectId];
    const label = meta?.name || meta?.type || objectId;
    this.setText("[data-xkt-selected]", label);
    this.setStatus(`已选择 ${label}，可隐藏外壳或适配视图。`);
    this.fitToObjects([objectId], true);
  }

  private fitToVisibleObjects(animated: boolean): void {
    this.fitToObjects(this.getObjectIds(), animated);
  }

  private fitToObjects(objectIds: string[], animated: boolean): void {
    if (!this.viewer || objectIds.length === 0) return;
    const aabb = this.viewer.scene.getAABB(objectIds);
    const target = { aabb, fit: true, fitFOV: 42, duration: animated ? 0.35 : 0 };
    if (animated) {
      this.viewer.cameraFlight.flyTo(target);
      return;
    }
    this.viewer.cameraFlight.jumpTo(target);
  }

  private getObjectIds(): string[] {
    if (!this.viewer) return [];
    return Object.keys(this.viewer.scene.objects);
  }

  private markActiveAsset(assetId: XktAssetKey): void {
    this.container.querySelectorAll<HTMLButtonElement>("[data-xkt-asset]").forEach((button) => {
      button.classList.toggle("active", button.dataset.xktAsset === assetId);
    });
  }

  private setStatus(status: string): void {
    this.setText("[data-xkt-status]", status);
    this.onStatus?.(status);
  }

  private setText(selector: string, text: string): void {
    const target = this.container.querySelector<HTMLElement>(selector);
    if (target) target.textContent = text;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

export type { XktAssetKey };
