---
layout: post
title: Configurando modo tela cheia do Firefox no macOS
date: 2024-12-20
---

Uma situação incômoda ocorre ao assistir vídeos no Firefox no macOS: quando habilito o modo tela cheia, o sistema automaticamente cria um novo "Space" (área de trabalho). Isso se torna irritante ao final do vídeo, pois sou “forçado” a visualizar uma animação desnecessária durante a transição entre as áreas de trabalho. Nem vou comentar o impacto na performance.

Encontrei uma [solução](https://www.reddit.com/r/osx/comments/ctqaa4/comment/lfucrni/) simples através de uma discussão no reddit que resolve este "problema" específico do Firefox.

## Passo a passo

1. Acesse `about:config` na barra de endereço do Firefox
2. Localize a configuração `full-screen-api.macos-native-full-screen`
3. Mude o valor de `true` para `false`

A mudança é aplicada instantaneamente, sem necessidade de reiniciar o navegador. **Mais um motivo para usar o Firefox**! 🦊

Até o momento, não há uma solução conhecida para outros navegadores como Chrome ou Edge.

É importante mencionar que, embora os desenvolvedores possam criar suas próprias implementações para gerenciar o modo tela cheia, muitos optam por utilizar a API nativa do macOS.

Assim como esse [comentário](https://www.reddit.com/r/osx/comments/ctqaa4/comment/kw4epf7) no reddit, seria interessante se a Apple considerasse olhar para este comportamento do sistema.
