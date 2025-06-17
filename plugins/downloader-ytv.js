import fetch from "node-fetch";

// Función para decodificar Base64
const decodeBase64 = (encoded) => Buffer.from(encoded, "base64").toString("utf-8");

const fetchWithRetries = async (url, maxRetries = 2) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.status === 200 && data.data && data.data.download && data.data.download.url) {
        return data.data; // Retorna el resultado si es válido
      }
    } catch (error) {
      console.error(`Error en el intento ${attempt + 1}:`, error.message);
    }
    attempt++;
  }
  throw new Error("No se pudo obtener una respuesta válida después de varios intentos.");
};

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(text)) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ *¡Atención!*\n\n💡 *Por favor ingresa un enlace válido de YouTube para descargar el video.*\n\n📌 *Ejemplo:* ${usedPrefix}ytv https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    });
  }

  try {
    await conn.sendMessage(m.chat, {
      text: `
╭━━━🌐📡━━━╮  
   🔍 **Procesando con ☆Barboza Bot Ai☆** 🔍  
╰━━━🌐📡━━━╯  

✨ *Estamos descargando tu video...*  
📥 *Por favor espera unos instantes mientras procesamos tu solicitud.*  

⏳ *Esto puede tardar unos segundos.*  
      `,
    });

    // URL de la API ofuscada
    const encodedApiUrl = "aHR0cHM6Ly9yZXN0YXBpLmFwaWJvdHdhLmJpei5pZC9hcGkveXRtcDQ=";
    const apiUrl = `${decodeBase64(encodedApiUrl)}?url=${encodeURIComponent(text)}`;
    const apiData = await fetchWithRetries(apiUrl);

    const { metadata, download } = apiData;
    const { title, duration, thumbnail, description } = metadata;
    const { url: downloadUrl, quality, filename } = download;

    // Obtener el tamaño del archivo
    const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
    const fileSize = parseInt(fileResponse.headers.get("content-length") || 0);
    const fileSizeInMB = fileSize / (1024 * 1024); // Convertir bytes a MB

    // Formato del mensaje de información
    const videoInfo = `
📥 **Video Encontrado**  
━━━━━━━━━━━━━━━━━━━  
🎵 **Título:** ${title}  
⏱️ **Duración:** ${duration.timestamp || "No disponible"}  
📦 **Tamaño:** ${fileSizeInMB.toFixed(2)} MB  
📽️ **Calidad:** ${quality || "No disponible"}  

📌 **Descripción:**  
${description || "No hay descripción disponible"}  
━━━━━━━━━━━━━━━━━━━  
    `;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: videoInfo });

    // Descargar el video
    if (fileSizeInMB > 80) {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: filename || `${title}.mp4`,
          caption: `📂 *Video en Formato Documento:* \n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: filename || `${title}.mp4`,
          caption: `🎥 *Video Reproducible:* \n🎵 *Título:* ${title}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("Error al descargar el video:", error);
    await conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error al intentar procesar tu solicitud:*\n${error.message || "Error desconocido"}`,
    });
  }
};

handler.command = /^tv$/i; // Solo responde al comando .tv

export default handler;