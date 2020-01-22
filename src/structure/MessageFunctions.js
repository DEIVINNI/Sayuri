const { Embed, FormatDuration, FormatNumber, shortenerText, FirstUpperCase } = require('../util/functions/');

module.exports = (client, message) => {
  Object.defineProperties(message, {
    config: { value: require('../util/config') },
    emoji: { value: require('../util/config').emojis },
    perms: { value: require('../util/config').perms },
    embed: { value: (user, credit, data = {}) => new Embed(user, credit, data) },
    formatDuration: { value: (duration) => FormatDuration(duration) },
    formatNumber: { value: (number, lang = 'pt-br') => FormatNumber(number, lang) },
    shortenerText: { value: (text, maxLen = 503) => shortenerText(text, maxLen) },
    firstUpperCase: { value: (text) => FirstUpperCase(text) },
    getMember: {
      value: (args, position, returnMember) => {
        let member;
        if (!args[position]) member = message.author;
        else {
          member = message.mentions.users.array()[position]
            || message.guild.members.find((m) => m.displayName.toLowerCase().includes(args[position].toLowerCase()))
            || message.guild.member(args[position]);
        }
        return returnMember ? message.guild.member(member) : client.users.get(member.id || member.user.id);
      },
    },
    connect: { value: ({ doc: { type, id, content } }) => require('../util/database').connect({ type, id, content }) },
  });
};
