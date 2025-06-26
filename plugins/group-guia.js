let handler = async (m, { isPrems, conn}) => {
  let user = global.db.data.users[m.sender]
  let time = user.lastcofre + 0

  if (new Date - user.lastcofre < 0) {
    throw `❗ *YA RECLAMASTE TU COFRE* ❗\n🕰️ Vuelve en *${msToTime(time - new Date())}* para reclamar nuevamente.`
}

  let img = 'https://files.catbox.moe/ltq7ph.jpg'
  let texto = `
╭──🎮 *GUÍA DE COMANDOS RÁPIDOS* 🎮──╮
│
│ 🎧 *.on /.off audios* — Activa o desactiva audios
│ 📢 *.todos* — Etiqueta a todos los del grupo
│ 🔔 *.noti texto* — Notifica sin mencionar
│ 🔐 *.grupo abrir/cerrar* — Control del grupo
│ 👻 *.fantasmas* — Muestra los inactivos
│ 👋 *.on /.off welcome* — Activar bienvenidas
│ 📝 *.setwelcome Texto @user* — Personaliza bienvenida
│ 👋 *.setbye Texto @user* — Personaliza despedida
│ 🔼 *.promote @tag* — Hacer admin a alguien
│ 🔽 *.demote @tag* — Quitar admin
│ 🛡️ *.on modoadmin* — Bot solo para admins
│ 🔓 *.off modoadmin* — Bot para todos
│ 🤖 *.bot texto* — Habla con el bot
│ 🗑️ *.del* — Borra un mensaje
│ 📜 *.menu* — Muestra todos los comandos
│
╰──────────────────────────────╯
📩 ¿Dudas o sugerencias?
🌐 wa.me/573162402768
`

  const fkontak = {
    key: {
      participants: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast',
      fromMe: false,
      id: 'Halo'
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;;;\nFN:Bot\nitem1.TEL;waid=${
          m.sender.split('@')[0]
}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}
},
    participant: '0@s.whatsapp.net'
}

  await conn.sendFile(m.chat, img, 'guia.jpg', texto, fkontak)
  user.lastcofre = new Date() * 1
}

handler.command = ['guia']
handler.register = true
export default handler
