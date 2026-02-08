#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { parseCodexInstallArgs, resolveCodexInstallDir } = require('../lib/codex-install');

const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

const pkg = require('../package.json');

function printHelp() {
  console.log(`  ${yellow}Usage:${reset} node bin/install-codex.js [options]\n
  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}              Install globally (to CODEX_HOME or ~/.codex)
    ${cyan}-l, --local${reset}               Install locally (to ./.codex)
    ${cyan}-c, --codex-dir <path>${reset}    Override global Codex home
    ${cyan}-h, --help${reset}                Show this help message\n
  ${yellow}Examples:${reset}
    node bin/install-codex.js --global
    node bin/install-codex.js --local
    node bin/install-codex.js --global --codex-dir ~/.codex-work\n`);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install({ isGlobal, codexDirArg }) {
  const codexHome = resolveCodexInstallDir({
    isGlobal,
    codexDirArg,
    env: process.env,
    home: os.homedir(),
    cwd: process.cwd(),
  });

  const skillsDest = path.join(codexHome, 'skills');
  const skillsSrc = path.join(__dirname, '..', 'codex-skills');
  const runtimeSrc = path.join(__dirname, '..', 'codex-runtime', 'get-shit-done');
  const runtimeDest = path.join(codexHome, 'get-shit-done');

  if (!fs.existsSync(skillsSrc)) {
    throw new Error('codex-skills directory is missing from this package');
  }
  if (!fs.existsSync(runtimeSrc)) {
    throw new Error('codex-runtime/get-shit-done directory is missing from this package');
  }

  fs.mkdirSync(skillsDest, { recursive: true });
  const skillDirs = fs.readdirSync(skillsSrc, { withFileTypes: true }).filter((e) => e.isDirectory());

  for (const skillDir of skillDirs) {
    copyDir(path.join(skillsSrc, skillDir.name), path.join(skillsDest, skillDir.name));
  }

  // Install shared runtime bundle (workflows/templates/references/commands).
  copyDir(runtimeSrc, runtimeDest);

  const locationLabel = codexHome.replace(os.homedir(), '~');
  console.log(`\n${cyan}Get Shit Done for Codex${reset} ${dim}v${pkg.version}${reset}`);
  console.log(`Installed ${green}${skillDirs.length}${reset} skills to ${cyan}${locationLabel}/skills${reset}`);
  console.log(`Installed runtime bundle to ${cyan}${locationLabel}/get-shit-done${reset}`);
  console.log(`Use skill names in prompts, e.g. ${cyan}gsd-help${reset}, ${cyan}gsd-new-project${reset}, ${cyan}gsd-plan-phase${reset}.\n`);
}

function main() {
  let parsed;
  try {
    parsed = parseCodexInstallArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`  ${yellow}${error.message}${reset}`);
    process.exit(1);
  }

  if (parsed.hasHelp) {
    printHelp();
    process.exit(0);
  }

  const isGlobal = parsed.hasLocal ? false : true;

  try {
    install({ isGlobal, codexDirArg: parsed.codexDirArg });
  } catch (error) {
    console.error(`  ${yellow}Install failed:${reset} ${error.message}`);
    process.exit(1);
  }
}

main();
