const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'src', '_includes', 'theme.js'), 'utf8');

// Monta um ambiente minimo de navegador e executa o script.
function run({ stored, systemDark = false, storageThrows = false, noButton = false } = {}) {
  const attrs = {};
  const listeners = {};
  const store = stored ? { theme: stored } : {};
  const item = { hidden: true };
  const button = {
    parentElement: item,
    handlers: {},
    setAttribute: (k, v) => (attrs[k] = v),
    addEventListener(ev, fn) {
      this.handlers[ev] = fn;
    },
  };
  const root = { dataset: {} };
  const mq = { matches: systemDark, addEventListener: () => {} };
  const localStorage = {
    getItem: (k) => {
      if (storageThrows) throw new Error('bloqueado');
      return store[k] ?? null;
    },
    setItem: (k, v) => {
      if (storageThrows) throw new Error('bloqueado');
      store[k] = v;
    },
  };
  const document = {
    documentElement: root,
    addEventListener: (ev, fn) => (listeners[ev] = fn),
    getElementById: (id) => (id === 'theme-toggle' && !noButton ? button : null),
  };
  vm.runInNewContext(source, { document, localStorage, window: { matchMedia: () => mq } });
  return { root, button, item, attrs, store, ready: () => listeners.DOMContentLoaded() };
}

test('aplica o tema salvo antes da pagina carregar', () => {
  assert.equal(run({ stored: 'dark' }).root.dataset.theme, 'dark');
  assert.equal(run({ stored: 'light' }).root.dataset.theme, 'light');
});

test('ignora valor salvo invalido e deixa o sistema decidir', () => {
  assert.equal(run({ stored: 'roxo' }).root.dataset.theme, undefined);
});

test('sem escolha salva nao define data-theme', () => {
  assert.equal(run().root.dataset.theme, undefined);
});

test('botao aparece so quando o script roda e reflete o tema do sistema', () => {
  const env = run({ systemDark: true });
  assert.equal(env.item.hidden, true);
  env.ready();
  assert.equal(env.item.hidden, false);
  assert.equal(env.attrs['aria-pressed'], 'true');
});

test('clicar alterna do escuro do sistema para claro e salva', () => {
  const env = run({ systemDark: true });
  env.ready();
  env.button.handlers.click();
  assert.equal(env.root.dataset.theme, 'light');
  assert.equal(env.store.theme, 'light');
  assert.equal(env.attrs['aria-pressed'], 'false');
});

test('clicar alterna do claro para escuro e de volta', () => {
  const env = run();
  env.ready();
  env.button.handlers.click();
  assert.equal(env.root.dataset.theme, 'dark');
  assert.equal(env.attrs['aria-pressed'], 'true');
  env.button.handlers.click();
  assert.equal(env.root.dataset.theme, 'light');
});

test('localStorage bloqueado nao quebra a pagina nem o botao', () => {
  const env = run({ storageThrows: true });
  env.ready();
  env.button.handlers.click();
  assert.equal(env.root.dataset.theme, 'dark');
});

test('pagina sem botao nao falha', () => {
  assert.doesNotThrow(() => run({ noButton: true }).ready());
});
