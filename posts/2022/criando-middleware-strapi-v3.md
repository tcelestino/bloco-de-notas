---
layout: post
title: "Criando middleware para redirecionamento no Strapi v3"
date: 2022-02-24
---

Para quem não conhece, o [Strapi](https://strapi.io/) é um projeto open source que facilita a criação de um gerenciador de conteúdo sem a necessidade de colocar mão no código. Com o Strapi, você consegue definir padrão de uma API sem escrever uma linha de código e consumir as informações da maneira prática e rápida em seus projetos.

Caso tenha interesse, recomendo acessar o [site](https://strapi.io/) do projeto para mais informações.

O legal do  **Strapi** é que você adicionar funcionalidades a partir de suas necessidades. Seja criando um plugin, seja criando um _middleware_, que é a proposta aqui.

O [Koa](http://koajs.com/#introduction), um framework Node.js para desenvolvimento de soluções web, com performance e com menos código que o Express.js (inclusive, foi desenvolvido pelo o pessoal). O Strapi utiliza o **Koa** por baixo de sua capa, com isso, conseguimos criar _middlewares_ e adicionando funcionalidades extras a nossos projetos.

## Criando o middlware

Na atual versão (4.x.x) do Strapi, a criação de um _middleware_ é totalmente diferente da versão 3.x.x, o que pode atrapalhar caso você esteja dando manutenção em um projeto.

Indo ao assunto. Na pasta _src/middlewares_, crie uma nova pasta com o nome do middleware (fooBar) e crie um arquivo _index.js_.

No arquivo _index.js_, adicione o seguinte código

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
No código acima, estamos verificando se a requisição da URL é  "/graphql" e se essa requisição é do tipo `GET`. Caso seja verdadeiro, fazemos o redirecionamento utilizando a função `redirect` do Koa para uma outra url, com o status code `301`.
