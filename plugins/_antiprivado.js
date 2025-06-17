
export async function before(m, { conn, isOwner, isROwner}) {
    if (m.isBaileys && m.fromMe) return true;
    if (m.isGroup) return false;
    if (!m.message) return true;

    const botSettings = global.db.data.settings[this.user.jid] || {};

    if (botSettings.antiPrivate &&!isOwner &&!isROwner) {
        await conn.updateBlockStatus(m.chat, 'block'); // Bloquea al usuario sin enviar mensaje
        console.log(`Usuario ${m.sender} bloqueado por contacto privado.`);
}

    return false;
}