import '@babel/polyfill';

export async function run({ bot, msg, args }) {
  const res = await require('request-promise-native')({ url: `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${encodeURIComponent(args.join(' '))}`, json: true });
  const response = res.query.pages[0];
  if (response.missing) msg.reply(`não foi possivel encontrar nada sobre \`${args.join(' ')}\``);
  msg.channel.send(`${msg.emoji.bot.wikipedia} \`|\` ${bot.user.username}Pédia`, {
    embed: msg.embed(msg.author, 'Wikipédia')
      .addField(response.title || msg.args.join(' '), `${response.extract.length < 953 ? response.extract : msg.shortenerText(response.extract, 953)} **[Ler mais](${response.fullurl})**`)
      .setThumbnail(response.thumbnail ? response.thumbnail.source : ''),
  });
}
export const conf = {
  alias: ['wiki'],
  arguments: true,
  permissions: {
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'wikipédia',
  desc: 'pesquise algo no wikipédia',
  usage: '<pesquisa>',
  category: 'pesquisa',
  credit: ['[Wikipédia](https://pt.wikipedia.org/)'],
};
