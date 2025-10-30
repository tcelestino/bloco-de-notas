---
layout: post
title: Desabilitando recursos de IA no Firefox
summary: Veja como é possível desabilitar os recursos de IA no Firefox usando o about:config.
date: 2025-10-30
tags: [Firefox, ai]
---

Recentemente tivemos o boom de navegadores com IA, como o ChatGPT Atlas, o Perplexity Comet, Microsoft Edge, entre outros que devem surgir no futuro. O Firefox, nas últimas atualizações, liberou a funcionalidade de IA no navegador. Não chega ser um "agente" como os navegadores citados acima, mas é uma funcionalidade que para mim está sendo bem útil, seja para tirar dúvidas e principalmente por ajudar a traduzir textos em outros idiomas. Existem muitas preocupações com relação a IA em navegadores, seja na forma de navegar pela internet e também por abrir diversas [brechas de segurança](https://venturebeat.com/ai/when-your-ai-browser-becomes-your-enemy-the-comet-security-disaster).

Por sorte, no Firefox é possível desabilitar os recursos de IA, seguindo os passos abaixo:

1. Acesse `about:config` na barra de endereço do Firefox
2. Aceite o risco e clique em "I accept the risk!"
3. Localize a configuração `browser.ml.enable`
4. Mude o valor de `true` para `false`

Com essa configuração, todos os recursos de IA serão desabilitados.

Existem outras configurações caso não queira desabilitar todos os recursos de IA de uma só vez, veja a tabela abaixo:

| Configuração                         | Descrição                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| browser.ml.chat.enabled              | Habilita a integração do chatbot IA.                                                 |
| browser.ml.chat.sidebar              | Exibe o painel de chat IA na barra lateral.                                          |
| browser.ml.chat.shortcuts            | Permite acionar o chat a partir de texto selecionado ou atalhos.                     |
| browser.ml.chat.page                 | Exibe o menu de chat na página quando você seleciona texto.                          |
| browser.ml.chat.page.footerBadge     | Exibe o badge flutuante na parte inferior da página.                                 |
| browser.ml.chat.page.menuBadge       | Exibe o badge “Ask AI” no menu da página.                                            |
| browser.ml.chat.menu                 | Adiciona “Chat about this” ao menu de clique com o botão direito.                    |
| browser.ml.linkPreview.enabled       | Gera previsões e sugestões de links baseadas em IA.                                  |
| extensions.ml.enabled                | Permite que extensões do navegador usem a API ML do Firefox.                         |
| browser.ml.pageAssist.enabled        | Executa o assistente IA “page assist”.                                               |
| browser.tabs.groups.smart.enabled    | Usa IA para agrupar e rotular automaticamente suas abas.                             |
| browser.tabs.groups.smart.userEnable | Permite que os usuários ativem manualmente o recurso de grupos de abas inteligentes. |

Referência: [Disable AI In Firefox](https://flamedfury.com/posts/disable-ai-in-firefox/)
