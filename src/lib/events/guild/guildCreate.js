module.exports = async (bot, [guild]) => {
  await bot.user.setPresence({ game: { name: `Azur Lane | ${bot.users.filter((u) => !u.bot).size} users!` } });
  return bot.channels.get('609848544060506113').send(`>>> Entrei no servidor **${guild.name}** \`${guild.memberCount} membros\``);
};
