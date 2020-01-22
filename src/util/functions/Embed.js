const { RichEmbed } = require('discord.js');
const { colors } = require('../config');

module.exports = class Embed extends RichEmbed {
  constructor(user, credit, data = {}) {
    super(data);
    this.setColor(colors.PADRÃO);
    if (user) {
      this.setFooter(`${user.tag}${credit ? ` | ${credit}` : ''}`, user.displayAvatarURL).setTimestamp();
    } else if (credit) {
      this.setFooter(credit || '').setTimestamp();
    }
  }

  setDescriptionArray(messages = []) {
    this.setDescription(messages.map((lines) => lines.filter((x) => !!x).join('\n')).filter((x) => !!x.length).join('\n\n'));
    return this;
  }

  addFieldArray(name = '', value = [], inline = false) {
    // eslint-disable-next-line no-param-reassign
    value = value.map((lines) => lines.filter((x) => !!x).join('\n')).filter((x) => !!x.length).join('\n\n');
    this.fields.push({ name, value, inline });
    return this;
  }

  setTitleURL(name, url) {
    this.setTitle(name).setURL(url);
    return this;
  }

  setTimeFooter(name, icon) {
    this.setFooter(name, icon).setTimestamp();
    return this;
  }
};
