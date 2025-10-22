module.exports = (coll) => {
  return coll.getFilteredByGlob('src/updates/**/*.md').reverse();
};
