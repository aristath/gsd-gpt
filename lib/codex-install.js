const path = require('path');

function expandTilde(filePath, home) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(home, filePath.slice(2));
  }
  return filePath;
}

function parseCodexInstallArgs(argv) {
  const args = argv.slice();
  const hasGlobal = args.includes('--global') || args.includes('-g');
  const hasLocal = args.includes('--local') || args.includes('-l');
  const hasHelp = args.includes('--help') || args.includes('-h');

  let codexDirArg = null;
  const codexDirIndex = args.findIndex((arg) => arg === '--codex-dir' || arg === '-c');
  if (codexDirIndex !== -1) {
    const nextArg = args[codexDirIndex + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      throw new Error('--codex-dir requires a path argument');
    }
    codexDirArg = nextArg;
  } else {
    const inlineArg = args.find(
      (arg) => arg.startsWith('--codex-dir=') || arg.startsWith('-c=')
    );
    if (inlineArg) {
      codexDirArg = inlineArg.split('=').slice(1).join('=');
    }
  }

  if (hasGlobal && hasLocal) {
    throw new Error('Cannot specify both --global and --local');
  }
  if (hasLocal && codexDirArg) {
    throw new Error('Cannot use --codex-dir with --local');
  }

  return { hasGlobal, hasLocal, hasHelp, codexDirArg };
}

function resolveCodexInstallDir({ isGlobal, codexDirArg, env, home, cwd }) {
  if (isGlobal) {
    const configuredCodexHome = expandTilde(codexDirArg, home) || expandTilde(env.CODEX_HOME, home);
    return configuredCodexHome || path.join(home, '.codex');
  }
  return path.join(cwd, '.codex');
}

module.exports = {
  parseCodexInstallArgs,
  resolveCodexInstallDir,
};
