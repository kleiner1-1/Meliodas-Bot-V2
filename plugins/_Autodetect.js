
import baileys from '@whiskeysockets/baileys';

const WAMessageStubType = baileys.default;

export async function before(m, { conn, participants, groupMetadata}) {
  if (!m.messageStubType ||!m.isGroup) return;

  const fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
},
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`
}
},
    "participant": "0@s.whatsapp.net"
};

  let chat = global.db.data.chats[m.chat];
  let usuario = participants.find(p => p.id === m.sender)?.name || `@${m.sender.split`@`[0]}`;
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg';

  let eventos = {
    21: {
      mensaje: `🔹 *Cambio de Nombre* 🔹\n👤 *Usuario:* ${usuario}\n🆕 *Nuevo Nombre:* ${m.messageStubParameters[0]}`,
      tipo: 'texto'
},
    22: {
      mensaje: `🖼️ *Cambio de Imagen* 🖼️\n👤 *Usuario:* ${usuario}\n📸 Se ha actualizado la foto del grupo.`,
      tipo: 'imagen',
      imagen: pp
},
    23: {
      mensaje: `🔗 *Enlace de Grupo Restablecido* 🔗\n👤 *Usuario:* ${usuario}\n🌐 Se ha generado un nuevo enlace.`,
      tipo: 'texto'
},
    24: {
      mensaje: `📝 *Descripción del Grupo Modificada* 📝\n👤 *Usuario:* ${usuario}\n✍️ Nueva descripción:\n${m.messageStubParameters?.[0] || 'Descripción no disponible'}`,
      tipo: 'texto'
},
    25: {
      mensaje: `⚙️ *Cambio de Configuración* ⚙️\n👤 *Usuario:* ${usuario}\n🔧 Nuevo estado: ${m.messageStubParameters[0] == 'on'? 'Solo administradores': 'Todos'}`,
      tipo: 'texto'
},
    26: {
      mensaje: `🚪 *Estado del Grupo Actualizado* 🚪\n👤 *Usuario:* ${usuario}\n🔓 Estado: ${m.messageStubParameters[0] == 'on'? 'Cerrado 🔒': 'Abierto 🔓'}`,
      tipo: 'texto'
},
    29: {
      mensaje: `👑 *Ascenso a Administrador* 👑\n📌 *Nuevo Admin:* ${participants.find(p => p.id === m.messageStubParameters[0])?.name || `@${m.messageStubParameters[0].split`@`[0]}`}\n🛠️ *Acción por:* ${usuario}`,
      tipo: 'texto'
},
    30: {
      mensaje: `⚠️ *Remoción de Administrador* ⚠️\n📌 *Usuario afectado:* ${participants.find(p => p.id === m.messageStubParameters[0])?.name || `@${m.messageStubParameters[0].split`@`[0]}`}\n📉 *Cambio realizado por:* ${usuario}`,
      tipo: 'texto'
}
};

  if (chat.detect && eventos[m.messageStubType]) {
    let evento = eventos[m.messageStubType];
    if (evento.tipo === 'texto') {
      await conn.sendMessage(m.chat, { text: evento.mensaje, mentions: [m.sender]}, { quoted: fkontak});
} else if (evento.tipo === 'imagen') {
      await conn.sendMessage(m.chat, { image: { url: evento.imagen}, caption: evento.mensaje, mentions: [m.sender]}, { quoted: fkontak});
}
}
}