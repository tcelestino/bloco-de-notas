module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob('src/posts/**/*.md').toReversed().slice(0, 10);
};
