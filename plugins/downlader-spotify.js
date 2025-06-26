import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw m.reply(`
🎶 *¿Qué canción de Spotify te gustaría descargar?*🎶


*${usedPrefix}${command} [nombre de la canción]*

*Ejemplo:*
*${usedPrefix}${command} Queen Bohemian Rhapsody*
    `);
  }

  await m.react(' searching...');
  await m.reply(`
🔍 *Buscando:* "${text}" en Spotify...
¡Esto podría tomar un momento!
  `);

  try {
    let response = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    let data = await response.json();

    if (!data || !data.result || !data.result.downloadUrl) {
      await m.react('❌');
      return m.reply(`
N.  *¡Uy! No pude encontrar esa canción en Spotify.*
      `);
    }

    await conn.sendMessage(m.chat, { 
      audio: { url: data.result.downloadUrl }, 
      mimetype: 'audio/mpeg',
      fileName: `${data.result.title || 'Spotify Audio'}.mp3`,
      ptt: false
    }, { quoted: m });

    await m.react('✅');
    await m.reply(`
 *¡Descarga completada!* 
🎶 *Título:* ${data.result.title || 'Desconocido'}
🎤 *Artista:* ${data.result.artist || 'Desconocido'}
لبوم *Álbum:* ${data.result.album || 'Desconocido'}

¡Melodias bot !
    `);

  } catch (error) {
    console.error('Error al descargar de Spotify:', error);
    await m.react('⁉️');
    await m.reply(`
⚠️ *¡Lo siento, ha ocurrido un error inesperado al procesar tu solicitud!*.
    `);
  }
};

handler.help = ['spotify <nombre de la canción>'];
handler.tags = ['descargas'];
handler.command = ['spotify'];

export default handler;
