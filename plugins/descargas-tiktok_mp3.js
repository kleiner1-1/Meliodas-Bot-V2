import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*🦅 Ejemplo: ${usedPrefix + command}* https://vm.tiktok.com/ZMhAk8tLx/`);
    }

    try {
        await conn.reply(m.chat, "🌷 *Espere un momento, estoy descargando y convirtiendo el audio...*", m);

        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.music) {
            throw new Error("❌ *Error:* No se pudo obtener el audio.");
        }

        const audioURL = tiktokData.data.music;
        const filePath = path.join(process.cwd(), "tiktok_audio.mp3");

        // Descargar el archivo de audio
        const response = await fetch(audioURL);
        const buffer = await response.buffer();
        fs.writeFileSync(filePath, buffer);

        // Convertir a MP3 si es necesario
        const convertedPath = path.join(process.cwd(), "tiktok_audio_converted.mp3");
        await convertAudio(filePath, convertedPath);

        // Enviar el archivo convertido
        await conn.sendMessage(
            m.chat,
            {
                audio: fs.readFileSync(convertedPath),
                mimetype: "audio/mp3",
                fileName: "tiktok_audio.mp3",
                ptt: false // No enviarlo como nota de voz
            },
            { quoted: m }
        );

        // Borrar archivos temporales
        fs.unlinkSync(filePath);
        fs.unlinkSync(convertedPath);

        await conn.reply(m.chat, "✅ *Audio convertido y enviado correctamente.*", m);
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❌ *Error:* ${error.message || "No se pudo procesar la solicitud."}`, m);
    }
};

handler.help = ['ttmp3', 'tiktokmp3'];
handler.tags = ['descargas'];
handler.command = /^ttmp3|tiktokmp3$/i;

handler.disable = false;
handler.register = true;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    try {
        let apiUrl = `https://www.tikwm.com/api/?url=${url}&hd=1`;
        let response = await fetch(apiUrl);
        let json = await response.json();

        if (!json || !json.data) {
            throw new Error("❌ La API no devolvió una respuesta válida.");
        }

        return json;
    } catch (error) {
        console.error("Error en la función tiktokdl:", error);
        return null;
    }
}

// Función para convertir audio a MP3 con FFmpeg
async function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        exec(`ffmpeg -i "${inputPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error en la conversión de audio: ${stderr}`);
                return reject(error);
            }
            resolve(true);
        });
    });
}