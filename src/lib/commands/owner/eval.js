import { inspect } from 'util';

/* eslint-disable no-unused-vars */

export function run({ bot, msg, args }) {
  const code = args.join(' ').replace(/(^`{3}(\w+)? *\n*| *\n*`{3}$)/g, '');
  if (['bot.token', 'msg.guild.leave()'].includes(code)) msg.reply('ta doido viado?');
  let result;
  try {
    result = inspect(eval(code), { depth: 0 }); // eslint-disable-line no-eval
  } catch (e) {
    result = e;
  }
  if (result) msg.channel.send(result, { code: 'js', split: true });
}
export const conf = {
  alias: ['debug', 'exec'],
  ownerOnly: true,
  arguments: true,
};
export const help = {
  name: 'eval',
  usage: '<code>',
  category: 'owner',
};
