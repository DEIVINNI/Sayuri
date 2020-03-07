import { readdir, readdirSync } from 'fs';

export default (bot) => {
  for (const path of readdirSync('./src/lib/commands/')) {
    readdir(`./src/lib/commands/${path}/`, (e, f) => {
      if (e) throw new Error(e.stack);
      for (const file of f.filter((x) => x.endsWith('.js'))) {
        const cmd = require(`../lib/commands/${path}/${file}`);
        bot.commands.set(cmd.help.name, cmd);
        if (!cmd.conf.alias) return;
        for (const alias of cmd.conf.alias) bot.aliases.set(alias, cmd);
      }
    });
  }
};
