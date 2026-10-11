const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readTokens, contrast } = require('./helpers/css-tokens');

const main = readTokens('main.css');
const syntax = readTokens('syntax-highlighting.css');
const names = ['tok-comment', 'tok-keyword', 'tok-string', 'tok-number', 'tok-func'];

for (const theme of ['light', 'dark']) {
  for (const name of names) {
    test(`${theme}: ${name} sobre code-bg tem contraste AA`, () => {
      assert.ok(syntax[theme][name], `token ausente: ${name}`);
      const ratio = contrast(syntax[theme][name], main[theme]['code-bg']);
      assert.ok(ratio >= 4.5, `${name} ${syntax[theme][name]} = ${ratio.toFixed(2)}`);
    });
  }
}
