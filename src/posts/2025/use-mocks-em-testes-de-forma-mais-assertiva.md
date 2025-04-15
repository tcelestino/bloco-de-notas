---
layout: post
title: Use mocks em testes de forma mais assertiva
description: Descubra como usar mocks em testes de forma mais assertiva, evitando que o teste falhe por causa de um erro no mock.
date: 2025-04-16
tags: []
---

**TL;DR:**
- Usar mocks traz uma forma eficiente para escrever testes mais assertivos;
- Podemos usar mocks em qualquer situação, mas devemos evitar alterar o comportamento de uma dependência;
- Criando adaptadores tornamos nossa aplicação mais flexível com integrações externas e conseguimos testes mais assertivos;

*Revisão:* [Luiz Corte Real](https://www.linkedin.com/in/lreal/)

Esses dias voltei a mexer em um projeto pessoal e ao começar a escrever os testes unitário, notei que precisava validar um método que tinha uma dependência. Tinha lido o artigo “[Don't Mock Your Framework: Writing Tests You Won't Regret](https://laconicwit.com/dont-mock-your-framework-writing-tests-you-wont-regret/)” do Brendan McLoughlin, no qual ele recomenda não utilizar _mocks_ quando estiver escrevendo testes utilizando frameworks (React.js, Remix…), mas que também podemos aplicar o conceito em outras situações, por isso resolvi escrever para mostrar como que podemos ter testes mais assertivos.
## Mas o que é mock?
Para quem não está habituado com desenvolvimento de software, e ou escrever testes, acredito que deve está se perguntando: o que seria _mocks_?

Aqui vai uma explicação muito simples retirada do “[Engineering Fundamentals Playbook](_https%3A//microsoft.github.io/code-with-engineering-playbook/automated-testing/unit-testing/mocking/_)”, da Microsoft:

> One of the key components of writing unit tests is to remove the dependencies your system has and replacing it with an implementation you control. The most common method people use as the replacement for the dependency is a mock, and mocking frameworks exist to help make this process easier.

Ou seja, se você tem uma dependência e quer garantir que essa dependência funcione mantendo o controle de como ela se comporta no seu código, você vai pode implementar o como espera que ela se comporte. Isso pode ser um metódo de uma classe, uma função… Com exemplo fica mais prático entender.

Imagine que a seguinte implementação:

```ts
//filmes.ts
export const Filmes = {
  filmes: {
    nome: 'Filme Exemplo',
    genero: 'Ação',
    ano: 2023,
  },
  carregaFilmes: async () => {
    try {
      const API_URL = 'https://api.example.com/filmes';
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Filmes.filmes),
      });
      const data = await response.json();
      const { nome, genero, ano } = data;
      return { nome, genero, ano };
    } catch (_error) {
      throw new Error('Falha ao carregar os filmes');
    }
  },
};
```
Temos uma dependência em nosso código. No caso, estamos usando [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch), fazendo uma requisição para uma API fictícia e esperamos que retorne um objeto com as informações que precisamos.

Para validar se meu código está funcionando corretamente, posso implementar os seguintes casos de teste unitário:

```ts
//filmes.test.ts
import { assertEquals } from 'jsr:@std/assert';
import { assertSpyCalls, stub } from 'jsr:@std/testing/mock';
import { Filmes } from './filmes.ts';

Deno.test('Filmes', async (t) => {
  // Teste para a função carregaFilmes
  await t.step('deve carregar filmes', async () => {
    // Mock do dado de resposta da API
    const mockData = {
      nome: 'Filme Exemplo',
      genero: 'Ação',
      ano: 2023,
    };

    // @ts-ignore
    const mockFetch = stub(globalThis, 'fetch', () => {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      });
    });

    try {
      // Chamada da função carregaFilmes
      const resultado = await Filmes.carregaFilmes();

      // Verifica se o resultado está correto
      assertEquals(resultado, mockData);
      // Verifica se o fetch foi chamado uma vez
      assertSpyCalls(mockFetch, 1);
    } finally {
      // Restaura o stub
      mockFetch.restore();
    }
  });

  // Teste para validar o tratamento de erro
  await t.step('deve lidar com erro ao carregar filmes', async () => {
    // Mock do fetch para simular um erro
    const mockFetch = stub(globalThis, 'fetch', () => {
      return Promise.reject(new Error('Erro ao carregar filmes'));
    });

    try {
      // Chamada da função carregaFilmes
      await Filmes.carregaFilmes();
    } catch (error) {
      // Verifica se o erro foi tratado corretamente
      assertEquals((error as Error).message, 'Falha ao carregar os filmes');
    } finally {
      // Restaura o stub
      mockFetch.restore();
    }
  });
});
```
_Usei o [Deno.js](https://deno.com/) para escrever os exemplos_
## Utilizando adaptadores
No artigo do Brendan, ele mostra o quanto é mais prático fazer _mocks_ utilizando o conceito de adaptadores (_adapters_), evitando de modificar como as implementações das dependências se comportam. A ideia de usar adaptadores vem da arquitetura hexagonal e criando adaptadores você torna sua aplicação mais flexível com integrações externas.

[imagem](https://laconicwit.com/content/images/size/w1000/2024/06/1920px-Hexagonal_Architecture.svg.png)
_Recomendo a leitura do [artigo](https://medium.com/@whmartins/arquitetura-hexagonal-ports-and-adapters-na-pr%C3%A1tica-com-typescript-42f6e113715b)  do  ~[William Henrihque Martins](https://medium.com/@whmartins?source=post_page---byline--42f6e113715b---------------------------------------) sobre arquitetura hexagonal. Vale a leitura_

Voltando para o primeiro teste,  se notar, foi preciso criar um _mock_ para alterar o comportamento da função `.json()` do objeto `fetch`. Sim, ela continua resolvendo uma [Promise](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise), mas será que deveria/precisaria fazer isso?

Analisando, conseguimos refatorar o código para focarmos apenas como nossa aplicação se comporta, independente da dependência.  Podemos ter algo assim:

```ts
//filmes_v1.ts
export const Filmes = {
  filmes: {
    nome: 'Filme Exemplo',
    genero: 'Ação',
    ano: 2023,
  },

  // Esse é o adaptador
  fetchData: async () => {
    try {
      const response = await fetch('https://api.example.com/filmes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Filmes.filmes),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Falha ao carregar os filmes', {
        cause: error,
      });
    }
  },

  // Aqui posso fazer outras lógicas
  carregaFilmes: async () => {
    const filmes = await Filmes.fetchData();
    return filmes;
  },
};
```

Agora, invés de ter toda a lógica em uma única função, criamos um “adaptador”, responsável por fazer a chamada para a API externa.

_Lembrando que é apenas um exemplo ilustrativo, então melhorias podem ser aplicadas obvivamente_. 😆

Reescrevendo o teste, teríamos algo assim:

```ts
//filmes_v1.test.ts
import { assertEquals } from 'jsr:@std/assert';
import { assertSpyCalls, spy, stub } from 'jsr:@std/testing/mock';
import { Filmes } from './filmes_v1.ts';

Deno.test('Filmes v1', async (t) => {
  await t.step('deve carregar filmes', async () => {
    // Mock da resposta da API
    const mockData = {
      nome: 'Filme de Comédia',
      genero: 'Comédia',
      ano: 2024,
    };

    // Mock para simular chamada do fetch
    const originalFetch = globalThis.fetch;
    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    globalThis.fetch = stub(
      globalThis,
      'fetch',
      (_input: string | URL | Request, _init?: RequestInit) =>
        Promise.resolve(mockResponse)
    );

    // Mock para validar mockFetchData
    const mockFetchData = spy(Filmes, 'fetchData');

    try {
      // Chamada da função carregaFilmes
      const resultado = await Filmes.carregaFilmes();

      // Verifica se o resultado está correto
      assertEquals(resultado, {
        nome: 'Filme de Comédia',
        genero: 'Comédia',
        ano: 2024,
      });

      // Verifica se o fetchData() foi chamada uma vez
      assertSpyCalls(mockFetchData, 1);
    } finally {
      // Restaura mocks
      mockFetchData.restore();
      globalThis.fetch = originalFetch;
    }
  });

  await t.step('deve lidar com erro ao carregar filmes', async () => {
    // Mock do fetch para simular um erro
    const originalFetch = globalThis.fetch;
    const mockResponseError = new Response(JSON.stringify({}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

    globalThis.fetch = stub(
      globalThis,
      'fetch',
      (_input: string | URL | Request, _init?: RequestInit) =>
        Promise.reject(mockResponseError)
    );

    try {
      // Chamada da função carregaFilmes
      await Filmes.carregaFilmes();
    } catch (error) {
      // Verifica se o erro foi tratado corretamente
      assertEquals((error as Error).message, 'Falha ao carregar os filmes');
    } finally {
      // Restaura o mock
      globalThis.fetch = originalFetch;
    }
  });
});
```

Não ficou muito mais assertivo? No caso, conseguimos garantir os mesmos casos de teste, mas agora não foi preciso modificar o comportamento da função `json()` do objeto `fetch`.

> Ah! Mas tem o mock do `globalThis.fetch`ali no meio!!

Você pode ter notado isso, mas se olhar profundamente, não mexemos no comportamento da função `.json()`,  apenas fizemos a alteração para que o `global.fetch` retorne o dado que esperamos.  Ou seja, não preciso saber como minha dependência funciona, mas sim o que espero da resposta.

Se tiver interesse em olhar mais de perto e ou criar seus casos para estudos, os exemplos estão disponíveis em [https://github.com/tcelestino/exemplos-mocks](https://github.com/tcelestino/exemplos-mocks)

*Lembrando que os exemplos são ilustrativos.* 😉
## Conclusão
Escrever testes pode ser uma diversão para muitos, para outros uma “perda” de tempo, mas sem questionamentos, ter testes em partes críticas/essenciais em nossos projetos nos ajudará a ter menos dor de cabeça no futuro que estivermos adicionando novos recursos e ou tentando resolver um problema.

No artigo, o Brendan usa como exemplos de uso dessa abordagem utilizando frameworks frontend (Remix e o React.js), mas sem dúvidas é aplicavél em diversas situações. Além de manter uma assertividade de ter testes mais concisos, sem dúvidas irá te ajudar a reepensar na estruturação do seu código. Sim, testes também servem para isso, **fica a dica!**

Na próxima vez que for escrever testes unitário e notar que está precisanso criar muitos _mocks_,  reveja se seu código não pode ser dividido em partes e até mesmo ter uma estrutura mais simples. Pensar isso no ínicio vai te deixar mais tranquilo no futuro.

