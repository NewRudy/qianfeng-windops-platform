import { defineConfig } from "vite";
import cesium from "vite-plugin-cesium";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, "../..");
const cesiumBuildRoot = resolve(repoRoot, "node_modules/cesium/Build");

const externalAssetRoots = [
  "/Users/rudy/Downloads/laoyeling_mountain",
  "/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/public/models",
  "/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/docs/models",
];

export default defineConfig({
  plugins: [
    cesium({
      cesiumBuildRootPath: cesiumBuildRoot,
      cesiumBuildPath: resolve(cesiumBuildRoot, "Cesium"),
    }),
  ],
  server: {
    fs: {
      allow: [repoRoot, ...externalAssetRoots],
    },
  },
});
