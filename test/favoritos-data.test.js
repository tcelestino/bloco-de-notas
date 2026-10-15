const { test } = require('node:test');
const assert = require('node:assert/strict');
const { loadFavoritos } = require('../src/_data/favoritos');

test('falha da API retorna lista vazia e avisa no console', async () => {
  const warnings = [];
  const result = await loadFavoritos({
    token: 't',
    fetchFn: async () => ({ ok: false, status: 500, json: async () => ({}) }),
    warn: (msg) => warnings.push(msg),
  });
  assert.deepEqual(result, []);
  assert.match(warnings[0], /favoritos.*500/i);
});

test('sem token retorna vazio e avisa que a secao foi omitida', async () => {
  const warnings = [];
  const result = await loadFavoritos({ token: '', warn: (m) => warnings.push(m) });
  assert.deepEqual(result, []);
  assert.match(warnings[0], /RAINDROP_TOKEN/);
});
