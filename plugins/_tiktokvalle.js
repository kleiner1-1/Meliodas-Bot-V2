
let handler  = async (m, { conn, usedPrefix, command }) => {
let res = await tiktokvalle[Math.floor(Math.random() * tiktokvalle.length)]
await m.react('💔')
conn.sendMessage(m.chat, { video: { url: res }, caption: `» 𝗩𝗔𝗟𝗟𝗘𝗡𝗔𝗧𝗢𝗦 𝗧𝗜𝗞𝗧𝗢𝗞 💔` }, { quoted: m })}
handler.help = ['tiktokvalle']
handler.tags = ['random']
handler.command = /^(tiktokvalle)$/i
export default handler
global.tiktokvalle = [
"https://telegra.ph/file/c33f7f1fafb6d1b9f61c8.mp4",
"https://telegra.ph/file/639bc84a65e597a07073c.mp4",
  "https://telegra.ph/file/0aa955aaa78a206b45170.mp4",
  "https://telegra.ph/file/a40c752c7d61e81b47e99.mp4",
  "https://telegra.ph/file/c33f7f1fafb6d1b9f61c8.mp4",
"https://telegra.ph/file/9f895c560dab513d020e5.mp4"
]