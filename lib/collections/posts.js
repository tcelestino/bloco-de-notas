const LATEST_POSTS_LIMIT = 5;

module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob('src/posts/**/*.md').toReversed().slice(0, LATEST_POSTS_LIMIT);
};
