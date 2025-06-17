
let handler = async (m, { conn, text }) => {
    // Verificar si se ha proporcionado un usuario
    if (!text) {
        return conn.sendMessage(m.chat, { text: "Por favor, menciona a un usuario. Ejemplo: .adoptado @usuario" }, { quoted: m });
    }

    let userMentioned = text.split('@')[1]; // Extraer el ID del usuario mencionado

    // Obtener el nombre del usuario mencionado usando conn.getName()
    let mentionedName = await conn.getName(userMentioned + '@s.whatsapp.net');

    let adoptedMessage = `*@${mentionedName}* *ES/IS* *%* *ADOPTADO*_ _Sus padres se fueron x pañales 😞😂_`;

    // Enviamos el mensaje al chat
    await conn.sendMessage(m.chat, { text: adoptedMessage }, { quoted: m });
}

handler.help = ['adoptado @usuario'];
handler.tags = ['diversión'];
handler.command = ['adoptado'];

export default handler;