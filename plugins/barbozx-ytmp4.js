import fetch from "node-fetch";
import axios from 'axios';

// Constantes
const MAX_FILE_SIZE = 280 * 1024 * 1024; // 280 MB
const VIDEO_THRESHOLD = 70 * 1024 * 1024; // 70 MB
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024; // 100 MB
const REQUEST_LIMIT = 3; // Máximo 3 solicitudes
const REQUEST_WINDOW_MS = 10000; // Ventana de 10 segundos
const COOLDOWN_MS = 120000; // 2 minutos

// Estado para control de solicitudes
const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;

// Validación de URL de YouTube
const isValidYouTubeUrl = (url) =>
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

// Formateo de tamaño
function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  bytes = Number(bytes);
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

// Obtener tamaño del archivo
async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    const size = parseInt(response.headers['content-length'], 10);
    if (!size) throw new Error('Tamaño no disponible');
    return size;
  } catch (e) {
    throw new Error('No se pudo obtener el tamaño del archivo');
  }
}

// Descarga de video
async function ytdl(url) {
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Chromium";v="132", "Not A(Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
  };

  try {
    const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers });
    if (!initRes.ok) throw new Error('Fallo al inicializar la solicitud');
    const init = await initRes.json();

    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) throw new Error('ID de video no encontrado');

    const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers });
    if (!convertRes.ok) throw new Error('Fallo al convertir el video');
    const convert = await convertRes.json();

    let info;
    for (let i = 0; i < 3; i++) {
      const progressRes = await fetch(convert.progressURL, { headers });
      if (!progressRes.ok) throw new Error('Fallo al obtener el progreso');
      info = await progressRes.json();
      if (info.progress === 3) break;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1s entre intentos
    }

    if (!info || !convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga');
    return { url: convert.downloadURL, title: info.title || 'Video sin título' };
  } catch (e) {
    throw new Error(`Error en la descarga: ${e.message}`);
  }
}

// Verificar límite de solicitudes
const checkRequestLimit = () => {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > REQUEST_WINDOW_MS) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      requestTimestamps.length = 0;
    }, COOLDOWN_MS);
    return false;
  }
  return true;
};

// Handler principal
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `👉 Uso: ${usedPrefix}${command} https://youtube.com/watch?v=iQEVguV71sI`, m);
  }

  if (!isValidYouTubeUrl(text)) {
    await m.react('🔴');
    return m.reply('🚫 Enlace de YouTube inválido');
  }

  // Verificar límite de solicitudes y archivo pesado
  if (isCooldown || !checkRequestLimit()) {
    await m.react('🔴');
    return conn.reply(m.chat, '⏳ Demasiadas solicitudes rápidas. Por favor, espera 2 minutos.', m);
  }
  if (isProcessingHeavy) {
    await m.react('🔴');
    return conn.reply(m.chat, '⏳ Espera, estoy procesando un archivo pesado.', m);
  }

  await m.react('📀'); // Inicio
  try {
    const { url, title } = await ytdl(text);
    const size = await getSize(url);

    if (!size) {
      await m.react('🔴');
      throw new Error('No se pudo determinar el tamaño del video');
    }

    if (size > MAX_FILE_SIZE) {
      await m.react('🔴');
      throw new Error('♡ No puedo procesar esta descarga porque traspasa el límite de descarga');
    }

    if (size > HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '🤨 Espera, estoy lidiando con un archivo pesado', m);
    }

    await m.react('✅️'); // Descarga iniciada
    const caption = `*💌 ${title}*\n> ⚖️ Peso: ${formatSize(size)}\n> 🌎 URL: ${text}`;
    const isSmallVideo = size < VIDEO_THRESHOLD;

    const buffer = await (await fetch(url)).buffer();
    await conn.sendFile(
      m.chat,
      buffer,
      `${title}.mp4`,
      caption,
      m,
      null,
      {
        mimetype: 'video/mp4',
        asDocument: !isSmallVideo,
        filename: `${title}.mp4`
      }
    );

    await m.react('🟢'); // Completado
    isProcessingHeavy = false; // Liberar estado
  } catch (e) {
    await m.react('🔴');
    await m.reply(`❌ Error: ${e.message || 'No se pudo procesar la solicitud'}`);
    isProcessingHeavy = false; // Liberar estado en caso de error
  }
};

handler.help = ['ytmp4 <URL>'];
handler.command = ['ytmp4'];
handler.tags = ['descargas'];
handler.diamond = true;

export default handler;