/*import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let cristiano = (await axios.get(`https://raw.githubusercontent.com/BOTGATITO/BotGatito/master/src/JSON/Tiktokmusica.json`)).data  
let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
conn.sendFile(m.chat, ronaldo, 'error.jpg', `» 𝙈𝙐́𝙎𝙄𝘾𝘼𝙎 𝙏𝙄𝙆 𝙏𝙊𝙆 🎵`, m)}
//conn.sendButton(m.chat, "*Siiiuuuuuu*", author, ronaldo, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `${usedPrefix + command}`]], m)}
handler.help = ['cristianoronaldo', 'cr7']
handler.tags = ['internet']
handler.command = /^(musicastiktok|musicatiktok|tiktokmusic|tiktokmusica)$/i
export default handler*/

let handler  = async (m, { conn, usedPrefix, command }) => {
let res = await tiktokmusic[Math.floor(Math.random() * tiktokmusic.length)]
await m.react('🎶')
conn.sendMessage(m.chat, { video: { url: res }, caption: `» 𝙈𝙐𝙎𝙄𝘾 𝙏𝙄𝙆 𝙏𝙊𝙆 🎵` }, { quoted: m })}
handler.help = ['tiktokmusic']
handler.tags = ['random']
handler.command = /^(tiktokmusic)$/i
export default handler
global.tiktokmusic = [
 "https://telegra.ph/file/710607d85b7abd702eced.mp4",
"https://telegra.ph/file/0dc17539451e5ead356d0.mp4",
"https://telegra.ph/file/b9fd93c88043364458e2e.mp4",
"https://d.uguu.se/FDmnYLla.mp4",
"https://f.uguu.se/KCVdTHSi.mp4",
"https://telegra.ph/file/22c32a1e5963e7a1c3f32.mp4",
"https://telegra.ph/file/60491ec34b6ace5bd9018.mp4",
"https://telegra.ph/file/3178b9be8f66527b0867c.mp4",
"https://telegra.ph/file/d1d0b4d4667131b53a8bd.mp4",
"https://telegra.ph/file/f663890450705402b814d.mp4",
"https://telegra.ph/file/2bdaf9e54e4e096ed4280.mp4",
"https://telegra.ph/file/01ab7b816ab5614a0694c.mp4",
"https://telegra.ph/file/96d6215bb9b4658a65f11.mp4",
"https://telegra.ph/file/48ff9253e1c1bee574053.mp4",
"https://telegra.ph/file/7caee3f52f953e3633af8.mp4",
"https://telegra.ph/file/1103aa60a9fcbc5401e91.mp4",
"https://telegra.ph/file/6577b5b4e86e7fec054f2.mp4",
"https://telegra.ph/file/7d06f12bb963d1ad53300.mp4",
"https://telegra.ph/file/edbe4e723c14868828809.mp4",
"https://telegra.ph/file/81c39cbe98adf64002b07.mp4",
"https://telegra.ph/file/513d8e66e42dc39c81599.mp4",
"https://telegra.ph/file/ac95c6a36d28785e8b296.mp4",
"https://telegra.ph/file/5f80fde96f3c7266b2981.mp4",
"https://telegra.ph/file/020c43e300997667f5766.mp4",
"https://telegra.ph/file/f996c276109e311f462e4.mp4",
"https://telegra.ph/file/182e558c049dd0f6f9c34.mp4",
"https://telegra.ph/file/b17e111093533003e5c98.mp4",
"https://telegra.ph/file/62002de69500ecb9e4376.mp4",
"https://telegra.ph/file/6c6b7363708a491e900f2.mp4",
"https://telegra.ph/file/df011909c922b9b24b480.mp4",
"https://telegra.ph/file/c3d94e66d2d2a2135506e.mp4",
"https://telegra.ph/file/d4c154e9726abc95d1d15.mp4",
"https://telegra.ph/file/7a5f844360114b3cdb4ef.mp4",
"https://telegra.ph/file/faaf6f6a92e0c12b95893.mp4",
"https://telegra.ph/file/ee8d0820ae13c72f8fc43.mp4",
"https://telegra.ph/file/ad3bc4a79494c7255e963.mp4",
"https://telegra.ph/file/6bb46748cd6a5ea1fbbb2.mp4",
"https://telegra.ph/file/16c491903f71c7deedfe7.mp4",
"https://telegra.ph/file/12af88f54339b40e6957a.mp4",
"https://telegra.ph/file/d8023e58bdde3cb76c7f1.mp4",
"https://telegra.ph/file/210e68e4edb5b8e59b338.mp4",
"https://telegra.ph/file/311ab16aef89bcf0141e4.mp4",
"https://telegra.ph/file/a09a1e6bd707efaeb5a1d.mp4",
"https://telegra.ph/file/b59e07328dad8ce287d0b.mp4",
"https://telegra.ph/file/9a7bbd53488a3a1dc4943.mp4",
"https://telegra.ph/file/d8caa730934f860c81bcc.mp4",
"https://telegra.ph/file/a6b1c9260f663626ecdce.mp4"
] 