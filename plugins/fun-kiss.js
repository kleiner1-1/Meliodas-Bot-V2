import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who;

    // Verificamos si se menciona a alguien o se cita un mensaje
    if (m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Si hay mención, usamos esa
    } else if (m.quoted) {
        who = m.quoted.sender; // Si se cita un mensaje, usamos el emisor de ese mensaje
    } else {
        who = m.sender; // En caso contrario, usamos el emisor
    }

    let name = conn.getName(who); // Nombre de la persona mencionada o del emisor
    let name2 = conn.getName(m.sender); // Nombre del usuario que envía el comando
    m.react('🫦');

    // Construimos el mensaje dependiendo de si hay una mención o no
    let str;
    if (m.mentionedJid.length > 0) {
        str = `\`${name2}\` Le dio besos a \`${name || who}\` ( ˘ ³˘)♥.`; // Usamos nombre agendado o número si no está agendado
    } else if (m.quoted) {
        str = `\`${name2}\` beso a \`${name || who}\` 💋.`; // Mensaje cuando se cita a otro usuario
    } else {
        str = `\`${name2}\` se besó a sí mismo ( ˘ ³˘)♥`.trim();
    }

    if (m.isGroup) {
        let pp1 = 'https://telegra.ph/file/d6ece99b5011aedd359e8.mp4'; // Aquí puedes agregar tus stickers en lugar de videos
        let pp2 = 'https://telegra.ph/file/ba841c699e9e039deadb3.mp4';
        let pp3 = 'https://telegra.ph/file/6497758a122357bc5bbb7.mp4';
        let pp4 = 'https://telegra.ph/file/8c0f70ed2bfd95a125993.mp4';
        let pp5 = 'https://telegra.ph/file/826ce3530ab20b15a496d.mp4';

        const videos = [pp1, pp2, pp3, pp4, pp5];
        const video = videos[Math.floor(Math.random() * videos.length)];

        // Definimos la variable mentions correctamente
        let mentions = [who]; // Si hay mención, se incluye el ID de la persona mencionada

        // Convertimos la URL del video a un sticker
        await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m, sendMediaAsSticker: true });
    }
}

handler.help = ['besar @tag'];
handler.tags = ['fun'];
handler.command = ['kiss', 'besar'];
handler.group = true;

export default handler;
