const { test } = require('node:test');
const assert = require('node:assert/strict');
const preTabindex = require('../lib/transforms/pre-tabindex');

test('adiciona tabindex a pre sem tabindex', () => {
  assert.equal(preTabindex('<pre class="language-js">x</pre>'), '<pre class="language-js" tabindex="0">x</pre>');
});

test('nao duplica tabindex existente', () => {
  const html = '<pre class="language-js" tabindex="0">x</pre>';
  assert.equal(preTabindex(html), html);
});

test('cobre pre sem atributos e varios blocos', () => {
  assert.equal(preTabindex('<pre>a</pre><pre>b</pre>'), '<pre tabindex="0">a</pre><pre tabindex="0">b</pre>');
});

test('nao altera tags que apenas comecam com pre', () => {
  assert.equal(preTabindex('<prefix>a</prefix>'), '<prefix>a</prefix>');
});
