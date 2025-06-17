const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
const channelLinkRegex = /whatsapp\.com\/channel\/([0-9A-Za-z]{20,30})/i  // Expresión regular para enlaces de canales

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)
    const isChannelLink = channelLinkRegex.exec(m.text)  // Verifica si el mensaje contiene un enlace de canal

    if (chat.antiLink && (isGroupLink || isChannelLink) && !isAdmin) {  // Detecta tanto enlaces de grupos como de canales
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `𝙀𝙣𝙡𝙖𝙘𝙚 𝙙𝙚𝙩𝙚𝙘𝙩𝙖𝙙𝙤 ⚠️\n\n𝘼𝙣𝙙𝙖 𝙖 𝙝𝙖𝙘𝙚𝙧 𝙩𝙪 𝙋𝙪𝙗𝙡𝙞𝙘𝙞𝙖𝙙 𝙖 𝙤𝙩𝙧𝙤 𝙡𝙖𝙙𝙤 *@${m.sender.split('@')[0]}* 𝙀𝙡𝙞𝙢𝙞𝙣𝙤 𝙩𝙪 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙮 𝙖 𝙩𝙞 𝙥𝙤𝙧 𝙚𝙨𝙘𝙤𝙧𝙞𝙖 ${isBotAdmin ? '' : '\n\n𝘿𝙚𝙗𝙤 𝙨𝙚𝙧 𝙖𝙙𝙢𝙞𝙣 𝙥𝙖𝙧𝙖 𝙚𝙭𝙥𝙪𝙡𝙨𝙖𝙧𝙡𝙤!!! :"v'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}