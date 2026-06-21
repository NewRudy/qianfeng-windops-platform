import { describe, expect, it } from "vitest";
import { firstSliceSceneConfig, toViteFsUrl } from "../src/scene/sceneConfig";

describe("first slice scene config", () => {
  it("uses the generated Laoyeling 3D Tiles tileset as the GIS background", () => {
    expect(firstSliceSceneConfig.mountain.absolutePath).toBe(
      "/Users/rudy/Documents/geo_agent/qianfeng-windops-platform/data/external/tilesets/laoyeling-mountain/tileset.json",
    );
    expect(firstSliceSceneConfig.mountain.absolutePath).toContain("tileset.json");
    expect(firstSliceSceneConfig.mountain.baseColorTexturePath).toContain(
      "Scene_-_Root_baseColor.png",
    );
    expect(firstSliceSceneConfig.mountain.credit).toContain("CC-BY-4.0");
  });

  it("places three animated turbine models along the mountain ridge", () => {
    expect(firstSliceSceneConfig.turbines).toHaveLength(3);
    expect(firstSliceSceneConfig.turbines.map((turbine) => turbine.turbineId)).toEqual([
      "HS-WTG-01",
      "HS-WTG-02",
      "HS-WTG-03",
    ]);
    for (const turbine of firstSliceSceneConfig.turbines) {
      expect(turbine.absolutePath).toBe("/Users/rudy/Downloads/wind_turbine/scene.gltf");
      expect(turbine.hasRotorAnimation).toBe(true);
      expect(turbine.offset.up).toBeGreaterThan(130);
      expect(turbine.offset.up).toBeLessThan(145);
      expect(turbine.offset.up - turbine.geometry.towerHeight).toBeGreaterThan(5);
      expect(turbine.offset.up - turbine.geometry.towerHeight).toBeLessThan(15);
      expect(turbine.scale).toBeLessThan(3);
      expect(turbine.geometry.towerHeight).toBeGreaterThan(100);
    }
    const ridgeEastOffsets = firstSliceSceneConfig.turbines.map((turbine) => turbine.offset.east);
    const ridgeSpread = Math.max(...ridgeEastOffsets) - Math.min(...ridgeEastOffsets);
    expect(ridgeSpread).toBeGreaterThan(900);
  });

  it("converts absolute asset paths into Vite dev-server file URLs", () => {
    expect(toViteFsUrl("/Users/rudy/Downloads/laoyeling_mountain/tileset.json")).toBe(
      "/@fs/Users/rudy/Downloads/laoyeling_mountain/tileset.json",
    );
    expect(
      toViteFsUrl("/Users/rudy/Downloads/wind_turbine/scene.gltf"),
    ).toBe("/@fs/Users/rudy/Downloads/wind_turbine/scene.gltf");
  });
});
