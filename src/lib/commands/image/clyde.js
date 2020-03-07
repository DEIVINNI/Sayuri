import { get } from 'request-promise-native';
import '@babel/polyfill';

export async function run({ msg, args }) {
  const image = await get({
    url: `https://nekobot.xyz/api/imagegen?type=clyde&text=${args.join(' ')}`,
    json: true,
  });
  if (!image.success) msg.reply('ocorreu um problema ao gerar a imagem, tente novamente mais tarde!');
  msg.channel.send(msg.embed(msg.author).setImage(image.message));
}
export const help = {
  name: 'clyde',
  desc: 'cria uma image `clyde`',
  usage: '<texto>',
  category: 'image',
  credit: ['[NekoBot](https://nekobot.xyz)'],
};
export const conf = {
  permissions: {
    bot: ['SEND_MESSAGES'],
    member: ['SEND_MESSAGES'],
  },
  arguments: true,
};
