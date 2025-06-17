import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `🚩 Por favor, ingrese un nombre de usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* xrljose`, m, rcanal);
  }

  await m.react('🕓');
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/igstalk?username=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.data) {
      await m.react('✖️');
      return await conn.reply(m.chat, '❌ No se encontraron resultados para esta búsqueda.', m);
    }

    const user = json.data;
    let txt = `📌 *I N S T A G R A M  -  S T A L K*\n\n`;
    txt += `👤 *Nombre Completo:* ${user.full_name}\n`;
    txt += `🔖 *Usuario:* ${user.username}\n`;
    txt += `📜 *Bio:* ${user.biography || 'Sin descripción'}\n`;
    txt += `👥 *Seguidores:* ${user.followers}\n`;
    txt += `🔄 *Siguiendo:* ${user.following}\n`;
    txt += `📝 *Publicaciones:* ${user.posts}\n`;
    txt += `🔗 *Perfil:* ${user.url}\n\n`;

    await conn.sendMessage(m.chat, { image: { url: user.profile_picture }, caption: txt }, { quoted: m });
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, '⚠️ Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
};

handler.help = ['igstalk *<nombre>*'];
handler.tags = ['stalk'];
handler.command = ['igstalk', 'instagramstalk'];
handler.register = true;

export default handler;