
let handler = async (m, { isPrems, conn}) => {
  let user = global.db.data.users[m.sender]
  let time = user.lastcofre + 0 // Ajusta si deseas intervalo

  if (new Date - user.lastcofre < 0) {
    throw `[🐉 INFO] Ya reclamaste tu cofre.\nVuelve en *${msToTime(time - new Date())}* para volver a reclamar.`
}

  let img = 'https://qu.ax/bjOsy.jpg'
  let texto = `
╭──🎨 *Creador de Logos* 🎨──╮
│
│ 🌟 *Comandos Disponibles*:
│
│ 💖.logocorazon           🎄.logochristmas
│ 💑.logopareja            🌐.logoglitch
│ 😢.logosad               🕹️.logogaming
│ 🧘.logosolitario         🔥.logodragonball
│ 🌟.logoneon              🐱.logogatito
│ 👧.logochicagamer        🛡️.logoarmy
│ 🍥.logonaruto            🚀.logofuturista
│ ☁️.logonube              👼.logoangel
│ 🌌.logocielo             🎨.logograffiti3d
│ 🧬.logomatrix            👻.logohorror
│ 👠.logoalas              🔫.logopubg
│ ⚔️.logoguerrero          💋.logopubgfem
│ 🧠.logolol               👾.logoamongus
│ 🎮.logoportadaplayer     🖼️.logoportadaff
│ 🐯.logovideotiger        🎞️.logovideointro
│ 🎥.logovideogaming       🐈 _.sadcat_ (texto)
│ 🐦 _.tweet_ (comentario)
│
╰────────────────────────╯
🧪 *Ejemplo:* *.logopareja Melodías Bot*
`

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo",
},
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;Copilot;;;\nFN:Copilot\nitem1.TEL;waid=${
          m.sender.split("@")[0]
}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
},
},
    participant: "0@s.whatsapp.net",
}

  await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
  user.lastcofre = new Date() * 1
}

handler.help = ['menu3']
handler.tags = ['main', 'logo']
handler.command = ['menulogos', 'logos', 'menu3']

export default handler