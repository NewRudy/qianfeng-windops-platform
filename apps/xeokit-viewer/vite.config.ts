import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(currentDir, "../..");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, "");
  const defaultBase = mode === "github-pages" ? "/qianfeng-windops-platform/xeokit-viewer/" : "/";

  return {
    base: env.WINDOPS_XEOKIT_VITE_BASE ?? defaultBase,
  };
});
