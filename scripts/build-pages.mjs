import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const webDir = join(repoRoot, "apps/web");
const xeokitDir = join(repoRoot, "apps/xeokit-viewer");
const outputDir = join(repoRoot, "dist-pages");

function runBuild(cwd) {
  execFileSync("npx", ["vite", "build", "--mode", "github-pages"], {
    cwd,
    stdio: "inherit",
  });
}

function copyDirectory(from, to) {
  if (!existsSync(from)) {
    throw new Error(`Missing build output: ${from}`);
  }
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}

rmSync(outputDir, { force: true, recursive: true });

runBuild(webDir);
runBuild(xeokitDir);

copyDirectory(join(webDir, "dist"), outputDir);
copyDirectory(join(xeokitDir, "dist"), join(outputDir, "xeokit-viewer"));

const nestedCesiumDir = join(outputDir, "qianfeng-windops-platform/cesium");
if (existsSync(nestedCesiumDir)) {
  rmSync(join(outputDir, "cesium"), { force: true, recursive: true });
  cpSync(nestedCesiumDir, join(outputDir, "cesium"), { recursive: true });
  rmSync(join(outputDir, "qianfeng-windops-platform"), { force: true, recursive: true });
}

rmSync(join(outputDir, "xeokit-viewer/external/bim/ifc/factory-masterplan.ifc"), {
  force: true,
});

writeFileSync(join(outputDir, ".nojekyll"), "");
cpSync(join(outputDir, "index.html"), join(outputDir, "404.html"));

console.log(`GitHub Pages bundle ready: ${outputDir}`);
