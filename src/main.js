const { Client, Collection } = require('discord.js');

const bot = new Client();

// eslint-disable-next-line no-return-assign
['commands', 'aliases', 'cooldowns'].forEach((x) => bot[x] = new Collection());
['commands', 'events'].forEach((x) => require(`./structure/${x}`)(bot));

bot.login(process.env.TOKEN);
