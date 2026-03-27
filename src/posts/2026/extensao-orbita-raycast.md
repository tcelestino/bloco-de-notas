---
layout: post
title: Minha primeira extensão para o Raycast
summary: Como criei minha primeira extensão para o Raycast
date: 2026-03-27
tags: [extensão, reactjs, raycast, macos, windows]
---

Para quem não conhece, o [Raycast](https://raycast.com) é um aplicativo similar ao Spotlight no macOS e a "Barra de Pesquisa" no Windows, só que com muito mais funcionalidades e aberto para o desenvolvimento de extensões que enriquecem o aplicativo. Essas extensões podem ser encontradas na [Raycast Store](https://www.raycast.com/store) e todas são totalmente gratuitas!

Por ser uma aplicação em React.js com Typescript, alguém que tenha o conhecimento básico consegue desenvolver uma extensão e pensando nisso, me motivei a criar uma. Nesse texto, faço um pequeno relato sobre o processo.

## Iniciando o desenvolvimento

Lendo a [documentação](https://www.raycast.com/developers), que é super didática, já é possível entender o ecossistema de desenvolvimento do Raycast. Seguindo o [passo-a-passo](https://developers.raycast.com/basics/getting-started), é possível ter a base para a extensão rapidamente.

![Screenshot do Raycast no modo desenvolvedor](https://i.ibb.co/nqnzCJ7B/raycast-developer.png)

## Ideia para extensão

Sou um usuário frequente do [Órbita](https://manualdousuario.net/orbita/), que vejo como o equivalente português do [HackerNews](https://news.ycombinator.com/). O site é mantido pelo Rodrigo Ghedin do blog [Manual do Usuário](https://manualdousuario.net), que inclusive, super recomendo acompanhar. Diferente de outros sites/blogs de tecnologia, a leveza e a forma como os debates acontecem por lá lembram muito a velha época em que a internet era menos "oito ou oitenta".

Como sempre estou acompanhando o conteúdo postado no Órbita, resolvi criar uma extensão que me mostrasse as últimas postagens do Órbita. Como o site usa a tecnologia RSS, os posts publicados por lá podem ser lidos em diferentes leitores ([Feedly](https://feedly.com), [NetNewsWire](https://netnewswire.com/), por exemplo), além de servir como fonte de dados para minha extensão.

A ideia era muito simples:

1. Ler o RSS do Órbita;
2. Listar todos os últimos posts com o autor e data da postagem;
3. Clicando no título, abrir a página da postagem para leitura em detalhes.

## Início da implementação

Com a regra definida, iniciei a implementação e em poucas horas já tinha a extensão funcional rodando localmente. Caso queira ver o código, está nesse [repositório](https://github.com/tcelestino/orbita-raycast-extension) no GitHub.

Mais um detalhe. Antes de enviar a extensão para revisão e publicação na Raycast Store, tinha que pedir autorização ao Rodrigo para o uso do nome Órbita e também do Manual do Usuário. Fiz o contato por email informando sobre a minha ideia e se podia dar sequência a publicá-la na loja oficial do aplicativo. A autorização veio sem problemas. No dia **06/12/2025** abri o [PR](https://github.com/raycast/extensions/pull/23472) para revisão.

## Da revisão à publicação

O processo de revisão do Raycast é gerido de forma híbrida. Eles possuem um _bot_ no GitHub que faz uma análise do código, adicionando comentários sobre as boas práticas para o uso das APIs, garantindo que as extensões sigam as diretrizes de desenvolvimento. Além do _bot_, existe o revisor humano, que não foca tanto no código, mas sim se as extensões estão seguindo _guideline_ do aplicativo. Foi nesse processo que tive o maior "entrave", apesar de entender que pelo tamanho do projeto e a quantidade enorme de _issues_ abertas, o trabalho humano deve ser bem exaustivo, independentemente da automação.

Em relação ao código, houve poucas modificações. O ponto crucial envolveu o nome da extensão. Inicialmente, a ideia era manter a associação do Órbita ao Manual do Usuário, já que hoje faz parte do domínio do blog, porém o Raycast só aceita [extensões nomeadas em inglês](https://github.com/raycast/extensions/pull/23472#pullrequestreview-3710545011), então ter o nome como "Órbita - Manual do Usuário" não era "permitido". O [@pernielsentikaer](https://github.com/pernielsentikaer), que por sinal foi muito solícito, trouxe esse "impasse" para a discussão. Procurei o Ghedin para informar sobre a situação e se seria um problema "desvincular" o Órbita do Manual do Usuário e o mesmo não viu problema. Até um nome genérico foi sugerido, mas chegamos à conclusão de que por se tratar de um nome próprio, não faria sentido alterar.

No final, removi todas as referências ao Manual do Usuário e solicitei uma nova revisão. No dia **16/03/2026**, 3 meses depois da abertura do PR, finalmente a extensão foi aprovada, [mergeda](https://github.com/raycast/extensions/pull/23472#pullrequestreview-3953818121) e oficialmente publicada na Raycast Store: [**https://www.raycast.com/tcelestino/orbita**](https://www.raycast.com/tcelestino/orbita).

O resultado final foi esse:

![screenshot da extensão do Órbita no Raycast](https://files.raycast.com/pesfbxxiabexbazum0khwxppgl3g)
_Baixe o Raycast e use a extensão do [Órbita](https://www.raycast.com/tcelestino/orbita)_

## Conclusão

Apesar do tempo de revisão e publicação, tive uma comunicação bem saudável com o [@pernielsentikaer](https://github.com/pernielsentikaer), que sempre trouxe de forma pertinente o que precisava ser alterado.

Saber que agora posso acessar o Órbita a partir do aplicativo com o qual mais interajo, vai facilitar e ajudar ainda mais a participar da comunidade.

Deixo aqui meus agradecimentos ao Rodrigo Ghedin, que apoiou a ideia e inclusive me disponibilizou a logo do Manual do Usuário para definir como ícone da extensão.

Já estou pensando em mais duas extensões que quero entregar ainda esse ano. É provável que venha um outro post sobre elas no futuro...
