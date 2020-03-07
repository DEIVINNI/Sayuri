export function run({ bot, msg }) { msg.reply(`meu ping é \`${Math.floor(bot.ping)}\` ms!`); }
export const conf = {
  alias: ['latência', 'latency'],
  permissions: {
    bot: ['SEND_MESSAGES'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'ping',
  desc: 'veja a minha latência',
  category: 'bot',
};
