// <pre> com rolagem horizontal precisa ser alcancavel por teclado.
module.exports = (content) =>
  content.replace(/<pre(?=[\s>])([^>]*)>/g, (tag, attrs) =>
    /\btabindex=/.test(attrs) ? tag : `<pre${attrs} tabindex="0">`
  );
