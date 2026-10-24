const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { rssPlugin, dateToRfc822 } = require('@11ty/eleventy-plugin-rss');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });
  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'default.njk');
  config.addLayoutAlias('post', 'post.njk');

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('postsFeed', require('./lib/collections/postsFeed'));
  config.addCollection('lastPosts', require('./lib/collections/lastPosts'));
  config.addCollection('postsByYear', require('./lib/collections/postsByYear'));
  config.addCollection('updates', require('./lib/collections/updates'));
  config.addCollection('navLinks', require('./lib/collections/nav-links'));

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('shortDate', require('./lib/filters/shortDate'));
  config.addFilter('isoDate', require('./lib/filters/isoDate'));

  config.addLiquidFilter('dateToRfc822', dateToRfc822);

  const preTabindex = require('./lib/transforms/pre-tabindex');
  config.addTransform('pre-tabindex', function (content) {
    return this.page.outputPath && this.page.outputPath.endsWith('.html') ? preTabindex(content) : content;
  });

  config.addPlugin(syntaxHighlight);
  config.addPlugin(rssPlugin);

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
