module.exports = (coll) => {
  return coll.getFilteredByGlob('src/posts/**/*.md').reverse();
};
