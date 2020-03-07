import { readdir, readdirSync } from 'fs';

export default (bot) => {
  for (const path of readdirSync('./src/lib/events/')) {
    readdir(`./src/lib/events/${path}/`, (e, f) => {
      if (e) throw new Error(e.stack);
      for (const file of f.filter((x) => x.endsWith('.js'))) {
        const event = require(`../lib/events/${path}/${file}`).default;
        bot.on(file.split('.')[0], (...params) => event(bot, params));
      }
    });
  }
};
