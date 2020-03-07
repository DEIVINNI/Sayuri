import { locale, duration } from 'moment'; import 'moment-duration-format';

locale('pt-BR');

export default (time) => duration(time).format('`D`[ d], `H`[ h], `m`[ min], `s`[ segs]');
