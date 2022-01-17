---
layout: post
title: "Configurar uma porta diferente no Next.js"
date: 2022-01-18
---

Por padrão, ao executar uma aplicação [Next.js](https://nextjs.org/), a aplicação será acessa na seguinte url http://localhost:3000. Caso queria alterar a porta padrão da aplicação, só é preciso fazer um pequeno ajuste no seu arquivo `package.json`.

O padrão do `package.json` no Next.js é assim (caso não use o Typescript):

```json
{
  "name": "meu-projeto-next",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "12.0.8",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  }
}
```

Para alterar a porta, você só precisa alterar o script `"dev": "next dev"` para `"dev": "next dev -p 3001"`. Assim, quando rodar `npm dev`, seu aplicação rodará na url http://localhost:3001 e não mais na porta "3000".

No final, o arquivo `package.json` fica assim:

```json
{
  "name": "meu-projeto-next",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "12.0.8",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  }
}
```
