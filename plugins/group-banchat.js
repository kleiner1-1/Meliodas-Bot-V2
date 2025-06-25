let handler = async (m, { conn, isAdmin, isROwner }) => {
    if (!(isAdmin || isROwner)) return dfail('admin', m, conn)
    global.db.data.chats[m.chat].isBanned = true
    await conn.reply(m.chat, `🧑‍💻𝙈𝙀𝙇𝙄𝙊𝘿𝘼𝙎 𝘽𝙊𝙏 𝙁𝙐𝙀 𝘽𝘼𝙉𝙀𝘼𝘿𝙊 𝙀𝙉 𝙀𝙎𝙏𝙀 𝘾𝙃𝘼𝙏`, m, rcanal)
    await m.react('✅')
}
handler.help = ['banearbot']
handler.tags = ['group']
handler.command = ['banearbot', 'banchat']
handler.group = true 
export default handler
