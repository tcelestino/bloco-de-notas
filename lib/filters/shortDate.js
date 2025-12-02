module.exports = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset());

  return formattedDate.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
