
var handler = async (m, { conn, text }) => {
    // Verificamos si se mencionó a alguien
    if (!text) throw '🍭 *ESCRIBE EL NOMBRE DE UN USUARIO PARA CALCULAR SU PORCENTAJE DE SAPO.*';

    // Obtenemos el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0]; // Esto obtiene el ID del usuario mencionado

    // Verificamos si se mencionó un usuario válido
    if (!userMentioned) throw '🍭 *NO SE PUDO ENCONTRAR EL USUARIO MENCIONADO.*';

    // Generamos un porcentaje aleatorio de sapo entre 0 y 100
    let sapoPercentage = Math.floor(Math.random() * 101);

    // Creamos el mensaje mencionando al usuario y mostrando el porcentaje
    let sapoMessage = `
━━━━━━━━━━━━━━━
🐸 *${conn.getName(userMentioned)}*, eres un ${sapoPercentage}% sapo! 
━━━━━━━━━━━━━━━
`.trim();

    // Enviamos la respuesta mencionando al usuario
    m.reply(sapoMessage, null, { mentions: [userMentioned] });
}

handler.help = ['sapo']
handler.tags = ['fun']
handler.command = /^(sapo)$/i

export default handler;