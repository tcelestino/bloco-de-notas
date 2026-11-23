---
layout: post
title: Três maneiras de ignorar arquivos no Git
summary: O .gitignore não é a única forma de ignorar arquivos no Git. Conheça o .git/info/exclude e o arquivo de ignore global, e saiba quando usar cada um.
date: 2026-11-23
tags: [git]
---

Quando alguém precisa ignorar um arquivo no Git, o primeiro (e muitas vezes único) lugar que vem à cabeça é o `.gitignore`. Funciona, mas nem tudo que você quer ignorar deveria ir para lá. Acabei encontrando o [artigo](https://nelson.cloud/.gitignore-isnt-the-only-way-to-ignore-files-in-git/) do Nelson Figueroa, que me mostrou duas outras possibilidades além do `.gitignore` para ignorar arquivos no Git.

Pense naquele arquivo que você usa apenas para dar contexto à sua ferramenta de IA (`CONTEXT.md`, por exemplo) e mantém dentro do projeto, ou algum outro arquivo de sistema (ex.: `.DS_Store` que o macOS cria em toda pasta). Isso não é algo com que outras pessoas ou o time precisem se preocupar, então não faz sentido sujar o `.gitignore` do repositório com essas regras.

O Git permite ignorar arquivos em três níveis diferentes. São eles:

## 1. `.gitignore`

É o mais conhecido. Fica na raiz do repositório e é versionado junto com o código, então todas as pessoas que trabalham no projeto compartilham as mesmas regras.

* **Escopo:** apenas o repositório onde está.
* **Versionado:** sim.
* **Use para:** o que é comum ao projeto, como a pasta de build e as dependências (`node_modules`, por exemplo).

```
node_modules
_site
```

## 2. `.git/info/exclude`

Funciona como o `.gitignore`, com a mesma sintaxe, mas fica dentro da pasta `.git` do repositório. Por isso, não é versionado nem compartilhado.

* **Escopo:** apenas o repositório onde está.
* **Versionado:** não.
* **Use para:** arquivos pessoais que só existem na sua máquina, como anotações, rascunhos e arquivos de contexto da IA.

```
CONTEXT.md
rascunhos/
```

Como o arquivo vive dentro de `.git`, ele só vale para aquele clone. Se você clonar o projeto de novo, precisará recriar as regras.

## 3. Ignore global

É um arquivo que vale para todos os repositórios da sua máquina. Por padrão, o Git procura por ele em `~/.config/git/ignore`.

* **Escopo:** todos os repositórios da máquina.
* **Versionado:** não.
* **Use para:** arquivos gerados pelo sistema operacional ou pelo editor, como o `.DS_Store` no macOS.

```
.DS_Store
.idea/
```

Se preferir outro nome ou local para esse arquivo, como `~/.gitignore_global`, basta informar ao Git:

```shell
git config --global core.excludesFile ~/.gitignore_global
```

Para voltar ao comportamento padrão, remova a configuração:

```shell
git config --global --unset core.excludesFile
```

## Descobrindo qual regra está ignorando um arquivo

Com três lugares possíveis, pode ser difícil saber de onde veio a regra que está ignorando determinado arquivo. Para isso existe o `git check-ignore`, que com a opção `-v` mostra a origem:

```shell
git check-ignore -v .DS_Store
```

A saída traz o arquivo da regra, a linha, o padrão e o caminho ignorado:

```
.gitignore:1:.DS_Store	.DS_Store
```

Se o arquivo vier de um ignore global ou do `.git/info/exclude`, o caminho dele aparece no lugar de `.gitignore`. Se nenhuma regra ignorar o arquivo, o comando não imprime nada.

## Resumindo

| Arquivo | Escopo | Versionado |
| --- | --- | --- |
| `.gitignore` | Repositório | Sim |
| `.git/info/exclude` | Repositório | Não |
| `~/.config/git/ignore` | Todos os repositórios | Não |

A regra que uso: se o arquivo é problema do projeto, vai no `.gitignore`. Se é problema só meu, vai no `.git/info/exclude` ou no ignore global.

## Referência

* [.gitignore Isn't the Only Way To Ignore Files in Git](https://nelson.cloud/.gitignore-isnt-the-only-way-to-ignore-files-in-git/)
