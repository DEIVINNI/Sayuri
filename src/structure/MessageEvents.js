import { Collection } from 'discord.js';
import { owner, emojis, perms, prefix } from '../util/config';

export default (msg, args, bot, cmd) => { // eslint-disable-line consistent-return
  if (cmd) {
    if (args[0] && ['--ajuda', '--help'].includes(args[0].toLowerCase())) {
      return msg.channel.send(`<:cmd_:586617374141186097> \`|\` Comando \`${msg.firstUpperCase(cmd.help.name)}\``, {
        embed: msg.embed(msg.author, false).setThumbnail(bot.user.displayAvatarURL)
          .setDescription('`<>`: obrigatório / `[]`: opcional')
          .addFieldArray(`${msg.emoji.bot.informações} | Informações`, [[
            `${msg.emoji.bot.seta}Nome: ${cmd.help.name || `sem nome... ${bot.bot.think}`}`,
            `${msg.emoji.bot.seta}Aliases: ${cmd.conf.alias.map((a) => `\`${a}\``).join(', ') || `sem aliases... ${msg.emoji.bot.cry}`}`,
            `${msg.emoji.bot.seta}Descrição: ${cmd.help.desc || `sem descrição... ${msg.emoji.bot.cry}`}`,
            `${msg.emoji.bot.seta}Cooldown: ${msg.formatDuration((cmd.conf.cooldown * 1000) || 3000)}`,
            `${msg.emoji.bot.seta}Créditos: ${cmd.help.credit ? cmd.help.credit.map((a) => a).join(', ') : `sem créditos... ${msg.emoji.bot.pepo_happy}`}`,
          ]])
          .addFieldArray(`${msg.emoji.bot.editar} | Utilização`, [[
            `${msg.emoji.bot.seta}Forma de uso: \`${msg.config.prefix[0]}${cmd.help.usage ? `${cmd.help.name} ${cmd.help.usage}` : cmd.help.name}\``,
            `${msg.emoji.bot.seta}Permissões: \n${[
              `<:invisivel_:586618921008889904> • Usuário: ${cmd.conf.permissions.member ? cmd.conf.permissions.member.map((perm) => `\`${msg.perms[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.bot.think}`}`,
              `<:invisivel_:586618921008889904> • Minhas: ${cmd.conf.permissions.bot ? cmd.conf.permissions.bot.map((perm) => `\`${msg.perms[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.bot.think}`}`,
            ].join('\n')}`,
          ]])
          .addFieldArray(`${msg.emoji.discord.user_settings} | Configurações`, [[
            `${msg.emoji.bot.seta}DM: ${cmd.conf.guildOnly ? msg.emoji.discord.enable.disable : msg.emoji.discord.enable.enable}`,
            `${msg.emoji.bot.seta}Manutenção: ${cmd.conf.manu ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}Habilitado: ${cmd.conf.enable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            `${msg.emoji.bot.seta}NSFW: ${cmd.conf.nsfw ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
          ]])
          .setTimeFooter(msg.author.tag, msg.author.displayAvatarURL),
      });
    }
    if (cmd.conf.arguments && !args.join(' ')) {
      let message = 'você utilizou o comando de forma errada!';
      if (cmd.help.usage) message += `\nUtilize ele dessa forma: \`${prefix[0] + cmd.help.name} ${cmd.help.usage}\``;
      return msg.reply(message);
    }
    if (cmd.conf.permissions) {
      if (cmd.conf.permissions.member) {
        if (cmd.conf.permissions.member.some((perm) => !msg.channel.permissionsFor(msg.author).has(perm))) {
          const message = `você precisa ${cmd.conf.permissions.member.length > 1 ? 'das permissões' : 'da permissão'} ${cmd.conf.permissions.member.map((a) => `\`${perms[a]}\``).join(', ')} para executar o comando!`;
          return msg.reply(message).catch(() => msg.author.send(message, { reply: true }).catch());
        }
      }
      if (cmd.conf.permissions.bot) {
        if (cmd.conf.permissions.bot.some((perm) => !msg.channel.permissionsFor(bot.user).has(perm))) {
          const message = `eu preciso ${cmd.conf.permissions.bot.length > 1 ? 'das permissões' : 'da permissão'} ${cmd.conf.permissions.bot.map((a) => `\`${perms[a]}\``).join(', ')} para executar o comando!`;
          return msg.reply(message).catch(() => msg.author.send(message, { reply: true }).catch());
        }
      }
    }
    if (cmd.conf.ownerOnly && msg.author.id !== owner) return msg.react(emojis.ids.discord.owner);
    if (cmd.conf.guildOnly && msg.channel.type === 'dm') return msg.react('🔒');
    if (cmd.conf.nsfw && !msg.channel.nsfw) return msg.react('🔞');
    if (cmd.conf.manu && msg.author.id !== owner) return msg.react(emojis.ids.bot.manutenção);
    if (cmd.conf.disabled) return msg.react('❌');
    if (!bot.cooldowns.get(cmd.help.name)) bot.cooldowns.set(cmd.help.name, new Collection());
    const now = Date.now();
    const timestamps = bot.cooldowns.get(cmd.help.name);
    const cooldownAmount = (cmd.conf.cooldown || 3) * 1000;
    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(`espere \`${timeLeft.toFixed(1)}\` s para usar este comando!`);
      }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    try { cmd.run({ bot, msg, args }); } catch (e) { console.log(e.stack); }
  }
};
