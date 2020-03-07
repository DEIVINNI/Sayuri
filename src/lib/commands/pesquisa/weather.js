import moment, { locale } from 'moment';
import '@babel/polyfill';

locale('pt-BR');

export async function run({ msg, args }) {
  require('weather-js').find({ search: args.join(' '), degreeType: 'C', lang: 'pt-BR' }, async (e, r) => {
    if (e) {
      console.log(e.stack);
      msg.reply('ocorreu um erro inesperado, tente novamente mais tarde!');
    }
    if (!r) msg.reply('coloque uma cidade para mostrar sua previsão!');
    const [{ current, location, forecast }] = r;
    msg.channel.send(`:sunny: \`|\` Previsão do tempo de \`${location.name}\``, {
      embed: msg.embed(msg.author, 'waether-js').setThumbnail(current.imageUrl)
        .setDescriptionArray([
          [
            `Cidade: ${location.name}`,
            `Coordenadas: ${location.lat}, ${location.long}`,
            `Fuso horário: ${location.timezone} UTC`,
          ], [
            `Temperatura: ${current.temperature}° C`,
            `Sensação térmica: ${current.feelslike}°`,
            `Horário: ${current.observationtime}`,
            `Ventos: ${current.winddisplay}`,
            `Umidade do ar: ${current.humidity}%`,
          ],
        ])
        .addFieldArray(`${msg.firstUpperCase(forecast[0].day)} (${moment(forecast[0].date).format('L')})`, [[`Temperatura: Mín. ${forecast[0].low}°/Máx. ${forecast[0].high}°`, `Clima: ${forecast[0].skytextday}`]])
        .addFieldArray(`${msg.firstUpperCase(forecast[1].day)} (${moment(forecast[1].date).format('L')})`, [[`Temperatura: Mín. ${forecast[1].low}°/Máx. ${forecast[1].high}°`, `Clima: ${forecast[1].skytextday}`]])
        .addFieldArray(`${msg.firstUpperCase(forecast[2].day)} (${moment(forecast[2].date).format('L')})`, [[`Temperatura: Mín. ${forecast[2].low}°/Máx. ${forecast[2].high}°`, `Clima: ${forecast[2].skytextday}`]])
        .addFieldArray(`${msg.firstUpperCase(forecast[3].day)} (${moment(forecast[3].date).format('L')})`, [[`Temperatura: Mín. ${forecast[3].low}°/Máx. ${forecast[3].high}°`, `Clima: ${forecast[3].skytextday}`]])
        .addFieldArray(`${msg.firstUpperCase(forecast[4].day)} (${moment(forecast[4].date).format('L')})`, [[`Temperatura: Mín. ${forecast[4].low}°/Máx. ${forecast[4].high}°`, `Clima: ${forecast[4].skytextday}`]]),
    });
  });
}
export const conf = {
  alias: ['clima'],
  arguments: true,
  permissions: {
    bot: ['SEND_MESSAGES', 'EMBED_LINKS'],
    member: ['SEND_MESSAGES'],
  },
};
export const help = {
  name: 'weather',
  desc: 'veja a previsão do tempo de qualquer cidade',
  usage: '<cidade>',
  category: 'pesquisa',
};
