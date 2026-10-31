---
layout: post
title: "Colorindo o terminal com util.styleText, sem instalar dependências"
summary: Conheça o util.styleText, função do Node.js que aplica cores e estilos ao texto do terminal sem depender de pacotes externos.
date: 2026-10-31
tags: [node, javascript, terminal, npm]
---

Quem já escreveu um script ou uma CLI em Node.js provavelmente instalou o [chalk](https://github.com/chalk/chalk) para destacar erros em vermelho ou mensagens de sucesso em verde. Por muito tempo, essa foi a saída mais prática, mas, para boa parte dos casos, ela não é mais necessária.

Encontrei um [artigo](https://pawelgrzybek.com/node-js-added-utility-for-text-formatting-you-may-not-need-chalk-anymore/) do Paweł Grzybek que chama a atenção para o `styleText`, uma função adicionada ao módulo `node:util` na versão 21.7.0 (e também na 20.12.0). Hoje ela já é considerada estável, a partir das versões 22.13.0 e 23.5.0.

## Como usar

A função recebe o formato desejado e o texto, e devolve a string já estilizada:

```js
import { styleText } from 'node:util';

console.log(styleText('green', 'Build concluído'));
console.log(styleText('red', 'Falha ao ler o arquivo'));
```

Os formatos disponíveis são os mesmos de `util.inspect.colors`: modificadores como `bold`, `italic`, `underline` e `dim`, cores de texto como `red`, `blue` e `gray` (com variações `bright`) e cores de fundo, que levam o prefixo `bg`, como `bgYellow`.

Para combinar estilos, é possível passar um array de formatos. Eles são aplicados da esquerda para a direita, então um estilo pode sobrescrever o anterior:

```js
import { styleText } from 'node:util';

console.log(styleText(['bold', 'underline', 'cyan'], 'Atenção'));
```

Também dá para aninhar chamadas, usando o resultado de uma como texto da outra:

```js
import { styleText } from 'node:util';

const aviso = styleText('yellow', `Versão ${styleText('bold', '22.13.0')} é a mínima`);

console.log(aviso);
```

## Respeita o ambiente

Um detalhe que me chamou atenção na documentação é que a função considera o terminal onde o texto será exibido. Desde as versões 22.8.0 e 20.18.0, ela respeita as variáveis `NO_COLOR`, `NODE_DISABLE_COLORS` e `FORCE_COLOR` e verifica se o destino é um TTY. Se você redirecionar a saída para um arquivo, por exemplo, as sequências de escape não vão poluir o conteúdo.

Por padrão, a verificação usa o `process.stdout`. Quando a mensagem for para outro fluxo, como o `stderr`, informe-o na opção `stream`:

```js
import { styleText } from 'node:util';
import { stderr } from 'node:process';

console.error(styleText('red', 'Algo deu errado', { stream: stderr }));
```

## Quando ainda faz sentido usar o chalk

O `styleText` resolve o essencial, mas o chalk oferece uma API encadeável (`chalk.red.bold('texto')`) e suporte a cores RGB, algo que a função nativa só ganhou recentemente, com cores hexadecimais a partir da versão 24.16.0. Se o seu projeto já depende dele e usa esses recursos, não há motivo para trocar.

Já para scripts pequenos e ferramentas novas, tirar uma dependência do `package.json` é um ganho simples: menos código de terceiros para atualizar e auditar, e a mesma saída colorida.

## Referência

- [Node.js added utility for text formatting: you may not need chalk anymore](https://pawelgrzybek.com/node-js-added-utility-for-text-formatting-you-may-not-need-chalk-anymore/)
