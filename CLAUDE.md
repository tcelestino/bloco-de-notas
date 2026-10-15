# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Portuguese-language blog called "Bloco de Notas" built with Eleventy (11ty) 3.1.2. The blog focuses on web development, JavaScript, CSS, and career topics. The project philosophy emphasizes simplicity and minimalism - avoiding CSS frameworks and keeping the codebase lean with basic HTML/CSS.

## Development Commands

```bash
# Development server with debug output
yarn run dev          # Cleans output, runs with DEBUG flag and watch mode

# Development server (alternative)
yarn start            # Basic serve with watch mode, no debug output

# Production build
yarn run build        # Cleans and builds for Cloudflare deployment

# Clean output directory
yarn run clean        # Removes _site folder
```

Note: `yarn run dev` enables Eleventy debug output. `yarn run build` uses npm internally; the site is served from the root of `blog.tcelestino.dev.br` (no path prefix).

## Architecture

### Eleventy Configuration

The main configuration is in `eleventy.config.js`:

- **Input directory**: `src/`
- **Output directory**: `./_site/`
- **Layouts directory**: `src/_layouts/`
- **Template formats**: Markdown (.md), Nunjucks (.njk), HTML (.html)
- **Template engine**: Nunjucks for data interpolation

### Collections

Collections are defined in `lib/collections/`:

- `posts.js`: Aggregates blog posts from `src/posts/**/*.md`, reversed chronologically, limited to 5 most recent posts (home)
- `postsByYear.js`: Posts grouped by year (`[{ year, posts }]`), newest first, used by the all-posts page
- `updates.js`: Aggregates all updates/changelog posts from `src/updates/**/*.md`, reversed chronologically
- `nav-links.js`: Social media links (Github, LinkedIn, Bluesky)

### Raindrop favorites

The home shows a "Últimos favoritos" section (6 links in 2 columns of 3, domain below the title, below "Ver todos os posts") built at build time from the Raindrop.io API:

- `lib/raindrop.js`: `fetchFavoritos({ token, fetchFn, limit })`, excludes the "Vídeos" collection (and children) and youtube.com / youtu.be links; `fetch` is injectable for tests
- `src/_data/favoritos.js`: global data `favoritos`; reads `RAINDROP_TOKEN` (env var or local `.env`, see `.env.example`). Without token or on API failure it returns `[]` with a `console.warn` and the section is omitted
- `RAINDROP_TOKEN` is a GitHub Actions secret passed to the Build step in `build.yml` and `preview.yml`; `build.yml` is also a reusable workflow (`workflow_call`) called by `raindrop-refresh.yml`, which runs on a daily cron and `workflow_dispatch` to refresh the favorites
- Tests never hit the API: `test/helpers/build.js` builds with `RAINDROP_TOKEN=''`

### Filters

Custom filters in `lib/filters/`:

- `readableDate`: Converts dates to Brazilian Portuguese format (e.g., "20 de outubro de 2025")
- `isoDate`: Converts dates to `YYYY-MM-DD` for `<time datetime>`

A transform in `lib/transforms/pre-tabindex.js` adds `tabindex="0"` to `<pre>` so scrollable code blocks are keyboard accessible.

### Layouts

Two main layouts in `src/_layouts/`:

- `default.njk`: Base layout for pages
- `post.njk`: Layout for blog posts

Layout aliases are configured:

- `layout: default` → `default.njk`
- `layout: post` → `post.njk`

### Content Structure

Blog posts live in `src/posts/` organized by year (e.g., `src/posts/2025/`, `src/posts/2024/`).

Post front-matter structure:

```yaml
---
layout: post
title: Post Title
summary: Brief description
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
---
```

Updates/changelog entries live in `src/updates/` organized by year (e.g., `src/updates/2025/`).

Updates front-matter structure:

```yaml
---
layout: post
date: YYYY-MM-DD
---
```

Note: Updates use a simpler structure without title, summary, or tags.

### Assets

- CSS: `src/assets/css/` (`main.css`: tokens, base, layout, header, footer and post lists; `post.css`: long-form text via `.prose`; `syntax-highlighting.css`). Light/dark tokens live in `:root` (dark via `prefers-color-scheme`); no `@import`
- Theme toggle: button `#theme-toggle` in the header; `src/_includes/theme.js` (inlined in `<head>`) stores the choice in `localStorage` and sets `data-theme` on `<html>`. Dark tokens are defined twice (system preference via `:root:not([data-theme='light'])` and forced via `:root[data-theme='dark']`); tests keep both in sync
- Font: IBM Plex Sans loaded from Google Fonts in `default.njk` (no font files in the repo)
- Post row partial: `src/_includes/post-row.njk`
- Images: `src/assets/images/` and `src/posts/images/`

Assets are copied through passthrough:

- `src/assets/images/**/*` → preserves structure
- `src/posts/images/**/*` → flattened to `assets/images/`
- `src/assets/css/**/*` → preserves structure

### Plugins

- `@11ty/eleventy-plugin-syntaxhighlight`: Syntax highlighting for code blocks in blog posts

## Important Notes

- The blog is deployed to Cloudflare (Workers static assets) at `https://blog.tcelestino.dev.br/` via GitHub Actions on push to `main`
- All content is in Brazilian Portuguese (pt-BR)
- The design philosophy is minimalist - avoid adding CSS frameworks or complex styling
- Keep performance as a priority (goal is to rank on 11ty's Speedlify performance leaderboard)
