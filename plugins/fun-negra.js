

let handler = async (m, { conn, args }) => {
    // Verificar si se menciona a un usuario
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .negra @usuario" }, { quoted: m });
    }

    // Obtener el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0];
    
    // Generar un porcentaje aleatorio entre 1 y 100
    let porcentaje = Math.floor(Math.random() * 100) + 1;

    // Mensaje que se enviará
    const mensaje = `_*@${userMentioned.split('@')[0]}* *ES* *${porcentaje}%* *NEGRA 👱🏾‍♀️, MAS NEGRA QUE SU CUCA? 😂*_`;

    // Enviar el mensaje al chat
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
}
handler.help = ['negra @usuario'];
handler.tags = ['diversión'];
handler.command = ['negra'];

export default handler;