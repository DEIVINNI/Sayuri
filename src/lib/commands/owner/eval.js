const { inspect } = require('util');

/* eslint-disable no-unused-vars */

module.exports = {
  run: async ({ bot, msg, args }) => { // eslint-disable-line consistent-return
    const code = args.join(' ').replace(/(^`{3}(\w+)? *\n*| *\n*`{3}$)/g, '');
    if (['bot.token', 'msg.guild.leave()'].includes(code)) return msg.reply('ta doido viado?');
    let result;
    try {
      result = inspect(eval(code), { depth: 0 }); // eslint-disable-line no-eval
    } catch (e) {
      result = e;
    }
    if (result) msg.channel.send(result, { code: 'js', split: true });
  },
  conf: {
    alias: ['debug', 'exec'],
    ownerOnly: true,
  },
  help: {
    name: 'eval',
    category: 'owner',
  },
};
