const { cpus, totalmem, hostname } = require('os');
const moment = require('moment');

module.exports = {
  run: ({ msg, bot }) => msg.channel.send(`${msg.emoji.bot.informações} \`|\` Informações de \`${bot.user.username}\``, {
    embed: msg.embed(msg.author, false).setThumbnail(bot.user.displayAvatarURL)
      .addFieldArray(`${msg.emoji.bot.informações} | Informações gerais`, [[
        `${msg.emoji.bot.seta}Criador: [\`${bot.users.get(msg.config.owner).tag}\`](${bot.users.get(msg.config.owner).displayAvatarURL})`,
        `${msg.emoji.bot.seta}Criada em: ${moment(bot.user.createdAt).format('LLL')} (\`${moment().diff(moment(bot.user.createdAt), 'days')}\` dias)`,
        `${msg.emoji.bot.seta}Versão: \`${require('../../../../package.json').version}\``,
        `${msg.emoji.bot.seta}Latência: \`${Math.floor(bot.ping)}\` ms`,
        `${msg.emoji.bot.seta}Uptime: ${msg.formatDuration(bot.uptime)}`,
        `${msg.emoji.bot.seta}Discord.js: \`${require('discord.js').version}\``,
        `${msg.emoji.bot.seta}Total de servidores: \`${bot.guilds.size}\``,
        `${msg.emoji.bot.seta}Total de usuários: \`${bot.users.size}\``,
        `${msg.emoji.bot.seta}Total de comandos: \`${bot.commands.size}\``,
      ]])
      .addFieldArray('<:process_:601822798456815617> | Processamento', [[
        `${msg.emoji.bot.seta}Hostname: ${hostname()}`,
        `${msg.emoji.bot.seta}CPU: \`${(process.cpuUsage().user / 1024 / 1024 / 100).toFixed(2)}\`%`,
        `${msg.emoji.bot.seta}RAM: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`MB/\`${(totalmem() / 1024 / 1024 / 1024).toFixed(2)}\`GB`,
        `${msg.emoji.bot.seta}Processador: ${cpus().length}x ${cpus()[0].model}`,
      ]])
      .addFieldArray('🔗 | Links úteis', [[
        `${msg.emoji.bot.seta}Github: [\`indisponível\`](https://github.com/DEIVINNI)`,
        `${msg.emoji.bot.seta}Invite: [\`indisponível\`](https://www.discordapp.com/)`,
        `${msg.emoji.bot.seta}Servidor: [\`em breve\`](https://www.discordapp.com/)`,
        `${msg.emoji.bot.seta}Site: [\`em breve\`](https://www.google.com/)`,
      ]]),
  }),
  conf: {
    alias: ['bi', 'info-bot'],
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'botinfo',
    desc: 'veja todas as minhas estatisticas',
    category: 'bot',
  },
};
