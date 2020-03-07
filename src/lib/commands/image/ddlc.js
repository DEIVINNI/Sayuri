import { get } from 'request-promise-native';
import '@babel/polyfill';

export async function run({ msg, args }) {
  if (!['monika', 'natsuki', 'sayori', 'yuri'].includes(args[0])) msg.reply('coloque um personagem válido: `monika`, `natsuki`, `sayori`, `yuri`.');
  if (!args.slice(1).join(' ')) msg.reply('coloque alguma mensagem!');
  const image = await get({
    url: `https://nekobot.xyz/api/imagegen?type=ddlc&character=${args[0]}&background=class&body=1&face=1&text=${args.slice(1).join(' ')}`,
    json: true,
  });
  if (!image.success) msg.reply('ocorreu um problema ao gerar a imagem, tente novamente mais tarde!');
  msg.channel.send(msg.embed(msg.author).setImage(image.message));
}
export const help = {
  name: 'ddlc',
  desc: 'cria uma image `doki doki literature club`',
  usage: '<personagem> <texto>',
  category: 'image',
  credit: ['[NekoBot](https://nekobot.xyz)'],
};
export const conf = {
  permissions: {
    bot: ['SEND_MESSAGES'],
    member: ['SEND_MESSAGES'],
  },
  disabled: true,
  arguments: true,
};
