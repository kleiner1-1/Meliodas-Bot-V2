let inscritos6vs6 = []

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        const texto = `
*6 𝐕𝐄𝐑𝐒𝐔𝐒 6*

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                   •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : 

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

      𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    
    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇

𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 𝗔𝗡𝗢𝗧𝗔𝗗𝗢𝗦:
${inscritos6vs6.length === 0 ? 'Ninguno aún.' : inscritos6vs6.map((n, i) => `${i + 1}. ${n}`).join('\n')}
        `.trim()

        const buttons = [
            {
                buttonId: `${usedPrefix}6vs6 anotar`,
                buttonText: { displayText: "✏️ Anotarse" },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}6vs6 limpiar`,
                buttonText: { displayText: "🗑 Limpiar Lista" },
                type: 1,
            },
        ]

        await conn.sendMessage(
            m.chat,
            {
                text: texto,
                buttons,
                viewOnce: true,
            },
            { quoted: m }
        )
        return
    }

    if (args[0].toLowerCase() === 'anotar') {
        const nombre = m.pushName || 'Usuario'
        if (inscritos6vs6.includes(nombre)) {
            return m.reply('❗Ya estás anotado.')
        }
        inscritos6vs6.push(nombre)
        await m.reply(`✅ *${nombre}* ha sido anotado.\nAhora hay *${inscritos6vs6.length}* participante(s).`)
        return
    }

    if (args[0].toLowerCase() === 'limpiar') {
        inscritos6vs6 = []
        await m.reply('🧹 Lista limpiada con éxito.')
        return
    }
}

handler.command = /^6vs6$/i
handler.help = ['6vs6']
handler.tags = ['freefire']
handler.group = true
handler.admin = true

export default handler