# Bloco de Notas

Blog pessoal sobre desenvolvimento web, JavaScript, CSS e carreira, baseado no Eleventy (11ty).

## Sobre o Projeto

Este é um blog minimalista em português brasileiro focado em simplicidade e performance. O projeto evita frameworks CSS e mantém o código enxuto com HTML e CSS básicos.

## Tecnologias

- [Eleventy](https://www.11ty.dev/) 3.1.2 - Gerador de sites estáticos
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Template engine
- Plugins:
  - [@11ty/eleventy-plugin-syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/) - Syntax highlighting para blocos de código
  - [@11ty/eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/) - Geração de feed RSS

## Estrutura do Projeto

```
bloco-de-notas/
├── src/
│   ├── _layouts/          # Layouts Nunjucks
│   ├── assets/
│   │   ├── css/           # Arquivos CSS
│   │   └── images/        # Imagens do site
│   ├── posts/             # Posts do blog (organizados por ano)
│   └── updates/           # Changelog/atualizações
├── lib/
│   ├── collections/       # Coleções do Eleventy
│   └── filters/           # Filtros customizados
└── eleventy.config.js     # Configuração principal
```

## Comandos de Desenvolvimento

```bash
# Instalar dependências
yarn install

# Servidor de desenvolvimento com debug
yarn run dev

# Servidor de desenvolvimento (alternativa sem debug)
yarn start

# Build de produção para GitHub Pages
yarn run build

# Limpar diretório de output
yarn run clean
```

## Características

- **Feed RSS**: Disponível em `/feed.xml` com os 5 posts mais recentes.
- **Minimalista**: Sem frameworks CSS, mantendo o código simples e leve.

## Licença

MIT

## Autor

[Tiago Celestino](https://github.com/tcelestino)
