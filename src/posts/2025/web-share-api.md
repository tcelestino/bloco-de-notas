---
layout: post
title: Compartilhamento de links usando Web Share API
date: 2025-01-31
---

Dias atrás, o Rodrigo Ghedin, do [Manual do Usuário](https://manualdousuario.net/), disponibilizou um recurso simples no blog, mas que, sem dúvida, trouxe uma experiência mais agradável para os usuários ao implementar o compartilhamento de link nativo dos navegadores. Dei uma fuçada e acabei confirmando o que imaginava: a implementação é baseada na [Web Share API](https://developer.mozilla.org/pt-BR/docs/Web/API/Navigator/share).

Lembrei da época em que trabalhava no elo7 e usamos a Web Share API na página de detalhes dos produtos do marketplace, no qual conseguimos garantir uma experiência mais fluida no marketplace.

## O que é a Web Share API?

A [Web Share API](https://wicg.github.io/web-share/) é uma API em Javascript presente em diversos navegadores, na qual você pode usar o recurso nativo de compartilhamento de link sem a necessidade de implementação de plugins de terceiros na sua página. Segundo o [Can I Use](https://caniuse.com/web-share), a Web Share API já tem um amplo suporte nos navegadores mais atuais:

<figure class="media_image">
  <img src="https://i.ibb.co/7J1bttp3/SCR-20250131-kccw.png" alt="Screenshot exibindo compatibilidade da Web Share API">
  <figcaption>Infelizmente, o Firefox para desktop ainda não possui o recurso. 😞</figcaption>
</figure>

## Como usar Web Share API

Antes de falarmos de como implementar a Web Share API, precisamos lembrar que, no passado não muito distante, existiam diversas formas de implementar o compartilhamento de link através do navegador. No Android, era possível implementar [Web Intents](https://www.chromium.org/developers/web-intents-in-chrome) e no iOS, era possível usar [Custom URL Schemes](https://css-tricks.com/create-url-scheme/). Ou seja, uma salada de frutas para algo "simples". 🤯 Sem contar os diversos plugins de terceiros existentes (Facebook, Twitter, etc.).

A Web Share API surgiu para simplificar e garantir maior compatibilidade entre os sistemas operacionais e navegadores. Além de trazer uma melhor experiência com o uso de um comportamento nativo, em vez de pop-ups, modais e redirecionamentos.

A implementação da Web Share API é muito simples:

<script src="https://gist.github.com/tcelestino/7b738d076654d1d2880cb67672149786.js"></script>

Com essa estrutura, você já tem uma implementação funcional de compartilhamento de link do próprio sistema operacional.

<figure class="media_image">
  <img src="https://i.ibb.co/b51X5YKB/RPReplay-Final1738330987.gif" alt="Screenshot com o funcionamento da Web Share API em um dispositivo móvel">
  <figcaption>Ao clicar no link "Compartilhar link", a Web Share API entra em ação</figcaption>
</figure>

Caso queira visualizar no seu dispositivo, o exemplo está disponível em [https://tcelestino-web-share-api.netlify.app/
](https://tcelestino-web-share-api.netlify.app/)

## Destrinchando o código

Como a Web Share API é baseada em [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), podemos implementá-la de diferentes maneiras. Seja usando `try..catch`, `then` e `catch`, etc., fica a critério do projeto e do gosto de quem está implementando, já que o resultado final será o mesmo. No exemplo, estou usando `try...catch`, mas fique à vontade para adaptar à sua realidade.

<script src="https://gist.github.com/tcelestino/c6086cb811d1d745d1988ecfbcda3145.js"></script>

A Web Share API está disponível através do método `share` do objeto `navigator`. Sendo assim, precisamos verificar se o método está disponível no navegador; caso não esteja, podemos implementar uma ação de falha. No exemplo, implementei um `alert`, mas não façam isso na vida real! 😅

A "magia" do funcionamento da Web Share API está na seguinte configuração:

<script src="https://gist.github.com/tcelestino/185360f7691f9b4e793747e23bb927f9.js"></script>

* title: título que será usado no compartilhamento do link;
* text: texto descritivo do compartilhamento que será adicionando no campo de texto (opcional);
* url: link para onde o usuário será redirecionado ao clicar.

Caso não tenha notado, na chave `url`, adicionei uma condicional na qual estou capturando o valor do href existente na tag `<link rel="canonical" href="https://tcelestino.github.io/bloco-de-notas/">`, e isso tem uma explicação.

Imagine que um site tenha domínios específicos para desktop e mobile (https://m.site.com), ou até mesmo URLs baseadas no contexto do usuário, utilizando a estratégia [Canonical URL](https://en.wikipedia.org/wiki/Canonical_link_element) conseguimos garantir que o link compartilhado será "real", mantendo a consistência e a experiência do usuário.

## Pontos de atenção!

Apesar da implementação da Web Share API ser simples, temos alguns pontos de atenção:

* **Seu servidor precisa ter HTTPS habilitado;**
* **Os valores passados para API precisam ser no formato de texto;**
* **Você só pode executar a API a partir de uma ação do usuário. Ou seja, a partir de uma ação de clique;**
* **Não pode chamá-la no carregamento da página (onload, DOMContentLoaded, etc...).**

## Conclusão

Por ser algo simples de implementar, a Web Share API pode trazer bons ganhos na experiência de usuário, principalmente por não haver interferência de terceiros e por proporcionar maior controle das ações realizadas pelo usuário em seu site.

Ter uma solução nativa integrada com os sistemas operacionais, sem dúvidas, trará uma experiência mais fluida para os usuários, além de garantir a autonomia do funcionamento de todo o seu site.
