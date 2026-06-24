import { existsSync, statSync } from "node:fs";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const defaultWindIfc =
  "/Users/rudy/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_v8cyyrd6qx8h12_1bc1/msg/file/2026-06/风机.ifc";
const defaultFactoryIfc =
  "/Users/rudy/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_v8cyyrd6qx8h12_1bc1/msg/file/2026-06/厂房总图.ifc";

const publicIfcDir = join(repoRoot, "apps/xeokit-viewer/public/external/bim/ifc");
const publicWebIfcDir = join(repoRoot, "apps/xeokit-viewer/public/external/bim/web-ifc");
const publicManifestPath = join(repoRoot, "apps/xeokit-viewer/public/external/bim/ifc-manifest.local.json");

const assets = [
  {
    id: "wind-turbines-ifc",
    label: "风机 IFC 直读",
    sourcePath: process.env.WINDOPS_WIND_IFC_SOURCE ?? defaultWindIfc,
    fileName: "wind-turbines.ifc",
  },
  {
    id: "factory-masterplan-ifc",
    label: "厂房总图 IFC 直读",
    sourcePath: process.env.WINDOPS_FACTORY_IFC_SOURCE ?? defaultFactoryIfc,
    fileName: "factory-masterplan.ifc",
  },
];

const webIfcRuntimeFiles = ["web-ifc.wasm", "web-ifc-mt.wasm", "web-ifc-mt.worker.js"];

function assertFile(path, message) {
  if (!existsSync(path)) throw new Error(`${message}: ${path}`);
}

function bytesToMegabytes(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

await mkdir(publicIfcDir, { recursive: true });
await mkdir(publicWebIfcDir, { recursive: true });
await mkdir(dirname(publicManifestPath), { recursive: true });

const published = [];

for (const asset of assets) {
  assertFile(asset.sourcePath, `Missing source IFC for ${asset.label}`);
  const targetPath = join(publicIfcDir, asset.fileName);
  await cp(asset.sourcePath, targetPath);
  const stats = statSync(targetPath);
  published.push({
    id: asset.id,
    label: asset.label,
    publicUrl: `/external/bim/ifc/${asset.fileName}`,
    sizeMb: bytesToMegabytes(stats.size),
    sourcePath: asset.sourcePath,
  });
}

for (const fileName of webIfcRuntimeFiles) {
  const sourcePath = join(repoRoot, "node_modules/web-ifc", fileName);
  assertFile(sourcePath, `Missing web-ifc runtime file`);
  await cp(sourcePath, join(publicWebIfcDir, fileName));
}

await writeFile(
  publicManifestPath,
  `${JSON.stringify(
    {
      schema: "qianfeng.windops.ifc-assets.local.v1",
      generatedAt: new Date().toISOString(),
      assets: published,
      webIfcRuntimeUrl: "/external/bim/web-ifc/",
      notes: [
        "These IFC files are local development assets and are intentionally ignored by Git.",
        "Direct IFC loading is for source-model diagnostics. Large models may be slow or exceed browser memory.",
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(`Published IFC assets: ${publicIfcDir}`);
console.log(`Published web-ifc runtime: ${publicWebIfcDir}`);
