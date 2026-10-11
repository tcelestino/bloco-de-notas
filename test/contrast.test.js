const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readTokens, contrast } = require('./helpers/css-tokens');

const MIN = 4.5;
const { light, dark } = readTokens('main.css');

for (const [theme, t] of [['claro', light], ['escuro', dark]]) {
  for (const [fg, bg] of [
    ['fg', 'bg'],
    ['muted', 'bg'],
    ['accent', 'bg'],
    ['fg', 'code-bg'],
    ['accent', 'code-bg'],
  ]) {
    test(`tema ${theme}: ${fg} sobre ${bg} tem contraste AA`, () => {
      assert.ok(t[fg] && t[bg], `token ausente: ${fg} ou ${bg}`);
      const ratio = contrast(t[fg], t[bg]);
      assert.ok(ratio >= MIN, `${fg} ${t[fg]} sobre ${bg} ${t[bg]} = ${ratio.toFixed(2)}`);
    });
  }
}

test('main.css: escuro forcado pelo usuario usa os mesmos tokens do escuro do sistema', () => {
  assert.deepEqual(readTokens('main.css').forcedDark, dark);
});

test('syntax-highlighting.css: escuro forcado usa os mesmos tokens do escuro do sistema', () => {
  const syntax = readTokens('syntax-highlighting.css');
  assert.deepEqual(syntax.forcedDark, syntax.dark);
});
