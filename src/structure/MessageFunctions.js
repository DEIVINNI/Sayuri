import { Embed, FormatDuration, FormatNumber, shortenerText, FirstUpperCase, getMember } from '../util/functions/index';

export default (message) => {
  Object.defineProperties(message, {
    config: { value: require('../util/config') },
    emoji: { value: require('../util/config').emojis },
    perms: { value: require('../util/config').perms },
    embed: { value: (user, credit, data = {}) => new Embed(user, credit, data) },
    formatDuration: { value: (duration) => FormatDuration(duration) },
    formatNumber: { value: (number, lang = 'pt-br') => FormatNumber(number, lang) },
    shortenerText: { value: (text, maxLen = 503) => shortenerText(text, maxLen) },
    firstUpperCase: { value: (text) => FirstUpperCase(text) },
    getMember: { value: (args = '', pos = 0, member = false) => getMember(message, args, pos, member) },
  });
};
