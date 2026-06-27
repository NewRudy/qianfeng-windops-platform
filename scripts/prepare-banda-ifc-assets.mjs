import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { cp, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const sourceDir =
  process.env.WINDOPS_BANDA_IFC_SOURCE_DIR ??
  "/Users/rudy/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_v8cyyrd6qx8h12_1bc1/msg/file/2026-06/ifc文件/ifc文件";

const ifcPublicDir = join(repoRoot, "apps/xeokit-viewer/public/external/bim/ifc/banda-camp-core");
const xktCacheDir = join(repoRoot, "data/external/bim/xkt/banda-camp-core");
const xktPublicDir = join(repoRoot, "apps/xeokit-viewer/public/external/bim/xkt/banda-camp-core");
const webIfcPublicDir = join(repoRoot, "apps/xeokit-viewer/public/external/bim/web-ifc");
const manifestPath = join(repoRoot, "data/external/bim/banda-camp-core.manifest.local.json");
const publicManifestPath = join(
  repoRoot,
  "apps/xeokit-viewer/public/external/bim/banda-camp-core.manifest.local.json",
);
const converterScript = join(repoRoot, "node_modules/@xeokit/xeokit-convert/convert2xkt.js");

const webIfcRuntimeFiles = ["web-ifc.wasm", "web-ifc-mt.wasm", "web-ifc-mt.worker.js"];

const assets = [
  {
    id: "office-center-architecture",
    label: "01 办公中心建筑",
    sourceFile: "01办公中心建筑设计图.ifc",
    fileBase: "office-center-architecture",
    position: [-120, 0, 0],
    heapMb: 4096,
  },
  {
    id: "multipurpose-building-architecture",
    label: "02 多功能综合楼建筑",
    sourceFile: "02多功能综合楼建筑设计图.ifc",
    fileBase: "multipurpose-building-architecture",
    position: [0, 0, 0],
    heapMb: 3072,
  },
  {
    id: "staff-rest-building-architecture",
    label: "03 职工休息楼建筑",
    sourceFile: "03职工休息楼建筑设计图.ifc",
    fileBase: "staff-rest-building-architecture",
    position: [120, 0, 0],
    heapMb: 4096,
  },
  {
    id: "staff-sports-center",
    label: "04 职工运动中心",
    sourceFile: "04职工运动中心.ifc",
    fileBase: "staff-sports-center",
    position: [-60, 0, 110],
    heapMb: 3072,
  },
  {
    id: "duty-building-1",
    label: "05 1# 值班楼",
    sourceFile: "05-1#值班楼.ifc",
    fileBase: "duty-building-1",
    position: [80, 0, 120],
    heapMb: 3072,
  },
];

function assertFile(path, message) {
  if (!existsSync(path)) throw new Error(`${message}: ${path}`);
}

function bytesToMegabytes(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
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

await mkdir(ifcPublicDir, { recursive: true });
await mkdir(xktCacheDir, { recursive: true });
await mkdir(xktPublicDir, { recursive: true });
await mkdir(webIfcPublicDir, { recursive: true });
await mkdir(dirname(manifestPath), { recursive: true });
await mkdir(dirname(publicManifestPath), { recursive: true });

const prepared = [];

for (const asset of assets) {
  const sourcePath = join(sourceDir, asset.sourceFile);
  assertFile(sourcePath, `Missing source IFC for ${asset.label}`);

  const ifcName = `${asset.fileBase}.ifc`;
  const xktName = `${asset.fileBase}.xkt`;
  const publicIfcPath = join(ifcPublicDir, ifcName);
  const cacheXktPath = join(xktCacheDir, xktName);
  const publicXktPath = join(xktPublicDir, xktName);

  await cp(sourcePath, publicIfcPath);
  runConverter(asset, publicIfcPath, cacheXktPath);
  await cp(cacheXktPath, publicXktPath);

  prepared.push({
    id: asset.id,
    label: asset.label,
    sourcePath,
    ifcUrl: `/external/bim/ifc/banda-camp-core/${ifcName}`,
    xktUrl: `/external/bim/xkt/banda-camp-core/${xktName}`,
    position: asset.position,
    ifcSizeMb: bytesToMegabytes(statSync(publicIfcPath).size),
    xktSizeMb: bytesToMegabytes(statSync(publicXktPath).size),
  });
}

for (const fileName of webIfcRuntimeFiles) {
  const sourcePath = join(repoRoot, "node_modules/web-ifc", fileName);
  assertFile(sourcePath, "Missing web-ifc runtime file");
  await cp(sourcePath, join(webIfcPublicDir, fileName));
}

const manifest = {
  schema: "qianfeng.windops.banda-camp-core.v1",
  generatedAt: new Date().toISOString(),
  sourceDir,
  assets: prepared,
  notes: [
    "Core validation set only. Excludes huge terrain and masterplan IFCs to keep browser tests meaningful.",
    "IFC files are local ignored assets. XKT output can be reviewed before deciding whether to publish.",
  ],
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(publicManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Prepared Banda camp IFC/XKT assets: ${manifestPath}`);
