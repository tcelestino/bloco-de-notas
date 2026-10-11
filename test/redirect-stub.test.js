const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const stubDir = path.join(__dirname, '..', 'redirect-stub');
const html = fs.readFileSync(path.join(stubDir, '404.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function redirectFor(pathname, search = '', hash = '') {
  let target = null;
  const location = { pathname, search, hash, replace: (url) => (target = url) };
  vm.runInNewContext(script, { location });
  return target;
}

test('mantem caminho profundo', () => {
  assert.equal(
    redirectFor('/bloco-de-notas/2025/10/um-novo-comeco/'),
    'https://blog.tcelestino.dev.br/2025/10/um-novo-comeco/'
  );
});

test('raiz com barra vai para a raiz', () => {
  assert.equal(redirectFor('/bloco-de-notas/'), 'https://blog.tcelestino.dev.br/');
});

test('raiz sem barra vai para a raiz', () => {
  assert.equal(redirectFor('/bloco-de-notas'), 'https://blog.tcelestino.dev.br/');
});

test('nao corta prefixo parecido', () => {
  assert.equal(redirectFor('/bloco-de-notas-outro/x'), 'https://blog.tcelestino.dev.br/bloco-de-notas-outro/x');
});

test('preserva query string e hash', () => {
  assert.equal(
    redirectFor('/bloco-de-notas/posts.html', '?a=1', '#secao'),
    'https://blog.tcelestino.dev.br/posts.html?a=1#secao'
  );
});

test('feed antigo avisa da mudanca e aponta para o feed novo', () => {
  const feed = fs.readFileSync(path.join(stubDir, 'feed.xml'), 'utf8');
  assert.match(feed, /<rss version="2.0"/);
  assert.match(feed, /https:\/\/blog\.tcelestino\.dev\.br\/feed\.xml/);
  assert.equal((feed.match(/<item>/g) || []).length, 1);
});
