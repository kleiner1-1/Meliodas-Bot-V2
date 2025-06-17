/*import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let cristiano = (await axios.get(`https://raw.githubusercontent.com/BOTGATITO/BotGatito/master/src/JSON/Tiktokhot.json`)).data  
let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
conn.sendFile(m.chat, ronaldo, 'error.jpg', `» 𝙃𝙊𝙏 𝙏𝙄𝙆 𝙏𝙊𝙆 🔥`, m)}
//conn.sendButton(m.chat, "*Siiiuuuuuu*", author, ronaldo, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `${usedPrefix + command}`]], m)}
handler.help = ['cristianoronaldo', 'cr7']
handler.tags = ['internet']
handler.command = /^(hottiktok|hotstiktok|tiktokhot)$/i
export default handler*/
let handler  = async (m, { conn, usedPrefix, command }) => {
let res = await tiktokhot[Math.floor(Math.random() * tiktokhot.length)]
await m.react('😈')
conn.sendMessage(m.chat, { video: { url: res }, caption: `» 𝙃𝙊𝙏 𝙏𝙄𝙆 𝙏𝙊𝙆 🔥` }, { quoted: m })}
handler.help = ['tiktokhot']
handler.tags = ['random']
handler.command = /^(tiktokhot)$/i
export default handler
global.tiktokhot = [
"https://telegra.ph/file/7266c4a284d0a2df54589.mp4",
"https://telegra.ph/file/40c07f641420a80b0f8cf.mp4",
  "https://telegra.ph/file/daa050ed7baa88ac2d4b8.mp4",
"https://telegra.ph/file/cd493e2a01bc573f94638.mp4",

"https://f.uguu.se/JutGNbJa.mp4",
  "https://telegra.ph/file/f18ec6e0a33f97c3d8710.mp4",
"https://telegra.ph/file/79816642cc73eb500d2fe.mp4"
]