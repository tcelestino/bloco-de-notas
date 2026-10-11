# Bloco de Notas

Blog pessoal sobre desenvolvimento web, JavaScript, CSS e carreira, baseado no Eleventy (11ty).

**Link: https://blog.tcelestino.dev.br/**

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

# Build de produção (deploy no Cloudflare via GitHub Actions)
yarn run build

# Limpar diretório de output
yarn run clean
```

## Deploy

O deploy em produção roda a cada push na `main` (`.github/workflows/build.yml`). Cada Pull Request recebe uma URL de preview no Cloudflare, comentada no próprio PR (`.github/workflows/preview.yml`).

## Licença

[MIT](/LICENSE)

## Autor

[Tiago Celestino](https://github.com/tcelestino)
