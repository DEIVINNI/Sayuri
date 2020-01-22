function morse(text = '') {
  return text.replace(/./g, (x) => `${require('../../../util/assets/morse')[x]}\u2007`).replace(/undefined/g, 'sem_tradução\u2007').trim();
}

module.exports = {
  run: async ({ msg, args }) => msg.reply(['aqui está o seu `código morse`:', '>>>```', morse(args.join(' ')), '```'].join('\n')),
  conf: {
    enable: true,
    arguments: true,
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'morse',
    desc: 'transforme uma frase em código morse.',
    usage: '<mensagem>',
    category: 'utilidade',
    credit: ['[BastionBot](https://github.com/TheBastionBot/Bastion)'],
  },
};
