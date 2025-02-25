const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });

  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');

  config.addCollection('posts', require('./lib/collections/posts'));

  config.addFilter('readableDate', require('./lib/filters/readableDate'));

  config.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: 'src',
      output: './_site',
      layouts: '_includes',
    },
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
  };
};
