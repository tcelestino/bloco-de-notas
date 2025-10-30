---
layout: post
title: Desabilitando recursos de IA no Firefox
summary: Veja como é possível desabilitar os recursos de IA no Firefox.
date: 2025-10-30
tags: [tech, ia]
---

Recentemente houve o boom de navegadores com IA, como o ChatGPT Atlas, o Perplexity Comet, o Microsoft Edge, entre outros que devem surgir no futuro. O [Firefox](https://www.firefox.com/pt-BR/), nas últimas atualizações, liberou a funcionalidade de usar os chatbots de IA, como o Claude, ChatGPT, Gemini, Mistral e o Copilot no navegador.

![Chatbot Claude no Firefox](https://i.ibb.co/F4bsxsr7/firefox-ia-chatbot.png)
_Chatbot Claude no Firefox_

Não chega a ser um "agente" como os navegadores citados, mas é uma funcionalidade que para mim tem sido bem útil, seja para tirar dúvidas, traduzir textos em outros idiomas e realizar outras tarefas. Existem muitas preocupações com relação a IA em navegadores, seja por descaracterizar a forma de navegar pela internet e também por abrir diversas [brechas de segurança](https://venturebeat.com/ai/when-your-ai-browser-becomes-your-enemy-the-comet-security-disaster).

Por sorte, no Firefox é possível desabilitar os recursos de IA, seguindo os passos abaixo:

1. Acesse `about:config` na barra de endereço do Firefox
2. Aceite o risco e clique em _"Accept the Risk and Continue"_ (Aceitar o Risco e Continuar)
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
| browser.ml.chat.page.menuBadge       | Exibe o badge _"Ask AI"_ no menu da página.                                          |
| browser.ml.chat.menu                 | Adiciona _"Chat about this"_ ao menu de clique com o botão direito.                  |
| browser.ml.linkPreview.enabled       | Gera previsões e sugestões de links baseadas em IA.                                  |
| extensions.ml.enabled                | Permite que extensões do navegador usem a API ML do Firefox.                         |
| browser.ml.pageAssist.enabled        | Executa o assistente IA _"page assist"_.                                             |
| browser.tabs.groups.smart.enabled    | Usa IA para agrupar e rotular automaticamente suas abas.                             |
| browser.tabs.groups.smart.userEnable | Permite que os usuários ativem manualmente o recurso de grupos de abas inteligentes. |

Referência: [Disable AI In Firefox](https://flamedfury.com/posts/disable-ai-in-firefox/)
