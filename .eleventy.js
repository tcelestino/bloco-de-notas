const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    const date = new Date(dateObj);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });
  eleventyConfig.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: './',
      output: './_site',
      layouts: './_layouts',
    },
    templateFormats: ['html', 'liquid', 'md', 'njk'],
  };
};
