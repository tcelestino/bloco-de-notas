---
layout: post
title: "Criando middleware para redirecionamento no Strapi v3"
date: 2022-02-24
---

Recentemtente precisei implementar uma solução no [Strapi](https://strapi.io/) a partir de criação de um *middleware* que "força" um redirecionamento em caso da condicional ser verdadeira. No caso, estava utilizando a versão 3.x.x, onde a criação de *middlewares* é bem diferente da última versão 4.x.x.

Em breve vou criar um post de como criar um *middleware* na versão 4.x.x.

## Criando o middleware

Na pasta *src/middlewares*, crie uma nova pasta com o nome do seu middleware (ex.: fooBar) e crie um arquivo *index.js*.

No arquivo *index.js*, adicionei o seguinte código:

```js
module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        // Aqui roda o Koa -
         if (ctx.url === "/graphql" && ctx.method === "GET") {
           ctx.redirect('https://tcelestino.github.io/bloco-de-notas/');
         }
         await next();
      });
    }
  }
}
```

*O Strapi está sendo executado por cima do [Koa](http://koajs.com/)*

Vale notar que é feita uma requisição assíncrona, logo é possível utilizar [Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises) em *middlewares*.

Para mais informações de como criar *middlewares* no Strapi v3.x.x, recomendo ler a [documentação](https://docs-v3.strapi.io/developer-docs/latest/setup-deployment-guides/configurations.html#middlewares).
