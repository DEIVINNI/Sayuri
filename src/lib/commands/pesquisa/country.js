module.exports = {
  run: async ({ msg, args }) => {
    const data = await require('request-promise-native')({ url: `https://restcountries.eu/rest/v2/${args.join(' ').length <= 3 ? 'alpha' : 'name'}/${encodeURIComponent(args.join(' '))}`, json: true }).then((body) => body[0] || body).catch((err) => err);
    msg.channel.send(`:flag_${data.alpha2Code.toLowerCase()}: \`|\` Informações de \`${data.name}\``, {
      embed: msg.embed(msg.author, 'REST Countries')
        .setDescriptionArray([
          [
            `${msg.emoji.bot.seta}Também conhecido como: ${msg.shortenerText(data.altSpellings.join(', '), 50)}`,
          ], [
            `${msg.emoji.bot.seta}Nome nativo: ${data.nativeName}`,
            `${msg.emoji.bot.seta}Idiomas: ${data.languages.map((l) => `${l.name} (${l.nativeName})`).join(', ')}`,
            `${msg.emoji.bot.seta}Capital: ${data.capital}`,
            `${msg.emoji.bot.seta}Região: ${data.region} / ${data.subregion}`,
            `${msg.emoji.bot.seta}População: \`${msg.formatNumber(data.population)}\` pessoas`,
            `${msg.emoji.bot.seta}Área: \`${msg.formatNumber(data.area)}\` km²`,
            `${msg.emoji.bot.seta}Fusos horários: ${msg.shortenerText(data.timezones.join(', '), 50)}`,
          ], [
            `${msg.emoji.bot.seta}Moedas: ${data.currencies.map((c) => `${c.name} (${c.symbol})`).join(', ')}`,
            data.regionalBlocs.length > 0 ? `${msg.emoji.bot.seta}Tratados: ${data.regionalBlocs.map((b) => `${b.acronym} - ${b.name}`).join(', ')}` : null,
          ],
        ]).setThumbnail('https://restcountries.eu/data/bra.svg'),
    });
  },
  conf: {
    alias: ['país', 'nação'],
    arguments: true,
    permissions: {
      bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    },
  },
  help: {
    name: 'country',
    desc: 'veja as informações de alguma nação',
    usage: '<nação>',
    category: 'pesquisa',
    credit: ['[REST Countries](https://restcountries.eu)'],
  },
};
