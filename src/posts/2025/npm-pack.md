---
layout: post
title: Como saber quais arquivos serão publicados no npm
description: Uma dica rápida para quem está desenvolvendo um projeto com Node.js e quer publicar um pacote no npm.
date: 2025-05-30
tags: [npm, node]
---

Uma dica rápida para quem está desenvolvendo um pacote utilizando Node.js e quer publica-lo no npm. Para saber quais os arquivos que estarão presentes no pacote, você pode simplesmente usar o comando:

```bash
npm pack
```
E o resultado será algo como:

![npm pack]({{ site.baseurl }}/assets/images/posts/2025/npm-pack.png)

É gerado um arquivo `.tgz` com o nome do pacote e a versão. Você pode validar se os arquivos que precisam existir no seu pacote estão corretos, além de ter algumas informações sobre o pacote, como:

* Versão do pacote;
* Tamanho do pacote comprimido e descomprimido;
* Total de arquivos no pacote.

Caso não queria gerar um arquivo `.tgz`, você pode usar o comando:

```bash
npm pack --dry-run
```
Nesse caso, terá como resultado:

![npm pack --dry-run]({{ site.baseurl }}/assets/images/posts/2025/npm-pack-dry-run.png)

Com o `--dry-run` você pode ver quais arquivos serão publicados, mas não é gerado o arquivo `.tgz`.

Simples, não!?
