let sugerirHandler = async (m, { conn, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(m.chat, `❗️ Por favor, ingrese su sugerencia en el siguiente formato:\n\ncomando / descripción\n\nEjemplo:\n!saludo | Envía un mensaje de bienvenida al usuario.`, m, fake);
  }

  let parts = text.split("/").map(p => p.trim())
  if (parts.length < 2) {
    return conn.reply(m.chat, `❗️ Formato incorrecto. Use:\ncomando | descripción`, m, fake);
  }

  let [nuevoComando, descripcion] = parts
  if (nuevoComando.length < 3) return conn.reply(m.chat, `❗️ El nombre del comando es muy corto.`, m, fake);
  if (descripcion.length < 10) return conn.reply(m.chat, `❗️ La descripción debe tener al menos 10 caracteres.`, m, fake);
  if (descripcion.length > 1000) return conn.reply(m.chat, `❗️ La descripción debe tener máximo 1000 caracteres.`, m, fake);

  let teks = `*✳️ SUGERENCIA DE COMANDOS ✳️*\n\n📌 *Comando propuesto:*\n• ${nuevoComando}\n\n📋 *Descripción:*\n• ${descripcion}\n\n👤 *Usuario:*\n• ${m.pushName || 'Anónimo'}\n• Número: wa.me/${m.sender.split`@`[0]}\n\n_Para aprobar o rechazar la sugerencia, el staff debe responder a este mensaje con .aceptar o .noaceptar seguido de una razón (opcional)._`


  let ownerJid = '50488198573@s.whatsapp.net' 
  await conn.sendMessage(ownerJid, { text: teks, mentions: [m.sender] })


  let staffGroup = '120363416199047560@g.us' 
  await conn.sendMessage(staffGroup, { text: teks, mentions: [m.sender] })


  await conn.reply(m.chat, `✅ *Tu sugerencia se ha enviado al staff.*\nRecibirás una notificación cuando sea revisada.`, m, fake);
}

sugerirHandler.help = ['sugerir']
sugerirHandler.tags = ['info']
sugerirHandler.command = ['sugerir', 'suggest']
export default sugerirHandler