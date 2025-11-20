---
layout: post
title: Como remover propriedades de um objeto no JavaScript
summary: Confira diversas maneiras de remover propriedades (chaves) de um objeto em JavaScript.
date: 2025-04-29
tags: [javascript]
---

Em algum momento que você estava desenvolvendo algo em JavaScript, você precisou remover uma propriedade (podemos chamar de "chaves") de um objeto. Por incrível que pareça, existem várias formas de fazer isso com JavaScript, o que pode ser bom por um lado, mas pode se tornar um problema para o outro, já que a depender da situação, uma abordagem menos eficiente pode impactar a performance da sua aplicação.

Essa semana estive implementando uma funcionalidade a partir de uma API de terceiros, e precisava remover algumas propriedades de um objeto, e por curiosidade, decidi pesquisar sobre as diferentes formas de fazer isso e como cada uma pode impactar a performance da aplicação, saindo do tradicional `delete`.

Nesse post, vou listar algumas das abordagens conhecidas e outras que acabei descobrindo nas minhas pesquisas.

Partiu!! 🚀

## 1. Usando o operador delete

É o método mais conhecido para remover uma propriedade de um objeto em JavaScript. Usando o operador "[delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)", você consegue remover a propriedade especificada do objeto de forma direta.

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

Uma outra abordagem para remover propriedades de um objeto, que pode ser considerada moderna, é utilizando a "[destructuring](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring)". A partir dessa abordagem, você cria um novo objeto removendo a propriedade, sem mexer no objeto original, mantendo-o imutável.

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
- Pode não ser tão intuitivo para quem não está familiarizado com a desestruturação;
- Em alguns casos, criar um novo objeto pode não ser ideal.

## 3. Usando a combinação de Object.keys() com reduce()

Ao usar o "[Object.keys()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)" combinado com o método `reduce()`, também conseguimos criar um novo objeto sem a propriedade que deseja remover. E de novo, conseguimos manter o objeto original imutável.

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
- Pode ser mais verboso do que outras abordagens. Além disso, pode ser menos eficiente em termos de desempenho, especialmente para objetos com muitas propriedades.

## 4. Usando Object.entries() e Object.fromEntries()

Usando "[Object.entries()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)" obtemos um array de pares chave-valor e, em seguida, podemos fazer um filtro das propriedades que você deseja manter. Na sequência, usando "[Object.fromEntries()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)" criamos um novo objeto a partir do _array_ que foi filtrado usando a função `filter()`.

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
- Pode trazer impacto na performance, já que é necessário fazer iteração em todas as propriedades do objeto.

## 5. Usando Object.defineProperty

Essa abordagem é menos conhecida, mas usando o "[Object.defineProperty()](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)" conseguimos definir a propriedade como não enumerável. Isso não remove a propriedade, mas impede que ela seja listada em loops.

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

## 6. Usando Reflect.deleteProperty

Essa abordagem descobri nessa pesquisa. No caso, usando `Reflect.deleteProperty` da [Reflect API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect), conseguimos ter abordagem semelhante ao operador `delete`, porém com muito mais possibilidades de uso a partir dos outros métodos da API.

```javascript
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
Reflect.deleteProperty(obj, 'age'); // Remove a propriedade 'age'.
console.log(obj); // { name: 'John', city: 'New York' }
```

Caso você queira remover uma propriedade de um objeto que não existe, o método `Reflect.deleteProperty` retornará `true`, diferente do operador `delete`, que retornará `false`.

Se tiver mais interesse em entender melhor sobre a API `Reflect`, recomendo dar uma lida na documentação no [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect).

### Notas

- Problemas de performance parecidos com o uso do operador `delete`;
- Uma ampla possibilidade de uso dos métodos da API `Reflect`, como `Reflect.get()`, `Reflect.set()`, entre outros;
- Pode confundir para quem não tem conhecimento da API `Reflect`.

## 7. Usando bibliotecas externas

Como notado, hoje em dia temos diversas maneiras de remover propriedades de um objeto em JavaScript, sem a necessidade de usar bibliotecas externas. Mas, se você estiver usando uma biblioteca externa, como `lodash`, e ou `underscore`, existem métodos específicos para remover propriedades de um objeto.

```javascript
// Usando lodash
import _ from 'lodash';
const obj = {
  name: 'John',
  age: 30,
  city: 'New York'
};
const newObj = _.omit(obj, ['age']); // Remove a propriedade 'age'.
console.log(newObj); // { name: 'John', city: 'New York' }
```
Recomendo dar uma lida no repositório "[You Don't Need Lodash/Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)" para entender como você pode substituir as bibliotecas `lodash` e `underscore` por outras abordagens mais performáticas.

## Conclusão

Como a versatilidade do JavaScript, conseguimos ter várias diversas maneiras para remover propriedades de um objeto. A escolha da abordagem vai depender do caso de uso e do que o seu projeto precisa Usar o `delete` é o mais comum e mais fácil de entender, mas as outras abordagens também são úteis em diferentes situações e que traz impactos positivos para a performance das suas aplicações.
