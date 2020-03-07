import moment, { locale } from 'moment';
import 'moment-duration-format';

locale('pt-BR');
const verificationLevel = ['Nenhum', 'Baixo', 'Médio', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
const contentFilter = ['Não analizar nenhuma mensagem', 'Analizar mensagens de membros sem um cargo', 'Analizar todas mensagens'];

export function run({ msg }) {
  msg.channel.send(`${msg.emoji.bot.informações} \`|\` Informações do servidor \`${msg.guild.name}\``, {
    embed: msg.embed(msg.author, false, { thumbnail: { url: msg.guild.iconURL } })
      .setDescriptionArray([
        [
          `${msg.emoji.bot.seta}Dono: ${msg.guild.owner.toString()} - \`${msg.guild.owner.id}\``,
          `${msg.emoji.bot.seta}ID do servidor: \`${msg.guild.id}\``,
          `${msg.emoji.bot.seta}Criado: ${moment(msg.guild.createdAt).format('LLL')} (\`${moment().diff(moment(msg.guild.createdAt), 'days')}\` dias)`,
          `${msg.emoji.bot.seta}Região: :flag_${msg.guild.region.slice(0, 2).toLowerCase()}:`,
          `${msg.emoji.bot.seta}Verificação: \`${verificationLevel[msg.guild.verificationLevel]}\``,
          `${msg.emoji.bot.seta}Filtro de conteúdo: \`${contentFilter[msg.guild.explicitContentFilter]}\``,
        ], [
          `${msg.emoji.bot.seta}Canais: \`${msg.guild.channels.filter((c) => c.type === 'text').size}\` texto / \`${msg.guild.channels.filter((c) => c.type === 'voice').size}\` voz`,
          `${msg.emoji.bot.seta}Membros: \`${msg.guild.members.filter((m) => m.user.presence.status === 'online').size}\` online / \`${msg.guild.members.filter((b) => b.user.bot).size}\` bot`,
          `${msg.emoji.bot.seta}Emojis: ${msg.guild.emojis.filter((r) => !r.animated) ? `\`${msg.guild.emojis.filter((r) => !r.animated).size}\` normais` : ''}${msg.guild.emojis.filter((r) => r.animated) ? ` / \`${msg.guild.emojis.filter((r) => r.animated).size}\` animados` : ''}`,
        ], [
          `${msg.emoji.bot.seta}Maior cargo: ${msg.guild.roles.sort((a, b) => a.position - b.position).map((r) => r.toString()).slice(1).reverse()[0]}`,
          `${msg.emoji.bot.seta}Todos os cargos: ${msg.guild.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse()
            .map((r) => r)
            .join(', ')}`,
        ],
      ]),
  });
}
export const conf = {
  alias: ['si', 'server', 'servidor'],
  permissions: {
    member: ['SEND_MESSAGES'],
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
  },
};
export const help = {
  name: 'serverinfo',
  desc: 'veja as informações do servidor',
  category: 'informações',
};
