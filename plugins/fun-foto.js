
import fetch from 'node-fetch'; 
import MessageType from '@whiskeysockets/baileys'; 

const handler = async (m, { conn }) => { 
  try {
    // Reemplaza con el enlace de tu imagen antigua
    const imageUrl = 'https://i.ibb.co/bj6sKRxF/file.jpg'; 

    // Enviar la imagen
    await conn.sendFile(m.chat, imageUrl, 'fotoantigua.jpg', 'Aquí tienes tu foto antigua!', m);
  } catch (e) {
    console.error(e);
    conn.sendMessage(m.chat, { text: 'Lo siento, ocurrió un error al enviar la foto.' }, { quoted: m });
  }
}; 

handler.command = /^\.fotoantiguabot$/i; 
export default handler;