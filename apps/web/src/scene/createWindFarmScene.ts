import {
  Cartesian2,
  Cartesian3,
  Cesium3DTileset,
  Color,
  EllipsoidTerrainProvider,
  HeadingPitchRoll,
  HeadingPitchRange,
  Matrix4,
  Model,
  ModelAnimationLoop,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Transforms,
  Viewer,
} from "cesium";
import type { LocalOffset, SceneConfig, TurbineAsset } from "./sceneConfig";
import { toViteFsUrl } from "./sceneConfig";

export interface WindFarmScene {
  focusTurbine: () => void;
  showMountainOverview: () => void;
  destroy: () => void;
}

export interface CreateWindFarmSceneOptions {
  container: HTMLElement;
  config: SceneConfig;
  onTurbineSelected?: (turbine: TurbineAsset) => void;
}

interface PickableModelId {
  kind: "turbine";
  turbineId: string;
}

export async function createWindFarmScene({
  container,
  config,
  onTurbineSelected,
}: CreateWindFarmSceneOptions): Promise<WindFarmScene> {
  const viewer = new Viewer(container, {
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
    timeline: false,
    terrainProvider: new EllipsoidTerrainProvider(),
  });

  viewer.scene.globe.show = false;
  viewer.scene.skyAtmosphere = undefined;
  viewer.scene.backgroundColor = Color.fromCssColorString("#07111f");
  viewer.scene.highDynamicRange = true;
  hideCesiumCredits(viewer);

  const origin = Cartesian3.fromDegrees(
    config.origin.longitude,
    config.origin.latitude,
    config.origin.height,
  );
  const localFrame = Transforms.eastNorthUpToFixedFrame(origin);

  const mountain = await Cesium3DTileset.fromUrl(toViteFsUrl(config.mountain.absolutePath));
  viewer.scene.primitives.add(mountain);

  let selectedTurbine = config.turbines[0];
  if (!selectedTurbine) {
    throw new Error("Scene config must include at least one turbine.");
  }

  for (const turbine of config.turbines) {
    void loadTurbineGltfModel(viewer, localFrame, turbine).catch((error: unknown) => {
      console.error(`Failed to load ${turbine.turbineId} wind turbine model.`, error);
    });

    viewer.entities.add({
      id: `${turbine.turbineId}-label`,
      position: pointFromOffset(localFrame, getHubOffset(turbine)),
      label: {
        text: `${turbine.name} · ${riskText(turbine.riskLevel)}`,
        fillColor: Color.fromCssColorString("#dff7ff"),
        outlineColor: Color.fromCssColorString("#00111f"),
        outlineWidth: 3,
        showBackground: true,
        backgroundColor: Color.fromCssColorString("rgba(0, 35, 55, 0.72)"),
        pixelOffset: new Cartesian2(0, -72),
        font: "14px sans-serif",
      },
    });
  }

  const showMountainOverview = () => {
    viewer.camera.lookAt(
      origin,
      new HeadingPitchRange(5.42, -0.62, 3100),
    );
  };

  const focusTurbine = () => {
    onTurbineSelected?.(selectedTurbine);
    viewer.camera.lookAt(
      pointFromOffset(localFrame, getHubOffset(selectedTurbine)),
      new HeadingPitchRange(5.78, -0.18, 840),
    );
  };

  const selectTurbine = (turbineId: string) => {
    const turbine = config.turbines.find((candidate) => candidate.turbineId === turbineId);
    if (!turbine) return;
    selectedTurbine = turbine;
    focusTurbine();
  };

  showMountainOverview();

  const handler = new ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((movement: { position: Cartesian2 }) => {
    const picked = viewer.scene.pick(movement.position);
    const pickedId = picked?.primitive?.id as PickableModelId | undefined;
    const pickedEntityId = typeof picked?.id?.id === "string" ? picked.id.id : "";
    const pickedTurbineId = pickedId?.kind === "turbine" ? pickedId.turbineId : turbineIdFromEntityId(pickedEntityId);
    if (pickedTurbineId) {
      selectTurbine(pickedTurbineId);
    }
  }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  return {
    focusTurbine,
    showMountainOverview,
    destroy: () => {
      handler.destroy();
      viewer.destroy();
    },
  };
}

async function loadTurbineGltfModel(
  viewer: Viewer,
  localFrame: Matrix4,
  turbineAsset: TurbineAsset,
): Promise<void> {
  const modelUrl = toViteFsUrl(turbineAsset.absolutePath);
  const response = await fetch(modelUrl, { method: "HEAD" });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || contentType.includes("text/html")) {
    throw new Error(`Wind turbine GLTF is not available at ${modelUrl}`);
  }

  const turbine = await Model.fromGltfAsync({
    url: modelUrl,
    modelMatrix: modelMatrixFromOffsetAndHeading(localFrame, turbineAsset),
    scale: turbineAsset.scale,
    minimumPixelSize: 64,
  });
  turbine.id = {
    kind: "turbine",
    turbineId: turbineAsset.turbineId,
  } satisfies PickableModelId;
  viewer.scene.primitives.add(turbine);
  if (turbineAsset.hasRotorAnimation) {
    startRotorAnimationWhenReady(turbine);
  }
}

function startRotorAnimationWhenReady(turbine: Model): void {
  const start = () => {
    if (turbine.isDestroyed() || turbine.activeAnimations.length > 0) return;

    turbine.activeAnimations.animateWhilePaused = true;
    turbine.activeAnimations.addAll({
      loop: ModelAnimationLoop.REPEAT,
      animationTime: (duration) => (Date.now() / 1000) % Math.max(duration, 0.001),
    });
  };

  if (turbine.ready) {
    window.setTimeout(start, 0);
    return;
  }

  turbine.readyEvent.addEventListener(start);
}

function modelMatrixFromOffsetAndHeading(localFrame: Matrix4, turbineAsset: TurbineAsset): Matrix4 {
  return Transforms.headingPitchRollToFixedFrame(
    pointFromOffset(localFrame, turbineAsset.offset),
    new HeadingPitchRoll(degreesToRadians(turbineAsset.headingDegrees), 0, 0),
  );
}

function getHubOffset(turbine: TurbineAsset): LocalOffset {
  return {
    east: turbine.offset.east + turbine.geometry.nacelleLength + 7,
    north: turbine.offset.north,
    up: turbine.offset.up + turbine.geometry.towerHeight + 10,
  };
}

function turbineIdFromEntityId(entityId: string): string | undefined {
  return entityId.match(/^HS-WTG-\d{2}/)?.[0];
}

function riskText(riskLevel: TurbineAsset["riskLevel"]): string {
  if (riskLevel === "critical") return "红色告警";
  if (riskLevel === "warning") return "橙色预警";
  return "运行正常";
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function pointFromOffset(localFrame: Matrix4, offset: LocalOffset): Cartesian3 {
  return Matrix4.multiplyByPoint(
    localFrame,
    new Cartesian3(offset.east, offset.north, offset.up),
    new Cartesian3(),
  );
}

function hideCesiumCredits(viewer: Viewer): void {
  const creditContainer = viewer.cesiumWidget.creditContainer as HTMLElement | undefined;
  if (creditContainer) {
    creditContainer.style.display = "none";
  }
}
