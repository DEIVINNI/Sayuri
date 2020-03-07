import { RichEmbed } from 'discord.js';
import { colors } from '../config';

export default class Embed extends RichEmbed {
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
    this.addField(
      name,
      value.map((lines) => lines.filter((x) => !!x).join('\n')).filter((x) => !!x.length).join('\n\n'),
      inline,
    );
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
}
