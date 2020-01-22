function getText(children) {
  if (children.children) return getText(children.children);
  return children.map((c) => (c.children ? getText(c.children) : c.data)).join('');
}

/* eslint-disable dot-notation */

module.exports = {
  run: async ({ msg, args }) => {
    try {
      const response = await require('request-promise-native')({
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0' },
        url: 'http://google.com/search',
        qs: { q: args.join(' '), safe: 'active' },
      });
      const $ = require('cheerio').load(response);
      let results = [];
      $('.g').each((i) => { results[i] = {}; });
      $('.g .r a h3').each((i, e) => { results[i]['name'] = `${getText(e)} - ${e.parent.attribs['href']}`; });
      $('.g .s .st').each((i, e) => { results[i]['value'] = `${msg.shortenerText(getText(e), 300)}`; });
      results = results.filter((r) => r.name && r.value).slice(0, 4);
      msg.channel.send(`${msg.emoji.bot.google} \`|\` Resultados de \`${args.join(' ')}\``, {
        embed: msg.embed(msg.author, 'Google', { fields: results }),
      });
    } catch (e) {
      msg.reply('ocorreu um erro inesperado, tente novamente mais tarde!');
    }
  },
  conf: {
    alias: ['go'],
    arguments: true,
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
      member: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'google',
    desc: 'pesquise algo no google',
    usage: '<pesquisa>',
    category: 'pesquisa',
    credit: ['[Google](https://www.google.com)'],
  },
};
