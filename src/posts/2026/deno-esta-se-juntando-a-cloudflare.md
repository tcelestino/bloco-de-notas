---
layout: post
title: Deno está se juntando à Cloudflare, e o que muda
summary: Entenda o que muda para o Deno com o anúncio de que o projeto vai se juntar à Cloudflare e por que isso me fez repensar a adoção de novas ferramentas.
date: 2026-10-14
tags: [deno, node, cloudflare, javascript]
---

Na semana passada, o Ryan Dahl publicou no blog da Cloudflare o [artigo](https://deno.com/blog/cloudflare) "Deno is joining Cloudflare" (em tradução livre, "Deno está se juntando à Cloudflare"). Me decepcionei! Não pelo fato de o Deno se juntar à Cloudflare, até porque a empresa é uma das poucas que financiam projetos open source e também possui serviços decentes para diversos tipos de aplicações. Esse blog, inclusive, está rodando na infraestrutura deles.

O que me decepcionou foi saber que o projeto vai ser "encerrado". Pelo que foi anunciado, o runtime do Deno recebe mais um ano de atualizações de correção e segurança e, depois disso, o desenvolvimento acaba. O projeto continua open source e o time convidou outras pessoas a seguir com ele. Já o [Deno Deploy](https://deno.com/deploy) deve funcionar por mais seis meses e depois será desligado. Segundo o anúncio, os clientes pagantes vão receber ajuda para migrar para o Cloudflare Workers. O [JSR](https://jsr.io/), registry de pacotes criado pelo time, continua no ar. Nem vou comentar sobre o [Deno Fresh](https://usefresh.dev/), que já estava no limbo e agora deve deixar de existir oficialmente.

A comunidade do Deno é ampla, mas acho bem difícil ela chegar ao tamanho e à participação da comunidade do Node.js, que é consolidada. Eu não estou reclamando. Nunca contribuí diretamente com projetos, a não ser divulgando para amigos e criando projetos pessoais. Ainda assim, ver um projeto ser "encerrado" desse jeito me deixou mais pensativo sobre adotar novas ferramentas de desenvolvimento quando elas não têm tanta solidez.

Vale lembrar que o Deno surgiu em 2018 como uma releitura do Node.js. Também foi criado pelo Ryan Dahl, o mesmo que criou o Node.js em 2009.

Assim como o David Bushell [publicou](https://dbushell.com/2026/10/03/deno-to-node/) no blog dele, acredito que o Node.js é a solidez de que os desenvolvedores precisam. Felizmente!!
