
var handler = async (m, { conn, text }) => {
    // Verificamos si se mencionó a alguien
    if (!text) throw '🐶 *ESCRIBE EL NOMBRE DE UN USUARIO PARA CALCULAR SU PORCENTAJE DE PERRA.*';

    // Obtenemos el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0]; // Esto obtiene el ID del usuario mencionado

    // Verificamos si se mencionó un usuario válido
    if (!userMentioned) throw '🐶 *NO SE PUDO ENCONTRAR EL USUARIO MENCIONADO.*';

    // Generamos un porcentaje aleatorio de perra entre 0 y 100
    let perraPercentage = Math.floor(Math.random() * 101);

    // Creamos el mensaje mencionando al usuario y mostrando el porcentaje
    let perraMessage = `
━━━━━━━━━━━━━━━
🐕 *${conn.getName(userMentioned)}*, eres un ${perraPercentage}% perra! 
━━━━━━━━━━━━━━━
`.trim();

    // Enviamos la respuesta mencionando al usuario
    m.reply(perraMessage, null, { mentions: [userMentioned] });
}

handler.help = ['perra']
handler.tags = ['fun']
handler.command = /^(perra)$/i

export default handler;