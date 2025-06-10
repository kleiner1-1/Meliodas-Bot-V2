

const mensajeCanal = `⭐ *¡Te invitamos a nuestro canal oficial!* 🌟\n\nEste es el canal 📢 de *Kirito-Bot*:\n👉 https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m\n\nSíguelo para estar al tanto de *comandos, novedades y actualizaciones*. ¡Gracias por tu apoyo!* 🙌`;

const enviarAvisoCanal = async (conn, notifyChat = null) => {
  let usuarios = [];
  let grupos = [];
  const enviados = new Set();

  const todosLosChats = Object.keys(conn.chats || {});
  if (notifyChat) await conn.sendMessage(notifyChat, { text: '📢 *Enviando mensaje del canal a todos los chats...*' });

  for (let jid of todosLosChats) {
    if (!jid.endsWith('@s.whatsapp.net') && !jid.endsWith('@g.us')) continue; // solo chats válidos
    if (enviados.has(jid)) continue;

    try {
      await conn.sendMessage(jid, { text: mensajeCanal });
      enviados.add(jid);
      if (jid.endsWith('@g.us')) grupos.push(jid);
      else usuarios.push(jid);
    } catch (e) {
      console.log(`❌ Error al enviar a ${jid}`);
    }

    await new Promise(resolve => setTimeout(resolve, 300)); 
  }

  let resumen = `✅ *Mensaje enviado correctamente*\n\n📨 Total: ${usuarios.length + grupos.length}\n👤 Usuarios: ${usuarios.length}\n👥 Grupos: ${grupos.length}`;

  if (notifyChat) await conn.sendMessage(notifyChat, { text: resumen });
  return { usuarios, grupos };
};

const handler = async (m, { conn, isOwner, global }) => {
  if (!isOwner) throw '❌ Este comando es solo para el *owner*.';

  
  await enviarAvisoCanal(conn, m.chat);

  
  if (global.conns && global.conns.length > 0) {
    for (let subbot of global.conns) {
      try {
        if (subbot && subbot.user?.id !== conn.user?.id) {
          await enviarAvisoCanal(subbot, m.chat);
        }
      } catch (e) {
        console.log(`[❌ Subbot] Error en ${subbot.user?.id}`);
      }
    }
  }
};

handler.help = ['canal'];
handler.tags = ['owner'];
handler.command = ['canal'];
handler.owner = true;

export default handler;
export { enviarAvisoCanal }; 