const { test } = require('node:test');
const assert = require('node:assert/strict');
const isoDate = require('../lib/filters/isoDate');

test('formata Date como YYYY-MM-DD', () => {
  assert.equal(isoDate(new Date('2025-10-20T00:00:00Z')), '2025-10-20');
});

test('aceita string de data', () => {
  assert.equal(isoDate('2024-01-05'), '2024-01-05');
});

test('data invalida falha com mensagem descritiva', () => {
  assert.throws(() => isoDate('nao-e-data'), /isoDate: data invalida: nao-e-data/);
});
