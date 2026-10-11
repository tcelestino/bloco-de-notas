const { test } = require('node:test');
const assert = require('node:assert/strict');
const postsByYear = require('../lib/collections/postsByYear');

const item = (date, title) => ({ date: new Date(date), data: { title } });

// getFilteredByGlob devolve em ordem crescente de data; a colecao inverte.
const api = (items) => ({ getFilteredByGlob: () => items });

test('agrupa por ano, anos e posts em ordem decrescente', () => {
  const result = postsByYear(
    api([item('2024-03-01', 'a'), item('2025-01-10', 'b'), item('2025-06-02', 'c')])
  );
  assert.deepEqual(
    result.map((g) => [g.year, g.posts.map((p) => p.data.title)]),
    [
      [2025, ['c', 'b']],
      [2024, ['a']],
    ]
  );
});

test('lista vazia gera colecao vazia', () => {
  assert.deepEqual(postsByYear(api([])), []);
});

test('usa o ano UTC da data (virada de ano nao muda de grupo)', () => {
  const result = postsByYear(api([item('2025-01-01T00:00:00Z', 'x')]));
  assert.equal(result[0].year, 2025);
});
