---
layout: post
title: Como organizei meus dotfiles e otimizei meu fluxo de trabalho
summary: Descubra como organizar e automatizar seu ambiente de desenvolvimento usando dotfiles. Um guia prático sobre shell script, personalização do Terminal e gerenciamento de configurações para desenvolvedores.
date: 2025-02-24
---

Aproveitei a semana passada para aprender mais sobre shell script e utilizei meus [dotfiles](https://github.com/tcelestino/dotfiles) como laboratório para aplicar na prática o meu aprendizado.

## O que é isso?

Para quem não conhece, dotfiles são arquivos de configuração que geralmente começam com um ponto (.), o que os torna ocultos em sistemas Unix/Linux. Esses arquivos são usados para armazenar configurações personalizadas de aplicativos e ambientes de desenvolvimento, como editores de texto, gerenciadores de pacotes e outros programas.

Por exemplo, alguns dotfiles comuns:
* `~/.bashrc`: Configurações do shell Bash.
* `~/.npmrc`: Configurações do npm.
* `~/.gitconfig`: Configurações do Git.
* `~/.zsh`: Configuração do shell zsh.

Os dotfiles permitem personalizar o seu ambiente de trabalho e manter suas configurações consistentes em diferentes sistemas.

Já tenho meus [dotfiles](https://github.com/tcelestino/dotfiles) criados há 9 anos e fazia um tempo que não realizava uma atualização. Aproveitei que me despertou o interesse em shell script e resolvi atualizá-lo. Além disso, utilizei o [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) no VS Code, que agora está disponível gratuitamente (com limite de uso), como um assistente para me auxiliar com a sintaxe, documentação e sugestões de melhorias. Posso dizer que ajudou muito! Vou escrever sobre como estou usando IAs como assistentes no meu dia a dia mais para frente.

## Minhas configurações

No meus dotfiles, mantenho as configurações de todos os [alias](https://github.com/tcelestino/dotfiles/blob/main/zsh/aliases.zsh) que utilizo no [zsh](https://ohmyz.sh/), além dos [plugins](https://github.com/tcelestino/dotfiles/blob/main/zsh/.zshrc#L5). Também faço a instalação de [apps e serviços](https://github.com/tcelestino/dotfiles/blob/main/Brewfile) via [brew](https://brew.sh/), assim como faço configurações específicas do [macOS](https://github.com/tcelestino/dotfiles/blob/main/.macos), do [git](https://github.com/tcelestino/dotfiles/tree/main/git), [node](https://github.com/tcelestino/dotfiles/blob/main/.npmrc) entre outras ferramentas. Tudo isso executando o `./install` no Terminal. 🚀

Devo continuar mexendo nos meus dotfiles, principalmente por conta do aprendizado que estou obtendo com shell script. Acredito que posso melhorar ainda mais o meu fluxo de trabalho.

## Tenha o seu

Se você não tiver seus dotfiles, fique à vontade para usar o [meu](https://github.com/tcelestino/dotfiles) como base ou até mesmo se inspirar para criar o seu do zero. O projeto é aberto, fique livre para contribuir da melhor maneira. E se tiver interesse em conhecer outros dotfiles, recomendo dar uma olhada no site [dotfiles](https://dotfiles.github.io/); você vai encontrar dotfiles criados por diversas pessoas com abordagens totalmente diferentes umas das outras. Eu, por exemplo, me inspirei no dotfiles do [Paul Irish](https://www.paulirish.com/).

