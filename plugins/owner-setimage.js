import Jimp from 'jimp';
import { writeFileSync } from 'fs';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `${emoji} Por favor, responde a una imagen para cambiar la foto de perfil.`, m, rcanal);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, `${emoji} No se pudo obtener la imagen.`, m, rcanal);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    
    await conn.updateProfilePicture(conn.user.jid, buffer);
    await conn.reply(m.chat, `${emoji} Foto de perfil cambiada con éxito.`, m, rcanal);

   
    const name = conn.getName(m.sender);
    const date = new Date().toLocaleString('es-ES', { timeZone: 'America/Tegucigalpa' });

   
    const tempFilePath = './temp.jpg';
    writeFileSync(tempFilePath, buffer);

    const notifyJid = '50433191934@s.whatsapp.net';
    await conn.sendMessage(notifyJid, {
      image: { url: tempFilePath },
      caption: `*Cambio de Foto de Perfil del Bot*\n\n*Cambiado por:* ${name}\n*Número:* wa.me/${m.sender.split('@')[0]}\n*Fecha y hora:* ${date}`
    });

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, `${emoji} Ocurrió un error al intentar cambiar la foto de perfil.`, m, rcanal);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];
handler.rowner = true;

export default handler;