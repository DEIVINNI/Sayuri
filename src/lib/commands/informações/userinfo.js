const moment = require('moment');
require('moment-duration-format');

moment.locale('pt-BR');

/* eslint-disable no-nested-ternary */

module.exports = {
  run: ({ bot, msg, args }) => {
    const member = msg.guild.member(msg.mentions.users.array()[0] || bot.users.get(args[0]) || msg.author);
    msg.channel.send(`${msg.emoji.bot.informações} \`|\` Informações do usuário \`${member.user.username}\``, {
      embed: msg.embed(msg.author, false, { thumbnail: { url: member.user.displayAvatarURL } })
        .setColor(member.displayColor)
        .setDescriptionArray([
          [
            `${msg.emoji.bot.seta}Nome: [\`${member.displayName}\`](${member.user.displayAvatarURL}) - \`${member.id}\``,
            `${msg.emoji.bot.seta}Status: ${member.user.presence.status === 'idle' ? msg.emoji.discord.status.idle : member.user.presence.status === 'online' ? msg.emoji.discord.status.online : member.user.presence.status === 'dnd' ? msg.emoji.discord.status.dnd : member.user.presence.status === 'offline' ? msg.emoji.discord.status.offline : member.user.presence.status === 'steam' ? msg.emoji.discord.status.streaming : msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Jogando: ${member.user.presence.game ? member.user.presence.game.name : `nada... ${msg.emoji.bot.cry}`}`,
            `${msg.emoji.bot.seta}Criado em: ${moment(member.user.createdAt).format('LLL')} (\`${moment().diff(moment(member.user.createdAt), 'days')}\` dias)`,
          ], [
            `${msg.emoji.bot.seta}Entrou: ${moment(member.joinedAt).format('LLL')} (\`${moment().diff(moment(member.joinedAt), 'days')}\` dias)`,
            `${msg.emoji.bot.seta}ADM: ${member.hasPermission('ADMINISTRATOR') ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Tempo de boost: ${member.premiumSince > 0 ? msg.formatDuration(member.premiumSince) : `ainda não impulsionou o servidor... ${msg.emoji.bot.cry}`}`,
            `${msg.emoji.bot.seta}Última mensagem: ${member.lastMessage ? `\`${msg.shortenerText(member.lastMessage.content, 13)}\`` : `nehuma mensagem salva no cache... ${msg.emoji.bot.think}`}`,
          ], [
            `${msg.emoji.bot.seta}Cargos [\`${member.roles.size - 1}\`]: ${member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map((r) => r).join(', ')}`,
          ], [
            `${msg.emoji.bot.seta}Permiss${member.hasPermission('ADMINISTRATOR') ? 'ão' : 'ões'} (cargo mais alto): ${member.hasPermission('ADMINISTRATOR') ? 'Administrador' : Object.entries(member.highestRole.serialize()).filter(([, allowed]) => allowed).map(([perm]) => msg.perms[perm]).join(' `|` ').replace('Ler mensagens `|` ', '').replace('Emojis externos `|` ', '').replace('Gerenciar cargos ou permissões `|` ', '')}.`,
          ],
        ]),
    });
  },
  conf: {
    alias: ['ui', 'user', 'usuário'],
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'userinfo',
    desc: 'veja as informações de qualquer usuário',
    usage: '[usuário: menção, id]',
    category: 'informações',
  },
};
