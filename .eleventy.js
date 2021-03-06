const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj)
      .setLocale('pt')
      .toFormat('d LLLL yyyy')
      .toUpperCase();
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
