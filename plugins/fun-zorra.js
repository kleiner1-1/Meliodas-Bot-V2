
var handler = async (m, { conn, text }) => {
    // Verificamos si se mencionó a alguien
    if (!text) throw '🥵 *ESCRIBE EL NOMBRE DE UN USUARIO PARA CALCULAR SU PORCENTAJE DE ZORRA.*';

    // Obtenemos el ID del usuario mencionado
    let userMentioned = m.mentionedJid[0]; // Esto obtiene el ID del usuario mencionado

    // Verificamos si se mencionó un usuario válido
    if (!userMentioned) throw '🥵 *NO SE PUDO ENCONTRAR EL USUARIO MENCIONADO.*';

    // Generamos un porcentaje aleatorio de zorra entre 0 y 100
    let zorraPercentage = Math.floor(Math.random() * 101);

    // Creamos el mensaje mencionando al usuario y mostrando el porcentaje
    let zorraMessage = `
━━━━━━━━━━━━━━━
🥵 *${conn.getName(userMentioned)}*, eres más zorra que tu madre en 4 patas y tienes un ${zorraPercentage}% de serlo! 
━━━━━━━━━━━━━━━
`.trim();

    // Enviamos la respuesta mencionando al usuario
    m.reply(zorraMessage, null, { mentions: [userMentioned] });
}

handler.help = ['zorra']
handler.tags = ['fun']
handler.command = /^(zorra)$/i

export default handler;