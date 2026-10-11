const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildSite } = require('./helpers/build');

let dir;
before(() => {
  dir = buildSite();
});

function allHtml(root) {
  return fs.readdirSync(root, { withFileTypes: true, recursive: true })
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => path.join(e.parentPath, e.name));
}

const postFiles = () => allHtml(dir).filter((f) => /\/\d{4}\/\d{2}\//.test(f));

test('todo post tem um h1, article.prose e time com datetime ISO', () => {
  const files = postFiles();
  assert.ok(files.length > 20, `esperava dezenas de posts, achou ${files.length}`);
  for (const f of files) {
    const html = fs.readFileSync(f, 'utf8');
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, f);
    assert.match(html, /<article class="prose">/, f);
    assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}">/, f);
  }
});

test('todo pre tem tabindex para rolagem por teclado', () => {
  let found = 0;
  for (const f of postFiles()) {
    for (const [tag] of fs.readFileSync(f, 'utf8').matchAll(/<pre[\s>][^>]*>/g)) {
      found += 1;
      assert.match(tag, /tabindex="0"/, `${f}: ${tag}`);
    }
  }
  assert.ok(found > 0, 'nenhum <pre> encontrado nos posts');
});

test('nenhum post tem hierarquia de heading pulando nivel', () => {
  for (const f of postFiles()) {
    const levels = [...fs.readFileSync(f, 'utf8').matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    for (let i = 1; i < levels.length; i += 1) {
      if (levels[i] - levels[i - 1] > 1) {
        assert.fail(`${f}: salto de h${levels[i - 1]} para h${levels[i]}`);
      }
    }
  }
});
