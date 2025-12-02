module.exports = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset());

  return formattedDate.toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
