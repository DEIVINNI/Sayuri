import { getInfoFromName } from 'mal-scraper';
import { locale } from 'moment';
import translate from '@vitalets/google-translate-api';
import '@babel/polyfill';

locale('pt-BR');

export async function run({ msg, args }) {
  try {
    const data = await getInfoFromName(args.join(' '));
    msg.channel.send(`${msg.emoji.bot.mal} \`|\` My Anime List`, {
      embed: msg.embed(msg.author, 'My Anime List')
        .setTitleURL(`${data.title || args.join(' ')}${data.type ? ` | ${data.type}` : ''}`, (data.url || null))
        .setThumbnail(data.picture || null)
        .setDescriptionArray([
          [
            `${msg.emoji.bot.seta}Nomê Japonês: ${data.japaneseTitle || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}My Anime List ID: ${data.id || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Idade: ${
              data.rating.replace('G - All Ages', 'L - Todas as idades')
                .replace('PG - Children', 'PG - Crianças')
                .replace('PG-13 - Teens 13 or older', '13 - Adolescentes com 13 anos ou mais')
                .replace('R - 17+ (violence & profanity)', '14 (violência e palavrões)')
                .replace('R+ - Mild Nudity', '16 - Nudez Leve')
                .replace('Rx - Hentai', '18 - Hentai')
              || msg.emoji.bot.think
            }`,
            `${msg.emoji.bot.seta}Original: ${data.source || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Temporada de: ${data.premiered.replace('Fall', 'Outono').replace('Summer', 'Verão').replace('Spring', 'Primavera').replace('Winter', 'Inverno')}`,
            `${msg.emoji.bot.seta}Gêneros: ${(data.genres.length > 3 ? `${data.genres.slice(0, 3).join(', ')}, etc.` : data.genres.join(', ')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Trailer: ${`[clique aqui](${data.trailer})` || msg.emoji.bot.think}`,
          ], [
            `${msg.emoji.bot.seta}Estudio: ${(data.studios.length > 3 ? `${data.studios.slice(0, 3).join(', ')}, etc.` : data.studios.join(', ')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Produção: ${(data.producers.length > 3 ? `${data.producers.slice(0, 3).join(', ')}, etc.` : data.producers.join(', ')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Diretor: ${(data.staff.filter(({ role }) => role.startsWith('Director')).map(({ name }) => name.replace(/[,]/g, '')).join(', ')) || msg.emoji.bot.think}`,
          ], [
            `${msg.emoji.bot.seta}Ranque: #${msg.formatNumber(data.ranked.replace(/[#]/g, '')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Pontuação: ${data.score || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Popularidade: #${msg.formatNumber(data.popularity.replace(/[#]/g, '')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Membros: ${msg.formatNumber(data.members.replace(/[,]/g, '')) || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Favoritos: ${data.favorites || msg.emoji.bot.think}`,
          ], [
            `${msg.emoji.bot.seta}Episódios: ${data.episodes || msg.emoji.bot.think}`,
            `${msg.emoji.bot.seta}Conteúdo: ${data.status === 'Finished Airing' ? 'Completo' : 'Em lançamento'}`,
            `${msg.emoji.bot.seta}Duração dos episódios: ${data.duration.replace('per ep', 'por episódio')}`,
            `${msg.emoji.bot.seta}Data de lançamento: ${data.aired || msg.emoji.bot.think}`,
          ], [
            `${msg.emoji.bot.seta}Sinopse: ${`\`\`\`\n${await translate(msg.shortenerText(data.synopsis, 503), { to: 'pt' }).text}\n\`\`\`` || msg.emoji.bot.think}`,
          ],
        ]),
    });
  } catch (e) {
    console.log(e.stack);
    msg.reply('ocorreu um erro inesperado, tente novamente mais tarde!');
  }
}
export const conf = {
  arguments: true,
  permissions: {
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'anime',
  desc: 'pesquise por um anime no My Anime List',
  usage: '<anime: nome>',
  category: 'pesquisa',
  credit: ['[MalScraper](https://github.com/Kylart/MalScraper)', '[My Anime List](https://myanimelist.net)'],
};
