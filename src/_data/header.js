const { url, title } = require('./site');

module.exports = {
  title: 'Bloco de Notas',
  subtitle: 'por Tiago Celestino',
  menu: {
    local: [
      {
        title: 'Quem sou',
        url: '/quem-sou',
      },
      {
        title: 'Projetos',
        url: '/projetos',
      },
      {
        title: 'Contato',
        url: '/contato',
      },
      {
        title: 'RSS',
        url: '/rss.xml',
      },
    ],
    social: [
      {
        title: 'GitHub',
        url: 'https://github.com/tcelestino',
        newTab: true,
      },
      {
        title: 'Linkedin',
        url: 'https://linkedin.com/tcelestino',
        newTab: true,
      },
      {
        title: 'Bluesky',
        url: 'https://bsky.app/profile/tcelestino.bsky.social',
        newTab: true,
      },
    ],
  },
};
