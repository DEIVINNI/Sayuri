const moment = require('moment');
require('moment-duration-format');

moment.locale('pt-BR');
const types = { dm: 'mensagem direta', text: 'texto', voice: 'voz', category: 'categoria', news: 'noticias', store: 'loja', unknown: 'desconhecido' };

module.exports = {
  run: ({ msg, args }) => {
    try {
      const canal = msg.mentions.channels.array()[0] || msg.guild.channels.find((c) => c.name.toLowerCase().includes(args[0].toLowerCase())) || msg.guild.channels.get(args[0]) || msg.channel;
      msg.channel.send({
        embed: msg.embed(msg.author, false)
          .setDescriptionArray([[
            `${msg.emoji.bot.seta}Canal: ${canal.toString()} - \`${canal.id}\``,
            `${msg.emoji.bot.seta}Tipo: \`${types[canal.type]}\``,
            `${msg.emoji.bot.seta}Modificável: ${canal.manageable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Visível: ${canal.viewable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Tópico: ${msg.shortenerText(canal.topic, 43) || `sem tópico... ${msg.emoji.bot.think}`}`,
            `${msg.emoji.bot.seta}Criado em: ${moment(canal.createdAt).format('LLL')} (\`${moment().diff(moment(canal.createdAt), 'days')}\` dias)`,
            `${msg.emoji.bot.seta}Deletavel: ${canal.deletable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Membros: \`${canal.members.size}\``,
            `${msg.emoji.bot.seta}NSFW: ${canal.nsfw ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Posição: ${msg.guild.channels.size - canal.position}º/${msg.guild.channels.size}`,
            `${msg.emoji.bot.seta}Categoria: ${`\`${canal.parent}\`` || `nenhuma categoria... ${msg.emoji.bot.think}`}`,
          ]]),
      });
    } catch (e) {
      msg.reply('não encontrei este canal! Tente colocar o nome ou o id corretamente!');
    }
  },
  conf: {
    alias: ['ci', 'channel', 'canal'],
    permissions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    },
  },
  help: {
    name: 'channelinfo',
    desc: 'veja as informações de algum canal',
    usage: '<canal: menção, nome, id>',
    category: 'informações',
  },
};
