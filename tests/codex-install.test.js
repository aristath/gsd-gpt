const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseCodexInstallArgs,
  resolveCodexInstallDir,
} = require('../lib/codex-install');

test('parseCodexInstallArgs parses --global and --help', () => {
  const parsed = parseCodexInstallArgs(['--global', '--help']);
  assert.equal(parsed.hasGlobal, true);
  assert.equal(parsed.hasLocal, false);
  assert.equal(parsed.hasHelp, true);
  assert.equal(parsed.codexDirArg, null);
});

test('parseCodexInstallArgs parses --codex-dir both forms', () => {
  const parsedA = parseCodexInstallArgs(['--global', '--codex-dir', '~/custom/.codex']);
  assert.equal(parsedA.codexDirArg, '~/custom/.codex');

  const parsedB = parseCodexInstallArgs(['--global', '--codex-dir=/tmp/codex']);
  assert.equal(parsedB.codexDirArg, '/tmp/codex');
});

test('parseCodexInstallArgs rejects conflicting flags', () => {
  assert.throws(
    () => parseCodexInstallArgs(['--global', '--local']),
    /Cannot specify both --global and --local/
  );
});

test('parseCodexInstallArgs rejects --codex-dir with --local', () => {
  assert.throws(
    () => parseCodexInstallArgs(['--local', '--codex-dir', '/tmp/foo']),
    /Cannot use --codex-dir with --local/
  );
});

test('resolveCodexInstallDir uses global default and local cwd', () => {
  const home = '/home/dev';
  const cwd = '/work/repo';

  const globalPath = resolveCodexInstallDir({
    isGlobal: true,
    codexDirArg: null,
    env: {},
    home,
    cwd,
  });
  assert.equal(globalPath, '/home/dev/.codex');

  const localPath = resolveCodexInstallDir({
    isGlobal: false,
    codexDirArg: null,
    env: {},
    home,
    cwd,
  });
  assert.equal(localPath, '/work/repo/.codex');
});

test('resolveCodexInstallDir precedence: arg > env > default', () => {
  const pathFromArg = resolveCodexInstallDir({
    isGlobal: true,
    codexDirArg: '~/arg-codex',
    env: { CODEX_HOME: '/env/codex' },
    home: '/home/dev',
    cwd: '/work/repo',
  });
  assert.equal(pathFromArg, '/home/dev/arg-codex');

  const pathFromEnv = resolveCodexInstallDir({
    isGlobal: true,
    codexDirArg: null,
    env: { CODEX_HOME: '/env/codex' },
    home: '/home/dev',
    cwd: '/work/repo',
  });
  assert.equal(pathFromEnv, '/env/codex');
});

test('gsd-help enumerates every installed codex skill', () => {
  const fs = require('fs');
  const path = require('path');

  const skillsRoot = path.join(__dirname, '..', 'codex-skills');
  const dirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const helpPath = path.join(skillsRoot, 'gsd-help', 'SKILL.md');
  const helpContent = fs.readFileSync(helpPath, 'utf8');

  for (const skill of dirs) {
    assert.match(helpContent, new RegExp('`' + skill + '`'));
  }
});
