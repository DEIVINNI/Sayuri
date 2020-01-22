const moment = require('moment'); require('moment-duration-format');

moment.locale('pt-BR');

module.exports = (duration) => moment.duration(duration).format('`D`[ d], `H`[ h], `m`[ min], `s`[ segs]');
