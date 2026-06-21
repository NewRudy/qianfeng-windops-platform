import { describe, expect, it } from "vitest";
import { firstSliceSceneConfig, toViteFsUrl } from "../src/scene/sceneConfig";

describe("first slice scene config", () => {
  it("uses the generated Laoyeling 3D Tiles tileset as the GIS background", () => {
    expect(firstSliceSceneConfig.mountain.absolutePath).toBe(
      "/Users/rudy/Documents/geo_agent/qianfeng-windops-platform/data/external/tilesets/laoyeling-mountain/tileset.json",
    );
    expect(firstSliceSceneConfig.mountain.absolutePath).toContain("tileset.json");
    expect(firstSliceSceneConfig.mountain.credit).toContain("CC-BY-4.0");
  });

  it("anchors one turbine model from the first-version U disk BIM assets", () => {
    expect(firstSliceSceneConfig.turbine.turbineId).toBe("HS-WTG-01");
    expect(firstSliceSceneConfig.turbine.absolutePath).toContain(
      "MF-TurbineMonitor/public/models/equipment.glb",
    );
    expect(firstSliceSceneConfig.turbine.offset.up).toBeGreaterThan(0);
    expect(firstSliceSceneConfig.turbine.geometry.towerHeight).toBeGreaterThan(100);
  });

  it("converts absolute asset paths into Vite dev-server file URLs", () => {
    expect(toViteFsUrl("/Users/rudy/Downloads/laoyeling_mountain/tileset.json")).toBe(
      "/@fs/Users/rudy/Downloads/laoyeling_mountain/tileset.json",
    );
    expect(
      toViteFsUrl("/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/public/models/equipment.glb"),
    ).toContain("105.%20%E9%A3%8E%E6%9C%BA%E7%A7%91%E7%A0%94%E9%A1%B9%E7%9B%AE");
  });
});
