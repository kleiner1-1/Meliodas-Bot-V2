import axios from 'axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchDownloadUrl = async (videoUrl) => {
  const apis = [
    'https://api.vreden.my.id/api/ytmp3?url=',
    'https://mahiru-shiina.vercel.app/download/ytmp3?url=',
    'https://api.siputzx.my.id/api/d/ytmp3?url='
  ];

  for (let api of apis) {
    try {
      const fullUrl = `${api}${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(fullUrl, { timeout: 10000 });

      let result = data?.result || data?.data;

      // Adaptación para la estructura de Vreden
      const audioUrl = result?.download?.url || result?.dl_url || result?.download || result?.dl;
      const title = result?.metadata?.title || result?.title || "audio";

      if (audioUrl) {
        return {
          url: audioUrl.trim(),
          title
        };
      }
    } catch (error) {
      console.error(`Error con API: ${api}`, error.message);
      await wait(5000);
    }
  }

  return null;
};

const sendAudioWithRetry = async (conn, chat, audioUrl, videoTitle, maxRetries = 2) => {
  let attempt = 0;
  let thumbnailBuffer;
  try {
    const response = await axios.get('https://files.catbox.moe/l81ahk.jpg', { responseType: 'arraybuffer' });
    thumbnailBuffer = Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error("Error al obtener thumbnail:", error.message);
  }

  while (attempt < maxRetries) {
    try {
      await conn.sendMessage(
        chat,
        {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg',
          contextInfo: {
            externalAdReply: {
              title: videoTitle,
              body: "Barboza ",
              previewType: 'PHOTO',
              thumbnail: thumbnailBuffer,
              mediaType: 1,
              renderLargerThumbnail: false,
              showAdAttribution: true,
              sourceUrl: 'https://Ella.Nunca.Te-Amo.Pe'
            }
          }
        }
      );
      return;
    } catch (error) {
      console.error(`Error al enviar audio, intento ${attempt + 1}:`, error.message);
      if (attempt < maxRetries - 1) await wait(12000);
    }
    attempt++;
  }
};

let handler = async (m, { conn, text }) => {
  if (!text?.trim() || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
    await conn.reply(m.chat, `❗ *Debes Ingresar Un Enlace De YouTube Válido.*`, m);
    return;
  }

  const reactionMessage = await conn.reply(m.chat, `🔍 *Procesando El Enlace 😉...*`, m);
  await conn.sendMessage(m.chat, { react: { text: '🎶', key: reactionMessage.key } });

  try {
    const downloadData = await fetchDownloadUrl(text);
    if (!downloadData || !downloadData.url) throw new Error("No Se Pudo Obtener La Descarga.");

    await conn.sendMessage(m.chat, { react: { text: '🟢', key: reactionMessage.key } });
    await sendAudioWithRetry(conn, m.chat, downloadData.url, downloadData.title);
  } catch (error) {
    console.error("❌ Error:", error);
    await conn.reply(m.chat, `⚠️ *Error:* ${error.message || "Desconocido"}`, m);
  }
};

handler.help = ['ytmp3 <url de youtube>'];
handler.tags = ['descargas'];
handler.command = /^ytmp3$/i;

export default handler;