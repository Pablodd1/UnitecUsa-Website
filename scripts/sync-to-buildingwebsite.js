const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcRoot = path.join(__dirname, "..");
const dstRoot = path.join(__dirname, "..", "..", "BuildingWebsite");

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dst, item));
    }
  } else {
    const dir = path.dirname(dst);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

const statusOutput = execSync("git status --porcelain", { cwd: srcRoot, encoding: "utf8" });
const lines = statusOutput.split(/\r?\n/).filter(Boolean);

let copiedCount = 0;
for (const line of lines) {
  const relPath = line.slice(3).trim();
  if (!relPath) continue;
  const srcPath = path.join(srcRoot, relPath);
  const dstPath = path.join(dstRoot, relPath);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, dstPath);
    copiedCount++;
  }
}

console.log(`Synced ${copiedCount} paths from UnitecUsa-Website to BuildingWebsite.`);
