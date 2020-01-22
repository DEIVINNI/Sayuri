const { evaluate } = require('mathjs');

module.exports = {
  run: async ({ bot, msg, args }) => {
    try {
      msg.channel.send(`:1234: \`|\` ${bot.user.username} Calculator`, {
        embed: msg.embed(msg.author, 'mathjs', {
          thumbnail: { url: 'https://lh3.googleusercontent.com/teegsEGjmomH-MHD-A_BSwapI5ry6EIVOKBVl--Q6BkJ3kfigBezEqoJU1ZYcn9_Vv-X' },
        })
          .addFieldArray('Equação', [['```js', args.join(' '), '```']])
          .addFieldArray('Resultado', [['```js', evaluate(args.join(' ')), '```']]),
      });
    } catch (e) {
      msg.reply('por favor insira uma equação válida!');
    }
  },
  conf: {
    alias: ['calcular'],
    arguments: true,
    permissions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    },
  },
  help: {
    name: 'math',
    desc: 'faça contas matemáticas pelo discord',
    usage: '<equação>',
    category: 'utilidade',
    credit: ['[Plexi Development](https://www.youtube.com/user/TrueXPixels)'],
  },
};
