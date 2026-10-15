const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  fetchFavoritos,
  isYoutube,
  normalize,
  excludedCollectionIds,
} = require('../lib/raindrop');

const item = (n, over = {}) => ({
  title: `Item ${n}`,
  link: `https://site${n}.com/a`,
  domain: `site${n}.com`,
  collection: { $id: 1 },
  ...over,
});

// fetch falso: roteia por URL
const fakeFetch = ({ collections = [], childrens = [], pages = [[]] }) => {
  const calls = [];
  const fn = async (url, opts) => {
    calls.push({ url, opts });
    const json = (body) => ({ ok: true, status: 200, json: async () => body });
    if (url.endsWith('/collections/childrens')) return json({ items: childrens });
    if (url.endsWith('/collections')) return json({ items: collections });
    const page = Number(new URL(url).searchParams.get('page'));
    return json({ items: pages[page] ?? [] });
  };
  fn.calls = calls;
  return fn;
};

test('normalize remove acento e caixa', () => {
  assert.equal(normalize('Vídeos'), 'videos');
});

test('isYoutube cobre subdominios e youtu.be, sem falso positivo', () => {
  assert.equal(isYoutube('https://www.youtube.com/watch?v=1'), true);
  assert.equal(isYoutube('https://m.youtube.com/watch?v=1'), true);
  assert.equal(isYoutube('https://youtu.be/abc'), true);
  assert.equal(isYoutube('https://notyoutube.com/x'), false);
  assert.equal(isYoutube('url invalida'), false);
});

test('excludedCollectionIds inclui a colecao e suas filhas', () => {
  const roots = [{ _id: 10, title: 'Vídeos' }, { _id: 11, title: 'Dev' }];
  const children = [
    { _id: 12, title: 'Palestras', parent: { $id: 10 } },
    { _id: 13, title: 'Outra', parent: { $id: 11 } },
  ];
  const ids = excludedCollectionIds([...roots, ...children], 'videos');
  assert.deepEqual([...ids].sort(), [10, 12]);
});

test('sem token retorna lista vazia e nao chama a API', async () => {
  const f = fakeFetch({});
  assert.deepEqual(await fetchFavoritos({ token: '', fetchFn: f }), []);
  assert.equal(f.calls.length, 0);
});

test('retorna os 5 mais recentes enviando o token', async () => {
  const f = fakeFetch({ pages: [[1, 2, 3, 4, 5, 6, 7].map((n) => item(n))] });
  const result = await fetchFavoritos({ token: 'abc', fetchFn: f });
  assert.equal(result.length, 5);
  assert.deepEqual(result[0], { title: 'Item 1', link: 'https://site1.com/a', domain: 'site1.com' });
  assert.equal(f.calls[0].opts.headers.Authorization, 'Bearer abc');
});

test('exclui colecao videos (e filhas) e youtube', async () => {
  const f = fakeFetch({
    collections: [{ _id: 10, title: 'Vídeos' }],
    childrens: [{ _id: 12, title: 'Palestras', parent: { $id: 10 } }],
    pages: [[
      item(1, { collection: { $id: 10 } }),
      item(2, { collection: { $id: 12 } }),
      item(3, { link: 'https://www.youtube.com/watch?v=1', domain: 'youtube.com' }),
      item(4),
    ]],
  });
  const result = await fetchFavoritos({ token: 't', fetchFn: f });
  assert.deepEqual(result.map((r) => r.title), ['Item 4']);
});

test('busca proxima pagina quando a primeira nao completa o limite', async () => {
  const yt = (n) => item(n, { link: `https://youtube.com/${n}`, domain: 'youtube.com' });
  const f = fakeFetch({ pages: [[yt(1), yt(2), item(3)], [item(4), item(5), item(6), item(7), item(8)]] });
  const result = await fetchFavoritos({ token: 't', fetchFn: f, limit: 5 });
  assert.deepEqual(result.map((r) => r.title), ['Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7']);
});

test('titulo vazio usa o link', async () => {
  const f = fakeFetch({ pages: [[item(1, { title: '  ' })]] });
  const [r] = await fetchFavoritos({ token: 't', fetchFn: f });
  assert.equal(r.title, 'https://site1.com/a');
});

test('erro HTTP lanca com contexto', async () => {
  const fn = async () => ({ ok: false, status: 401, json: async () => ({}) });
  await assert.rejects(fetchFavoritos({ token: 't', fetchFn: fn }), /Raindrop.*401/);
});
