import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Cartesian3, Matrix4, Transforms } from "cesium";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const sourceDir =
  process.env.LAOYELING_SOURCE_DIR ?? "/Users/rudy/Downloads/laoyeling_mountain";
const outputDir =
  process.env.LAOYELING_TILESET_DIR ??
  join(repoRoot, "data/external/tilesets/laoyeling-mountain");

const origin = {
  longitude: 106.6,
  latitude: 26.5,
  height: 1250,
};
const localOffset = {
  east: 0,
  north: 0,
  up: -35,
};
const modelScale = 1800;

const sourceGltf = join(sourceDir, "scene.gltf");
const outputGltf = join(outputDir, "scene.gltf");
const outputTileset = join(outputDir, "tileset.json");

if (!existsSync(sourceGltf)) {
  throw new Error(`Laoyeling source GLTF is missing: ${sourceGltf}`);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(sourceDir, outputDir, {
  recursive: true,
  filter: (source) => !source.endsWith(".DS_Store"),
});

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(
  npx,
  [
    "3d-tiles-tools",
    "createTilesetJson",
    "-i",
    outputGltf,
    "-o",
    outputTileset,
    "--cartographicPositionDegrees",
    String(origin.longitude),
    String(origin.latitude),
    String(origin.height),
    "--force",
  ],
  {
    cwd: repoRoot,
    stdio: "inherit",
  },
);

const tileset = JSON.parse(await readFile(outputTileset, "utf8"));
const originCartesian = Cartesian3.fromDegrees(origin.longitude, origin.latitude, origin.height);
const enuFrame = Transforms.eastNorthUpToFixedFrame(originCartesian);
const translatedFrame = Matrix4.multiplyByTranslation(
  enuFrame,
  new Cartesian3(localOffset.east, localOffset.north, localOffset.up),
  new Matrix4(),
);
const scaledFrame = Matrix4.multiplyByUniformScale(translatedFrame, modelScale, new Matrix4());

tileset.asset = {
  ...tileset.asset,
  version: "1.1",
  extras: {
    sourceTitle: "Laoyeling Mountain",
    sourceAuthor: "Li Yanquan",
    sourceLicense: "CC-BY-4.0",
    sourcePath: sourceDir,
    conversionTool: "CesiumGS/3d-tiles-tools createTilesetJson",
    note:
      "This is a single-tile 3D Tiles 1.1 wrapper around the source glTF. It normalizes the project runtime format but does not create multi-LOD photogrammetry tiles.",
  },
};
tileset.geometricError = 1024;
tileset.root = {
  ...tileset.root,
  boundingVolume: {
    box: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0.06],
  },
  content: {
    uri: "scene.gltf",
  },
  geometricError: 0,
  refine: "ADD",
  transform: Matrix4.toArray(scaledFrame),
};

await writeFile(outputTileset, `${JSON.stringify(tileset, null, 2)}\n`);

console.log(`Generated Laoyeling 3D Tiles 1.1 tileset: ${outputTileset}`);
