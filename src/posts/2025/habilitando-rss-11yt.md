---
layout: post
title: Habilitando RSS no 11ty
summary: Descubra como habilitar o feed RSS no 11ty de maneira rápida e fácil.
date: 2025-11-18
tags: [dev, 11ty]
---

Dando sequência as melhorias para o blog, finalmente consegui habilitar o feed baseado em RSS. Para isso, usei o plugin oficial do Eleventy(11ty): [@11ty/eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/). Como sei que muita gente usa o 11ty, resolvi deixar os passos para habilitar o feed RSS no seu blog/site.

## Mas que diabo é RSS?

Direto da Wikipedia:

> RSS (abreviação de Rich Site Summary ou Really Simple Syndication) é um formato de texto para distribuição de informações em tempo real pela internet; é uma forma simplificada e resumida de apresentar o conteúdo do site usando linguagem XML.
> _Fonte: [Wikipedia](https://pt.wikipedia.org/wiki/RSS)_

Simplificando: RSS é um formato de distribuição de conteúdo que permite usuários acompanhar as atualizações de um site sem precisar acessar o site diretamente. É um formato aberto e amplamente utilizado.

Como sou um leitor de vários blogs utilizando o RSS, não fazia sentido não ter o recurso no meu blog. Além de poder facilitar a agregação de conteúdo do meu blog em diretórios de blogs que utilizam o RSS como indexador.

## Instalando o plugin RSS no 11ty

Por ser uma plataforma aberta, o 11ty traz a liberdade de escolher a melhor forma de implementar RSS (ou qualquer outra funcionalidade) seja com implementação própria, ou utilizando plugins. Para habilitar o RSS, resolvi utilizar o [plugin oficial](https://www.11ty.dev/docs/plugins/rss/) do 11ty, pois facilitou bastante a implementação.

Para instalar o plugin, basta executar o seguinte comando:

```bash
npm install @11ty/eleventy-plugin-rss // npm
yarn add @11ty/eleventy-plugin-rss // yarn
```

_Escolha o gerenciador de pacotes que você utiliza_

Existem duas formas de configurar o plugin. A primeira é configurando o arquivo `eleventy.config.js`, no qual fará a geração do arquivo `feed.xml` de forma "virtual" a partir das configurações realizadas. [Veja mais detalhes](https://www.11ty.dev/docs/plugins/rss/#virtual-template). E a segunda é criando o arquivo `feed.njk`, no qual você poderá configurar de forma manual como o template. Optei pela segunda opção, já que nesse primeiro momento precisava ter algo rápido e a versão automática do plugin estava dando problemas com o meu blog, pode ser que no seu caso não sofra com o mesmo problema.

Para mais detalhes sobre como configurar, recomendo ler a documentação oficial do [plugin](https://www.11ty.dev/docs/plugins/rss/).

## Configurando o plugin RSS

Primeiro, crie o arquivo `feed.njk` na pasta raiz onde os seus arquivos estão (no meu caso, salvei em `src/feed.njk`). Esse arquivo será o template que será usado para gerar o feed RSS. Você pode escolher entre usar os formatos como JSON ou Atom. No caso, escolhi o template RSS:

<script src="https://gist.github.com/tcelestino/c63389b8713637252f44714109486bfc.js"></script>

Para visualizar outros templates, veja os detalhes na documentação oficial do [plugin](https://www.11ty.dev/docs/plugins/rss/#sample-feed-templates).

Resumindo as configurações do template RSS (ou qualquer outro template):

- title: Título do blog
- description: Descrição do blog
- language: Idioma do blog
- base: URL base do blog
- author: Nome do autor do blog
- permalink: Caminho do arquivo feed.xml
- eleventyExcludeFromCollections: Flag para excluir o arquivo feed.xml das coleções
- metadata: Objeto com as informações do blog
  - title: Título do blog
  - description: Descrição do blog
  - language: Idioma do blog
  - base: URL base do blog
  - author: Nome do autor do blog

No caso desse blog, minhas publicações ficam na pasta `src/posts/**/*.md`, então a coleção de posts será `collections.posts`. Mas caso você não tenha a mesma estrutura, vai precisar configurar o conteúdo que será entregue no template para o seu caso.

Feito o template, agora precisamos instalar o plugin no arquivo `eleventy.config.js` para que o feed seja configurado e gerado automaticamente.

No arquivo `eleventy.config.js`, você precisa adicionar o plugin para que o feed seja gerado automaticamente. No meu caso, meu blog ainda está usando o formato CommonJS, então o código ficaria assim:

```js
const feedPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(feedPlugin);
};
```

Caso você esteja usando o formato ECMAScript Modules (ESM), o código ficaria assim:

```js
import feedPlugin from '@11ty/eleventy-plugin-rss';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin);
}
```

_Não muda muito!_

Pronto!! Só isso já deve funcionar. Para testar, inicialize seu site/blog e acesse a url `http://localhost:8080/feed.xml` e verifique se o feed RSS foi gerado e está funcionando como esperado.
