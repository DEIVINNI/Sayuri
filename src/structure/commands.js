module.exports = (bot) => {
  for (const path of [
    'bot', 'informações', 'owner', 'pesquisa', 'utilidade',
  ]) {
    require('fs').readdir(`./src/lib/commands/${path}/`, (e, f) => {
      if (e) console.error(e.stack);
      for (const file of f.filter((x) => x.endsWith('.js'))) {
        const cmd = require(`../lib/commands/${path}/${file}`);
        bot.commands.set(cmd.help.name, cmd);
        if (cmd.conf.alias) {
          for (const alias of cmd.conf.alias) {
            bot.aliases.set(alias, cmd.help.name);
          }
        }
      }
    });
  }
};
