const { NumberFormat } = require('intl');

module.exports = (number, lang = 'pt-br') => {
  const { format } = new NumberFormat(lang);
  return format(number);
};
