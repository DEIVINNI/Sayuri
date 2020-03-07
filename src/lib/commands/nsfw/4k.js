import { get } from 'request-promise-native';
import '@babel/polyfill';

export async function run({ msg }) {
  const image = await get({ url: 'https://nekobot.xyz/api/image?type=4k', json: true });
  msg.channel.send(msg.embed().setImage(image.message).setColor(image.color));
}
export const help = {
  name: '4k',
  desc: '',
  usage: '',
  category: 'nsfw',
  credit: [''],
};
export const conf = {
  alias: [''],
  permissions: {
    bot: ['SEND_MESSAGES'],
    member: ['SEND_MESSAGES'],
  },
  nsfw: true,
};
