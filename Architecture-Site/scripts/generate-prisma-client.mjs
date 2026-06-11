import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const appRoot = process.cwd();
const schemaPath = resolve(appRoot, "../packages/db/prisma/schema.prisma");
const localClientDir = resolve(appRoot, "node_modules/.prisma/client");

rmSync(localClientDir, { recursive: true, force: true });

execFileSync("prisma", ["generate", "--schema", schemaPath], {
  cwd: appRoot,
  stdio: "inherit",
  shell: process.platform === "win32",
});

const generatedClientCandidates = [
  localClientDir,
  resolve(appRoot, "../node_modules/.prisma/client"),
  resolve(appRoot, "../packages/db/node_modules/.prisma/client"),
];

const generatedClientDir = generatedClientCandidates.find((candidate) => existsSync(candidate));

if (!generatedClientDir) {
  throw new Error(
    `Generated Prisma client not found. Checked:\n${generatedClientCandidates.join("\n")}`
  );
}

if (generatedClientDir !== localClientDir) {
  mkdirSync(dirname(localClientDir), { recursive: true });
  cpSync(generatedClientDir, localClientDir, { recursive: true });
}

console.log(`Synced Prisma client to ${localClientDir}`);
