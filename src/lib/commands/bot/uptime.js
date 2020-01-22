module.exports = {
  run: ({ bot, msg }) => msg.reply(`estou online à ${msg.formatDuration(bot.uptime)}!`),
  conf: {
    alias: ['ontime'],
    permissions: {
      bot: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'uptime',
    desc: 'veja o tempo que estou online',
    category: 'bot',
  },
};
