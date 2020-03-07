import { NumberFormat } from 'intl';

export default (number, lang = 'pt-br') => new NumberFormat(lang).format(number);
