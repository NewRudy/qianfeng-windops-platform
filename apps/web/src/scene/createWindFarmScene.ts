import {
  BoundingSphere,
  CallbackProperty,
  Cartesian2,
  Cartesian3,
  Cesium3DTileset,
  Color,
  ColorBlendMode,
  ColorMaterialProperty,
  DirectionalLight,
  EllipsoidTerrainProvider,
  Entity,
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
  focusTurbine: (turbineId?: string) => void;
  showMountainOverview: () => void;
  showTurbineAlert: (turbineId: string) => void;
  destroy: () => void;
}

export interface CreateWindFarmSceneOptions {
  container: HTMLElement;
  config: SceneConfig;
  onIntroComplete?: (turbine: TurbineAsset) => void;
  onTurbineSelected?: (turbine: TurbineAsset) => void;
}

const RIDGE_OVERVIEW_CAMERA = new HeadingPitchRange(5.66, -0.24, 1180);
const TURBINE_DETAIL_CAMERA = new HeadingPitchRange(5.82, -0.22, 520);

interface PickableModelId {
  kind: "turbine";
  turbineId: string;
}

export async function createWindFarmScene({
  container,
  config,
  onIntroComplete,
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
  const riskEntities = new Map<string, Entity[]>();
  const turbineModels = new Map<string, Model>();
  let activeAlertTurbineId: string | undefined;
  if (!selectedTurbine) {
    throw new Error("Scene config must include at least one turbine.");
  }

  for (const turbine of config.turbines) {
    addTurbineFoundation(viewer, localFrame, turbine);
    riskEntities.set(turbine.turbineId, addTurbineRiskMarker(viewer, localFrame, turbine));

    void loadTurbineGltfModel(viewer, localFrame, turbine)
      .then((model) => {
        turbineModels.set(turbine.turbineId, model);
        updateTurbineModelAlertVisuals(turbineModels, activeAlertTurbineId);
      })
      .catch((error: unknown) => {
        console.error(`Failed to load ${turbine.turbineId} wind turbine model.`, error);
      });
  }

  const flashAlertModel = () => {
    updateTurbineModelAlertVisuals(turbineModels, activeAlertTurbineId);
  };
  viewer.scene.preRender.addEventListener(flashAlertModel);

  const ridgeTarget = pointFromOffset(localFrame, getRidgeCenterOffset(config.turbines));

  const showMountainOverview = () => {
    viewer.camera.flyToBoundingSphere(new BoundingSphere(ridgeTarget, 780), {
      duration: 2.6,
      offset: RIDGE_OVERVIEW_CAMERA,
    });
  };

  const showTurbineAlert = (turbineId: string) => {
    activeAlertTurbineId = turbineId;
    riskEntities.forEach((entities, id) => {
      entities.forEach((entity) => {
        entity.show = id === turbineId;
      });
    });
    updateTurbineModelAlertVisuals(turbineModels, activeAlertTurbineId);
  };

  const focusSelectedTurbine = () => {
    onTurbineSelected?.(selectedTurbine);
    viewer.camera.lookAt(
      pointFromOffset(localFrame, getHubOffset(selectedTurbine)),
      TURBINE_DETAIL_CAMERA,
    );
    viewer.camera.lookAtTransform(Matrix4.IDENTITY);
  };

  const focusTurbine = (turbineId?: string) => {
    if (!turbineId) {
      focusSelectedTurbine();
      return;
    }
    const turbine = config.turbines.find((candidate) => candidate.turbineId === turbineId);
    if (!turbine) return;
    selectedTurbine = turbine;
    showTurbineAlert(turbine.turbineId);
    focusSelectedTurbine();
  };

  const introTurbine = config.turbines.find((turbine) => turbine.riskLevel !== "normal") ?? selectedTurbine;
  playIntroFlight(viewer, origin, ridgeTarget, pointFromOffset(localFrame, getHubOffset(introTurbine)), () => {
    selectedTurbine = introTurbine;
    showTurbineAlert(introTurbine.turbineId);
    onIntroComplete?.(introTurbine);
  });

  const handler = new ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((movement: { position: Cartesian2 }) => {
    const picked = viewer.scene.pick(movement.position);
    const pickedId = picked?.primitive?.id as PickableModelId | undefined;
    const pickedEntityId = typeof picked?.id?.id === "string" ? picked.id.id : "";
    const pickedTurbineId = pickedId?.kind === "turbine"
      ? pickedId.turbineId
      : turbineIdFromEntityId(pickedEntityId) ?? turbineNearScreenPoint(viewer, localFrame, config, movement.position);
    if (pickedTurbineId) {
      focusTurbine(pickedTurbineId);
    }
  }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

  return {
    focusTurbine,
    showMountainOverview,
    showTurbineAlert,
    destroy: () => {
      viewer.scene.preRender.removeEventListener(flashAlertModel);
      handler.destroy();
      viewer.destroy();
    },
  };
}

function playIntroFlight(
  viewer: Viewer,
  origin: Cartesian3,
  ridgeTarget: Cartesian3,
  turbineTarget: Cartesian3,
  onComplete: () => void,
): void {
  viewer.camera.lookAt(origin, new HeadingPitchRange(5.08, -1.12, 8200));
  viewer.camera.lookAtTransform(Matrix4.IDENTITY);

  window.setTimeout(() => {
    viewer.camera.flyToBoundingSphere(new BoundingSphere(ridgeTarget, 780), {
      duration: 2.7,
      offset: RIDGE_OVERVIEW_CAMERA,
      complete: () => {
        viewer.camera.flyToBoundingSphere(new BoundingSphere(turbineTarget, 180), {
          duration: 2.3,
          offset: TURBINE_DETAIL_CAMERA,
          complete: onComplete,
        });
      },
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
      height: config.origin.height + 8,
      material: new ImageMaterialProperty({
        image: toViteFsUrl(config.mountain.baseColorTexturePath),
      }),
    },
  });
}

function addTurbineFoundation(viewer: Viewer, localFrame: Matrix4, turbine: TurbineAsset): void {
  const groundOffset = getGroundOffset(turbine);
  const base = pointFromOffset(localFrame, { ...groundOffset, up: groundOffset.up - 2 });

  viewer.entities.add({
    id: `${turbine.turbineId}-ridge-pad`,
    position: pointFromOffset(localFrame, { ...groundOffset, up: groundOffset.up + 1 }),
    ellipse: {
      semiMajorAxis: 36,
      semiMinorAxis: 24,
      material: Color.fromCssColorString("rgba(169, 190, 154, 0.18)"),
      outline: false,
    },
  });

  viewer.entities.add({
    id: `${turbine.turbineId}-foundation`,
    position: base,
    cylinder: {
      length: 8,
      topRadius: 13,
      bottomRadius: 18,
      material: Color.fromCssColorString("rgba(194, 205, 185, 0.62)"),
      outline: false,
    },
  });

  const serviceRoad = [
    pointFromOffset(localFrame, {
      east: turbine.offset.east - 155,
      north: turbine.offset.north - 70,
      up: groundOffset.up,
    }),
    pointFromOffset(localFrame, {
      east: turbine.offset.east - 72,
      north: turbine.offset.north - 34,
      up: groundOffset.up + 1,
    }),
    pointFromOffset(localFrame, {
      east: turbine.offset.east + 16,
      north: turbine.offset.north,
      up: groundOffset.up + 1,
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

function addTurbineRiskMarker(viewer: Viewer, localFrame: Matrix4, turbine: TurbineAsset): Entity[] {
  if (turbine.riskLevel === "normal") return [];

  const hubOffset = getHubOffset(turbine);
  const groundOffset = getGroundOffset(turbine);
  const hub = pointFromOffset(localFrame, { ...hubOffset, up: hubOffset.up + 16 });
  const ground = pointFromOffset(localFrame, { ...groundOffset, up: groundOffset.up + 10 });
  const shortName = turbine.turbineId.match(/(\d+)$/)?.[1]?.replace(/^0+/, "") ?? turbine.turbineId;
  const pulseMaterial = new ColorMaterialProperty(new CallbackProperty(() => {
    const alpha = 0.14 + ((Math.sin(Date.now() / 160) + 1) / 2) * 0.26;
    return Color.fromCssColorString(`rgba(255, 36, 36, ${alpha.toFixed(3)})`);
  }, false));
  const ring = viewer.entities.add({
    id: `${turbine.turbineId}-risk-ring`,
    position: ground,
    show: false,
    ellipse: {
      semiMajorAxis: 84,
      semiMinorAxis: 58,
      material: pulseMaterial,
      outline: true,
      outlineColor: Color.fromCssColorString("rgba(255, 68, 68, 0.95)"),
    },
  });
  const beacon = viewer.entities.add({
    id: `${turbine.turbineId}-risk-beacon`,
    position: hub,
    show: false,
    point: {
      color: Color.fromCssColorString("#ff3030"),
      outlineColor: Color.fromCssColorString("#ffe0e0"),
      outlineWidth: 2,
      pixelSize: new CallbackProperty(() => 14 + ((Math.sin(Date.now() / 150) + 1) / 2) * 7, false),
    },
    label: {
      text: `${shortName}号机 一级预警`,
      fillColor: Color.WHITE,
      font: "700 18px sans-serif",
      outlineColor: Color.fromCssColorString("#4b0000"),
      outlineWidth: 3,
      pixelOffset: new Cartesian2(0, -34),
      showBackground: true,
      backgroundColor: Color.fromCssColorString("rgba(62, 0, 0, 0.84)"),
    },
  });

  return [ring, beacon];
}

async function loadTurbineGltfModel(
  viewer: Viewer,
  localFrame: Matrix4,
  turbineAsset: TurbineAsset,
): Promise<Model> {
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

  return turbine;
}

function updateTurbineModelAlertVisuals(turbineModels: Map<string, Model>, activeAlertTurbineId?: string): void {
  const pulse = 0.34 + ((Math.sin(Date.now() / 150) + 1) / 2) * 0.46;
  turbineModels.forEach((model, turbineId) => {
    if (model.isDestroyed()) return;

    const isAlerted = turbineId === activeAlertTurbineId;
    model.colorBlendMode = ColorBlendMode.MIX;
    model.colorBlendAmount = isAlerted ? pulse : 0;
    model.color = isAlerted
      ? Color.fromCssColorString(`rgba(255, 20, 20, ${Math.min(0.98, pulse + 0.2).toFixed(3)})`)
      : Color.WHITE;
    model.silhouetteColor = isAlerted
      ? Color.fromCssColorString(`rgba(255, 48, 48, ${Math.min(1, pulse + 0.24).toFixed(3)})`)
      : Color.TRANSPARENT;
    model.silhouetteSize = isAlerted ? 1.6 + pulse * 3.2 : 0;
  });
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
    east: turbine.offset.east + 10,
    north: turbine.offset.north,
    up: turbine.offset.up + 8,
  };
}

function getGroundOffset(turbine: TurbineAsset): LocalOffset {
  return {
    east: turbine.offset.east,
    north: turbine.offset.north,
    up: turbine.offset.up - turbine.geometry.towerHeight,
  };
}

function getRidgeCenterOffset(turbines: TurbineAsset[]): LocalOffset {
  const totals = turbines.reduce(
    (sum, turbine) => {
      const hub = getHubOffset(turbine);
      return {
        east: sum.east + hub.east,
        north: sum.north + hub.north,
        up: sum.up + hub.up,
      };
    },
    { east: 0, north: 0, up: 0 },
  );
  const count = Math.max(turbines.length, 1);

  return {
    east: totals.east / count,
    north: totals.north / count,
    up: totals.up / count - 24,
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
