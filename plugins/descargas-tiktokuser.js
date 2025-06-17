/* 
- Downloader Tiktokuser By Jose XrL
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/
// *🍁 [ Tiktokuser Downloader ]*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa el nombre de usuario de TikTok que deseas buscar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* @jose.xrl15`, m, rcanal);
  await m.react('🕓');
  
  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktok-user-posts?user=${text}`);
    
    if (response.data.status === 200) {
      const videos = response.data.data.videos;
      if (videos.length > 0) {
        for (let i = 0; i < videos.length; i++) {
          let video = videos[i];
          let txt = '`乂  T I K T O K  -  D O W N L O A D`\n\n';
          txt += `    ✩  *Nro* : ${i + 1}\n`;
          txt += `    ✩  *Título* : ${video.title || 'Sin título'}\n`;
          txt += `    ✩  *Autor* : ${video.author.nickname}\n`;
          txt += `    ✩  *Duración* : ${video.duration} segundos\n`;
          txt += `    ✩  *Vistas* : ${video.play_count}\n`;
          txt += `    ✩  *Likes* : ${video.digg_count}\n`;
          txt += `    ✩  *Comentarios* : ${video.comment_count}\n`;
          txt += `    ✩  *Compartidos* : ${video.share_count}\n`;
          txt += `    ✩  *Publicado* : ${new Date(video.create_time * 1000).toLocaleString()}\n`;
          txt += `    ✩  *Descargas* : ${video.download_count}\n\n`;
          txt += `> 🚩 Enlace al video: ${video.play}`;

          await conn.sendMessage(m.chat, { video: { url: video.play }, caption: txt }, { quoted: m });
        }
        await m.react('✅');
      } else {
        await m.react('✖️');
        await conn.reply(m.chat, 'No se encontraron videos para este usuario.', m);
      }
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos desde TikTok.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['downloader'];
handler.help = ['tiktokuser *<usuario>*'];
handler.command = ['tiktokuser', 'tiktokus'];
handler.register = true;

export default handler;