
let handler = async (m, { conn }) => {
    const imageUrl = 'https://i.ibb.co/fdXKyX73/file.jpg'; // Reemplaza esto con la URL de tu imagen
    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
}

handler.help = ['cuartoschampions'];
handler.tags = ['info'];
handler.command = ['cuartoschampions'];

export default handler;
