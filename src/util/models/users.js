const { prefix } = require('../config');

module.exports = {
  _id: { type: String },
  background: { type: String, default: 'https://i.imgur.com/sNIS2Xa.png' },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  badges: { type: Map, default: [] },
  bio: { type: String, default: `use \`${prefix[0]}profile-edit --bio <biografia>\` para mudar essa mensagem!` },
  reputation: { type: Number, default: 0 },
  premiun: { type: Boolean, default: false },
};
