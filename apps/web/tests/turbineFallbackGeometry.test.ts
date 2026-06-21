import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("fallback turbine geometry", () => {
  it("renders blades as solid volumes instead of animation-like lines", () => {
    const source = readFileSync(
      resolve(process.cwd(), "src/scene/createWindFarmScene.ts"),
      "utf8",
    );

    expect(source).toContain("polylineVolume");
    expect(source).toContain("createBladeCrossSection");
    expect(source).not.toContain("polyline:");
  });
});
