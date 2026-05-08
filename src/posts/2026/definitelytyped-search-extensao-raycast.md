---
layout: post
title: "DefinitelyTyped Search: uma extensão Raycast para instalar @types"
summary: Pesquise e instale pacotes de tipos do TypeScript diretamente do Raycast com a extensão DefinitelyTyped Search
date: 2026-05-08
tags: [extensão, typescript, raycast, npm, produtividade]
---

Depois de lançar minha [primeira extensão](https://tcelestino.github.io/bloco-de-notas/2026/03/minha-primeira-extensao-raycast/) para o [Raycast](https://www.raycast.com/), decidi criar mais uma. Se você não conhece o Raycast, ele é um lançador de aplicativos para macOS e Windows que permite acessar rapidamente aplicativos, arquivos e outras funcionalidades do sistema. Ele também suporta extensões, o que permite aos desenvolvedores criar suas próprias funcionalidades personalizadas utilizando ReactJS com TypeScript.

## A extensão: DefinitelyTyped Search

Como muitos desenvolvedores que trabalham com [TypeScript](https://www.typescriptlang.org/), sempre que preciso instalar um pacote (`npm i -S express`, por exemplo), em muitos casos preciso instalar o pacote de tipos (`npm i -D @types/express`, por exemplo) correspondente. Abrir o [npmjs.com](https://www.npmjs.com/) em busca de cada pacote de tipos pode ser um processo demorado, especialmente quando você não tem certeza do nome exato do pacote.

Para facilitar esse processo, criei a extensão "[DefinitelyTyped Search](https://www.raycast.com/tcelestino/definitelytyped)" que permite pesquisar e instalar pacotes de tipos diretamente do Raycast.

A extensão é simples de usar: basta digitar o nome do pacote que você deseja instalar, e a extensão irá mostrar os pacotes de tipos correspondentes disponíveis. Você pode então selecionar o pacote de tipos desejado e automaticamente o comando `npm install -D @types/nome-do-pacote` é copiado para a área de transferência, pronto para colar no seu terminal.

![Extensão DefinitelyTyped Search em ação](https://i.ibb.co/sdvtqGnm/raycast-definitelytyped.gif)
_Extensão em ação_

Além disso, você pode ver os detalhes do pacote de tipos selecionado no [npmjs.com](https://www.npmjs.com/), [npmx.dev](https://npmx.dev/) ou no [GitHub](https://github.com) antes de instalá-lo.

![Extensão DefinitelyTyped Search - Opções de visualização](https://i.ibb.co/cXZh9HJr/SCR-20260507-qrgr.png)
_Opções de visualização_

## Adicione aos favoritos

Para quem sempre precisa usar os mesmos `@types`, a extensão permite adicioná-los aos favoritos. Assim, você pode acessar rapidamente os pacotes que usa com frequência sem precisar pesquisar por eles toda vez.

![Extensão DefinitelyTyped Search - Favoritos](https://i.ibb.co/wNBcMsGx/raycast-definitelytyped-favs.gif)
_Adicionando um pacote de tipos aos favoritos_

A extensão está disponível para download na [Raycast Store](https://www.raycast.com/tcelestino/definitelytyped) e é compatível com macOS e Windows.

Se você é um desenvolvedor que trabalha com TypeScript e utiliza o Raycast para aumentar sua produtividade, acredito que essa extensão pode ser uma ferramenta útil para agilizar seu fluxo de trabalho. Sinta-se à vontade para experimentar e enviar _feedbacks_ ou [sugestões de melhorias](https://github.com/raycast/extensions/issues/new?body=%3C!--%0APlease%20update%20the%20title%20above%20to%20consisely%20describe%20the%20feature%20request%0A--%3E%0A%0A%23%23%23%20Extension%0A%0Ahttps://www.raycast.com/tcelestino/definitelytyped%0A%0A%23%23%23%20Description%0A%0A%3C!--%0A%20%20Describe%20the%20feature%20and%20the%20current%20behavior/state.%0A--%3E%0A%0A%23%23%23%20Who%20will%20benefit%20from%20this%20feature?%0A%0A%23%23%23%20Anything%20else?%0A%0A%3C!--%0A%20%20Links?%20References?%20Anything%20that%20will%20give%20us%20more%20context!%0A%0A%20%20Tip:%20You%20can%20attach%20images%20or%20log%20files%20by%20clicking%20this%20area%20to%20highlight%20it%20and%20then%20dragging%20files%20in.%0A--%3E%0A&title=%5BDefinitelyTyped%5D%20...&template=extension_feature_request.yml&labels=extension,feature+request&extension-url=https://www.raycast.com/tcelestino/definitelytyped).
