import { prefix } from '../../../util/config';

export default (bot, [msg]) => {
  if (msg.author.bot) return;
  prefix.find((p) => {
    if (!msg.content.toLowerCase().startsWith(p)) return;
    const args = msg.content.slice(p.length).trim().split(/\s+/g);
    const comando = args.shift().toLowerCase();
    const cmd = bot.commands.get(comando) || bot.aliases.get(comando);

    require('../../../structure/MessageFunctions').default(msg);
    require('../../../structure/MessageEvents').default(msg, args, bot, cmd);

    return;
  });
  if (msg.content === msg.guild.me.toString()) msg.reply('meus prefixos são `;` e `atago `, use `;help` para mais informações!');
  if (['zawarudo', 'za warudo'].includes(msg.content.toLowerCase()) && msg.author.id === '259900353393197056') msg.channel.send({ embed: { image: { url: 'https://i.imgur.com/7oeMpzm.gif' }, color: 0xfcd703 } });
  if (['<@308287298632417291>', '<@!308287298632417291>'].includes(msg.content) && msg.author.id === '267064233102016514') { msg.delete(); msg.channel.send('<@308287298632417291> VAI TOMA NO CU!'); }
  if (msg.content === 'bodia' && msg.author.id === '414175662044086272') msg.channel.send('<@414175662044086272> 🇧 🇴 🇩 🇮 🇦');
};
