const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

let outDir;

function buildSite() {
  if (!outDir) {
    outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bloco-site-'));
    execFileSync(
      process.execPath,
      [path.join(__dirname, '..', '..', 'node_modules', '@11ty', 'eleventy', 'cmd.cjs'), `--output=${outDir}`, '--quiet'],
      { cwd: path.join(__dirname, '..', '..'), stdio: 'pipe' }
    );
  }
  return outDir;
}

function read(dir, rel) {
  return fs.readFileSync(path.join(dir, rel), 'utf8');
}

module.exports = { buildSite, read };
