---
layout: post
title: "Novidades do Javascript para 2022"
date: 2022-01-25
---

Esse ano não teremos tantas novidades planejadas para o Javascript (também pode chamar de ES2022), porém achei algumas dessas novidades interessantes.

## Top-level await

Hoje, só conseguimos usar o operador `await` a partir de uma função assíncrona (`async`). A partir do ES2022, não haverá mais essa necessidade.

```js
// antes
(async () => {
  const result = await getUserData();
})();

// agora
const result = await getUserData();
```

Não vamos precisar mais usar [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/pt-BR/docs/Glossary/IIFE) para definir uma função assíncrona para usar o `await`.

## at()

Quando precisamos capturar o último indíce de um array, hoje utilizamos a seguinte técnica:

```js
const arr = ['foo', 'bar'];
const lastItem = arr[arr.length - 1]; // bar
```

A partir do ES2022, teremos o método `at()` para facilitar esse tipo de implementação.

```js
const arr = ['foo', 'bar'];
const lastItem = arr.at(-1); // bar
```

Vale lembrar que também podemos utilizar o `at` para recuperar qualquer indíce de um array.

```js
const arr = ['foo', 'bar'];
const lastItem = arr.at(1); // foo
```

Muito mais simples!!

## Classes sem construtor

Agora vai ser possível criar classes sem um `constructor`. Se já criou componentes usando classes no [React.js](https://reactjs.org), utilizando o [Babel](https://babeljs.io), irá achar essa novidade bem interessante.

Agora podemos escrever classes assim:

```js
class MyClass {
  foo = 'bar';
  #bar = true;

  getFoo = () => this.foo;

  boom = () => {
    // apenas um exemplo
    this.#bar = !this.#bar;
  }
}
```

Como você deve ter notado, também será possível usar informações privadas de uma classe utilizando o operador `#`.

*Fonte: [bytes.dev](https://bytes.dev/archives/83)*
