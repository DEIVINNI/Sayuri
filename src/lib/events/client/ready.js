import { prefix } from '../../../util/config';

export default async (bot) => {
  await bot.user.setPresence({ game: { name: `${prefix[0]}help | ${bot.users.filter((u) => !u.bot).size} users!` } });
  return console.log('i\'m alive!');
};
