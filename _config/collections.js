export default function (eleventyConfig) {
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/**/*.md').reverse();
  });
}
