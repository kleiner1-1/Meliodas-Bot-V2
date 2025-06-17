import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
    // Verificar si es un grupo
    if (!m.isGroup) return false;

    // Obtener datos del chat
    let chat = global.db.data.chats[m.chat] || {};
    if (!chat.antiBot2) return false;

    try {
        // Verificar si conn.user y conn.user.jid están definidos
        if (!conn.user || !conn.user.jid) {
            console.error('Error: conn.user o conn.user.jid no definido en _antibot2.js');
            return true; // Evita que el plugin continúe ejecutándose
        }

        // Verificar si global.conn.user.jid está definido
        let botJid = global.conn.user?.jid;
        if (!botJid) {
            console.error('Error: global.conn.user.jid no definido en _antibot2.js');
            return true; // Evita que el plugin continúe ejecutándose
        }

        // Comparar JIDs para verificar si este es el bot principal
        if (areJidsSameUser(botJid, conn.user.jid)) {
            return false; // Es el bot principal, no hace nada
        }

        // Verificar si el bot principal está en el grupo
        let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id));
        if (isBotPresent) {
            setTimeout(async () => {
                try {
                    await conn.reply(m.chat, `《✧》En este grupo está el bot principal, por lo que me saldré para no hacer spam.`, m);
                    await conn.groupLeave(m.chat);
                } catch (e) {
                    console.error('Error al intentar salir del grupo en _antibot2.js:', e);
                }
            }, 5000); // 5 segundos
            return true; // Indica que el plugin manejó el evento
        }

        return false; // Continúa con el procesamiento normal
    } catch (e) {
        console.error('Error en _antibot2.js:', e);
        return true; // Evita que el error detenga el bot
    }
}