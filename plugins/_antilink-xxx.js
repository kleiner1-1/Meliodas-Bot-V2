/*let adultContentRegex = /(pornhub.com|xvideos.com|xnxx.com|redtube.com|youporn.com|onlyfans.com|sex.com|chaturbate.com|cam4.com|playboy.com|xxx.com|escort|fetish|adult|erotic|nude|hentai|sexchat|camsoda|bongacams|spankbang|rule34|nsfw|18\+|hardcore|taboo|bdsm)/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return;  
    if (isAdmin || isOwner || m.fromMe || isROwner) return;  

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split`@`[0]}`;
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
    let bot = global.db.data.settings[this.user.jid] || {};
    const isAdultLink = adultContentRegex.exec(m.text);
    
    if (chat.antiLink && isAdultLink && !isAdmin) {
        await conn.sendMessage(m.chat, { 
            text: `⚠️ *「 ENLACE DETECTADO 」* ⚠️\n\n《✧》${user} compartió un enlace prohibido y será eliminado...`, 
            mentions: [m.sender] 
        }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
        
        if (!isBotAdmin) return conn.sendMessage(m.chat, { 
            text: `✦ El antilink está activo pero no puedo eliminarte porque no soy admin.`, 
            mentions: [...groupAdmins.map(v => v.id)] 
        }, { quoted: m });
        
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404") return;
        }
    }
    return !0;  
}*/