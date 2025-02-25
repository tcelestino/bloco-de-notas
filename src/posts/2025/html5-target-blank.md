---
layout: post
title: Você sabe por que usamos o underscore no target="_blank"?
summary: Descubra por que o uso do underscore em _blank não é apenas um detalhe, mas uma solução elegante que sobreviveu à evolução do HTML. Uma pequena característica com grande impacto no comportamento dos navegadores.
date: 2025-02-25
tags: [html5, web-development]
---

Alguma vez você já se perguntou por que usamos o _underscore_ em valores como `_blank`, `_self`, etc...? Eu não sabia até ler esse [post](https://kyrylo.org/html/2024/10/25/why-does-target-blank-have-an-underscore-in-front.html) do Kyrylo Silin.

## Um pouco de história

Antes do surgimento do HTML5, abusávamos do uso de _frames_ para construção de páginas. Essas páginas eram criadas baseadas em [framesets](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frameset). Eu mesmo escrevi muito código HTML utilizando _frames_. Como nem tudo são flores, usar _frames_ para construção de páginas podia ser útil para organizar conteúdo em várias janelas na própria página (SPA, alguém aí? 😅), mas os _frames_ eram difíceis de manter e tinham sérios problemas de segurança.

## Como funcionavam os framesets

Cada frame continha um nome único. Algo como `name="footer"`, `name="content"`, `name="sidebar"`. E quando precisávamos abrir um link em um frame específico, informávamos qual o name do frame onde o conteúdo do link seria carregado. Por exemplo: `<a href="/sobre-mim.html" target="content">Sobre mim</a>`.

Ao clicar no link, a página "sobre-mim.html" era carregada no _frame_ nomeado "content". Agora, imagine se houvesse um link assim: `<a href="/outra-pagina.html" target="blank">Outra página</a>`. O que aconteceria?

Como expliquei anteriormente, ao informar `target="blank"`, o link teria que ser aberto em um _frame_ nomeado como "_blank_", mas caso esse _frame_ não existisse, por padrão, o navegador criava uma nova janela identificando-a como "_blank_". O mais estranho é que ao clicar no mesmo link novamente, o navegador não abria uma nova janela. 🫣

## A solução com underscore

Ao usar o _underscore_, o navegador passou a entender que o valor `target="_blank"` não era um nome de um frame na tela, mas sim um valor especial, compreendendo que o conteúdo do link deveria ser aberto em uma nova janela/aba. Esse comportamento também se aplica para os valores `target="_self"`, `target="_parent"` e `target="_top"`.

## Relevância hoje

Mesmo com a obsolescência dos framesets com o surgimento do HTML5, esses valores especiais foram preservados na especificação. Hoje, quando usamos `target="_blank"`, continuamos aproveitando essa convenção estabelecida há décadas, mas com propósitos modernos de navegação.

Simples, porém eficiente, não é mesmo!? 😎
