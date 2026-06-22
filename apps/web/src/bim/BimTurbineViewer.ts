import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const EQUIPMENT_MODEL_URL = "/models/first-version/equipment.glb";
const SKELETON_MODEL_URL = "/models/first-version/skeleton.glb";
const DRACO_DECODER_PATH = "/js/draco/gltf/";

type BimMesh = THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
type BimPartKey = "blade" | "hub" | "nacelle" | "tower" | "foundation" | "gearbox";

type BimTurbineViewerOptions = {
  container: HTMLElement;
  onPartPicked?: (partName: string) => void;
  onStatus?: (status: string) => void;
};

type ModelLayerOptions = {
  selectable: boolean;
};

type ObjectTransition = {
  duration: number;
  from: THREE.Vector3;
  start: number;
  to: THREE.Vector3;
};

const partMatchers: Record<BimPartKey, RegExp[]> = {
  blade: [/blade/i, /pitch/i, /叶片/, /变桨/],
  hub: [/hub/i, /rotor/i, /shaft/i, /主轴/, /轮毂/, /转子/],
  nacelle: [/nacelle/i, /generator/i, /机舱/, /发电/],
  tower: [/tower/i, /mast/i, /塔筒/],
  foundation: [/base/i, /foundation/i, /anchor/i, /基础/, /锚/],
  gearbox: [/gear/i, /box/i, /齿轮/],
};

function disposeMaterial(material: THREE.Material | THREE.Material[]): void {
  if (Array.isArray(material)) {
    material.forEach((item) => item.dispose());
    return;
  }

  material.dispose();
}

function disposeObject(object: THREE.Object3D): void {
  object.traverse((child) => {
    const mesh = child as BimMesh;

    if (!mesh.isMesh) return;
    mesh.geometry?.dispose();
    if (mesh.material) disposeMaterial(mesh.material);
  });
}

function materialList(material: THREE.Material | THREE.Material[] | undefined): THREE.Material[] {
  if (!material) return [];
  return Array.isArray(material) ? material : [material];
}

function setMeshOpacity(mesh: BimMesh, opacity: number): void {
  materialList(mesh.material).forEach((material) => {
    material.transparent = opacity < 1;
    material.opacity = opacity;
    material.depthWrite = opacity >= 0.78;
  });
}

function buildFallbackTurbine(): THREE.Group {
  const root = new THREE.Group();
  root.name = "fallback_first_version_turbine";

  const steel = new THREE.MeshStandardMaterial({ color: 0xdff9ff, roughness: 0.46, metalness: 0.22 });
  const cyanWire = new THREE.MeshStandardMaterial({
    color: 0x24daf6,
    opacity: 0.38,
    transparent: true,
    wireframe: true,
  });
  const warning = new THREE.MeshStandardMaterial({ color: 0xffb020, roughness: 0.5, metalness: 0.12 });

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 2.9, 32), steel);
  tower.name = "tower_fallback";
  tower.position.set(0, -0.9, 0);

  const nacelle = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.42, 0.42), cyanWire);
  nacelle.name = "nacelle_fallback";
  nacelle.position.set(0.72, 0.78, 0);

  const gearbox = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), warning);
  gearbox.name = "gearbox_fallback";
  gearbox.position.set(0.34, 0.78, 0);

  const generator = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.3, 0.3), steel);
  generator.name = "generator_fallback";
  generator.position.set(0.88, 0.78, 0);

  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 16), steel);
  hub.name = "hub_fallback";
  hub.position.set(-0.15, 0.78, 0);

  const blades = new THREE.Group();
  blades.name = "blade_group_fallback";
  const bladeMaterial = new THREE.MeshStandardMaterial({ color: 0xf5fdff, roughness: 0.52 });
  for (let index = 0; index < 3; index += 1) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.26, 0.045), bladeMaterial);
    blade.name = `blade_${index + 1}_fallback`;
    blade.geometry.translate(0, 0.62, 0);
    blade.rotation.z = (Math.PI * 2 * index) / 3;
    blades.add(blade);
  }
  blades.position.copy(hub.position);
  blades.rotation.y = Math.PI / 2;

  const foundation = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.12, 32), steel);
  foundation.name = "foundation_fallback";
  foundation.position.set(0, -2.38, 0);

  root.add(foundation, tower, nacelle, gearbox, generator, hub, blades);
  root.rotation.y = -0.72;
  root.position.y = 0.65;
  root.scale.setScalar(1.08);
  return root;
}

