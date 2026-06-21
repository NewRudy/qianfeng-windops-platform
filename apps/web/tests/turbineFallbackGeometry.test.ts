import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("wind turbine GLTF model loading", () => {
  it("does not silently replace the real animated turbine model with simplified geometry", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/scene/createWindFarmScene.ts"),
      "utf8",
    );

    expect(source).toContain("Model.fromGltfAsync");
    expect(source).toContain("readyEvent.addEventListener");
    expect(source).toContain("animateWhilePaused");
    expect(source).toContain("activeAnimations.addAll");
    expect(source).toContain("ModelAnimationLoop.REPEAT");
    expect(source).not.toContain("addTurbineGeometry");
    expect(source).not.toContain("polylineVolume");
    expect(source).not.toContain("createBladeCrossSection");
    expect(source).not.toContain("polyline:");
  });
});
