import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const defaultWindIfc =
  "/Users/rudy/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_v8cyyrd6qx8h12_1bc1/msg/file/2026-06/风机.ifc";
const defaultFactoryIfc =
  "/Users/rudy/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_v8cyyrd6qx8h12_1bc1/msg/file/2026-06/厂房总图.ifc";

const ifcCacheDir =
  process.env.WINDOPS_BIM_IFC_CACHE_DIR ?? join(repoRoot, "data/external/bim/ifc");
const xktCacheDir =
  process.env.WINDOPS_BIM_XKT_CACHE_DIR ?? join(repoRoot, "data/external/bim/xkt");
const publicXktDir =
  process.env.WINDOPS_BIM_PUBLIC_XKT_DIR ??
  join(repoRoot, "apps/xeokit-viewer/public/external/bim/xkt");
const publicManifestPath = join(repoRoot, "apps/xeokit-viewer/public/external/bim/manifest.local.json");
const localManifestPath = join(repoRoot, "data/external/bim/manifest.local.json");
const converterScript = join(repoRoot, "node_modules/@xeokit/xeokit-convert/convert2xkt.js");

const assets = [
  {
    id: "wind-turbines",
    label: "多风机 IFC",
    sourcePath: process.env.WINDOPS_WIND_IFC_SOURCE ?? defaultWindIfc,
    cachedIfcName: "wind-turbines.ifc",
    xktName: "wind-turbines.xkt",
    heapMb: 2048,
    note: "多风机 IFC 轻量模型，用于验证机组资产与 GIS 点位的关联。",
  },
  {
    id: "factory-masterplan",
    label: "厂房总图 IFC",
    sourcePath: process.env.WINDOPS_FACTORY_IFC_SOURCE ?? defaultFactoryIfc,
    cachedIfcName: "factory-masterplan.ifc",
    xktName: "factory-masterplan.xkt",
    heapMb: 8192,
    note: "厂房总图模型较大，用于验证大型 BIM 资产的 XKT 加载边界。",
  },
];

function bytesToMegabytes(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}

function assertFile(path, message) {
  if (!existsSync(path)) throw new Error(`${message}: ${path}`);
}

function runConverter(asset, ifcPath, xktPath) {
  execFileSync(
    process.execPath,
    [
      `--max-old-space-size=${asset.heapMb}`,
      converterScript,
      "-s",
      ifcPath,
      "-f",
      "ifc",
      "-o",
      xktPath,
      "-l",
    ],
    {
      cwd: repoRoot,
      stdio: "inherit",
    },
  );
}

assertFile(converterScript, "Missing xeokit converter. Run npm install first");

await mkdir(ifcCacheDir, { recursive: true });
await mkdir(xktCacheDir, { recursive: true });
await mkdir(publicXktDir, { recursive: true });
await mkdir(dirname(localManifestPath), { recursive: true });
await mkdir(dirname(publicManifestPath), { recursive: true });

const converted = [];

for (const asset of assets) {
  assertFile(asset.sourcePath, `Missing source IFC for ${asset.label}`);

  const cachedIfcPath = join(ifcCacheDir, asset.cachedIfcName);
  const xktPath = join(xktCacheDir, asset.xktName);
  const publicXktPath = join(publicXktDir, asset.xktName);

  await cp(asset.sourcePath, cachedIfcPath);
  runConverter(asset, cachedIfcPath, xktPath);
  await cp(xktPath, publicXktPath);

  const ifcStats = statSync(cachedIfcPath);
  const xktStats = statSync(xktPath);

  converted.push({
    id: asset.id,
    label: asset.label,
    note: asset.note,
    sourcePath: asset.sourcePath,
    cachedIfcPath,
    xktPath,
    publicUrl: `/external/bim/xkt/${asset.xktName}`,
    ifcSizeMb: bytesToMegabytes(ifcStats.size),
    xktSizeMb: bytesToMegabytes(xktStats.size),
    convertedAt: new Date().toISOString(),
    conversionTool: "@xeokit/xeokit-convert convert2xkt",
  });
}

const manifest = {
  schema: "qianfeng.windops.bim-assets.local.v1",
  generatedAt: new Date().toISOString(),
  assets: converted,
  notes: [
    "This manifest and generated model files are local development assets and are intentionally ignored by Git.",
    "Direct IFC conversion is enough for prototype verification. For production BIM metadata fidelity, prefer a vetted IFC to glTF/XKT pipeline with model QA.",
  ],
};

await writeFile(localManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(publicManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated local BIM manifest: ${localManifestPath}`);
console.log(`Published local BIM assets for Vite: ${publicXktDir}`);
