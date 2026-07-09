---
layout: post
title: Por que o ::backdrop não funciona com o atributo open do <dialog>
summary: O pseudo-elemento ::backdrop só é aplicado quando o <dialog> é aberto com showModal(). Com o atributo open, o diálogo abre sem backdrop.
date: 2026-07-10
tags: [frontend]
---

No meu tempo livre, estou estudando alguns elementos HTML que não existiam anos atrás e que surgiram para dar mais semântica às marcações, melhorar a usabilidade e a acessibilidade, além de reduzir a quantidade de scripts em JavaScript.

A tag da vez é a `<dialog>`, que permite criar caixas de diálogo semânticas e acessíveis em HTML. Em vez de usar um `<div>` ou `<section>` para criar uma caixa de diálogo, o `<dialog>` oferece uma maneira mais semântica e acessível de fazer isso. Além disso, é fácil customizar o estilo com CSS e adicionar recursos interativos com JavaScript.

Porém, descobri que, ao abrir o `<dialog>` com o atributo `open`, o pseudo-elemento `::backdrop` não é aplicado, o que pode ser um problema se você estiver usando um backdrop personalizado. Implementei o `<dialog>` no projeto "[Neymar Jogou?](https://neymar-jogou.onrender.com/)" e acabei descobrindo esse comportamento.

```css
.dialog-modal::backdrop {
  background: rgba(0, 0, 0, 0.65);
}
```

```html
<dialog class="dialog-modal" open>
  <p>Uma mensagem qualquer para exibir na modal</p>
</dialog>
```

Se usar o código acima em uma página HTML, vai notar que o `<dialog>` estará aberto, porém a formatação do `::backdrop` não estará aplicada. Isso acontece porque o atributo `open` abre o diálogo de forma não modal, e o backdrop só existe em diálogos modais.

Dando uma fuçada no MDN, acabei encontrando essa nota de uso:

> O pseudo-elemento CSS `::backdrop` pode ser usado para estilizar o plano de fundo de um elemento `<dialog>`, por exemplo, para escurecer o conteúdo inacessível enquanto uma janela de diálogo modal está aberta. Porém, o backdrop só é desenhado quando o diálogo é exibido com `HTMLDialogElement.showModal()`.

Link: [Notas de uso do `<dialog>` no MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Reference/Elements/dialog#notas_de_uso)

Ou seja, se precisar usar o atributo `open` para manter o `<dialog>` aberto sem necessidade de JavaScript, vai perder o backdrop personalizado. Caso precise do backdrop personalizado com o `<dialog>` já aberto ao carregar a página, por exemplo, vai precisar usar o método `HTMLDialogElement.showModal()` e remover o atributo `open` da marcação.

Algo assim:

```html
<style type="text/css">
  .dialog-modal::backdrop {
    background: rgba(0, 0, 0, 0.65);
  }
</style>

<dialog class="dialog-modal">
  <p>Uma mensagem qualquer para exibir na modal</p>
</dialog>

<script>
  (() => {
    const $dialog = document.querySelector('.dialog-modal');

    if ($dialog) {
      $dialog.showModal();
    }
  })();
</script>
```

Resumindo: ao usar `<dialog>`, você enfrenta um _trade-off_ entre simplicidade e funcionalidade. O atributo `open` oferece um diálogo sem JavaScript, mas perde o backdrop visual. O método `showModal()` exige JS, mas traz a experiência completa. A escolha depende do seu caso de uso — se o backdrop é apenas estético, `open` resolve; se é essencial para a usabilidade, `showModal()` é o caminho.
