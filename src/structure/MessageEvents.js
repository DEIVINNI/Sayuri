const { owner, emojis, perms, prefix } = require('../util/config');

module.exports = (msg, args, bot, cmd) => { // eslint-disable-line consistent-return
  if (cmd) {
    if (cmd.conf.arguments && !args.join(' ')) {
      let message = 'você utilizou o comando de forma errada!';
      if (cmd.help.usage) message += `\nUtilize ele dessa forma: \`${prefix[0] + cmd.help.name} ${cmd.help.usage}\``;
      return msg.reply(message);
    }
    if (cmd.conf.permissions) {
      if (cmd.conf.permissions.member) {
        if (cmd.conf.permissions.member.some((perm) => !msg.channel.permissionsFor(msg.author).has(perm))) {
          const message = `você precisa ${cmd.conf.permissions.member.length > 1 ? 'das permissões' : 'da permissão'} ${cmd.conf.permissions.member.map((a) => `\`${perms[a].name}\``).join(', ')} para executar o comando!`;
          return msg.reply(message).catch(() => msg.author.send(message, { reply: true }).catch());
        }
      }
      if (cmd.conf.permissions.bot) {
        if (cmd.conf.permissions.bot.some((perm) => !msg.channel.permissionsFor(bot.user).has(perm))) {
          const message = `eu preciso ${cmd.conf.permissions.bot.length > 1 ? 'das permissões' : 'da permissão'} ${cmd.conf.permissions.bot.map((a) => `\`${perms[a].name}\``).join(', ')} para executar o comando!`;
          return msg.reply(message).catch(() => msg.author.send(message, { reply: true }).catch());
        }
      }
    }
    if (cmd.conf.ownerOnly && msg.author.id !== owner) return msg.react(emojis.ids.discord.owner);
    if (cmd.conf.guildOnly && msg.channel.type === 'dm') return msg.react('🔒');
    if (cmd.conf.nsfw && !msg.channel.nsfw) return msg.react('🔞');
    if (cmd.conf.manu && msg.author.id !== owner) return msg.react(emojis.ids.bot.manutenção);
    if (cmd.conf.disabled) return msg.react('❌');
    if (!bot.cooldowns.get(cmd.help.name)) bot.cooldowns.set(cmd.help.name, new (require('discord.js').Collection)());
    const now = Date.now();
    const timestamps = bot.cooldowns.get(cmd.help.name);
    const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(`espere \`${timeLeft.toFixed(1)}\`s para usar este comando!`);
      }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    try { cmd.run({ bot, msg, args }); } catch (e) { console.log(e.stack); }
  }
};
