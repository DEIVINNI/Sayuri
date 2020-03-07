import { morse } from '../../../util/assets/index';

function translateMorse(text = '') {
  return text.replace(/./g, (x) => `${morse[x]}\u2007`).replace(/undefined/g, 'sem_tradução\u2007').trim();
}

export function run({ msg, args }) { return msg.reply(['aqui está o seu `código morse`:', '>>> ```', translateMorse(args.join(' ')), '```'].join('\n')); }
export const conf = {
  enable: true,
  arguments: true,
  permissions: {
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'morse',
  desc: 'transforme uma frase em código morse.',
  usage: '<mensagem>',
  category: 'utilidade',
  credit: ['[BastionBot](https://github.com/TheBastionBot/Bastion)'],
};
