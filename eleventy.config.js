const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const feedPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });
  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'default.njk');
  config.addLayoutAlias('post', 'post.njk');

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('postsFeed', require('./lib/collections/postsFeed'));
  config.addCollection('lastPosts', require('./lib/collections/lastPosts'));
  config.addCollection('updates', require('./lib/collections/updates'));
  config.addCollection('navLinks', require('./lib/collections/nav-links'));

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('shortDate', require('./lib/filters/shortDate'));

  config.addLiquidFilter('dateToRfc822', feedPlugin.dateToRfc822);

  config.addPlugin(syntaxHighlight);
  config.addPlugin(feedPlugin);

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
