import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const appRoot = process.cwd();
const schemaPath = resolve(appRoot, "../packages/db/prisma/schema.prisma");
const rootClientDir = resolve(appRoot, "../node_modules/.prisma/client");
const localClientDir = resolve(appRoot, "node_modules/.prisma/client");

execFileSync("prisma", ["generate", "--schema", schemaPath], {
  cwd: appRoot,
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (!existsSync(rootClientDir)) {
  throw new Error(`Generated Prisma client not found at ${rootClientDir}`);
}

rmSync(localClientDir, { recursive: true, force: true });
mkdirSync(dirname(localClientDir), { recursive: true });
cpSync(rootClientDir, localClientDir, { recursive: true });

console.log(`Synced Prisma client to ${localClientDir}`);
