export default function (eleventyConfig) {
  // readableDate filter
  eleventyConfig.addFilter('readableDate', (date) => {
    const formatedDate = new Date(date);
    formatedDate.setMinutes(
      formatedDate.getMinutes() + formatedDate.getTimezoneOffset()
    );

    return formatedDate.toLocaleString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });
}
