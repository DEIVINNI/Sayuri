const assets = require('./assets/');

module.exports = {
  token: process.env.TOKEN,
  owner: process.env.OWNER,
  prefix: [';', 'azumi '],
  colors: assets.colors,
  emojis: assets.emojis,
  perms: assets.perms,
};
