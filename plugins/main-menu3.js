let handler = async (m, { isPrems, conn }) => {
let time = global.db.data.users[m.sender].lastcofre + 0 // 36000000 10 Horas //86400000 24 Horas
if (new Date - global.db.data.users[m.sender].lastcofre < 0) throw `[🐉𝐈𝐍𝐅𝐎🐉] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`

let img = 'https://qu.ax/bjOsy.jpg'
let texto = `
╭──🎨 *Creador de Logos* 🎨──╮
│
│ 🌟 *Comandos Disponibles*:
│
│ 💖.logocorazon            🎄.logochristmas
│ 💑.logopareja             🌐.logoglitch
│ 😢.logosad                🕹️.logogaming
│ 🧘.logosolitario          🔥.logodragonball
│ 🌟.logoneon               🐱.logogatito
│ 👧.logochicagamer         🛡️.logoarmy
│ 🍥.logonaruto             🚀.logofuturista
│ ☁️.logonube               👼.logoangel
│ 🌌.logocielo              🎨.logograffiti3d
│ 🧬.logomatrix             👻.logohorror
│ 👠.logoalas               🔫.logopubg
│ ⚔️.logoguerrero           💋.logopubgfem
│ 🧠.logolol                👾.logoamongus
│ 🎮.logoportadaplayer      🖼️.logoportadaff
│ 🐯.logovideotiger         🎞️.logovideointro
│ 🎥.logovideogaming        🐈 _.sadcat_ (texto)
│ 🐦 _.tweet_ (comentario)
│
╰────────────────────────╯
🧪 *Ejemplo:* *.logopareja Melodías Bot*

const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
global.db.data.users[m.sender].lastcofre = new Date * 1
}
handler.help = ['menu3']
handler.tags = ['main', 'logo']
handler.command = ['menulogos', 'logos', 'menu3'] 
export default handler
