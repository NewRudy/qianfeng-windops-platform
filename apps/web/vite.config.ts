import { defineConfig, loadEnv, type Plugin } from "vite";
import cesium from "vite-plugin-cesium";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createAiDiagnosisMiddleware } from "./server/aiDiagnosisProxy";

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, "../..");
const cesiumBuildRoot = resolve(repoRoot, "node_modules/cesium/Build");

const externalAssetRoots = [
  "/Users/rudy/Downloads/laoyeling_mountain",
  "/Users/rudy/Downloads/wind_turbine",
  "/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/public/models",
  "/Volumes/RUDY/105. 风机科研项目/MF-TurbineMonitor/docs/models",
];

function aiDiagnosisProxyPlugin(env: Record<string, string>): Plugin {
  return {
    configureServer(server) {
      server.middlewares.use(
        createAiDiagnosisMiddleware({
          apiKey: env.WINDOPS_AI_API_KEY,
          baseUrl: env.WINDOPS_AI_BASE_URL,
          maxTokens: env.WINDOPS_AI_MAX_TOKENS,
          model: env.WINDOPS_AI_MODEL,
          provider: env.WINDOPS_AI_PROVIDER,
          timeoutSeconds: env.WINDOPS_AI_TIMEOUT_SECONDS,
        }),
      );
    },
    name: "windops-ai-diagnosis-proxy",
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, "");

  return {
    plugins: [
      aiDiagnosisProxyPlugin(env),
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
  };
});
