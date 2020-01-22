module.exports = (bot) => {
  for (const path of [
    'client', 'message',
  ]) {
    require('fs').readdir(`./src/lib/events/${path}/`, (e, f) => {
      if (e) console.error(e.stack);
      for (const file of f.filter((x) => x.endsWith('js'))) {
        const event = require(`../lib/events/${path}/${file}`);
        bot.on(file.split('.')[0], (...params) => event(bot, params));
      }
    });
  }
};
