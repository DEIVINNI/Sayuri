export default (bot, [, newMsg]) => {
  require('../../../util/config').prefix.find((p) => {
    if (newMsg.content.toLowerCase().startsWith(p)) return;
    bot.emit('message', newMsg);

    return;
  });
};
