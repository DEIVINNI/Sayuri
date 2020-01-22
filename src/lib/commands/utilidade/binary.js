function textBinary(text) {
  return text.split('').map((char) => char.charCodeAt(0).toString(2)).join(' ');
}

module.exports = {
  run: ({ msg, args }) => {
    if (args.join(' ').length >= 200) msg.channel.send('infelizmente sua mensagem contem mais de 200 caracteres!');
    return msg.reply(['aqui está seu `código binário`:', '>>>```', `${textBinary(args.join(' '))}`, '```'].join('\n'));
  },
  conf: {
    alias: ['binário'],
    arguments: true,
    permissions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'binary',
    desc: 'transforme uma mensagem em código binário, ou vice-versa',
    usage: '<mensagem>',
    category: 'utilidade',
    credit: ['[Switchblade](https://github.com/SwitchbladeBot)'],
  },
};
