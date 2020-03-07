export function run({ msg, args }) {
  const member = msg.getMember(args.join(' '), 0);
  msg.channel.send(`${msg.emoji.bot.instagram} | Avatar de \`${member.tag}\``, {
    embed: msg.embed(msg.author, false).setImage(member.displayAvatarURL.endsWith('.gif') ? `${member.displayAvatarURL}?size=2048` : member.displayAvatarURL),
  });
}
export const conf = {
  alias: ['pic'],
  guildOnly: true,
  permissions: {
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'avatar',
  desc: 'veja a foto de perfil de alguém usuário do servidor',
  usage: '[usuário: menção, nome, tag]',
  category: 'utilidade',
};
