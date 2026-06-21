import {
  Cartesian2,
  Cartesian3,
  Cesium3DTileset,
  Color,
  CornerType,
  EllipsoidTerrainProvider,
  HeadingPitchRoll,
  HeadingPitchRange,
  Matrix4,
  Model,
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

  const turbineHubPosition = pointFromOffset(localFrame, getHubOffset(config.turbine));

  addTurbineGeometry(viewer, localFrame, config.turbine);
  void loadTurbineBimModel(viewer, localFrame, config.turbine).catch((error: unknown) => {
    console.warn("Failed to load turbine BIM GLB. Keeping interactive Cesium fallback.", error);
  });

  viewer.entities.add({
    id: `${config.turbine.turbineId}-label`,
    position: turbineHubPosition,
    label: {
      text: `${config.turbine.name} · 橙色预警`,
      fillColor: Color.fromCssColorString("#dff7ff"),
      outlineColor: Color.fromCssColorString("#00111f"),
      outlineWidth: 3,
      showBackground: true,
      backgroundColor: Color.fromCssColorString("rgba(0, 35, 55, 0.72)"),
      pixelOffset: new Cartesian2(0, -72),
      font: "14px sans-serif",
    },
  });

  const showMountainOverview = () => {
    viewer.camera.lookAt(
      origin,
      new HeadingPitchRange(5.42, -0.62, 3100),
    );
  };

  const focusTurbine = () => {
    onTurbineSelected?.(config.turbine);
    viewer.camera.lookAt(
      turbineHubPosition,
      new HeadingPitchRange(5.78, -0.18, 840),
    );
  };

  showMountainOverview();

  const handler = new ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((movement: { position: Cartesian2 }) => {
    const picked = viewer.scene.pick(movement.position);
    const pickedId = picked?.primitive?.id as PickableModelId | undefined;
    const pickedEntityId = typeof picked?.id?.id === "string" ? picked.id.id : "";
    if (pickedId?.kind === "turbine" || pickedEntityId.startsWith(config.turbine.turbineId)) {
      focusTurbine();
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

function modelMatrixFromOffset(localFrame: Matrix4, offset: LocalOffset): Matrix4 {
  return Matrix4.multiplyByTranslation(
    localFrame,
    new Cartesian3(offset.east, offset.north, offset.up),
    new Matrix4(),
  );
}

async function loadTurbineBimModel(
  viewer: Viewer,
  localFrame: Matrix4,
  turbineAsset: TurbineAsset,
): Promise<void> {
  const modelUrl = toViteFsUrl(turbineAsset.absolutePath);
  const response = await fetch(modelUrl, { method: "HEAD" });
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || contentType.includes("text/html")) {
    return;
  }

  const turbine = await Model.fromGltfAsync({
    url: modelUrl,
    modelMatrix: modelMatrixFromOffset(localFrame, turbineAsset.offset),
    scale: turbineAsset.scale,
    minimumPixelSize: 96,
  });
  turbine.id = {
    kind: "turbine",
    turbineId: turbineAsset.turbineId,
  } satisfies PickableModelId;
  viewer.scene.primitives.add(turbine);
}

function addTurbineGeometry(viewer: Viewer, localFrame: Matrix4, turbine: TurbineAsset): void {
  const { towerHeight, towerRadius, nacelleLength, bladeRadius } = turbine.geometry;
  const foundationCenter = pointFromOffset(localFrame, {
    ...turbine.offset,
    up: turbine.offset.up + 4,
  });
  const towerCenter = pointFromOffset(localFrame, {
    ...turbine.offset,
    up: turbine.offset.up + towerHeight / 2,
  });
  const nacelleCenter = pointFromOffset(localFrame, {
    east: turbine.offset.east + nacelleLength / 2,
    north: turbine.offset.north,
    up: turbine.offset.up + towerHeight + 10,
  });
  const hubOffset = getHubOffset(turbine);
  const hub = pointFromOffset(localFrame, hubOffset);
  const orientation = Transforms.headingPitchRollQuaternion(
    towerCenter,
    new HeadingPitchRoll(0, 0, 0),
  );

  viewer.entities.add({
    id: `${turbine.turbineId}-foundation`,
    position: foundationCenter,
    orientation,
    cylinder: {
      length: 8,
      topRadius: towerRadius * 2.1,
      bottomRadius: towerRadius * 2.6,
      material: Color.fromCssColorString("rgba(136, 148, 148, 0.92)"),
    },
  });

  viewer.entities.add({
    id: `${turbine.turbineId}-tower`,
    position: towerCenter,
    orientation,
    cylinder: {
      length: towerHeight,
      topRadius: towerRadius * 0.62,
      bottomRadius: towerRadius,
      material: Color.fromCssColorString("rgba(210, 221, 222, 0.96)"),
    },
  });

  viewer.entities.add({
    id: `${turbine.turbineId}-nacelle`,
    position: nacelleCenter,
    orientation,
    box: {
      dimensions: new Cartesian3(nacelleLength, 16, 16),
      material: Color.fromCssColorString("rgba(224, 231, 231, 0.98)"),
    },
  });

  viewer.entities.add({
    id: `${turbine.turbineId}-hub`,
    position: hub,
    ellipsoid: {
      radii: new Cartesian3(8, 8, 8),
      material: Color.fromCssColorString("rgba(232, 237, 236, 0.98)"),
    },
  });

  const bladeEnds = [
    { ...hubOffset, up: hubOffset.up + bladeRadius },
    { ...hubOffset, north: hubOffset.north - bladeRadius * 0.82, up: hubOffset.up - bladeRadius * 0.48 },
    { ...hubOffset, north: hubOffset.north + bladeRadius * 0.82, up: hubOffset.up - bladeRadius * 0.48 },
  ];

  bladeEnds.forEach((bladeEnd, index) => {
    viewer.entities.add({
      id: `${turbine.turbineId}-blade-${index + 1}`,
      polylineVolume: {
        positions: [hub, pointFromOffset(localFrame, bladeEnd)],
        shape: createBladeCrossSection(),
        cornerType: CornerType.MITERED,
        material: Color.fromCssColorString("rgba(218, 230, 232, 0.96)"),
      },
    });
  });
}

function createBladeCrossSection(): Cartesian2[] {
  return [
    new Cartesian2(-3.6, -0.72),
    new Cartesian2(1.5, -0.86),
    new Cartesian2(3.2, 0),
    new Cartesian2(1.5, 0.86),
    new Cartesian2(-3.6, 0.72),
  ];
}

function getHubOffset(turbine: TurbineAsset): LocalOffset {
  return {
    east: turbine.offset.east + turbine.geometry.nacelleLength + 7,
    north: turbine.offset.north,
    up: turbine.offset.up + turbine.geometry.towerHeight + 10,
  };
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
