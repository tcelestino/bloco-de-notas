const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });
  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'default.njk');
  config.addLayoutAlias('post', 'post.njk');

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('lastPosts', require('./lib/collections/lastPosts'));
  config.addCollection('updates', require('./lib/collections/updates'));
  config.addCollection('navLinks', require('./lib/collections/nav-links'));

  config.addFilter('readableDate', require('./lib/filters/readableDate'));

  // config.addLiquidFilter('dateToRfc822', pluginRss.dateToRfc822);

  config.addPlugin(syntaxHighlight);
  // config.addPlugin(pluginRss, {
  //   type: 'rss',
  //   outputPath: '/feed.xml',
  //   collection: { name: 'posts', limit: 5 },
  // });

  return {
    dir: {
      input: 'src',
      output: './_site',
      layouts: '_layouts',
    },
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    // markdownTemplateEngine: 'njk',
  };
};
