

let handler  = async (m, { conn, usedPrefix, command }) => {
let res = await tiktokfrases[Math.floor(Math.random() * tiktokfrases.length)]
await m.react('⛱️')
conn.sendMessage(m.chat, { video: { url: res }, caption: `» 𝙁𝙍𝘼𝙎𝙀𝙎 𝙏𝙄𝙆 𝙏𝙊𝙆 ⛱️` }, { quoted: m })}
handler.help = ['tiktokfrases']
handler.tags = ['random']
handler.command = /^(frasestiktok|frasetiktok|tiktokfrases|tiktokfrase)$/i
export default handler
global.tiktokfrases = [
"https://telegra.ph/file/c5950c6b4f7abf652a096.mp4",
"https://telegra.ph/file/e853f7555b5173f8cf438.mp4",
  "https://telegra.ph/file/06c739df53f0c7a49c625.mp4",
"https://telegra.ph/file/435db4162837d1fe4dec8.mp4"
]