---
layout: post
title: Usando placeholders no console.log
description: Conheça os placeholders úteis no console.log que vão te ajudar a imprimir mensagens de forma mais legível e fácil de entender.
date: 2025-05-26
tags: [javascript]
---

Todo desenvolvedor web já usou o `console.log` para imprimir mensagens no console do navegador. Seja para debugar algum problema ou para imprimir algum valor, ou para demonstrar algum resultado na própria ferramenta do navegador. Pode parecer algo não tão funcional com a quantidade de maneiras de debbugar código hoje em dia, mas o `console.log` ainda continua sendo uma ferramenta muito útil.

Na semana passada, me deparei a publicação do [Luciano Mammino](https://bsky.app/profile/loige.co) no Bluesky, onde ele compartilhou uma dica sobre como usar placeholders no `console.log`.

> [!NOTE]
> Placeholders são uma maneira de formatar strings de forma mais legível e fácil de entender.

## Placeholders úteis

Dos placeholders que ele compartilhou, conhecia apenas o `%s`, que já usei, porém o que me deixou mais curioso foi o `%j`. Com esse placeholder, você literalmente consegue serializar objetos no formato JSON. Sim, invés de chamar `console.log(JSON.stringify(obj))`, você pode chamar `console.log('%j', obj)`. 🤯

Além do `%j`, existem outros placeholders que podem ser úteis, como:

* `%s`: String (o que mais usei)
* `%d`: Number
* `%o`: Object (inspected)

### Exemplos

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};

console.log('%j', obj); // {name: 'John', age: 30, city: 'New York'}
console.log('%s', 'Hello, world!'); // Hello, world!
console.log('%d', 123); // 123
console.log('%o', obj); // {name: 'John', age: 30, city: 'New York'}
```

Notou que o `%o` tem o mesmo resultado do `%j`...

## Referência

- https://bsky.app/profile/loige.co/post/3log24dp7222i
