---
layout: post
title: Como organizei meus dotfiles e otimizei meu fluxo de trabalho
summary: Descubra como organizar e automatizar seu ambiente de desenvolvimento usando dotfiles. Um guia prático sobre shell script, personalização do terminal e gerenciamento de configurações para desenvolvedores.
date: 2025-02-24
tags: [linux, unix, shell, dotfiles]
---

Aproveitei a semana passada para aprofundar meus conhecimentos em shell script e decidi usar meus [dotfiles](https://github.com/tcelestino/dotfiles) como laboratório prático para aplicar o que aprendi.

## O que são dotfiles?

Para quem não conhece, dotfiles são arquivos de configuração que geralmente começam com um ponto (.), tornando-se ocultos em sistemas Unix/Linux. Eles armazenam personalizações para aplicativos e ambientes de desenvolvimento, incluindo:

* `~/.bashrc`: Configurações do shell Bash
* `~/.npmrc`: Preferências do npm
* `~/.gitconfig`: Configurações globais do Git
* `~/.zshrc`: Arquivo principal de configuração do Zsh

Esses arquivos permitem não só personalizar seu ambiente de trabalho, mas também manter consistência entre diferentes máquinas e sistemas.

Meus [dotfiles](https://github.com/tcelestino/dotfiles) existem há 9 anos e estavam precisando de atualização. Combinei a necessidade de modernizar as configurações com meu interesse recente em shell script. Durante o processo, utilizei o [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview) no VS Code (disponível gratuitamente com limites de uso) como assistente para verificar sintaxe, documentação e sugestões de boas práticas. Pretendo detalhar meu fluxo de trabalho com IAs assistivas em um futuro post aqui no blog.

## Minha estrutura atual

Nos meus dotfiles, gerencio:

* [Aliases](https://github.com/tcelestino/dotfiles/blob/main/zsh/aliases.zsh) e [plugins](https://github.com/tcelestino/dotfiles/blob/main/zsh/.zshrc#L5) do Zsh
* Instalação automatizada de [aplicativos via Homebrew](https://github.com/tcelestino/dotfiles/blob/main/Brewfile)
* Configurações específicas para [macOS](https://github.com/tcelestino/dotfiles/blob/main/.macos)
* Otimizações para [Git](https://github.com/tcelestino/dotfiles/tree/main/git) e [Node.js](https://github.com/tcelestino/dotfiles/blob/main/.npmrc)

Todo o setup é executado com um único comando `./install` no terminal. 🚀

À medida que aprofundo meu conhecimento em shell scripting, continuo iterando sobre essas configurações para melhorar a eficiência e ergonomia no fluxo de trabalho.

## Comece seus próprios dotfiles

Se você ainda não tem dotfiles, sinta-se à vontade para usar [meu repositório](https://github.com/tcelestino/dotfiles) como base ou inspiração. O projeto é open source - contribuições são bem-vindas! Para explorar diferentes abordagens, recomendo:

* O portal [dotfiles.github.io](https://dotfiles.github.io/) com curadoria de exemplos
* O famoso repositório do [Paul Irish](https://github.com/paulirish/dotfiles) que me inspirou inicialmente
* A comunidade [Awesome Dotfiles](https://github.com/webpro/awesome-dotfiles) no GitHub

  A chave é adaptar as configurações às suas necessidades específicas enquanto mantém a capacidade de replicar seu ambiente em qualquer máquina rapidamente.
