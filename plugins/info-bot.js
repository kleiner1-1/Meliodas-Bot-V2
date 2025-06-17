import fetch from "node-fetch"; // Asegúrate de tener node-fetch instalado

const TTS_CHAR_LIMIT = 100; // Límite de caracteres para la API de TTS (ajusta según sea necesario)

// Claves API ofuscadas en Base64
const CHATGPT_API = "aHR0cHM6Ly9yZXN0YXBpLmFwaWJvdHdhLmJpei5pZC9hcGkvY2hhdGdwdA=="; // https://restapi.api
const TTS_API = "aHR0cHM6Ly9hcGkuYWdhdHoueHl6L2FwaS92b2ljZW92ZXI="; // https://api

// Función para decodificar las APIs
const decodeBase64 = (encoded) => Buffer.from(encoded, "base64").toString("utf-8");

// Función para obtener la respuesta de la API de ChatGPT
const getChatGPTResponse = async (message) => {
  const apiUrl = `${decodeBase64(CHATGPT_API)}?message=${encodeURIComponent(message)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.status === 200 && result.data && result.data.response) {
      return result.data.response; // Devuelve la respuesta de ChatGPT
    } else {
      throw new Error(result.message || "No se pudo obtener la respuesta de ChatGPT.");
    }
  } catch (error) {
    console.error("Error al obtener respuesta de ChatGPT:", error);
    throw new Error("No se pudo procesar el mensaje.");
  }
};

// Función para convertir texto a voz usando la API avanzada
const textToSpeech = async (text, model = "taylor_swift") => {
  const apiUrl = `${decodeBase64(TTS_API)}?text=${encodeURIComponent(text)}&model=${encodeURIComponent(model)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.status === 200 && result.data && result.data.oss_url) {
      const audioUrl = result.data.oss_url; // URL del archivo de audio
      return { audioUrl, voiceName: result.data.voice_name || "Unknown Voice" };
    } else {
      throw new Error(result.message || "No se pudo generar el audio.");
    }
  } catch (error) {
    console.error("Error al convertir texto a voz:", error);
    throw new Error("No se pudo generar el audio.");
  }
};

// Función para descargar el audio desde la URL
const downloadAudio = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.buffer(); // Descargar el audio como buffer
    } else {
      throw new Error("No se pudo descargar el audio.");
    }
  } catch (error) {
    console.error("Error al descargar el audio:", error);
    throw new Error("No se pudo descargar el audio.");
  }
};

// Función para dividir el texto si excede el límite de caracteres
const splitText = (text, limit) => {
  let parts = [];
  while (text.length > limit) {
    let part = text.substring(0, limit);
    parts.push(part);
    text = text.substring(limit);
  }
  if (text.length > 0) parts.push(text); // Agregar el último fragmento
  return parts;
};

// Comando .bot que combina ChatGPT y TTS
let handler = async (m, { conn, text, command }) => {
  // Verificar que se haya proporcionado texto
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ *¡Atención!*\nPor favor ingresa un mensaje para obtener una respuesta. Ejemplo: .bot ¿Cuál es la capital de Francia?`
    });
  }

  try {
    // Obtener respuesta de ChatGPT
    const chatGPTResponse = await getChatGPTResponse(text);

    // Dividir el texto de la respuesta si supera el límite de caracteres
    const textParts = splitText(chatGPTResponse, TTS_CHAR_LIMIT);

    // Enviar cada fragmento de texto a la API de TTS y luego enviar los audios
    for (let part of textParts) {
      const { audioUrl, voiceName } = await textToSpeech(part);

      // Descargar el archivo de audio desde la URL proporcionada
      const audioBuffer = await downloadAudio(audioUrl);

      // Enviar el audio al usuario
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: "audio/mp4",
        caption: `🤖 *Respuesta de ChatGPT:* ${chatGPTResponse}\n🎙️ *Voz generada:* ${voiceName}`
      }, { quoted: m });
    }

  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error:*\n${error.message || "Error desconocido"}`
    });
  }
};

handler.command = /^bot$/i; // Solo el comando .bot

export default handler;