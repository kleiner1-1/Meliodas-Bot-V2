let handler = async (m, { conn, command }) => {
  let who = m.fromMe ? conn.user.jid : m.sender
  let user = global.db.data.users[who]

  if (command === 'chetar') {
      user.limit += 10000000
      user.exp += 10000000
      m.reply(`✅ ¡Se te han otorgado 10,000,000 Dulces y XP!`)
    } else {
    }
  }

handler.help = ['chetar'];
handler.tags = ['owner'];
handler.command = ['chetar'];
handler.owner = true;
export default handler