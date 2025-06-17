
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
     const text2 = `💌 *⌈* 𝑪𝑶𝑵𝑭𝑬𝑺𝑰𝑶́𝑵 *⌋* 💌
    
𝑫𝑬: @${m.sender.split("@")[0]} 
𝑷𝑨𝑹𝑨: ${text}

𝑯𝒂 𝒑𝒂𝒔𝒂𝒅𝒐 𝒕𝒂𝒏𝒕𝒐 𝒕𝒊𝒆𝒎𝒑𝒐 𝒚 𝒂𝒖́𝒏 𝒏𝒐 𝒕𝒊𝒆𝒏𝒆𝒔 𝒊𝒅𝒆𝒂 𝒅𝒆 𝒍𝒐 𝒊𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕𝒆 𝒒𝒖𝒆 𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒎𝒊́, 𝒑𝒖𝒆𝒔 𝒏𝒐 𝒉𝒆 𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒂𝒅𝒐 𝒍𝒂 𝒎𝒂𝒏𝒆𝒓𝒂 𝒅𝒆 𝒅𝒆𝒄𝒊𝒓𝒕𝒆 𝒍𝒐 𝒒𝒖𝒆 𝒍𝒍𝒆𝒗𝒐 𝒅𝒆𝒏𝒕𝒓𝒐. 𝑷𝒐𝒓 𝒇𝒊𝒏 𝒉𝒆 𝒅𝒆𝒄𝒊𝒅𝒊𝒅𝒐 𝒉𝒂𝒄𝒆𝒓𝒍𝒐 𝒚 𝒑𝒂𝒓𝒂 𝒆𝒍𝒍𝒐, 𝒕𝒆 𝒆𝒔𝒄𝒓𝒊𝒃𝒐 𝒆𝒔𝒕𝒂 𝒄𝒂𝒓𝒕𝒂 𝒅𝒆 𝒂𝒎𝒐𝒓, 𝒆𝒏 𝒍𝒂 𝒒𝒖𝒆 𝒆𝒙𝒑𝒓𝒆𝒔𝒐 𝒎𝒊𝒔 𝒔𝒆𝒏𝒕𝒊𝒎𝒊𝒆𝒏𝒕𝒐𝒔 𝒚 𝒎𝒊 𝒎𝒂𝒚𝒐𝒓 𝒅𝒆𝒔𝒆𝒐.`.trim()
 conn.sendMessage(m.chat, {text: text2, mentions: [_user, m.sender]}, {quoted: m})
const stiker = await sticker(null, url, `+${m.sender.split('@')[0]} le dio besos a ${m.mentionedJid.map((user)=>(user === m.sender)? 'alguien ': `+${user.split('@')[0]}`).join(', ')}`); 
conn.sendFile(m.chat, stiker, null, {asSticker: true}); 
   } catch (e) { } 
 }; 
 handler.command = /^(confesión|confesion)$/i; 
 export default handler;