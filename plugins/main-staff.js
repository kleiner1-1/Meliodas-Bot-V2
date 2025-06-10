import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    const staff = [
        { number: '573162402768', name: 'Bajo 👑', role: 'Creador' },
  

    let mensaje = `╭━━〔 *🌟 EQUIPO OFICIAL* 〕━━⬣\n`;
    
    for (let miembro of staff) {
        mensaje += `┃ *${miembro.role}*\n`;
        mensaje += `┃ Nombre: ${miembro.name}\n`;
        mensaje += `┃ Contacto: https://wa.me/${miembro.number}\n`;
        mensaje += `┃━━━━━━━━━━━━━━━━━━\n`;
    }
    mensaje += `┃Meliodas-Bot-MD staff\n`;

    mensaje += `╰━━━━━━━━━━━━━━━━━━━━⬣`;

    if (!fs.existsSync(img)) {
        console.error(`Error: La imagen ${img} no existe.`);
        return m.reply("⚠️ Imagen no encontrada.");
    }

    await conn.sendFile(m.chat, img, 'staff.jpg', mensaje.trim(), m, { linkPreview: true });
};

handler.help = ['staff'];
handler.command = ['staff', 'colaboradores'];
handler.register = true;
handler.tags = ['main'];

export default handler;