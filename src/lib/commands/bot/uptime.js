export function run({ bot, msg }) { return msg.reply(`estou online à ${msg.formatDuration(bot.uptime)}!`); }
export const conf = {
  alias: ['ontime'],
  permissions: {
    bot: ['SEND_MESSAGES'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'uptime',
  desc: 'veja o tempo que estou online',
  category: 'bot',
};
