module.exports = () => {
  return {
    social: [
      { title: 'Github', url: 'https://github.com/tcelestino' },
      { title: 'Linkedin', url: 'https://linkedin.com/in/tcelestino' },
      {
        title: 'Bsky',
        url: 'https://bsky.app/profile/tcelestino.bsky.social',
      },
      { title: 'Unsplash', url: 'https://unsplash.com/tcelestino' },
      { title: 'RSS', url: '/rss.xml', disabled: true },
    ].filter((item) => !item.disabled),
    pages: [
      { title: 'Eu', url: '/sobre-mim', disabled: true },
      { title: 'Changelog', url: '/updates' },
      { title: 'Contato', url: '/contato', disabled: true },
    ].filter((item) => !item.disabled),
  }
}
