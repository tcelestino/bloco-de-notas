---
layout: post
title: Como remover a coautoria do Claude Code dos seus commits
summary: Aprenda a desativar a linha Co-authored-by do Claude Code nos commits e pull requests com uma configuração simples no settings.json.
date: 2026-10-11
tags: [ia, claude-code, git, github]
---

Inúmeras pessoas passaram a usar o Claude Code como ferramenta de desenvolvimento, seja para tirar dúvidas, sugerir arquiteturas e, principalmente, implementar ideias que estavam guardadas na gaveta há um tempo.

Geralmente, quando você pede para o Claude Code fazer commits e/ou abrir um pull request no GitHub, ele adiciona automaticamente o Claude como colaborador, o que para muitos pode se tornar um "problema" (não me pergunte por quê).

Nos commits, é publicada uma linha como esta:

```
Co-authored-by: Claude <claude@anthropic.com>
```

Com isso, o Claude aparece como coautor do commit e, em alguns casos, na lista de contribuidores do repositório.

## Removendo essas informações

Para remover essas informações é simples. No macOS e no Linux, o arquivo fica em `~/.claude/settings.json`. No Windows, ele fica em `%USERPROFILE%\.claude\settings.json`. Basta adicionar a chave `attribution` ao arquivo:

```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

Se o arquivo já existir, adicione apenas o bloco `attribution` dentro do objeto principal, sem apagar as demais configurações.

O que cada chave faz:

* `commit`: desativa a linha `Co-authored-by` nas mensagens de commit.
* `pr`: desativa a linha `Co-authored-by` nas descrições de pull request.

Essa configuração vale para os commits e pull requests feitos a partir da sua máquina. Se quiser aplicá-la apenas a um projeto, coloque o mesmo bloco em `.claude/settings.json` na raiz do repositório.

Commits que já foram publicados não são alterados. Para remover a linha deles, é preciso reescrever o histórico, o que deve ser feito com cuidado, principalmente em branches compartilhadas.
