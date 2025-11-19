---
layout: post
title: Habilitando RSS no 11ty
summary: Descubra como habilitar o feed RSS no 11ty de maneira rápida e fácil.
date: 2025-11-19
tags: [dev, 11ty, tech]
---

Continuando com as melhorias do blog, finalmente habilitei o feed RSS. Para isso, usei o plugin oficial do Eleventy (11ty): [@11ty/eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/). Como muita gente usa o 11ty, resolvi compartilhar os passos para você habilitar o feed RSS no seu blog ou site.

## O que é RSS?

RSS é uma forma de acompanhar atualizações de sites sem precisar visitá-los diretamente. Funciona assim: o site disponibiliza um arquivo com as últimas publicações, e você usa um leitor de RSS para receber essas atualizações automaticamente.

É como assinar um canal de notícias. Sempre que o site publicar algo novo, você recebe no seu leitor de RSS.

Como leitor assíduo de vários blogs usando RSS, não fazia sentido meu blog não ter esse recurso. Além disso, o RSS facilita a indexação em diretórios de blogs.

## Instalando o plugin

O 11ty tem um plugin oficial para RSS. Instale usando o gerenciador de pacotes que você utiliza:

```bash
npm install @11ty/eleventy-plugin-rss
```

ou

```bash
yarn add @11ty/eleventy-plugin-rss
```

### Duas formas de configurar

O plugin oferece duas opções:

1. **Automática**: configurar direto no `eleventy.config.js` e o feed é gerado automaticamente
2. **Manual**: criar um arquivo `feed.njk` com o template customizado

Optei pela segunda opção porque precisava de algo rápido e a versão automática apresentou problemas no meu blog. No seu caso, pode funcionar diferente.

## Criando o template do feed

Crie o arquivo `feed.njk` na pasta dos seus arquivos. No meu caso, criei em `src/feed.njk`. Esse arquivo é o template que gera o feed RSS.

O plugin suporta vários formatos (RSS, JSON, Atom). Escolhi RSS:

<script src="https://gist.github.com/tcelestino/c63389b8713637252f44714109486bfc.js"></script>

### Entendendo as configurações

O template precisa de algumas informações básicas:

- **title**: título do blog
- **description**: descrição do blog
- **language**: idioma (ex: pt-BR)
- **base**: URL completa do blog
- **author**: nome do autor
- **permalink**: onde o feed será gerado (geralmente `/feed.xml`)

No meu blog, os posts ficam em `src/posts/**/*.md`, então uso `collections.posts`. Se sua estrutura for diferente, ajuste conforme sua coleção de posts.

Outros formatos de template estão na [documentação oficial](https://www.11ty.dev/docs/plugins/rss/#sample-feed-templates).

## Ativando o plugin no Eleventy

Agora adicione o plugin no arquivo `eleventy.config.js`:

**Se usar CommonJS:**

```js
const feedPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(feedPlugin);
};
```

**Se usar ESM:**

```js
import feedPlugin from '@11ty/eleventy-plugin-rss';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin);
}
```

## Testando

Pronto. Inicie seu blog e acesse `http://localhost:8080/feed.xml` para verificar se o feed RSS foi gerado corretamente.
