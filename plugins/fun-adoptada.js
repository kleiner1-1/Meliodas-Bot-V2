
let handler = async (m, { conn, text }) => {
    // Verificar si se ha proporcionado un usuario
    if (!text) {
        return conn.sendMessage(m.chat, { text: "Por favor, menciona a un usuario. Ejemplo: .adoptada @usuario" }, { quoted: m });
    }

    let userMentioned = text.split('@')[1]; // Extraer el ID del usuario mencionado

    // Obtener el nombre del usuario mencionado usando conn.getName()
    let mentionedName = await conn.getName(userMentioned + '@s.whatsapp.net');

    let adoptadaMessage = `*${mentionedName}* *ES/IS* *%* *ADOPTADA* _Sus padres se fueron x pañales 😞😂_`;

    // Enviamos el mensaje al chat
    await conn.sendMessage(m.chat, { text: adoptadaMessage }, { quoted: m });
}

handler.help = ['adoptada @usuario'];
handler.tags = ['diversión'];
handler.command = ['adoptada'];

export default handler;