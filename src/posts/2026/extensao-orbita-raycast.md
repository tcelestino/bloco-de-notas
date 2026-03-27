---
layout: post
title: Minha primeira extensão para o Raycast
summary: Relato sobre o desenvolvimento e publicação de minha primeira extensão para o Raycast, uma ferramenta para acessar as postagens do Órbita direto do app.
date: 2026-03-27
tags: [extensão, reactjs, raycast, macos]
---

Já tem um bom tempo que queria desenvolver uma extensão para o [Raycast](https://raycast.com). Para quem não conhece, o Raycast é similar ao Spotlight, mas com muito mais funcionalidades e aberto para qualquer pessoa desenvolver extensões, o que enriquece o aplicativo. Você pode encontrá-las na [Raycast Store](https://www.raycast.com/store) e todas são totalmente gratuitas!

O aplicativo está disponível para macOS e Windows, trazendo funcionalidades para aumento da produtividade, como bloco de notas, snippets, gerenciamento de cores, entre outros recursos. Por ser uma aplicação em React.js com Typescript, alguém que tenha o conhecimento básico consegue desenvolver uma extensão para o app e foi o que me motivou a criar uma.

Resolvi fazer um pequeno relato sobre o processo, sem nada de código por agora.

## Iniciando o desenvolvimento

Por ser desenvolvido em React.js + Typescript, quem já mexe com esses recursos, vai ter mais facilidades no desenvolvimento de extensões. A [documentação](https://www.raycast.com/developers) é super didática, disponibilizando bastante conteúdo bem explicado das APIs (hooks, no final), abrangendo o guia de design até como realizar a publicação da extensão. A partir do passo-a-passo, habilitei o modo desenvolvedor e iniciei o processo:

![Screenshot do Raycast no modo desenvolvedor](https://i.ibb.co/nqnzCJ7B/raycast-developer.png)

## Ideia para extensão

Com a geração do template inicial fornecido pelo Raycast, fui buscar ideias simples de desenvolver minha primeira extensão. Algo que pudesse ser útil para meu uso e para outras pessoas.

Sou um usuário frequente do [Órbita](https://manualdousuario.net/orbita/), que vejo como o equivalente português do HackerNews. O site é mantido pelo Rodrigo Ghedin do blog [Manual do Usuário](https://manualdousuario.net) (MdU), que inclusive, super recomendo acompanhar. Diferente de outros sites/blogs de tecnologia, a leveza e a forma que os debates acontecem por lá lembra muito a velha época em que a internet era menos "oito ou oitenta".

Como sempre estou acompanhando o conteúdo postado no Órbita, resolvi criar uma extensão com a listagem das últimas postagens do Órbita. O site usa a tecnologia RSS, então os posts publicados no Órbita podem ser lidos em diferentes leitores ([Feedly](https://feedly.com), [NetNewsWire](https://netnewswire.com/), por exemplo), além de poder servir como fonte de dados para minha extensão.

A ideia era muito simples:

1. Ler o RSS do Órbita;
2. Listar todos os últimos posts com o autor e data da postagem;
3. Clicando no título, abrir a página da postagem para leitura dos detalhes.

## Início da implementação

Como já tinha um template padrão gerado, com algumas poucas horas de código, consegui ter a extensão funcional rodando localmente. Assim, de imediato abri o [repositório](https://github.com/tcelestino/orbita-raycast-extension) no Github com o código. Isso era dia **04/12/2025**. Frisei a data, porque ela fará sentido mais para frente.

Mais um detalhe. Antes de solicitar a revisão da extensão para publicação na loja do Raycast, tinha que pedir autorização ao Ghedin para o uso do nome Órbita e também do Manual do Usuário. Entrei em contato por email informando sobre a minha ideia e se podia dar sequência ao fluxo de publicação da extensão na loja. A autorização veio e no dia **06/12/2025** abri o [PR](https://github.com/raycast/extensions/pull/23472) para revisão.

## Da revisão à publicação

O processo de revisão do Raycast é gerido de forma híbrida. Eles possuem um _bot_ no Github que faz uma análise do código, adicionando comentários sobre as boas práticas para o uso das APIs de maneira mais assertiva. Além do _bot_, existe o revisor humano, que não foca tanto no código, mas sim se as extensões estão seguindo _guideline_ do aplicativo. Foi nesse processo que tive o maior "entrave", apesar de entender que pelo tamanho do projeto e a quantidade enorme de _issues_ abertas, o trabalho humano deve ser bem exaustivo, independente da automação.

Em relação ao código, houve poucas modificações. O ponto crucial envolveu o nome da extensão. Inicialmente, a ideia era manter a associação do Órbita ao Manual do Usuário, já que hoje faz parte do domínio do blog, porém o Raycast só aceita [extensões nomeadas em inglês](https://github.com/raycast/extensions/pull/23472#pullrequestreview-3710545011), então ter o nome como "Órbita - Manual do Usuário" não era "permitido". O [@pernielsentikaer](https://github.com/pernielsentikaer), que por sinal foi muito solícito, trouxe esse "impasse" para a discussão. Procurei o Ghedin para informar sobre a situação e se seria um problema "desvincular" o Órbita do Manual do Usuário e o mesmo não viu problema. Chegamos até pensar em um nome genérico, algo como "Órbita Companion", mas chegamos à conclusão de que por se tratar de um nome próprio, não faria sentido alterar.

No final, removi todas as referências ao Manual do Usuário e solicitei uma nova revisão. No dia **16/03/2026**, 3 meses depois da abertura do PR, finalmente a extensão foi [aprovada](https://github.com/raycast/extensions/pull/23472#pullrequestreview-3953818121) e publicada na Raycast Store: [**https://www.raycast.com/tcelestino/orbita**](https://www.raycast.com/tcelestino/orbita).

O resultado final foi esse:

![screenshot da extensão do Órbita no Raycast](https://files.raycast.com/pesfbxxiabexbazum0khwxppgl3g)

## Conclusão

Apesar do tempo de revisão e publicação, tive uma comunicação bem saudável com o [@pernielsentikaer](https://github.com/pernielsentikaer), que sempre trouxe de forma pertinente o que precisava ser alterado. Apesar de já ter contribuído com alguns projetos open source, nunca os administrei e deve ser um estresse bem grande aguentar diversas solicitações diariamente.

Saber que agora posso acessar o Órbita a partir do aplicativo que mais interajo, vai facilitar e ajudar ainda mais a participar da comunidade.

Deixo aqui meus agradecimentos ao Rodrigo Ghedin, que apoiou a ideia e inclusive me disponibilizou a logo do Manual do Usuário para definir como ícone da extensão.

Já estou pensando em mais duas extensões e que devo entregar ainda esse ano. É provável que venha um outro post sobre elas no futuro...
