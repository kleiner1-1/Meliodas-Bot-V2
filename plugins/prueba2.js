/*import axios from 'axios';

const handler = async (m, { conn }) => {
  try {
    m.react?.('🎌');

    const medias = [];

    for (let i = 0; i < 1; i++) {
      const res = await axios.get('https://anime-xi-wheat.vercel.app/api/anime');
      const imageUrl = res.data?.image;

      if (imageUrl) {
        medias.push({
          type: 'image',
          url: imageUrl
        });
      }
    }

    if (medias.length > 0) {
      // Usa tu método personalizado si tienes uno
      if (typeof conn.sendAlbumMessage === 'function') {
        await conn.sendAlbumMessage(m.chat, medias, m);
      } else {
        // Fallback: enviar como imágenes individuales
        for (const media of medias) {
          await conn.sendMessage(m.chat, { image: { url: media.url } }, { quoted: m });
        }
      }
    } else {
      await m.reply('No se pudo obtener imagen.');
    }
  } catch (e) {
    console.error(e);
    await m.reply('Ocurrió un error al obtener la imagen.');
  }
};

handler.command = ['an'];
handler.help = ['an'];
handler.tags = ['anime'];

export default handler;*/


const handler = async (m, { conn }) => {
  const notifyChat = m.chat;

  const mensaje = `📢 *Este es un mensaje de prueba usando notifyChat*\n\n✅ Si ves este mensaje, el parámetro notifyChat funciona correctamente.`;

  try {
    await conn.sendMessage(notifyChat, { text: mensaje });
  } catch (e) {
    console.log(`❌ Error al enviar mensaje a notifyChat (${notifyChat})`);
  }
};

handler.help = ['testnotify'];
handler.tags = ['test'];
handler.command = ['testnotify'];

export default handler;