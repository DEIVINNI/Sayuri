const { Schema, connect, model } = require('mongoose');

/* eslint-disable consistent-return */

connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) console.log(`[MONGO] - Erro ao conectar a database:\n${error.stack}`);
  console.log('[MONGO] - Conectado a database com sucesso!');
});

const Users = model('users', new Schema(require('./models/users')));
const Guilds = model('guilds', new Schema(require('./models/guilds')));

module.exports = {
  Users,
  Guilds,
  connect: ({ doc: { type, id, content } }) => {
    switch (type) {
      case 1: {
        const checkUser = Users.findOne({ _id: id.id });
        if (checkUser) return checkUser;

        const newUser = new Users({ _id: id.id, content });
        newUser.save().catch((e) => console.log(e.stack));
        return newUser;
      }
      case 2: {
        const checkGuild = Guilds.findOne({ _id: id.id });
        if (checkGuild) return checkGuild;

        const newGuild = new Guilds({ _id: id.id, content });
        newGuild.save().catch((e) => console.log(e.stack));
        return newGuild;
      }
      // no default
    }
  },
};
