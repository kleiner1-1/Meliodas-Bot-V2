import similarity from 'similarity'

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return m.reply('⚠️ 𝗘𝗦𝗧𝗘 𝗔𝗖𝗘𝗥𝗧𝗜𝗝𝗢 𝗬𝗔 𝗛𝗔 𝗧𝗘𝗥𝗠𝗜𝗡𝗔𝗗𝗢.')
    if (m.quoted.id == this.tekateki[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tekateki[id][2]
            m.reply(`✅ 𝗖𝗢𝗥𝗥𝗘𝗖𝗧𝗢, 𝗘𝗥𝗘𝗦 𝗨𝗡 𝗚𝗘𝗡𝗜𝗢!\n+${this.tekateki[id][2]} Exp`)
            clearTimeout(this.tekateki[id][3])
            delete this.tekateki[id]
        } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`Casi lo logras!`)
        else m.reply('❌ 𝗜𝗡𝗖𝗢𝗥𝗥𝗘𝗖𝗧𝗢, 𝗦𝗜𝗚𝗨𝗘 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗗𝗢.')
    }
    return !0
}

handler.exp = 0

export default handler