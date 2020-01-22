module.exports = {
  run: async ({ msg, bot }) => msg.reply(`meu ping é \`${Math.floor(bot.ping)}\` ms!`),
  conf: {
    alias: ['latência', 'latency'],
    permissions: {
      bot: ['SEND_MESSAGES'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'ping',
    desc: 'veja a minha latência',
    category: 'bot',
  },
};
