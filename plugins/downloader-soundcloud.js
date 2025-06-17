//Mediahub Codes Update Oficial ✔️ 

import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    await m.react('📀');
    return m.reply(`╭─⬣「 *Barboza Ai* 」⬣
│  ❗ *Uso Incorrecto*
│  ➤ Ingresa un texto para buscar en YouTube.
│  ➤ *Ejemplo:* ${usedPrefix + command} Shakira
╰────────────⬣`);
  }

  try {
    await m.react('📀'); // buscando...

    const searchApi = `https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`;
    const searchResponse = await fetch(searchApi);
    const searchData = await searchResponse.json();

    if (!searchData?.data || searchData.data.length === 0) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *Barboza Ai* 」⬣
│  ⚠️ *Sin Resultados*
│  ➤ No se encontraron resultados para:
│  ➤ *"${text}"*
╰────────────⬣`);
    }

    const video = searchData.data[0];

    let info = `╭─⬣「 *Barboza Ai* 」⬣
│  ≡◦🎵 *Título:* ${video.title}
│  ≡◦📺 *Canal:* ${video.author.name}
│  ≡◦⏱️ *Duración:* ${video.duration}
│  ≡◦👁️ *Vistas:* ${video.views}
│  ≡◦📅 *Publicado:* ${video.publishedAt}
│  ≡◦🔗 *Enlace:* ${video.url}
╰────────────⬣`;

    await conn.sendMessage(m.chat, {
      image: { url: video.image },
      caption: info
    }, { quoted: m });

    const downloadApi = `https://api.vreden.my.id/api/ytmp3?url=${video.url}`;
    const downloadResponse = await fetch(downloadApi);
    const downloadData = await downloadResponse.json();

    if (!downloadData?.result?.download?.url) {
      await m.react('🔴');
      return m.reply(`╭─⬣「 *Barboza Ai* 」⬣
│  ❌ *Error al descargar*
│  ➤ No se pudo obtener el audio del video.
╰────────────⬣`);
    }

    await conn.sendMessage(m.chat, {
      audio: { url: downloadData.result.download.url },
      mimetype: 'audio/mpeg',
      fileName: `${video.title}.mp3`
    }, { quoted: m });

    await m.react('🟢'); // éxito
  } catch (error) {
    console.error(error);
    await m.react('🔴');
    m.reply(`╭─⬣「 *Barboza Ai* 」⬣
│  ❌ *Error Interno*
│  ➤ ${error.message}
╰────────────⬣`);
  }
};

handler.command = ['play', 'playaudio'];
handler.help = ['play <texto>', 'playaudio <texto>'];
handler.tags = ['media'];

export default handler;
