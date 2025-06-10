const handler = async (m, { conn, args }) => {
  const comandos = [
    'welcome', 'bv', 'bienvenida', 'antiprivado', 'antipriv', 'antiprivate',
    'restrict', 'restringir', 'autolevelup', 'autonivel', 'autosticker',
    'antibot', 'antibots', 'autoaceptar', 'aceptarauto', 'autorechazar',
    'rechazarauto', 'autoresponder', 'autorespond', 'antisubbots', 'antisub',
    'antisubot', 'antibot2', 'modoadmin', 'soloadmin', 'autoread', 'autoleer',
    'autover', 'antiver', 'antiocultar', 'antiviewonce', 'reaction', 'reaccion',
    'emojis', 'nsfw', 'nsfwhot', 'nsfwhorny', 'antispam', 'antiSpam',
    'antispamosos', 'antidelete', 'antieliminar', 'jadibotmd', 'modejadibot',
    'subbots', 'detect', 'configuraciones', 'avisodegp', 'detect2', 'avisos',
    'eventos', 'autosimi', 'simsimi', 'antilink', 'antilink2', 'antitoxic',
    'antitoxicos', 'antitraba', 'antitrabas', 'antifake', 'antivirtuales', 'avisos', 'autodetect',
  ];

      conn.reply(m.chat, `*Lista de comandos configurables:*\n\n${comandos.map(c => `- ${c}`).join('\n')}`, m, rcanal);
};

handler.command = ['on', 'off']

export default handler;
