import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import collections from './_config/collections.js';
import pluginFilters from './_config/filters.js';

export default (config) => {
  config.addPassthroughCopy('src/assets/images/**/*');
  config.addPassthroughCopy({ 'src/posts/images/**/*': 'assets/images/' });

  config.addPassthroughCopy('src/assets/css/**/*');

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');

  // Add collections
  collections(config);

  // Filters
  config.addPlugin(pluginFilters);

  config.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: 'src',
      output: './_site',
      includes: '../_includes',
      data: '../_data',
    },
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
  };
};
