(function () {
  var root = document.documentElement;
  var query = window.matchMedia('(prefers-color-scheme: dark)');

  // localStorage pode estar bloqueado (aba anonima, politica do navegador):
  // nesse caso o tema vale so para a visita atual.
  function stored() {
    try {
      var value = localStorage.getItem('theme');
      return value === 'dark' || value === 'light' ? value : null;
    } catch (e) {
      return null;
    }
  }
  function save(value) {
    try {
      localStorage.setItem('theme', value);
    } catch (e) {
      /* tema nao persiste, sem outro efeito */
    }
  }
  function effective() {
    return root.dataset.theme || (query.matches ? 'dark' : 'light');
  }

  var saved = stored();
  if (saved) root.dataset.theme = saved;

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    function sync() {
      button.setAttribute('aria-pressed', String(effective() === 'dark'));
    }

    button.parentElement.hidden = false;
    button.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      save(next);
      sync();
    });
    query.addEventListener('change', sync);
    sync();
  });
})();
