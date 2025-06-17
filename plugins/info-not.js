let noAceptarHandler = async (m, { conn, text, usedPrefix, command }) => {

  //if (!global.staffs || !Array.isArray(global.staffs)) global.staffs = []


  if (!m.isGroup) return m.reply(`Este comando solo se puede usar en el grupo del staff.`)
  //if (!global.staffs.includes(m.sender)) return m.reply(`❌ No tienes permisos para usar este comando.`)

  if (!m.quoted) return m.reply(`❗️ Responde al mensaje de sugerencia para rechazarlo.`)
  let razon = text.trim() || 'Sin razón especificada.'

  let regex = /wa\.me\/(\d+)/i
  let match = m.quoted.text.match(regex)
  if (!match) {
    return m.reply(`❗️ No se pudo extraer el número del usuario de la sugerencia.`)
  }
  let userId = match[1] + "@s.whatsapp.net"


  await conn.reply(userId, `❌ *Tu sugerencia fue RECHAZADA*\n\n_El staff ha revisado tu propuesta y decidió no implementarla._\nRazón: ${razon}`, m)
  m.reply(`❌ Sugerencia rechazada y notificada al usuario.`)
}
noAceptarHandler.help = ['noaceptar']
noAceptarHandler.tags = ['staff']
noAceptarHandler.command = ['noaceptar']
export default noAceptarHandler