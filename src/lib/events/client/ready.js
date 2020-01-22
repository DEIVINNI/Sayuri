module.exports = async (bot) => {
  await bot.user.setPresence({ game: { name: `Azur Lane | ${bot.users.filter((u) => !u.bot).size} users!` } });
  return console.log('i\'m alive!');
};
