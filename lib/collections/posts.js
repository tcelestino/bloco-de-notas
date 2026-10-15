const LATEST_POSTS_LIMIT = 3;

module.exports = (collectionApi) => {
  return collectionApi.getFilteredByGlob('src/posts/**/*.md').toReversed().slice(0, LATEST_POSTS_LIMIT);
};
