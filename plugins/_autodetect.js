let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return


  const fkontak = {
    key: {
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "kirito-bot"
    },
    message: {
      contactMessage: {
        displayName: "KiritoBot",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Kirito;Bot;;;\nFN:KiritoBot Oficial\nORG:KiritoBot Team;\nTEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nEMAIL;type=INTERNET:soporte@kiritobot.net\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  
  const borde = "╭───────────────╮"
  const medio = "│ KiritoBot MD"
  const fin =   "╰───────────────╯"

  let nombre = `${borde}\n${medio}\n╰➤ ${usuario} \ncambió el nombre del grupo.\n   Nuevo nombre: *${m.messageStubParameters[0]}*\n${fin}`
  let foto = {
    image: { url: pp },
    caption: `${borde}\n${medio}\n╰➤ ${usuario} \nactualizó la foto del grupo.\n   ¡Una nueva etapa comienza!\n${fin}`,
    mentions: [m.sender]
  }
  let edit = `${borde}\n${medio}\n╰➤ ${usuario} \nmodificó la configuración del grupo.\n   Ahora *${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'}* pueden editar info.\n${fin}`
  let newlink = `${borde}\n${medio}\n╰➤ ${usuario} \nrestableció el enlace del grupo.\n   ¡No lo compartas con cualquiera!\n${fin}`
  let status = `${borde}\n${medio}\n╰➤ El grupo fue *${m.messageStubParameters[0] == 'on' ? 'cerrado' : 'abierto'}* por ${usuario}.\n   Ahora *${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'}* pueden enviar mensajes.\n${fin}`
  let admingp = `${borde}\n${medio}\n╰➤ *@${m.messageStubParameters[0].split`@`[0]}* ahora es *admin*.\n   Acción realizada por ${usuario}\n${fin}`
  let noadmingp = `${borde}\n${medio}\n╰➤ *@${m.messageStubParameters[0].split`@`[0]}* ya no es *admin*.\n   Acción realizada por ${usuario}\n${fin}`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, foto, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })
  }
}