export class BimTurbineViewer {
  private readonly container: HTMLElement;
  private readonly onPartPicked?: (partName: string) => void;
  private readonly onStatus?: (status: string) => void;
  private readonly selectableMeshes: BimMesh[] = [];
  private readonly originalPositions = new Map<THREE.Object3D, THREE.Vector3>();
  private readonly selectedMaterials = new Map<BimMesh, THREE.Material | THREE.Material[]>();
  private readonly explodableObjects: THREE.Object3D[] = [];
  private readonly mixers: THREE.AnimationMixer[] = [];
  private readonly objectTransitions = new Map<THREE.Object3D, ObjectTransition>();

  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private controls?: OrbitControls;
  private rootGroup?: THREE.Group;
  private animationFrame = 0;
  private lastFrameAt = 0;
  private warningPulseActive = false;
  private warningStartedAt = 0;
  private warningTargets: BimMesh[] = [];
  private initPromise?: Promise<void>;
  private resizeObserver?: ResizeObserver;
  private disposed = false;

  constructor(options: BimTurbineViewerOptions) {
    this.container = options.container;
    this.onPartPicked = options.onPartPicked;
    this.onStatus = options.onStatus;
  }

  initialize(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.setup();
    }

    return this.initPromise;
  }

  resize(): void {
    if (!this.renderer || !this.camera) return;

    const width = Math.max(this.container.clientWidth, 640);
    const height = Math.max(this.container.clientHeight, 420);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  async decompose(): Promise<void> {
    await this.initialize();
    const targets = this.explodableObjects.length > 0 ? this.explodableObjects : this.rootGroup?.children ?? [];
    const targetPositions = new Map<THREE.Object3D, THREE.Vector3>();

    targets.forEach((object, index) => {
      const original = this.originalPositions.get(object) ?? object.position.clone();
      const localOffset = this.toLocalOffset(object, this.componentExplodeOffset(object, index));
      targetPositions.set(object, original.clone().add(localOffset));
    });

    this.transitionObjects(targetPositions, 760);
    this.setStatus("模型拆解中：内部设备构件已按传动链、冷却与控制链路展开");
  }

  async compose(): Promise<void> {
    await this.initialize();
    const targetPositions = new Map<THREE.Object3D, THREE.Vector3>();
    this.originalPositions.forEach((position, object) => {
      targetPositions.set(object, position.clone());
    });
    this.transitionObjects(targetPositions, 680);
    this.setStatus("模型复原中：回到整机 BIM 状态");
  }

  async focusPart(part: BimPartKey): Promise<void> {
    await this.initialize();
    const targets = this.findPartMeshes(part);
    this.applyHighlight(targets);
    this.focusCameraOnMeshes(targets, part);
    this.setStatus(targets.length > 0 ? `已定位 ${this.partLabel(part)} 构件` : `${this.partLabel(part)} 未匹配到明确构件，已保留整机视图`);
  }

  toggleWarning(): boolean {
    if (this.warningPulseActive) {
      this.stopWarning();
      return false;
    }

    this.startWarning();
    return true;
  }

  stopWarning(): void {
    this.warningPulseActive = false;
    this.applyWarningEmissive(false);
    this.setStatus("告警闪烁已停止");
  }

  dispose(): void {
    this.disposed = true;
    this.stopWarning();
    if (this.animationFrame) window.cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    this.renderer?.domElement.removeEventListener("pointerdown", this.pickPart);
    this.controls?.dispose();
    if (this.rootGroup) disposeObject(this.rootGroup);
    this.renderer?.dispose();
    this.container.replaceChildren();
  }

  private async setup(): Promise<void> {
    this.disposed = false;
    this.setStatus("正在加载整机 BIM 模型...");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020b15);
    scene.fog = new THREE.Fog(0x020b15, 5.4, 10.8);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 120);
    camera.position.set(2.15, 1.05, 2.45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.domElement.className = "bim-webgl";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    this.container.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0.1, 0.06, 0.02);
    controls.minDistance = 0.9;
    controls.maxDistance = 7.2;
    controls.update();

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;

    this.addLights(scene);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
    window.addEventListener("resize", () => this.resize(), { passive: true });
    renderer.domElement.addEventListener("pointerdown", this.pickPart);
    this.resize();
    this.animate();
    await this.loadModels(scene);
    this.resize();
  }

  private addLights(scene: THREE.Scene): void {
    scene.add(new THREE.AmbientLight(0x8bdfff, 0.88));

    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(4, 5, 6);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x24d9f6, 2.2);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const floor = new THREE.GridHelper(5.4, 28, 0x24d9f6, 0x0f3a57);
    floor.name = "bim_reference_grid";
    floor.position.y = -2.42;
    materialList(floor.material as THREE.Material).forEach((material) => {
      material.transparent = true;
      material.opacity = 0.15;
    });
    scene.add(floor);
  }

  private async loadModels(scene: THREE.Scene): Promise<void> {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath(DRACO_DECODER_PATH);
    loader.setDRACOLoader(draco);

    const group = new THREE.Group();
    group.name = "windops_first_version_bim_root";

    try {
      const [equipment, skeleton] = await Promise.all([
        loader.loadAsync(EQUIPMENT_MODEL_URL),
        loader.loadAsync(SKELETON_MODEL_URL),
      ]);

      const sourceGroup = new THREE.Group();
      sourceGroup.name = "first_version_aligned_layers";
      const skeletonModel = this.prepareModelLayer(skeleton.scene, "first_version_skeleton", { selectable: false });
      const equipmentModel = this.prepareModelLayer(equipment.scene, "first_version_equipment", { selectable: true });
      this.playAnimations(skeletonModel, skeleton.animations);
      this.playAnimations(equipmentModel, equipment.animations);
      skeletonModel.traverse((child) => {
        const mesh = child as BimMesh;
        if (mesh.isMesh) {
          disposeMaterial(mesh.material);
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0x19dcff,
            emissive: 0x0a82a4,
            emissiveIntensity: 0.52,
            opacity: 0.36,
            transparent: true,
            wireframe: true,
            depthWrite: false,
            roughness: 0.42,
          });
        }
      });
      sourceGroup.add(skeletonModel, equipmentModel);
      group.add(this.fitModelToFocus(sourceGroup, equipmentModel, 5.15));
      this.setStatus("整机透视：设备实体层与蓝色骨架层已对齐");
    } catch (error) {
      console.warn("[WindOps BIM] failed to load detailed BIM model, using fallback", error);
      const fallback = buildFallbackTurbine();
      this.prepareModelLayer(fallback, "first_version_equipment", { selectable: true });
      group.add(this.fitModelToStage(fallback, 4.2));
      this.setStatus("BIM 模型加载失败，已启用安全备用模型");
    } finally {
      draco.dispose();
    }

    group.rotation.set(-0.08, -0.38, 0.01);
    scene.add(group);
    this.rootGroup = group;
    this.prepareExplodeTargets(group);
  }

  private prepareModelLayer(model: THREE.Object3D, name: string, options: ModelLayerOptions): THREE.Object3D {
    model.name = name;
    model.traverse((child) => {
      const mesh = child as BimMesh;
      if (!mesh.isMesh) return;

      if (!mesh.name) mesh.name = `${name}_part`;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((material) => material.clone())
        : mesh.material.clone();
      mesh.userData.layerName = name;
      mesh.userData.selectable = options.selectable;
      if (options.selectable) this.selectableMeshes.push(mesh);
      setMeshOpacity(mesh, name === "first_version_skeleton" ? 0.34 : 0.92);
    });

    return model;
  }

  private fitModelToStage(model: THREE.Object3D, targetSize: number): THREE.Object3D {
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (Number.isFinite(maxDimension) && maxDimension > 0) {
      model.scale.multiplyScalar(targetSize / maxDimension);
      bounds.setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      model.position.sub(center);
    }

    return model;
  }

  private fitModelToFocus(model: THREE.Object3D, focusObject: THREE.Object3D, targetSize: number): THREE.Object3D {
    const focusBounds = new THREE.Box3().setFromObject(focusObject);
    const size = focusBounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (Number.isFinite(maxDimension) && maxDimension > 0) {
      const scale = targetSize / maxDimension;
      const center = focusBounds.getCenter(new THREE.Vector3());
      model.scale.multiplyScalar(scale);
      model.position.set(-center.x * scale - 0.12, -center.y * scale - 0.02, -center.z * scale);
    }

    return model;
  }

  private prepareExplodeTargets(root: THREE.Group): void {
    this.explodableObjects.length = 0;
    this.originalPositions.clear();
    const candidates = new Map<string, THREE.Object3D>();

    root.traverse((object) => {
      if (object === root) return;
      const mesh = object as BimMesh;
      const name = object.name || "";
      const isSelectableEquipment = mesh.isMesh && mesh.userData.selectable === true;
      const isFallbackGroup = /fallback/i.test(name);

      if (!isSelectableEquipment && !isFallbackGroup) return;
      if (!/(blade|pitch|hub|rotor|shaft|gear|generator|cool|cabinet|yaw|tower|foundation|叶|变桨|转子|主轴|齿轮|发电|油冷|风冷|冷|柜|偏航|塔筒|基础)/i.test(name)) return;
      candidates.set(name || object.uuid, object);
    });

    candidates.forEach((object) => {
      this.explodableObjects.push(object);
      this.originalPositions.set(object, object.position.clone());
    });
  }

  private animate = (): void => {
    if (this.disposed || !this.renderer || !this.scene || !this.camera) return;

    this.animationFrame = window.requestAnimationFrame(this.animate);
    const now = window.performance.now();
    const delta = this.lastFrameAt > 0 ? (now - this.lastFrameAt) / 1000 : 0;
    this.lastFrameAt = now;
    this.mixers.forEach((mixer) => mixer.update(delta));
    this.updateTransitions(now);
    this.updateWarningPulse(now);
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
  };

  private pickPart = (event: PointerEvent): void => {
    if (!this.renderer || !this.camera) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(pointer, this.camera);
    const picked = raycaster.intersectObjects(this.selectableMeshes, true)[0]?.object as BimMesh | undefined;

    if (!picked) return;
    this.applyHighlight([picked]);
    const partName = picked.name || picked.parent?.name || "BIM part";
    this.setStatus(`已选中构件：${partName}`);
    this.onPartPicked?.(partName);
  };

  private findPartMeshes(part: BimPartKey): BimMesh[] {
    const matchers = partMatchers[part];
    const matches = this.selectableMeshes.filter((mesh) => {
      const nameChain = [mesh.name, mesh.parent?.name, mesh.parent?.parent?.name].filter(Boolean).join(" ");
      return matchers.some((matcher) => matcher.test(nameChain));
    });

    if (matches.length > 0) return this.rankPartMeshes(part, matches).slice(0, part === "gearbox" ? 10 : 24);

    const bounds = this.meshBounds(this.selectableMeshes);

    if (part === "tower") return bounds.filter(({ center }) => center.y < -0.25).map(({ mesh }) => mesh).slice(0, 18);
    if (part === "foundation") return bounds.filter(({ center }) => center.y < -1.6).map(({ mesh }) => mesh).slice(0, 18);
    if (part === "blade") return bounds.filter(({ center }) => center.x < -0.35 || center.y > 0.65).map(({ mesh }) => mesh).slice(0, 18);
    if (part === "gearbox") {
      return this.rankPartMeshes(part, bounds.map(({ mesh }) => mesh)).slice(0, 10);
    }
    if (part === "nacelle") {
      return bounds.filter(({ center }) => center.y > 0.1 && center.x > -0.25).map(({ mesh }) => mesh).slice(0, 18);
    }
    return bounds.filter(({ center }) => center.y > 0.1 && center.x < 0.4).map(({ mesh }) => mesh).slice(0, 18);
  }

  private meshBounds(meshes: BimMesh[]): Array<{
    box: THREE.Box3;
    center: THREE.Vector3;
    mesh: BimMesh;
    size: THREE.Vector3;
  }> {
    return meshes.map((mesh) => {
      const box = new THREE.Box3().setFromObject(mesh);
      return {
        box,
        center: box.getCenter(new THREE.Vector3()),
        mesh,
        size: box.getSize(new THREE.Vector3()),
      };
    });
  }

  private rankPartMeshes(part: BimPartKey, meshes: BimMesh[]): BimMesh[] {
    if (part !== "gearbox") return meshes;

    const bounds = this.meshBounds(meshes);
    const whole = new THREE.Box3();
    bounds.forEach(({ box }) => whole.union(box));
    const wholeSize = whole.getSize(new THREE.Vector3());
    const wholeMin = whole.min;
    const target = new THREE.Vector3(0.47, 0.62, 0.5);

    return bounds
      .map((item) => {
        const normalized = new THREE.Vector3(
          wholeSize.x > 0 ? (item.center.x - wholeMin.x) / wholeSize.x : 0.5,
          wholeSize.y > 0 ? (item.center.y - wholeMin.y) / wholeSize.y : 0.5,
          wholeSize.z > 0 ? (item.center.z - wholeMin.z) / wholeSize.z : 0.5,
        );
        const volume = Math.max(0.0001, item.size.x * item.size.y * item.size.z);
        const nameChain = [item.mesh.name, item.mesh.parent?.name, item.mesh.parent?.parent?.name].filter(Boolean).join(" ");
        const nameBonus = /gearbox|gear box|gear_box|齿轮箱|齿轮/i.test(nameChain) ? -0.8 : 0;
        const shellPenalty = volume > 0.08 ? 0.45 : 0;
        return {
          mesh: item.mesh,
          score: normalized.distanceTo(target) + shellPenalty + nameBonus,
        };
      })
      .sort((a, b) => a.score - b.score)
      .map(({ mesh }) => mesh);
  }

  private focusCameraOnMeshes(meshes: BimMesh[], part: BimPartKey): void {
    if (!this.camera || !this.controls || meshes.length === 0) return;

    const bounds = new THREE.Box3();
    meshes.forEach((mesh) => bounds.union(new THREE.Box3().setFromObject(mesh)));
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const radius = Math.max(size.x, size.y, size.z, 0.32);
    const offsetByPart: Record<BimPartKey, THREE.Vector3> = {
      blade: new THREE.Vector3(1.1, 0.72, 1.18),
      foundation: new THREE.Vector3(1.05, 0.5, 1.18),
      gearbox: new THREE.Vector3(1.05, 0.36, 1.0),
      hub: new THREE.Vector3(1.0, 0.38, 0.95),
      nacelle: new THREE.Vector3(1.18, 0.42, 1.08),
      tower: new THREE.Vector3(1.08, 0.58, 1.12),
    };
    const offset = offsetByPart[part].clone().normalize().multiplyScalar(Math.max(1.05, radius * 2.9));
    this.controls.target.copy(center);
    this.camera.position.copy(center.clone().add(offset));
    this.camera.near = 0.01;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  private applyHighlight(meshes: BimMesh[]): void {
    this.selectedMaterials.forEach((material, mesh) => {
      mesh.material = material;
    });
    this.selectedMaterials.clear();

    meshes.forEach((mesh) => {
      this.selectedMaterials.set(mesh, mesh.material);
      mesh.material = new THREE.MeshStandardMaterial({
        color: 0xffb020,
        emissive: 0xff5a1f,
        emissiveIntensity: 0.42,
        opacity: 0.96,
        transparent: true,
        roughness: 0.38,
        metalness: 0.2,
      });
    });
  }

  private startWarning(): void {
    this.initialize()
      .then(() => {
        this.warningTargets = this.findPartMeshes("gearbox");
        if (this.warningTargets.length === 0) this.warningTargets = this.selectableMeshes.slice(0, 24);
        this.warningPulseActive = true;
        this.warningStartedAt = window.performance.now();
        this.setStatus("告警闪烁中：疑似部件进入橙色预警态");
      })
      .catch(() => undefined);
  }

  private applyWarningEmissive(enabled: boolean): void {
    const meshes = this.warningTargets.length > 0 ? this.warningTargets : this.findPartMeshes("gearbox");

    meshes.forEach((mesh) => {
      materialList(mesh.material).forEach((material) => {
        const maybeStandard = material as THREE.MeshStandardMaterial;
        if (!maybeStandard.emissive) return;
        maybeStandard.emissive.set(enabled ? 0xff5a1f : 0x000000);
        maybeStandard.emissiveIntensity = enabled ? 1.2 : 0;
      });
    });
  }

  private updateWarningPulse(now: number): void {
    if (!this.warningPulseActive) return;
    const intensity = 0.38 + ((Math.sin((now - this.warningStartedAt) / 118) + 1) / 2) * 1.5;

    this.warningTargets.forEach((mesh) => {
      materialList(mesh.material).forEach((material) => {
        const maybeStandard = material as THREE.MeshStandardMaterial;
        if (!maybeStandard.emissive) return;
        maybeStandard.emissive.set(0xff5a1f);
        maybeStandard.emissiveIntensity = intensity;
      });
    });
  }

  private playAnimations(model: THREE.Object3D, animations: THREE.AnimationClip[]): void {
    if (animations.length === 0) return;
    const mixer = new THREE.AnimationMixer(model);
    animations.forEach((clip) => mixer.clipAction(clip).play());
    this.mixers.push(mixer);
  }

  private componentExplodeOffset(object: THREE.Object3D, index: number): THREE.Vector3 {
    const name = object.name;
    if (/油冷|oil/i.test(name)) return new THREE.Vector3(0.08, 0.58, 0.22);
    if (/风冷|cool/i.test(name)) return new THREE.Vector3(0.26, 0.36, 0.24);
    if (/控制|柜|cabinet/i.test(name)) return new THREE.Vector3(0.48, 0.26, 0.22);
    if (/变桨|扇叶|blade|pitch/i.test(name)) return new THREE.Vector3(-0.72, 0.18, 0.34);
    if (/转子|rotor/i.test(name)) return new THREE.Vector3(-0.52, 0.1, 0.22);
    if (/主轴|shaft/i.test(name)) return new THREE.Vector3(-0.3, 0.08, 0.18);
    if (/齿轮|gear/i.test(name)) return new THREE.Vector3(-0.04, 0.1, 0.42);
    if (/发电|generator/i.test(name)) return new THREE.Vector3(0.36, 0.1, 0.16);
    if (/偏航|yaw/i.test(name)) return new THREE.Vector3(0.02, -0.24, -0.28);

    const fallbackX = index % 2 === 0 ? 0.16 : -0.16;
    const fallbackZ = index % 3 === 0 ? 0.18 : -0.18;
    return new THREE.Vector3(fallbackX, 0.04 + (index % 4) * 0.03, fallbackZ);
  }

  private toLocalOffset(object: THREE.Object3D, worldOffset: THREE.Vector3): THREE.Vector3 {
    const parentScale = object.parent?.getWorldScale(new THREE.Vector3()) ?? new THREE.Vector3(1, 1, 1);

    return new THREE.Vector3(
      parentScale.x ? worldOffset.x / parentScale.x : worldOffset.x,
      parentScale.y ? worldOffset.y / parentScale.y : worldOffset.y,
      parentScale.z ? worldOffset.z / parentScale.z : worldOffset.z,
    );
  }

  private transitionObjects(targetPositions: Map<THREE.Object3D, THREE.Vector3>, duration: number): void {
    const start = window.performance.now();
    targetPositions.forEach((to, object) => {
      this.objectTransitions.set(object, {
        duration,
        from: object.position.clone(),
        start,
        to,
      });
    });
  }

  private updateTransitions(now: number): void {
    this.objectTransitions.forEach((transition, object) => {
      const rawProgress = Math.min(1, (now - transition.start) / transition.duration);
      const eased = rawProgress < 0.5 ? 2 * rawProgress * rawProgress : 1 - (-2 * rawProgress + 2) ** 2 / 2;
      object.position.lerpVectors(transition.from, transition.to, eased);
      if (rawProgress >= 1) this.objectTransitions.delete(object);
    });
  }

  private partLabel(part: BimPartKey): string {
    return {
      blade: "叶片/变桨系统",
      hub: "转子/主轴",
      nacelle: "机舱/发电机",
      tower: "塔筒结构",
      foundation: "基础/锚栓",
      gearbox: "齿轮箱",
    }[part];
  }

  private setStatus(status: string): void {
    this.onStatus?.(status);
  }
}

export type { BimPartKey };
