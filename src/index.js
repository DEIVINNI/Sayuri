import { Client, Collection } from 'discord.js';
require('dotenv').config();

const bot = new Client();

for (const x of ['commands', 'aliases', 'cooldowns']) bot[x] = new Collection();
for (const x of ['commands', 'events']) require(`./structure/${x}`).default(bot);

bot.login(process.env.TOKEN);
