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

export interface TurbineAsset extends ModelAsset {
  turbineId: string;
  riskLevel: "normal" | "warning" | "critical";
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
  mountain: ModelAsset;
  turbine: TurbineAsset;
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
    absolutePath: "/Users/rudy/Downloads/laoyeling_mountain/scene.gltf",
    scale: 1800,
    offset: {
      east: 0,
      north: 0,
      up: -35,
    },
    credit:
      'This work is based on "Laoyeling Mountain" by Li Yanquan, licensed under CC-BY-4.0.',
  },
  turbine: {
    name: "HS-WTG-01",
    turbineId: "HS-WTG-01",
    absolutePath:
      "/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/public/models/equipment.glb",
    scale: 11,
    offset: {
      east: 260,
      north: -120,
      up: 72,
    },
    geometry: {
      towerHeight: 180,
      towerRadius: 5,
      nacelleLength: 54,
      bladeRadius: 72,
    },
    credit: "First-version turbine GLB from MF-TurbineMonitor public models.",
    riskLevel: "warning",
  },
};
