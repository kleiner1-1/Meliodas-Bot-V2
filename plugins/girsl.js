import fetch from "node-fetch";

const fetchImage = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.buffer();
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(`❌ Fallo al obtener la imagen: ${error.message}`);
  }
};

const imageCarouselHandler = async (m, { conn, command, usedPrefix, text = "girls" }) => {
  const apiUrl = "https://delirius-apiofc.vercel.app/nsfw/girls";

  try {
    const imagePromises = Array.from({ length: 6 }, () => fetchImage(apiUrl));
    const images = await Promise.all(imagePromises);

    const cards = images.map((imgBuffer, index) => ({
      header: { type: 1, text: `Imagen ${index + 1}` },
      body: { text: `Pulsa el botón para ver más` },
      footer: { text: `Resultado de ${text}` },
      image: imgBuffer,
      buttons: [
        {
          buttonId: `${usedPrefix}vermas_${index + 1}`,
          buttonText: { displayText: "Ver más" },
          type: 1
        }
      ]
    }));

    const carouselContent = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({ text: `*🤍 Resultados de:* *${text}*` }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Para ver más imágenes, desliza o presiona "Ver más".' }),
            header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
          })
        }
      }
    };

    const carouselMsg = generateWAMessageFromContent(m.chat, carouselContent, { quoted: m });
    await conn.relayMessage(m.chat, carouselMsg.message, { messageId: carouselMsg.key.id });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "❌ Error al obtener las imágenes para el carrusel", m);
  }
};

imageCarouselHandler.command = /^girls$/i;

export default imageCarouselHandler;