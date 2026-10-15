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

test('titulo com <dialog> fica escapado nas listas de posts', () => {
  // a home lista so os posts mais recentes; o post do <dialog> so e garantido em posts.html
  assert.doesNotMatch(read(dir, 'index.html'), /<dialog/);
  const html = read(dir, 'posts.html');
  assert.doesNotMatch(html, /<dialog/);
  assert.match(html, /open do &lt;dialog&gt;<\/a>/);
});

test('home lista no maximo 3 posts', () => {
  const html = read(dir, 'index.html');
  const section = html.split('Últimas publicações')[1].split('Ver todos os posts')[0];
  assert.equal(count(section, /<li>/g), 3);
});

test('home omite "Últimos favoritos" quando nao ha favoritos', () => {
  assert.doesNotMatch(read(dir, 'index.html'), /Últimos favoritos/);
});

test('updates nao geram paginas individuais (sem h1 vazio)', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const entries = fs.readdirSync(path.join(dir, 'updates'));
  assert.deepEqual(entries, ['index.html']);
});

test('data do changelog fora do escopo .prose e sem h2 dentro dele', () => {
  const html = read(dir, 'updates/index.html');
  assert.doesNotMatch(html, /<article class="prose">\s*<h2/);
  assert.match(html, /<h2 class="section-title"><time/);
});

test('links dentro de .intro e rodape tem sublinhado visivel', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'assets', 'css', 'main.css'), 'utf8');
  assert.match(css, /\.intro a,\s*\.site-footer p a\s*\{[^}]*text-decoration-color:\s*currentColor/);
});

test('botao de tema: icones, nome acessivel, escondido ate o JS rodar e script antes do CSS', () => {
  const html = read(dir, 'index.html');
  const item = html.match(/<li hidden>\s*(<button[^>]*id="theme-toggle"[\s\S]*?<\/button>)\s*<\/li>/);
  assert.ok(item, 'botao dentro de <li hidden>');
  const button = item[1];
  assert.match(button, /type="button"/);
  assert.match(button, /data-mode="light"/);
  assert.match(button, /aria-label="Ativar modo escuro"/);
  assert.match(button, /title="Ativar modo escuro"/);
  assert.doesNotMatch(button, /aria-pressed/);
  assert.match(button, /class="icon icon-moon"[^>]*aria-hidden="true"/);
  assert.match(button, /class="icon icon-sun"[^>]*aria-hidden="true"/);
  assert.doesNotMatch(button.replace(/<svg[\s\S]*?<\/svg>/g, ''), />\s*\S[^<]*</, 'sem texto visivel');
  const script = html.indexOf('<script>');
  assert.ok(script > -1 && script < html.indexOf('rel="stylesheet"'), 'script de tema deve vir antes do CSS (evita flash)');
});

test('css mostra so o icone do estado atual do botao de tema', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'assets', 'css', 'main.css'), 'utf8');
  assert.match(css, /#theme-toggle\[data-mode='light'\] \.icon-sun\s*\{[^}]*display:\s*none/);
  assert.match(css, /#theme-toggle\[data-mode='dark'\] \.icon-moon\s*\{[^}]*display:\s*none/);
});
