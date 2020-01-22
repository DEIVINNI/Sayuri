const { emojis: { bot, discord } } = require('../../config');

/* eslint-disable no-nested-ternary */

module.exports = {
  events: {
    message: {
      eventsCommand: {
        permissions: {
          member: (a, b) => `você precisa ${a} ${b} para executar o comando!`,
          bot: (a, b) => `eu preciso ${a} ${b} para executar o comando!`,
        },
        cooldown: (a) => `espere \`${a}\`s para usar este comando!`,
      },
      event: {
        prefix: (a) => `meus prefixos são ${a.map((p) => `\`${p}\``).join(' ou ')}, use \`${a[0]}help\` para mais informações!`,
      },
    },
  },
  commands: {
    bot: {
      botinfo: {
        content: (a) => `${bot.informações} \`|\` Informações de \`${a}\``,
        field1: {
          name: `${bot.informações} | Informações gerais`,
          values: {
            owner: (a) => `${bot.seta}Criador: [\`${a.tag}\`](${a.displayAvatarURL})`,
            createAt: (a, b) => `${bot.seta}Criada em: ${a} (\`${b}\` dias)`,
            version: (a) => `${bot.seta}Versão: \`${a}\``,
            latency: (a) => `${bot.seta}Latência: \`${Math.floor(a)}\` ms`,
            uptime: (a) => `${bot.seta}Uptime: ${a}`,
            discordjs: (a) => `${bot.seta}Discord.js: \`${a}\``,
            server: (a) => `${bot.seta}Total de servidores: \`${a}\``,
            users: (a) => `${bot.seta}Total de usuários: \`${a}\``,
            commands: (a) => `${bot.seta}Total de comandos: \`${a}\``,
          },
        },
        field2: {
          name: '<:process_:601822798456815617> | Processamento',
          values: {
            hostname: (a) => `${bot.seta}Hostname: ${a}`,
            cpu: (a) => `${bot.seta}CPU: \`${a}\`%`,
            ram: (a, b) => `${bot.seta}RAM: \`${a}\`MB/\`${b}\`GB`,
            processor: (a, b) => `${bot.seta}Processador: ${a}x ${b}`,
          },
        },
        field3: {
          name: '🔗 | Link úteis',
          values: {
            github: `${bot.seta}Github: [\`indisponível\`](https://github.com/DEIVINNI)`,
            invite: `${bot.seta}Invite: [\`indisponível\`](https://www.discordapp.com/)`,
            server: `${bot.seta}Servidor: [\`em breve\`](https://www.discordapp.com/)`,
            site: `${bot.seta}Site: [\`em breve\`](https://www.google.com/)`,
          },
        },
      },
      help: {
        noArgs: {
          content: (a) => `<:cmd_:586617374141186097> \`|\` Comandos da \`${a}\``,
          description: {
            owner: (a) => `${discord.owner} Criador: [\`${a.tag}\`](${a.displayAvatarURL})`,
            prefixes: (a) => `${discord.channel.text} \`|\` Prefixos: ${a.map((p) => `\`${p}\``).join(' ou ')}`,
            commands: (a) => `${discord.certified}Total de comandos: \`${a}\``,
          },
          fieldNSFW: '*Você precisa estar em um chat `NSFW` para ver estes comandos*',
          footer: (a) => `${a}help [comando] para mais informações`,
        },
        findCommand: {
          description: '`<>`: obrigatório / `[]`: opcional',
          field1: {
            name: `${bot.informações} | Informações`,
            values: {
              name: (a) => `${bot.seta}Nome: ${a || `sem nome... ${bot.think}`}`,
              alias: (a) => `${bot.seta}Aliases: ${a || `sem aliases... ${bot.cry}`}`,
              desc: (a) => `${bot.seta}Descrição: ${a || `sem descrição... ${bot.cry}`}`,
              cooldown: (a) => `${bot.seta}Cooldown: ${a}`,
              credits: (a) => `${bot.seta}Créditos: ${a ? a.map((c) => c).join(', ') : `sem créditos... ${bot.pepo_happy}`}`,
            },
          },
          field2: {
            name: `${bot.editar} | Utilização`,
            values: {
              usage: (a, b, c) => `${bot.seta}Forma de uso: \`${a}${b ? `${c} ${b}` : c}\``,
              permissions: (a, b) => `${bot.seta}Permissões: \n${[
                `<:invisivel_:586618921008889904> • Usuário: ${a.member ? a.member.map((perm) => `\`${b[perm].name}\``).join(', ') : `sem permissões... ${bot.think}`}`,
                `<:invisivel_:586618921008889904> • Minhas: ${a.bot ? a.bot.map((perm) => `\`${b[perm].name}\``).join(', ') : `sem permissões... ${bot.think}`}`,
              ].join('\n')}`,
            },
          },
          field3: {
            name: `${discord.user_settings} | Configurações`,
            values: {
              dm: (a) => `${bot.seta}DM: ${a ? discord.enable.disable : discord.enable.enable}`,
              manu: (a) => `${bot.seta}Manutenção: ${a ? discord.enable.enable : discord.enable.disable}`,
              enable: (a) => `${bot.seta}Habilitado: ${a ? discord.enable.enable : discord.enable.disable}`,
              nsfw: (a) => `${bot.seta}NSFW: ${a ? discord.enable.enable : discord.enable.disable}`,
            },
          },
          notFindCommand: (a) => `não encontrei algum comando com este nome \`${a}\``,
        },
      },
      ping: (a) => `meu ping é \`${Math.floor(a)}\` ms!`,
      uptime: (a) => `estou online à ${a}!`,
    },
    informations: {
      channelinfo: {
        types: { dm: 'mensagem direta', text: 'texto', voice: 'voz', category: 'categoria', news: 'noticias', store: 'loja', unknown: 'desconhecido' },
        description: {
          channel: (a) => `${bot.seta}Canal: ${a.toString()} - \`${a.id}\``,
          type: (a) => `${bot.seta}Tipo: \`${this.commands.informations.channelinfo.types[a]}\``,
          menage: (a) => `${bot.seta}Mencionavel: ${a ? discord.enable.enable : discord.enable.disable}`,
          viewable: (a) => `${bot.seta}Visível: ${a ? discord.enable.enable : discord.enable.disable}`,
          topic: (a) => `${bot.seta}Tópico: ${a || `sem tópico... ${bot.think}`}`,
          createdAt: (a, b) => `${bot.seta}Criado em: ${a} (\`${b}\` dias)`,
          deletable: (a) => `${bot.seta}Deletavel: ${a ? discord.enable.enable : discord.enable.disable}`,
          members: (a) => `${bot.seta}Membros: \`${a}\``,
          nsfw: (a) => `${bot.seta}NSFW: ${a ? discord.enable.enable : discord.enable.disable}`,
          position: (a, b) => `${bot.seta}Posição: ${a - b}º/${a}`,
          parent: (a) => `${bot.seta}Categoria: ${`\`${a}\`` || `nenhuma categoria... ${bot.think}`}`,
        },
        noFindChannel: 'não encontrei este canal! Tente colocar o nome ou o id corretamente!',
      },
      roleinfo: {
        noFindRole: 'não encontrei este cargo! Tente colocar seu nome ou seu id corretamente!',
        description: {
          role: (a) => `${bot.seta}Cargo: ${a.toString()} - \`${a.id}\``,
          mentionable: (a) => `${bot.seta}Mencionavel: ${a ? discord.enable.enable : discord.enable.disable}`,
          position: (a, b) => `${bot.seta}Posição: ${a - b}º/${a}`,
          createdAt: (a, b) => `${bot.seta}Criado em: ${a} (\`${b}\` dias)`,
          editable: (a) => `$bot.seta}Editavel: ${a ? discord.enable.enable : discord.enable.disable}`,
          hoist: (a) => `${bot.seta}Cargo separado: ${a ? discord.enable.enable : discord.enable.disable}`,
          managed: (a) => `${bot.seta}Cargo de bot: ${a ? discord.enable.enable : discord.enable.disable}`,
          members: (a) => `${bot.seta}Membros: \`${a}\``,
          permissions: (a, b) => `${bot.seta}Permiss${a ? 'ão' : 'ões'}: ${!a ? b : '`Adiministrador`'}`,
        },
      },
      serverinfo: {
        verificationLevel: ['Nenhum', 'Baixo', 'Médio', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'],
        contentFilter: ['Não analizar nenhuma mensagem', 'Analizar mensagens de membros sem um cargo', 'Analizar todas mensagens'],
        content: (a) => `${bot.informações} \`|\` Informações do servidor \`${a}\``,
        description: {
          owner: (a) => `${bot.seta}Dono: ${a.toString()} - \`${a.id}\``,
          id: (a) => `${bot.seta}ID do servidor: \`${a}\``,
          createdAt: (a, b) => `${bot.seta}Criado: ${a} (\`${b}\` dias)`,
          region: (a) => `${bot.seta}Região: :flag_${a.slice(0, 2).toLowerCase()}:`,
          verification: (a) => `${bot.seta}Verificação: \`${this.commands.informations.serverinfo.verificationLevel[a]}\``,
          contentFilter: (a) => `${bot.seta}Filtro de conteúdo: \`${this.commands.informations.serverinfo.contentFilter[a]}\``,
          channels: (a) => `${bot.seta}Canais: \`${a.filter((c) => c.type === 'text').size}\` texto / \`${a.filter((c) => c.type === 'voice').size}\` voz`,
          members: (a) => `${bot.seta}Membros [${a.size}]: \`${a.filter((m) => m.user.presence.status === 'online').size}\` online / \`${a.filter((b) => b.user.bot).size}\` bot`,
          emojis: (a) => `${bot.seta}Emojis: ${a.filter((r) => !r.animated) ? `\`${a.filter((r) => !r.animated).size}\` normais` : ''}${a.filter((r) => r.animated) ? ` / \`${a.filter((r) => r.animated).size}\` animados` : ''}`,
          highestRole: (a) => `${bot.seta}Maior cargo: ${a.sort((x, y) => x.position - y.position).map((r) => r.toString()).slice(1).reverse()[0]}`,
          roles: (a) => `${bot.seta}Todos os cargos: ${a.map((r) => r).join(', ').replace(/@everyone, /g, '')}`,
        },
      },
      userinfo: {
        memberBot: 'você não pode ver as informações de um bot!',
        content: (a) => `${bot.informações} \`|\` Informações do usuário \`${a}\``,
        description: {
          name: (a) => `${bot.seta}Nome: [\`${a.displayName}\`](${a.user.displayAvatarURL})`,
          status: (a) => `${bot.seta}Status: ${a === 'idle' ? discord.status.idle : a === 'online' ? discord.status.online : a === 'dnd' ? discord.status.dnd : a === 'offline' ? discord.status.offline : a === 'steam' ? discord.status.streaming : bot.think}`,
          playing: (a) => `${bot.seta}Jogando: ${a ? a.name : `nada... ${bot.cry}`}`,
          createdAt: (a, b) => `${bot.seta}Criado em: ${a} (\`${b}\` dias)`,
          joinedAt: (a, b) => `${bot.seta}Entrou: ${a} (\`${b}\` dias)`,
          adm: (a) => `${bot.seta}ADM: ${a ? discord.enable.enable : discord.enable.disable}`,
          premiumSince: (a, b) => `${bot.seta}Tempo de boost: ${a > 0 ? b : `ainda não impulsionou o servidor... ${bot.cry}`}`,
          lastMsg: (a, b) => `${bot.seta}Última mensagem: ${a ? `\`${b}\`` : `nehuma mensagem salva no cache... ${bot.think}`}`,
          roles: (a) => `${bot.seta}Cargos [\`${a.size - 1}\`]: ${a.size >= 21 ? `${a.array().slice(1, 21).sort((x, y) => x.comparePositionTo(y)).reverse().map((r) => r).join(', ')}...` : a.array().slice(1).sort((x, y) => x.comparePositionTo(y)).reverse().map((r) => r).join(', ')}`,
          permissions: (a, b) => `${bot.seta}Permiss${a ? 'ão' : 'ões'} (cargo mais alto): ${!a ? b : '`Adiministrador`'}`,
        },
      },
    },
    pesquisa: {
      docs: {
        invalidVersion: 'favor, coloque uma versão válida (stable, master)',
        noSearch: (a) => `não foi possível encontrar algo sobre: \`${a}\``,
        catchError: 'ocorreu um erro inesperado ao executar este comando. Tente novamente mais tarde!',
      },
    },
    utilidade: {
      avatar: (a) => `${bot.instagram} | Avatar de \`${a}\``,
    },
  },
};
