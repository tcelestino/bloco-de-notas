export default {
  eleventyComputed: {
    permalink: (data) => {
      `/${data.page.date.getFullYear()}/${String(data.page.date.getMonth() + 1).padStart(2, '0')}/${
        data.page.fileSlug
      }.html`;
    },
  },
  layout: 'post',
  tags: ['tech'],
  title: 'Sem título',
};
