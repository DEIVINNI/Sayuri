import moment, { locale } from 'moment';
import 'moment-duration-format';

locale('pt-BR');

export function run({ msg, args }) {
  const role = msg.mentions.roles.array()[0] || msg.guild.roles.find((r) => r.name.toLowerCase().includes(args.join(' ').toLowerCase())) || msg.guild.roles.get(args[0]) || msg.member.highestRole;
  if (!role) msg.reply('não encontrei este cargo!');
  msg.channel.send({
    embed: msg.embed(msg.author, false)
      .setColor(role.hexColor || role.color)
      .setThumbnail(`https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`)
      .setDescriptionArray([
        [
          `${msg.emoji.bot.seta}Cargo: ${role} - \`${role.id}\``,
          `${msg.emoji.bot.seta}Mencionavel: ${role.mentionable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
          `${msg.emoji.bot.seta}Cor: \`${role.hexColor || role.color}\``,
          `${msg.emoji.bot.seta}Posição: ${msg.guild.roles.size - role.position}º/${msg.guild.roles.size}`,
          `${msg.emoji.bot.seta}Criado em: ${moment(role.createdAt).format('LLL')} (\`${moment().diff(moment(role.createdAt), 'days')}\` dias)`,
          `${msg.emoji.bot.seta}Editavel: ${role.editable ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
          `${msg.emoji.bot.seta}Exibição separada: ${role.hoist ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
          `${msg.emoji.bot.seta}Cargo gerenciável: ${role.managed ? msg.emoji.discord.enable.enable : msg.emoji.discord.enable.disable}`,
          `${msg.emoji.bot.seta}Membros: \`${role.members.size}\``,
        ], [
          `${msg.emoji.bot.seta}Permiss${role.hasPermission('ADMINISTRATOR') ? 'ão' : 'ões'}: ${role.hasPermission('ADMINISTRATOR') ? 'Administrador'
            : Object.entries(role.serialize()).filter(([, allowed]) => allowed).map(([perm]) => msg.perms[perm]).join(' `|` ')
              .replace('Ler mensagens `|` ', '')
              .replace('Emojis externos `|` ', '')
              .replace('Gerenciar cargos ou permissões `|` ', '')
          }.`,
        ],
      ]),
  });
}
export const conf = {
  alias: ['ri', 'role'],
  permissions: {
    member: ['SEND_MESSAGES'],
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
  },
  arguments: true,
};
export const help = {
  name: 'roleinfo',
  desc: 'veja as informações de algum cargo',
  usage: '<cargo: menção, id, nome>',
  category: 'informações',
};
