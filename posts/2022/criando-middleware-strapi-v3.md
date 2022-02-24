---
layout: post
title: "Criando middleware para redirecionamento no Strapi v3"
date: 2022-02-24
---

Na atual versão (4.x.x) do [Strapi](https://strapi.io/), a criação de um *middleware* é totalmente diferente da versão 3.x.x, o que pode atrapalhar caso você esteja dando manutenção em um projeto que utilize essa versão.

## Criando o middleware

Na pasta *src/middlewares*, crie uma nova pasta com o nome do seu middleware (ex.: fooBar) e crie um arquivo *index.js*.

No arquivo *index.js*, adicione o seguinte código:

```js
module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
         if (ctx.url === "/graphql" && ctx.method === "GET") {
           ctx.redirect('https://tcelestino.github.io/bloco-de-notas/');
         }
         await next();
      });
    }
  }
}
```

No código acima, estamos verificando se a requisição da URL possui o valor  `/graphql` e se a requisição é do tipo `GET`. Caso seja verdadeiro, fazemos o redirecionamento utilizando a função `redirect` do Koa, que automaticamente adiciona o *status code* `301`.

Para mais informações de como criar *middlewares* no Strapi v3.x.x, recomendo ler a [documentação](https://docs-v3.strapi.io/developer-docs/latest/setup-deployment-guides/configurations.html#middlewares).
