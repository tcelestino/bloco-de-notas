module.exports = (collectionApi) => {
  const posts = collectionApi.getFilteredByGlob('src/posts/**/*.md').toReversed();
  const groups = [];

  for (const post of posts) {
    const year = post.date.getUTCFullYear();
    const last = groups[groups.length - 1];
    if (last && last.year === year) {
      last.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }

  return groups;
};
