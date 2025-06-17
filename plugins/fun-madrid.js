
var handler = async (m) => {
    // Creamos el mensaje para el comando .madrid
    let madridMessage = `
━━━━━━━━━━━━━━━
🤍🤍 *Hala Madrid!* 🤍🤍
━━━━━━━━━━━━━━━
`.trim();

    // Enviamos la respuesta
    m.reply(madridMessage);
}

handler.help = ['madrid'] // Comando que se utilizará
handler.tags = ['fun']
handler.command = /^(madrid)$/i // Expresión regular para el comando

export default handler;