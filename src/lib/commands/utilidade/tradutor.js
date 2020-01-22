module.exports = {
  run: async ({ bot, msg, args }) => {
    require('@vitalets/google-translate-api')(args.slice(1).join(' '), { to: `${args[0]}` }).then((res) => {
      msg.delete();
      msg.channel.send(`${msg.emoji.bot.translate} \`|\` ${bot.user.username} Translator`, {
        embed: msg.embed(msg.author, 'Google Tradutor')
          .setThumbnail('https://i.redd.it/zurtc1epmh111.gif')
          .addFieldArray('📥 | Mensagem original', [['```', `${args.slice(1).join(' ')}`, '```']])
          .addFieldArray('📤 | Mensagem traduzida', [['```', `${res.text}`, '```']]),
      });
    }).catch(() => msg.reply('você inseriu um idioma inválido. Tente colocar a abreviação dele, exemplo: `Inglês` => `en`'));
  },
  conf: {
    alias: ['translate'],
    arguments: true,
    permissions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    },
  },
  help: {
    name: 'tradutor',
    desc: 'traduza alguma mensagem',
    usage: '<idioma> <mensagem>',
    category: 'utilidade',
    credit: ['[Google Tradutor](https://translate.google.com)'],
  },
};
