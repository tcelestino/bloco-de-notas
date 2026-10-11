const fs = require('node:fs');
const path = require('node:path');

const cssDir = path.join(__dirname, '..', '..', 'src', 'assets', 'css');

function parseVars(block) {
  const vars = {};
  for (const [, name, value] of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    vars[name] = value;
  }
  return vars;
}

// Le o bloco :root claro e o bloco :root dentro de @media (prefers-color-scheme: dark).
function readTokens(file) {
  const css = fs.readFileSync(path.join(cssDir, file), 'utf8');
  const dark = css.match(/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/);
  const light = css.match(/(?:^|\})\s*:root\s*\{([^}]*)\}/);
  if (!light) throw new Error(`Bloco :root claro nao encontrado em ${file}`);
  if (!dark) throw new Error(`Bloco :root escuro nao encontrado em ${file}`);
  return { light: parseVars(light[1]), dark: parseVars(dark[1]) };
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

module.exports = { readTokens, contrast };
