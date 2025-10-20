module.exports = () => {
  return {
    social: [
      { title: 'Github', url: 'https://github.com/tcelestino' },
      { title: 'Linkedin', url: 'https://linkedin.com/in/tcelestino' },
      { title: 'bsky', url: 'https://bsky.app/profile/tcelestino.bsky.social' },
      { title: 'rss', url: '/rss.xml', disabled: true },
    ].filter((item) => !item.disabled),
    pages: [
      { title: 'Eu', url: '/sobre-mim', disabled: true },
      { title: 'Posts', url: '/posts', disabled: true },
      { title: 'Contato', url: '/contato', disabled: true },
    ].filter((item) => !item.disabled),
  };
};
