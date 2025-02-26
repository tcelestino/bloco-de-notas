const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const dataSite = require('./src/_data/site.js');
const menuData = require('./src/_data/menu.js');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });

  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');

  config.addCollection('posts', require('./lib/collections/posts'));

  config.addFilter('readableDate', require('./lib/filters/readableDate'));

  config.addPlugin(syntaxHighlight);

  // TODO: _data folder is not working
  config.addGlobalData('site', dataSite);
  config.addGlobalData('menu', menuData);

  return {
    dir: {
      input: 'src',
      output: './_site',
      includes: '_includes',
    },
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
  };
};
