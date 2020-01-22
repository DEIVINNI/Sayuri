module.exports = {
  run: ({ bot, msg, args }) => {
    const discrim = (args[0] || msg.author.discriminator).replace('#', '');
    const users = bot.users.filter((u) => u.discriminator === discrim).map((u) => u.tag);
    if (users.lenght < 1) msg.reply(`não encontrei nenhum usuário com o discriminador: \`#${discrim}\`.`);
    return msg.channel.send(`\`${users.length}\` usuári${users.length > 1 ? 'os' : 'o'} com o discriminador: \`#${discrim}\``, {
      embed: msg.embed(msg.author, false).setDescription(users.join(' `|` ')),
    });
  },
  conf: {
    alias: ['discriminator', 'discriminador'],
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'discrim',
    desc: 'veja os usuários com um determinado discriminador',
    usage: '[discriminador]',
    category: 'utilidade',
  },
};
