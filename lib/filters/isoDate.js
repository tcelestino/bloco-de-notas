module.exports = (date) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`isoDate: data invalida: ${date}`);
  }
  return parsed.toISOString().slice(0, 10);
};
