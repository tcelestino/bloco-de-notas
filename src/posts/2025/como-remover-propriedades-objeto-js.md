---
layout: post
title: Como remover propriedades de um objeto no JavaScript
description: Existem várias maneiras de remover propriedades de um objeto em JavaScript. Aprenda a usa-las a partir deste post.
date: 2025-04-22
tags: [javascript]
---

**TL;DR:**

- Encontre a melhor abordagem para remover propriedades de um objeto em JavaScript;
- Utilize o operador `delete`, desestruturação, `Object.keys()`, `Object.entries()`, e até mesmo usando bibliotecas como o `lodash` para remover uma propriedade de um objeto;
- Descubra os prós e contras de cada abordagem;
- Conheça uma nova abordagem como a Reflect API.

Você já alguma vez teve a necessidade de remover propriedades de um objeto em JavaScript? É provável que sim! Pela versatilidade do JavaScript, conseguimos remover propriedades de um objeto de diversas maneiras e abaixo listo 8 abordagens com uma breve explicação, exemplos e pontos de atenção. Partiu! 🚀

## 1. Usando o operador delete

O método mais comum para remover uma propriedade de um objeto em JavaScript é usando o operador "[delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)". Este operador remove a propriedade especificada do objeto.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
delete obj.age; // A propriedade 'age' foi removida do objeto.
console.log(obj); // { name: 'John', city: 'New York' }
```
### Notas

- Simples e direto. Funciona bem para objetos simples;
- O operador `delete` pode afetar o desempenho, especialmente em loops, pois altera a estrutura do objeto;
- Não é recomendado para objetos que você deseja manter imutáveis.

## 2. Usando a desestruturação (destructuring)

Outra maneira de remover propriedades de um objeto é usando a "desestruturação" ([destructuring](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring)). Você pode criar um novo objeto sem a propriedade que deseja remover.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const { age, ...newObj } = obj; // A propriedade 'age' foi removida.
console.log(newObj); // { name: 'John', city: 'New York' }
```

### Notas

- Mantém o objeto original imutável;
- É uma abordagem moderna e legível;
- Pode não ser tão intuitivo para quem não está familiarizado com a desestruturação. Além disso, cria um novo objeto, o que pode não ser ideal em todos os casos;
- Funciona perfeitamente com frameworks que precisam de imutabilidade, como React.js.

## 3. Combinando Object.keys() com reduce()

Você pode usar "[Object.keys()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)" para obter um _array_ de chaves do objeto e, em seguida, usar `reduce()` para criar um novo objeto sem a propriedade que deseja remover.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const newObj = Object.keys(obj).reduce((acc, key) => {
  if (key !== 'age') {
    acc[key] = obj[key]; // Adiciona a propriedade ao novo objeto se não for 'age'.
  }
  return acc;
}, {});
console.log(newObj); // { name: 'John', city: 'New York' }
```
### Notas

- Mantém o objeto original imutável. É uma abordagem funcional e pode ser mais flexível;
- Pode ser mais verboso do que outras abordagens. Além disso, pode ser menos eficiente em termos de desempenho, especialmente para objetos grandes.

## 4. Usando Object.entries() e Object.fromEntries()

Outra abordagem é utilizando o "[Object.entries()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)" para obter um array de pares chave-valor e, em seguida, filtrar as entradas que você deseja manter. Depois, você pode usar "[Object.fromEntries()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)" para criar um novo objeto a partir do array filtrado.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const newObj = Object.fromEntries(
  Object.entries(obj).filter(([key]) => key !== 'age') // Filtra a propriedade 'age'.
);
console.log(newObj); // { name: 'John', city: 'New York' }
```
### Notas

- Mantém o objeto original imutável. É uma abordagem moderna e legível;
- Pode ser mais verboso do que outras abordagens. Além disso, pode não ser tão intuitivo para quem não está familiarizado com `Object.entries()` e `Object.fromEntries()`;
- Pode impactar a performance, já que é necessário iterar por todas as propriedades do objeto.

## 5. Configurando a propriedade como "undefined"
Essa abordagem é menos comum, mas você pode simplesmente definir a propriedade como `undefined`. Isso não remove a propriedade do objeto, mas a torna indefinida.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
obj.age = undefined; // A propriedade 'age' agora é indefinida.
console.log(obj); // { name: 'John', age: undefined, city: 'New York' }
```
### Notas

- Mantém a propriedade no objeto, mas a torna indefinida. Isso pode ser útil em alguns casos;
- Não remove a propriedade do objeto, o que pode causar confusão. Além disso, não é uma abordagem recomendada para remover propriedades;
- Pode não ser ideal para objetos que você deseja manter limpos e sem propriedades indefinidas;
- Não é uma abordagem recomendada para remover propriedades;
- Pode causar confusão, pois a propriedade ainda irá existir no objeto, mas com valor `undefined`.

## 6. Usando Object.defineProperty

Outra abordagem é usar "[Object.defineProperty()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)" para definir a propriedade como não enumerável. Isso não remove a propriedade, mas impede que ela seja listada em loops.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
Object.defineProperty(obj, 'age', {
  enumerable: false // Define a propriedade 'age' como não enumerável.
});
console.log(obj); // { name: 'John', city: 'New York' }
console.log(Object.keys(obj)); // ['name', 'city'] - 'age' não aparece na lista de chaves.
```
### Notas

- Esta seção fornece informações adicionais sobre as abordagens discutidas;
- Mantém a propriedade no objeto, mas a torna não enumerável. Isso pode ser útil em alguns casos;
- Pode se tornar complexo e não remover verdadeiramente a propriedade do objeto.

## 7.Usando Reflect.deleteProperty

Essa abordagem descobri recentemente. No caso, usando `Reflect.deleteProperty` da [Reflect API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect), conseguimos ter abordagem semelhante ao operador `delete`, porém com muito mais possibilidades de uso a partir de outros métodos da API.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
Reflect.deleteProperty(obj, 'age'); // Remove a propriedade 'age'.
console.log(obj); // { name: 'John', city: 'New York' }
```

### Notas

- Problemas de performance parecidos com o uso do operador `delete`;
- Uma ampla possibilidade de uso dos métodos da API `Reflect`, como `Reflect.get()`, `Reflect.set()`, entre outros;
- Pode não ser tão intuitivo para quem não está familiarizado com a API `Reflect`.

## 8. Usando bibliotecas externas

Se você estiver usando uma biblioteca externa, como `lodash`, pode usar métodos específicos para remover propriedades de um objeto. Por exemplo, a biblioteca `lodash` oferece o método "[omit](https://lodash.com/docs/4.17.15#omit)", que é uma maneira prática e eficiente de remover propriedades de um objeto.

```javascript
import _ from 'lodash';
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const newObj = _.omit(obj, ['age']); // Remove a propriedade 'age'.
console.log(newObj); // { name: 'John', city: 'New York' }
```
### Notas

- Simples e direto. Funciona bem para objetos complexos;
- Adiciona uma dependência externa ao seu projeto. Pode não ser necessário se você só precisa dessa funcionalidade.

## Conclusão

Existem várias abordagens para se remover propriedades de um objeto em JavaScript. A escolha do método depende do seu caso de uso específico e das suas preferências pessoais e do projeto. O operador `delete` é o mais comum, mas as outras abordagens também são úteis em diferentes situações e que podem trazer impactos positivos para a performance das suas aplicações. Além de existir abordagens não tão comuns, como o uso da Reflect API.

Espero que este post ajude a encontrar novas abordagens de como remover propriedades de um objeto em JavaScript.
