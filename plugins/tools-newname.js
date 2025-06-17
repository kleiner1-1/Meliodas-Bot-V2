
const handler = async (m, { conn, text}) => {
    try {
        if (!text) return m.reply('❌ *Error:* Debes escribir el nuevo nombre después de `.newname`.');

        await conn.updateProfileName(text);

        if (conn.authState.creds.me.id) {
            await conn.updateProfileName(text);
}

        m.reply(`✅ *¡Nombre cambiado exitosamente!* 😃✨\n📌 *Nuevo nombre:* ${text}`);

} catch (error) {
        console.error(error);
        m.reply(`⚠️ *Error:* No se pudo cambiar el nombre. 🛑\n${error.message}`);
}
};

handler.command = /^newname$/i;
handler.tags = ['info']
export default handler;