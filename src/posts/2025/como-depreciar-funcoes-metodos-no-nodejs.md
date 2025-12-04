---
layout: post
title: Como depreciar funções/métodos no Node.js
summary: Descubra Como depreciar funções/métodos no Node.js de maneira prática.
date: 2025-12-04
tags: [dev, nodejs]
---

Estava lendo o post "[How to "officially" deprecate methods with Node.js utilities](https://www.stefanjudis.com/today-i-learned/deprecate-method-in-node-js/)" do Stefan Judis (recomendo a leitura do blog dele) e achei interessante compartilhar essa dica rápida para quem escreve código utilizando Node.js e precisa documentar que um método/função foi depreciado.

## O método que conhecia até hoje: JSDoc

Muitas vezes precisamos depreciar métodos/funções e uma das formas mais comuns era utilizando o JSDoc para documentar o método/função como obsoleto. Se você não conhece o [JSDoc](https://jsdoc.app/), ele é uma especificação de documentação para JavaScript que permite documentar o código de forma estruturada e consistente. Funciona tanto no JavaScript quanto no TypeScript.

```javascript
/**
 * Executa um console.log com o texto 'foo'.
 * @deprecated Utilize a função `bar()` em seu lugar. Este método será removido em uma versão futura.
 * @returns {void}
 */
const foo = () => {
  console.log('foo');
};

foo();
```

No seu editor de código, teremos uma mensagem de aviso quando passar o mouse sobre o método/função.

![Exemplo método depreciado com JSDoc/TSDoc em uma IDE](https://i.ibb.co/VpbSWCWD/SCR-20251125-pvgr.png)
_exemplo no VS Code_

Para isso, usamos a marcação `@deprecated` para indicar que o método foi depreciado, exibindo uma mensagem de aviso na sua IDE.

## Uma nova abordagem mais prática: `util.deprecate`

Acabei descobrindo no artigo do Stefan Judis que é possível utilizar a API [util.deprecate](https://nodejs.org/api/util.html#utildeprecatefn-msg-code-options) para depreciar um método/função.

```javascript
const { deprecate } = require('node:util');

const foo = deprecate(() => {
  console.log('Função obsoleta');
}, 'Função obsoleta. Utilize fooBar() em vez de foo()');

foo();
```

Se rodar o código acima usando o Node.js, você verá a seguinte resposta:

![Exemplo método depreciado com util.deprecate](https://i.ibb.co/nq7ftzGH/SCR-20251125-pywd.png)
_exemplo da mensagem depreciada no terminal ao executar o código Node.js_

Com a API `util.deprecate`, podemos passar uma mensagem para o usuário indicando qual é a migração recomendada quando o método/função for executado em tempo de execução.

## Conclusão

De maneira simples, conseguimos depreciar um método/função utilizando uma API oficial do Node.js sem a necessidade de usar bibliotecas externas. O mais interessante é que é possível fazer esse tipo de abordagem há [muito tempo](https://nodejs.org/docs/latest-v4.x/api/util.html#util_util_deprecate_function_string). Vale lembrar que a API `util.deprecate` é uma funcionalidade oficial do Node.js, não do JavaScript.
