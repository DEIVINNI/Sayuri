module.exports = {
  run: ({ msg, bot, args }) => {
    const embed = msg.embed(msg.author, false).setThumbnail(bot.user.displayAvatarURL);
    const categories = require('fs').readdirSync('./src/lib/commands');
    if (!args[0]) {
      embed.setDescriptionArray([[
        `${msg.emoji.discord.owner} \`|\` Criador: [\`${bot.users.get(msg.config.owner).tag}\`](${bot.users.get(msg.config.owner).displayAvatarURL})`,
        `${msg.emoji.discord.channel.text} \`|\` Prefixos: ${msg.config.prefix.map((a) => `\`${a}\``).join(' ou ')}`,
        `${msg.emoji.discord.certified} \`|\` Total de comandos: \`${bot.commands.size}\``,
      ]]);
      categories.forEach((category) => {
        const dir = bot.commands.filter((c) => c.help.category === category);
        try {
          embed.addField(
            `${msg.emoji.bot.seta} ${category !== 'nsfw' ? msg.firstUpperCase(category) : 'NSFW'} [${dir.size}]:`,
            `${(!msg.channel.nsfw && category === 'nsfw') ? '*Você precisa estar em um chat `NSFW` para ver estes comandos*' : dir.map((c) => `\`${c.help.name}\``).join(', ')}`,
          );
        } catch (e) {
          console.log(e.stack);
        }
      });
      msg.channel.send(`<:cmd_:586617374141186097> \`|\` Comandos da \`${bot.user.username}\``, {
        embed: embed.setTimeFooter(`${msg.config.prefix[0]}help [comando] para mais informações`, msg.author.displayAvatarURL),
      });
    }
    if (args[0]) {
      if (bot.commands.has(args[0].toLowerCase())) {
        const { conf, help } = bot.commands.get(args[0].toLowerCase()) || bot.aliases.get(args[0].toLowerCase());
        msg.channel.send(`<:cmd_:586617374141186097> \`|\` Comandos da \`${bot.user.username}\``, {
          embed: embed.setDescription('`<>`: obrigatório / `[]`: opcional')
            .addFieldArray(`${msg.emoji.bot.informações} | Informações`, [[
              `${msg.emoji.bot.seta}Nome: ${help.name || `sem nome... ${bot.bot.think}`}`,
              `${msg.emoji.bot.seta}Aliases: ${conf.alias.map((a) => `\`${a}\``).join(', ') || `sem aliases... ${msg.emoji.bot.cry}`}`,
              `${msg.emoji.bot.seta}Descrição: ${help.desc || `sem descrição... ${msg.emoji.bot.cry}`}`,
              `${msg.emoji.bot.seta}Cooldown: ${msg.formatDuration(conf.cooldown * 1000 || 3000)}`,
              `${msg.emoji.bot.seta}Créditos: ${help.credit ? help.credit.map((a) => a).join(', ') : `sem créditos... ${msg.emoji.bot.pepo_happy}`}`,
            ]])
            .addFieldArray(`${msg.emoji.bot.editar} | Utilização`, [[
              `${msg.emoji.bot.seta}Forma de uso: \`${msg.config.prefix[0]}${help.usage ? `${help.name} ${help.usage}` : help.name}\``,
              `${msg.emoji.bot.seta}Permissões: \n${[
                `<:invisivel_:586618921008889904> • Usuário: ${conf.permissions.member ? conf.permissions.member.map((perm) => `\`${msg.perms[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.bot.think}`}`,
                `<:invisivel_:586618921008889904> • Minhas: ${conf.permissions.bot ? conf.permissions.bot.map((perm) => `\`${msg.perms[perm].name}\``).join(', ') : `sem permissões... ${msg.emoji.bot.think}`}`,
              ].join('\n')}`,
            ]])
            .addFieldArray(`${msg.emoji.discord.user_settings} | Configurações`, [[
              `${msg.emoji.bot.seta}DM: ${conf.guildOnly ? msg.emoji.discord.enable.disable : msg.emoji.discord.enable.enable}`,
              `${msg.emoji.bot.seta}Manutenção: ${conf.manu ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
              `${msg.emoji.bot.seta}Habilitado: ${conf.enable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
              `${msg.emoji.bot.seta}NSFW: ${conf.nsfw ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
            ]])
            .setTimeFooter(msg.author.tag, msg.author.displayAvatarURL),
        });
      } else msg.reply(`não encontrei algum comando com este nome \`${args[0]}\``);
    }
  },
  conf: {
    alias: ['ajuda'],
    permissions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    },
  },
  help: {
    name: 'help',
    desc: 'veja todos os meus comandos',
    usage: '[comando: nome]',
    category: 'bot',
  },
};
