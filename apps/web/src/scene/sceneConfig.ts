export interface LocalOffset {
  east: number;
  north: number;
  up: number;
}

export interface ModelAsset {
  name: string;
  absolutePath: string;
  scale: number;
  offset: LocalOffset;
  credit: string;
}

export interface TilesetAsset {
  name: string;
  absolutePath: string;
  baseColorTexturePath: string;
  credit: string;
}

export interface TurbineAsset extends ModelAsset {
  turbineId: string;
  riskLevel: "normal" | "warning" | "critical";
  headingDegrees: number;
  hasRotorAnimation: boolean;
  geometry: {
    towerHeight: number;
    towerRadius: number;
    nacelleLength: number;
    bladeRadius: number;
  };
}

export interface SceneConfig {
  origin: {
    longitude: number;
    latitude: number;
    height: number;
  };
  mountain: TilesetAsset;
  turbines: TurbineAsset[];
}

export function toViteFsUrl(absolutePath: string): string {
  if (!absolutePath.startsWith("/")) {
    throw new Error(`Expected an absolute local path, got: ${absolutePath}`);
  }

  return `/@fs${absolutePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

export const firstSliceSceneConfig: SceneConfig = {
  origin: {
    longitude: 106.6,
    latitude: 26.5,
    height: 1250,
  },
  mountain: {
    name: "Laoyeling Mountain",
    absolutePath:
      "/Users/rudy/Documents/geo_agent/qianfeng-windops-platform/data/external/tilesets/laoyeling-mountain/tileset.json",
    baseColorTexturePath:
      "/Users/rudy/Documents/geo_agent/qianfeng-windops-platform/data/external/tilesets/laoyeling-mountain/textures/Scene_-_Root_baseColor.png",
    credit:
      '3D Tiles 1.1 wrapper generated from "Laoyeling Mountain" by Li Yanquan, licensed under CC-BY-4.0.',
  },
  turbines: [
    createRidgeTurbine("HS-WTG-01", "normal", { east: -500, north: -330, up: 136 }, 94),
    createRidgeTurbine("HS-WTG-02", "warning", { east: -20, north: -210, up: 137 }, 94),
    createRidgeTurbine("HS-WTG-03", "warning", { east: 460, north: -90, up: 134 }, 94),
  ],
};

function createRidgeTurbine(
  turbineId: string,
  riskLevel: TurbineAsset["riskLevel"],
  offset: LocalOffset,
  headingDegrees: number,
): TurbineAsset {
  return {
    name: turbineId,
    turbineId,
    absolutePath: "/Users/rudy/Downloads/wind_turbine/scene.gltf",
    scale: 2.8,
    offset,
    headingDegrees,
    hasRotorAnimation: true,
    geometry: {
      towerHeight: 126,
      towerRadius: 5,
      nacelleLength: 64,
      bladeRadius: 74,
    },
    credit:
      'This work is based on "Wind Turbine" by Sket_h, licensed under CC-BY-4.0.',
    riskLevel,
  };
}
