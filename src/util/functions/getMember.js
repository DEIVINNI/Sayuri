export default (message, args = '', position = 0, returnMember = false) => {
  const toFind = args.toLowerCase();
  let target = message.guild.member(toFind);

  if (!target && message.mentions.users) target = message.mentions.users.array()[position];
  if (!target && toFind) {
    target = message.guild.members.find((m) => (
      m.displayName.toLowerCase().includes(toFind) || m.user.tag.toLowerCase().includes(toFind)
    )).user;
  }
  if (!target) target = message.author;

  return returnMember ? message.guild.member(target) : target;
};
