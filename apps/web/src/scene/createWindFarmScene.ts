import {
  BoundingSphere,
  Cartesian2,
  Cartesian3,
  Cesium3DTileset,
  Color,
  DirectionalLight,
  EllipsoidTerrainProvider,
  HeadingPitchRoll,
  HeadingPitchRange,
  ImageMaterialProperty,
  Matrix4,
  Model,
  ModelAnimationLoop,
  Rectangle,
  SceneTransforms,
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

const RIDGE_OVERVIEW_CAMERA = new HeadingPitchRange(5.68, -0.34, 1620);
const TURBINE_DETAIL_CAMERA = new HeadingPitchRange(5.78, -0.32, 640);

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
    skyBox: false,
    timeline: false,
    terrainProvider: new EllipsoidTerrainProvider(),
    useBrowserRecommendedResolution: false,
  });

  viewer.scene.globe.show = true;
  viewer.scene.globe.baseColor = Color.fromCssColorString("#102129");
  viewer.scene.globe.enableLighting = false;
  viewer.scene.skyAtmosphere = undefined;
  viewer.scene.backgroundColor = Color.fromCssColorString("#172129");
  viewer.scene.highDynamicRange = false;
  viewer.scene.fog.enabled = false;
  viewer.scene.light = new DirectionalLight({
    direction: Cartesian3.normalize(new Cartesian3(0.35, 0.58, -0.74), new Cartesian3()),
    color: Color.WHITE,
    intensity: 3.4,
  });
  viewer.resolutionScale = 1;
  hideCesiumCredits(viewer);

  const origin = Cartesian3.fromDegrees(
    config.origin.longitude,
    config.origin.latitude,
    config.origin.height,
  );
  const localFrame = Transforms.eastNorthUpToFixedFrame(origin);

  const mountain = await Cesium3DTileset.fromUrl(toViteFsUrl(config.mountain.absolutePath));
  mountain.maximumScreenSpaceError = 2;
  viewer.scene.primitives.add(mountain);
  addMountainSurface(viewer, config);

  let selectedTurbine = config.turbines[0];
  if (!selectedTurbine) {
    throw new Error("Scene config must include at least one turbine.");
  }

  for (const turbine of config.turbines) {
    addTurbineFoundation(viewer, localFrame, turbine);

    void loadTurbineGltfModel(viewer, localFrame, turbine).catch((error: unknown) => {
      console.error(`Failed to load ${turbine.turbineId} wind turbine model.`, error);
    });
  }

  const showMountainOverview = () => {
    viewer.camera.flyToBoundingSphere(new BoundingSphere(origin, 1320), {
      duration: 2.6,
      offset: RIDGE_OVERVIEW_CAMERA,
    });
  };

  const focusTurbine = () => {
    onTurbineSelected?.(selectedTurbine);
    viewer.camera.lookAt(
      pointFromOffset(localFrame, getHubOffset(selectedTurbine)),
      TURBINE_DETAIL_CAMERA,
    );
    viewer.camera.lookAtTransform(Matrix4.IDENTITY);
  };

  const selectTurbine = (turbineId: string) => {
    const turbine = config.turbines.find((candidate) => candidate.turbineId === turbineId);
    if (!turbine) return;
    selectedTurbine = turbine;
    focusTurbine();
  };

  playIntroFlight(viewer, origin);

  const handler = new ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((movement: { position: Cartesian2 }) => {
    const picked = viewer.scene.pick(movement.position);
    const pickedId = picked?.primitive?.id as PickableModelId | undefined;
    const pickedEntityId = typeof picked?.id?.id === "string" ? picked.id.id : "";
    const pickedTurbineId = pickedId?.kind === "turbine"
      ? pickedId.turbineId
      : turbineIdFromEntityId(pickedEntityId) ?? turbineNearScreenPoint(viewer, localFrame, config, movement.position);
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

function playIntroFlight(viewer: Viewer, origin: Cartesian3): void {
  viewer.camera.lookAt(origin, new HeadingPitchRange(5.08, -1.12, 8200));
  viewer.camera.lookAtTransform(Matrix4.IDENTITY);

  window.setTimeout(() => {
    viewer.camera.flyToBoundingSphere(new BoundingSphere(origin, 1320), {
      duration: 4.2,
      offset: RIDGE_OVERVIEW_CAMERA,
    });
  }, 700);
}

function addMountainSurface(viewer: Viewer, config: SceneConfig): void {
  const centerLongitude = config.origin.longitude;
  const centerLatitude = config.origin.latitude;
  const halfWidthDegrees = 0.023;
  const halfHeightDegrees = 0.0182;

  viewer.entities.add({
    id: "laoyeling-mountain-surface",
    rectangle: {
      coordinates: Rectangle.fromDegrees(
        centerLongitude - halfWidthDegrees,
        centerLatitude - halfHeightDegrees,
        centerLongitude + halfWidthDegrees,
        centerLatitude + halfHeightDegrees,
      ),
      height: config.origin.height + 24,
      material: new ImageMaterialProperty({
        image: toViteFsUrl(config.mountain.baseColorTexturePath),
      }),
    },
  });
}

function addTurbineFoundation(viewer: Viewer, localFrame: Matrix4, turbine: TurbineAsset): void {
  const base = pointFromOffset(localFrame, {
    east: turbine.offset.east,
    north: turbine.offset.north,
    up: turbine.offset.up - 8,
  });

  viewer.entities.add({
    id: `${turbine.turbineId}-foundation`,
    position: base,
    cylinder: {
      length: 18,
      topRadius: 28,
      bottomRadius: 34,
      material: Color.fromCssColorString("rgba(210, 230, 218, 0.72)"),
      outline: true,
      outlineColor: Color.fromCssColorString("rgba(120, 245, 255, 0.46)"),
    },
  });

  const serviceRoad = [
    pointFromOffset(localFrame, {
      east: turbine.offset.east - 155,
      north: turbine.offset.north - 70,
      up: turbine.offset.up - 3,
    }),
    pointFromOffset(localFrame, {
      east: turbine.offset.east - 72,
      north: turbine.offset.north - 34,
      up: turbine.offset.up - 2,
    }),
    pointFromOffset(localFrame, {
      east: turbine.offset.east + 16,
      north: turbine.offset.north,
      up: turbine.offset.up - 1,
    }),
  ];

  viewer.entities.add({
    id: `${turbine.turbineId}-service-road`,
    corridor: {
      positions: serviceRoad,
      width: 8,
      material: Color.fromCssColorString("rgba(226, 214, 164, 0.62)"),
    },
  });
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

function turbineNearScreenPoint(
  viewer: Viewer,
  localFrame: Matrix4,
  config: SceneConfig,
  position: Cartesian2,
): string | undefined {
  let nearest: { turbineId: string; distance: number } | undefined;

  for (const turbine of config.turbines) {
    const screenPosition = SceneTransforms.worldToWindowCoordinates(
      viewer.scene,
      pointFromOffset(localFrame, getHubOffset(turbine)),
    );

    if (!screenPosition) continue;

    const distance = Cartesian2.distance(position, screenPosition);
    if (!nearest || distance < nearest.distance) {
      nearest = { turbineId: turbine.turbineId, distance };
    }
  }

  return nearest && nearest.distance <= 120 ? nearest.turbineId : undefined;
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
