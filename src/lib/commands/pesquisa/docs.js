module.exports = {
  run: ({ msg, args }) => {
    if (!['stable', 'master'].includes(args[0])) msg.reply('favor, coloque uma versão válida (stable, master)');
    try {
      const query = require('querystring').stringify({
        src: `https://raw.githubusercontent.com/discordjs/discord.js/docs/${args[0]}.json`,
        q: args.slice(1).join(' '),
      });
      require('request')({
        url: `https://djsdocs.sorta.moe/v2/embed?${query}`,
        json: true,
      }, (req, res, json) => {
        if (!json) msg.reply(`não foi possível encontrar algo sobre: \`${args.slice(1).join(' ')}\``);
        msg.channel.send({ embed: json });
      });
    } catch (e) {
      msg.reply('ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!');
    }
  },
  conf: {
    alias: ['djs'],
    arguments: true,
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'docs',
    desc: 'pesquise por algo nas documentações do [`discord.js`](https://discord.js.org/)',
    usage: '<versão: stable, master> <pesquisa>',
    category: 'pesquisa',
    credit: ['[Discord.js](https://discord.js.org/)', '[iCrawl](https://github.com/iCrawl)'],
  },
};
