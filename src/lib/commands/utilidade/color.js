const { hex } = require('color-convert');

module.exports = {
  run: async ({ msg, args }) => {
    let color;
    if (args[0] && /^#?[0-9a-f]{6}$/i.test(args[0])) color = args[0].replace('#', '');
    return msg.channel.send({
      embed: msg.embed(msg.author, 'Color-Convert').setColor(parseInt(color, 16))
        .setThumbnail(`https://dummyimage.com/250/${color}/&text=%20`)
        .addField('HEX', `#${color}`, true)
        .addField('RGB', `${hex.rgb(color)}`, true)
        .addField('CMYK', `${hex.cmyk(color)}`, true)
        .addField('HSL', `${hex.hsl(color)}`, true)
        .addField('HSV', `${hex.hsv(color)}`, true)
        .addField('HWB', `${hex.hwb(color)}`, true)
        .addField('LAB', `${hex.lab(color)}`, true)
        .addField('ANSI16', `${hex.ansi16(color)}`, true)
        .addField('ANSI256', `${hex.ansi256(color)}`, true)
        .addField('XYZ', `${hex.xyz(color)}`, true)
        .addField('HCG', `${hex.hcg(color)}`, true)
        .addField('Apple', `${hex.apple(color)}`, true)
        .addField('Gray', `${hex.gray(color)}`, true)
        .addField('CSS', `${hex.keyword(color)}`, true),
    });
  },
  conf: {
    alias: ['cor'],
    arguments: true,
    permisions: {
      member: ['SEND_MESSAGES'],
      bot: ['SEND_MESSAGES'],
    },
  },
  help: {
    name: 'color',
    desc: 'veja as informações de uma cor',
    usage: '<cor: hexcolor>',
    member: 'usuários',
    category: 'utilidades',
    credit: ['[BastionBot](https://github.com/TheBastionBot/Bastion)'],
  },
};
