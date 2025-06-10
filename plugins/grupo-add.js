let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor, ingrese el número al que quiere enviar una invitación al grupo.`, m);
    if (text.includes('+')) return conn.reply(m.chat, `${emoji2} Ingrese el número todo junto sin el *+*`, m);
    if (isNaN(text)) return conn.reply(m.chat, `${emoji2} Ingrese sólo números sin su código de país y sin espacios.`, m);
    if (!m.isGroup) return m.reply(`${emoji2} Este comando solo funciona en grupos.`);

    let group = m.chat;
    let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
    let jid = text.trim() + '@s.whatsapp.net';

    try {
        // Enviar la invitación con vista previa de enlace activada
        await conn.reply(jid, `${emoji} *INVITACIÓN A GRUPO*\n\nUn usuario te invitó a unirte a este grupo \n\n${link}`, m, {
            mentions: [m.sender],
            linkPreview: true // Activar vista previa del enlace
        });

        m.reply(`${emoji} Se envió un enlace de invitación al usuario.`);
    } catch (e) {
        m.reply(`${emoji2} Error al enviar la invitación. Es posible que el número no sea válido o que no haya interactuado con el bot.`);
        console.error(e);
    }
};

handler.help = ['invite *<521>*'];
handler.tags = ['group'];
handler.command = ['add', 'agregar', 'añadir'];
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;