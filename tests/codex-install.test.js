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

test('codex skills match key artifact paths from original GSD', () => {
  const fs = require('fs');
  const path = require('path');

  const runtimeCmdRoot = path.join(__dirname, '..', 'codex-runtime', 'get-shit-done', 'commands');
  const readCmd = (name) => fs.readFileSync(path.join(runtimeCmdRoot, name + '.md'), 'utf8');

  // Todos are directory-based in original GSD (.planning/todos/pending + done).
  const addTodo = readCmd('add-todo');
  assert.match(addTodo, /\.planning\/todos\/pending/);
  assert.match(addTodo, /\.planning\/todos\/done/);

  const checkTodos = readCmd('check-todos');
  assert.match(checkTodos, /\.planning\/todos\/pending/);
  assert.match(checkTodos, /\.planning\/todos\/done/);

  // Pause/resume uses per-phase .continue-here.md in original GSD.
  const pauseWork = readCmd('pause-work');
  assert.match(pauseWork, /\.planning\/phases\//);
  assert.match(pauseWork, /\.continue-here\.md/);

  // resume-work delegates to resume-project workflow in original GSD; the workflow contains
  // the concrete .continue-here detection/resumption logic.
  const resumeProject = fs.readFileSync(
    path.join(__dirname, '..', 'codex-runtime', 'get-shit-done', 'workflows', 'resume-project.md'),
    'utf8'
  );
  assert.match(resumeProject, /\.continue-here/);
});

test('codex installer package contains a shared gsd runtime bundle', () => {
  const fs = require('fs');
  const path = require('path');

  const repoRoot = path.join(__dirname, '..');
  const bundleRoot = path.join(repoRoot, 'codex-runtime', 'get-shit-done');

  assert.ok(fs.existsSync(bundleRoot), 'missing codex-runtime/get-shit-done');
  assert.ok(fs.existsSync(path.join(bundleRoot, 'workflows')), 'missing workflows/');
  assert.ok(fs.existsSync(path.join(bundleRoot, 'templates')), 'missing templates/');
  assert.ok(fs.existsSync(path.join(bundleRoot, 'references')), 'missing references/');
});

test('codex runtime bundle includes command docs for every codex skill', () => {
  const fs = require('fs');
  const path = require('path');

  const repoRoot = path.join(__dirname, '..');
  const skillsRoot = path.join(repoRoot, 'codex-skills');
  const runtimeCmdRoot = path.join(repoRoot, 'codex-runtime', 'get-shit-done', 'commands');

  const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skill of skillDirs) {
    const cmdName = skill.replace(/^gsd-/, '');
    const cmdPath = path.join(runtimeCmdRoot, cmdName + '.md');
    assert.ok(fs.existsSync(cmdPath), `missing runtime command doc: ${cmdName}.md`);
  }
});

test('each codex skill delegates to runtime command doc (strict parity)', () => {
  const fs = require('fs');
  const path = require('path');

  const repoRoot = path.join(__dirname, '..');
  const skillsRoot = path.join(repoRoot, 'codex-skills');

  const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skill of skillDirs) {
    const cmdName = skill.replace(/^gsd-/, '');
    const skillPath = path.join(skillsRoot, skill, 'SKILL.md');
    const content = fs.readFileSync(skillPath, 'utf8');
    assert.match(content, /get-shit-done\/commands\//);
    assert.ok(
      content.includes(`get-shit-done/commands/${cmdName}.md`),
      `skill does not reference expected runtime command: ${cmdName}.md`
    );
  }
});

test('install-codex installs runtime bundle into target codex home', () => {
  const fs = require('fs');
  const path = require('path');
  const os = require('os');
  const cp = require('child_process');

  const repoRoot = path.join(__dirname, '..');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-codex-test-'));
  const codexHome = path.join(tmp, 'codex-home');

  cp.execFileSync('node', ['bin/install-codex.js', '--global', '--codex-dir', codexHome], {
    cwd: repoRoot,
    stdio: 'ignore',
  });

  // Skills
  assert.ok(
    fs.existsSync(path.join(codexHome, 'skills', 'gsd-help', 'SKILL.md')),
    'missing installed skill'
  );

  // Runtime bundle
  assert.ok(
    fs.existsSync(path.join(codexHome, 'get-shit-done', 'workflows', 'execute-phase.md')),
    'missing installed runtime workflow'
  );
  assert.ok(
    fs.existsSync(path.join(codexHome, 'get-shit-done', 'templates', 'project.md')),
    'missing installed runtime template'
  );
  assert.ok(
    fs.existsSync(path.join(codexHome, 'get-shit-done', 'references', 'principles.md')),
    'missing installed runtime reference'
  );
});

test('runtime command docs are codex-native (no claude slash commands or tool directives)', () => {
  const fs = require('fs');
  const path = require('path');

  const repoRoot = path.join(__dirname, '..');
  const cmdRoot = path.join(repoRoot, 'codex-runtime', 'get-shit-done', 'commands');

  const files = fs.readdirSync(cmdRoot).filter((f) => f.endsWith('.md')).sort();
  assert.ok(files.length > 0, 'no runtime command docs found');

  for (const f of files) {
    const content = fs.readFileSync(path.join(cmdRoot, f), 'utf8');
    assert.equal(content.includes('/gsd:'), false, `${f} contains /gsd:`);
    assert.equal(content.includes('AskUserQuestion'), false, `${f} contains AskUserQuestion`);
    assert.equal(content.includes('SlashCommand'), false, `${f} contains SlashCommand`);
    assert.equal(content.includes('allowed-tools:'), false, `${f} contains allowed-tools`);
    // Claude include syntax is not supported in Codex; we install files to a stable location instead.
    assert.equal(content.includes('\n@'), false, `${f} contains @ include syntax`);
    assert.equal(content.includes('`@'), false, `${f} contains @ include syntax`);
  }
});
