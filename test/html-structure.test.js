const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const { buildSite, read } = require('./helpers/build');

let dir;
before(() => {
  dir = buildSite();
});

const count = (html, re) => (html.match(re) || []).length;

const pages = {
  home: 'index.html',
  posts: 'posts.html',
  changelog: 'updates/index.html',
  '404': '404.html',
};

for (const [name, file] of Object.entries(pages)) {
  test(`${name}: lang pt-BR, skip link, landmarks e um unico h1`, () => {
    const html = read(dir, file);
    assert.match(html, /<html lang="pt-BR">/);
    assert.match(html, /<a class="skip" href="#conteudo">/);
    assert.equal(count(html, /<main[\s>]/g), 1, 'deve haver exatamente um <main>');
    assert.match(html, /<main id="conteudo"/);
    assert.equal(count(html, /<h1[\s>]/g), 1, 'deve haver exatamente um <h1>');
    assert.equal(count(html, /<nav[\s>]/g), 1, 'cabecalho tem um nav');
    assert.match(html, /<nav class="site-nav" aria-label="Principal">/);
    assert.match(html, /<footer class="site-footer wrap">/);
  });
}

test('item ativo do menu recebe aria-current', () => {
  const html = read(dir, 'updates/index.html');
  assert.match(html, /<a href="\/updates\/" aria-current="page">/);
  assert.doesNotMatch(read(dir, 'index.html'), /aria-current/);
});

test('links externos do rodape nao abrem nova aba', () => {
  assert.doesNotMatch(read(dir, 'index.html'), /target="_blank"/);
});

test('CSS referenciado sem @import e fonte via Google Fonts com preconnect', () => {
  const html = read(dir, 'index.html');
  assert.match(html, /<link rel="stylesheet" href="\/assets\/css\/main\.css"/);
  assert.match(html, /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com"/);
  assert.match(html, /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin/);
  assert.match(html, /fonts\.googleapis\.com\/css2\?family=IBM\+Plex\+Sans:ital,wght@0,400;0,500;1,400&(?:amp;)?display=swap/);
  assert.doesNotMatch(html, /\.woff2/);
});

test('lista de posts: datetime valido e titulo com entidade sem escape duplo', () => {
  const html = read(dir, 'posts.html');
  const datetimes = [...html.matchAll(/<time datetime="([^"]*)"/g)].map((m) => m[1]);
  assert.ok(datetimes.length > 10);
  for (const d of datetimes) assert.match(d, /^\d{4}-\d{2}-\d{2}$/);
  assert.doesNotMatch(html, /&amp;amp;/);
});

test('posts.html agrupa por ano com h2 em ordem decrescente', () => {
  const years = [...read(dir, 'posts.html').matchAll(/<h2 class="section-title">(\d{4})<\/h2>/g)].map((m) => Number(m[1]));
  assert.ok(years.length >= 2);
  assert.deepEqual(years, [...years].sort((a, b) => b - a));
});
