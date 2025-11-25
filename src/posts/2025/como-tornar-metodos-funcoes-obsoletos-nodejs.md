---
layout: post
title: Como tornar métodos/funções obsoletos no Node.js
summary: Descubra como tornar métodos/funções obsoletos no Node.js de maneira prática.
date: 2025-11-25
tags: [dev, dica]
---

Estava lendo o post "[How to "officially" deprecate methods with Node.js utilities](https://www.stefanjudis.com/today-i-learned/deprecate-method-in-node-js/)" do Stefan Judis (recomendo demais o blog dele) e achei interessante compartilhar essa dica rápida para quem escreve código utilizando Node.js e precisa documentar que um método/função foi depreciado (leia: marcado como obsoleto).

## O método mais comum: JSDoc/TSDoc

Muitas vezes precisamos depreciar métodos/funções e uma das formas mais comuns (pelo menos que eu conhecia até hoje) era utilizar JSDoc/TSDoc para documentar o método/função como obsoleto.

Vamos ver um exemplo de como podemos depreciar um método/função utilizando JSDoc/TSDoc.

```javascript
/**
 * Executa um console.log com o texto 'foo'.
 * @deprecated Este método foi depreciado e será removido em uma versão futura.
 * @returns {void}
 */
const foo = () => {
  console.log('foo');
};
```

Na sua IDE, você verá o seguinte quando passar o mouse sobre o método/função (exemplo: no VS Code):

![Exemplo método depreciado com JSDoc/TSDoc em uma IDE](https://i.ibb.co/VpbSWCWD/SCR-20251125-pvgr.png)

Usamos a marcação `@deprecated` para indicar que o método foi depreciado. Essa marcação se tornará muito útil para avisar os usuários que o método foi depreciado e que devem migrar para outro método/função.

Mas e se eu te dizer que existe uma forma prática de tornar um método obsoleto utilizando uma API oficial do Node.js?

## O método mais prático: `util.deprecate`

Usando a API o [util.deprecate](https://nodejs.org/api/util.html#utildeprecatefn-msg-code-options), podemos tornar um método/função obsoleto da seguinte forma:

```javascript
const { deprecate } = require('node:util');

const foo = deprecate(() => {
  console.log('Método depreciado');
}, 'Método depreciado. Utilize o metodo fooBar() ao invés de foo()');

foo();
```

Se rodar o código acima usando o Node.js, você verá a seguinte resposta:

![Exemplo método depreciado com util.deprecate](https://i.ibb.co/nq7ftzGH/SCR-20251125-pywd.png)

Com a API `util.deprecate`, podemos passar uma mensagem para o usuário avisando que o método foi depreciado e que devem migrar para outro método/função ao executar o método/função depreciado em tempo de execução.

## Conclusão

De maneira simples e eficiente, conseguimos depreciar um método/função utilizando uma API oficial do Node.js sem a necessidade de usar bibliotecas externas. O mais interessante é que é possível fazer esse tipo de abordagem há [muito tempo](https://nodejs.org/docs/latest-v4.x/api/util.html#util_util_deprecate_function_string). Se perde as informações na IDE, porém temos a mensagem de forma mais imediata e clara ao executar o código.

Mas é bom lembrar que a API `util.deprecate` é uma API oficial do Node.js e não uma API oficial do JavaScript.
