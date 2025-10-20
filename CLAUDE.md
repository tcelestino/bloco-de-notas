# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Portuguese-language blog called "Bloco de Notas" built with Eleventy (11ty) 3.1.2. The blog focuses on web development, JavaScript, CSS, and career topics. The project philosophy emphasizes simplicity and minimalism - avoiding CSS frameworks and keeping the codebase lean with basic HTML/CSS.

## Development Commands

```bash
# Development server with debug output
npm run dev          # Uses yarn, cleans output, runs with DEBUG flag and watch mode

# Development server (alternative)
npm start            # Basic serve with watch mode, no debug output

# Production build
npm run build        # Cleans, builds with pathprefix for GitHub Pages deployment

# Clean output directory
npm run clean        # Removes _site folder
```

Note: `npm run dev` uses `yarn` internally, while `npm start` and `npm run build` use npm/eleventy directly.

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

- `posts.js`: Aggregates all blog posts from `src/posts/**/*.md`, reversed chronologically
- `nav-links.js`: Social media links (Github, LinkedIn, Bluesky)

### Filters

Custom filters in `lib/filters/`:

- `readableDate`: Converts dates to Brazilian Portuguese format (e.g., "20 de outubro de 2025")

### Layouts

Two main layouts in `src/_layouts/`:

- `default.njk`: Base layout for pages
- `post.njk`: Layout for blog posts

Layout aliases are configured:
- `layout: default` → `default.njk`
- `layout: post` → `post.njk`

### Content Structure

Blog posts live in `src/posts/` organized by year (e.g., `src/posts/2025/`, `src/posts/2024/`).

Post frontmatter structure:
```yaml
---
layout: post
title: Post Title
summary: Brief description
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
---
```

### Assets

- CSS: `src/assets/css/` (includes `main.css` and `syntax-highlighting.css`)
- Images: `src/assets/images/` and `src/posts/images/`

Assets are copied through passthrough:
- `src/assets/images/**/*` → preserves structure
- `src/posts/images/**/*` → flattened to `assets/images/`
- `src/assets/css/**/*` → preserves structure

### Plugins

- `@11ty/eleventy-plugin-syntaxhighlight`: Syntax highlighting for code blocks in blog posts

## Important Notes

- The blog is deployed to GitHub Pages with the path prefix `bloco-de-notas`
- All content is in Brazilian Portuguese (pt-BR)
- The design philosophy is minimalist - avoid adding CSS frameworks or complex styling
- Keep performance as a priority (goal is to rank on 11ty's Speedlify performance leaderboard)
