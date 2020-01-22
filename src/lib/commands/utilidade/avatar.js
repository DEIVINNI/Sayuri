module.exports = {
  run: ({ bot, msg, args }) => {
    const member = msg.mentions.users.array()[0] || bot.users.get(args[0]) || msg.author;
    msg.channel.send(`${msg.emoji.bot.instagram} | Avatar de \`${member.tag}\``, {
      embed: msg.embed(msg.author, false).setImage(member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL),
    });
  },
  conf: {
    alias: ['pic'],
    guildOnly: true,
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'avatar',
    desc: 'veja a foto de perfil de alguém usuário do servidor',
    usage: '[usuário: menção, id]',
    category: 'utilidade',
  },
};
