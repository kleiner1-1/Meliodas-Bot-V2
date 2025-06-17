
 import fetch from 'node-fetch'; 
 import MessageType from '@whiskeysockets/baileys'; 
 const handler = async (m, {conn, text, groupMetadata}) => { 
   try {
    let _user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  let who; 

   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender; 
   else who = m.sender; 
   let name = conn.getName(who);
     if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender); 
     if (!m.mentionedJid.length) m.mentionedJid.push(m.sender); 
     const res = await fetch('https://nekos.life/api/kiss'); 
     const json = await res.json(); 
     const {url} = json; 
     const text2 = `💌 *⌈* 𝑪𝑨𝑹𝑻𝑨 𝑫𝑬 𝑨𝑴𝑶𝑹 *⌋* 💌
    
𝑫𝑬: @${m.sender.split("@")[0]} 
𝑷𝑨𝑹𝑨: ${text}

𝑬𝒔𝒄𝒓𝒊𝒃𝒐 𝒆𝒔𝒕𝒂 𝒄𝒂𝒓𝒕𝒂 𝒅𝒆 𝒂𝒎𝒐𝒓 𝒑𝒐𝒓 𝒔𝒊 𝒂𝒍𝒈𝒖𝒏𝒂 𝒗𝒆𝒛 𝒐𝒍𝒗𝒊𝒅𝒂𝒔 𝒄𝒖𝒂́𝒏𝒕𝒐 𝒕𝒆 𝒒𝒖𝒊𝒆𝒓𝒐 𝒚 𝒄𝒖𝒂́𝒏𝒕𝒐 𝒗𝒂𝒍𝒆𝒔. 𝑴𝒆 𝒉𝒆 𝒆𝒏𝒂𝒎𝒐𝒓𝒂𝒅𝒐 𝒅𝒆 𝒆𝒔𝒂 𝒎𝒖𝒋𝒆𝒓 𝒇𝒖𝒆𝒓𝒕𝒆, 𝒓𝒆𝒂𝒍 𝒆 𝒊𝒏𝒕𝒆𝒍𝒊𝒈𝒆𝒏𝒕𝒆 𝒒𝒖𝒆 𝒆𝒓𝒆𝒔. 𝑷𝒐𝒓𝒒𝒖𝒆 𝒂𝒎𝒐 𝒕𝒖 𝒉𝒖𝒎𝒂𝒏𝒊𝒅𝒂𝒅, 𝒕𝒖 𝒅𝒆𝒕𝒆𝒓𝒎𝒊𝒏𝒂𝒄𝒊𝒐́𝒏 𝒚 𝒕𝒖 𝒎𝒂𝒏𝒆𝒓𝒂 𝒅𝒆 𝒗𝒆𝒓 𝒍𝒂𝒔 𝒄𝒐𝒔𝒂𝒔. 𝑻𝒆𝒏𝒈𝒐 𝒄𝒍𝒂𝒓𝒐 𝒒𝒖𝒆, 𝒅𝒆𝒔𝒅𝒆 𝒒𝒖𝒆 𝒆𝒏𝒕𝒓𝒂𝒔𝒕𝒆 𝒆𝒏 𝒎𝒊 𝒗𝒊𝒅𝒂, 𝒍𝒂 𝒓𝒆𝒗𝒐𝒍𝒖𝒄𝒊𝒐𝒏𝒂𝒔𝒕𝒆. 𝑯𝒂𝒔𝒕𝒂 𝒆𝒏𝒕𝒐𝒏𝒄𝒆𝒔, 𝒎𝒊 𝒇𝒐𝒓𝒎𝒂 𝒅𝒆 𝒆𝒏𝒕𝒆𝒏𝒅𝒆𝒓 𝒆𝒍 𝒂𝒎𝒐𝒓 𝒔𝒆 𝒉𝒂𝒃𝒊́𝒂 𝒍𝒊𝒎𝒊𝒕𝒂𝒅𝒐 𝒂 𝒍𝒐 𝒒𝒖𝒆 𝒔𝒆 𝒎𝒖𝒆𝒔𝒕𝒓𝒂 𝒆𝒏 𝒍𝒂𝒔 𝒑𝒆𝒍𝒊́𝒄𝒖𝒍𝒂𝒔 𝒚 𝒔𝒆 𝒍𝒆𝒆 𝒆𝒏 𝒍𝒐𝒔 𝒍𝒊𝒃𝒓𝒐𝒔. 𝑷𝒆𝒓𝒐 𝒄𝒖𝒂𝒏𝒅𝒐 𝒕𝒆 𝒄𝒐𝒏𝒐𝒄𝒊́, 𝒎𝒆 𝒅𝒊 𝒄𝒖𝒆𝒏𝒕𝒂 𝒅𝒆 𝒒𝒖𝒆 𝒆𝒍 𝒂𝒎𝒐𝒓, 𝒄𝒖𝒂𝒏𝒅𝒐 𝒆𝒔 𝒅𝒆 𝒗𝒆𝒓𝒅𝒂𝒅, 𝒆𝒔 𝒎𝒖𝒚 𝒅𝒊𝒇𝒆𝒓𝒆𝒏𝒕𝒆. 𝑬𝒔𝒆 𝒂𝒎𝒐𝒓 𝒓𝒐𝒎𝒂́𝒏𝒕𝒊𝒄𝒐 𝒚 𝒕𝒓𝒂𝒅𝒊𝒄𝒊𝒐𝒏𝒂𝒍 𝒅𝒆 𝒄𝒖𝒆𝒏𝒕𝒐 𝒅𝒆 𝒉𝒂𝒅𝒂𝒔 𝒏𝒐 𝒏𝒐𝒔 𝒉𝒂𝒄𝒆 𝒋𝒖𝒔𝒕𝒊𝒄𝒊𝒂; 𝒏𝒐 𝒆𝒔 𝒓𝒆𝒂𝒍 𝒏𝒊 𝒔𝒖𝒇𝒊𝒄𝒊𝒆𝒏𝒕𝒆. 𝑴𝒆 𝒉𝒂𝒔 𝒆𝒏𝒔𝒆𝒏̃𝒂𝒅𝒐 𝒒𝒖𝒆 𝒆𝒍 𝒂𝒎𝒐𝒓 𝒆𝒔 𝒔𝒊𝒏𝒐́𝒏𝒊𝒎𝒐 𝒅𝒆 𝒂𝒇𝒆𝒄𝒕𝒐 𝒚 𝒑𝒂𝒔𝒊𝒐́𝒏, 𝒑𝒆𝒓𝒐 𝒔𝒐𝒃𝒓𝒆 𝒕𝒐𝒅𝒐 𝒅𝒆 𝒓𝒆𝒔𝒑𝒆𝒕𝒐 𝒚 𝒄𝒐𝒏𝒇𝒊𝒂𝒏𝒛𝒂. 𝑺𝒆́ 𝒒𝒖𝒆 𝒏𝒐 𝒏𝒆𝒄𝒆𝒔𝒊𝒕𝒂𝒔 𝒆𝒔𝒕𝒂𝒓 𝒄𝒐𝒏𝒎𝒊𝒈𝒐, 𝒂𝒔𝒊́ 𝒄𝒐𝒎𝒐 𝒚𝒐 𝒏𝒐 𝒏𝒆𝒄𝒆𝒔𝒊𝒕𝒐 𝒆𝒔𝒕𝒂𝒓 𝒄𝒐𝒏𝒕𝒊𝒈𝒐. 𝒀 𝒑𝒓𝒆𝒄𝒊𝒔𝒂𝒎𝒆𝒏𝒕𝒆 𝒍𝒐 𝒒𝒖𝒆 𝒉𝒂𝒄𝒆 𝒒𝒖𝒆 𝒏𝒖𝒆𝒔𝒕𝒓𝒂 𝒓𝒆𝒍𝒂𝒄𝒊𝒐́𝒏 𝒔𝒆𝒂 𝒕𝒂𝒏 𝒈𝒓𝒂𝒏𝒅𝒆 𝒆𝒔 𝒒𝒖𝒆, 𝒂𝒖𝒏𝒒𝒖𝒆 𝒏𝒐 𝒍𝒂 𝒏𝒆𝒄𝒆𝒔𝒊𝒕𝒆𝒎𝒐𝒔, 𝒂𝒎𝒃𝒐𝒔 𝒍𝒂 𝒒𝒖𝒆𝒓𝒆𝒎𝒐𝒔.`.trim()
 conn.sendMessage(m.chat, {text: text2, mentions: [_user, m.sender]}, {quoted: m})
const stiker = await sticker(null, url, `+${m.sender.split('@')[0]} le dio besos a ${m.mentionedJid.map((user)=>(user === m.sender)? 'alguien ': `+${user.split('@')[0]}`).join(', ')}`); 
conn.sendFile(m.chat, stiker, null, {asSticker: true}); 
   } catch (e) { } 
 }; 
 handler.command = /^(carta1|carta)$/i; 
 export default handler;