//By Bajo Bots

import fetch from "node-fetch";

const handler = async (m, { conn, text, args, command }) => {
  try {
    if (!args[0]) return conn.reply(m.chat, `↘️ 𝙞𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙣 𝙡𝙞𝙣𝙠 𝙫𝙖𝙡𝙞𝙙𝙤 𝙙𝙚 𝙩𝙞𝙠 𝙩𝙤𝙠.`, m);
    if (!/(?:https?:\/\/)?(?:www\.|vm\.|vt\.|t)?\.?tiktok\.com\/[^\s&]+/i.test(text)) return conn.reply(m.chat, `❎ Enlace de TikTok inválido.`, m);

    m.react('🕒');

    let res = await fetch(`https://api.sylphy.xyz/download/tiktok?url=${args[0]}&apikey=sylphy`);
    let json = await res.json();
    if (!json.status) throw new Error('No se pudo obtener el contenido');

    let { title, duration, author } = json.data;
    let dl = json.dl;
    let type = json.type;

    let caption = `
*⟦ 💥 𝙈𝙚𝙡𝙞𝙤𝙙𝙖𝙨𝘽𝙤𝙩 ⟧ — ⌜ ${command}⌟*

⤷ 📃 *Título:* ${title}  
⤷ ⌛ *Duración:* ${duration} 
⤷ 🔗 *Autor:* ${author}

⟬ Tipo: download ⟭  

> ⌞ © Power by Bajo`.trim();


    if (type === 'video') {
      await conn.sendFile(m.chat, dl.url, 'tiktok.mp4', caption, m);
    } else if (type === 'image') {
      if (Array.isArray(dl.url)) {
        for (let i = 0; i < dl.url.length; i++) {
          await conn.sendFile(m.chat, dl.url[i], `tiktok_${i + 1}.jpg`, i === 0 ? caption : '', m);
        }
      } else {
        await conn.sendFile(m.chat, dl.url, 'tiktok.jpg', caption, m);
      }
    } else {
      throw new Error('Tipo de contenido no soportado');
    }

    m.react('✅');
  } catch (e) {
    return conn.reply(m.chat, `Error : ${e.message}`, m);
  }
};

handler.help = ["tiktok"];
handler.tags = ["download"];
handler.command = ["tt", "tiktok", "ttdl"];
export default handler;
