let handler = m => m;
handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[conn.user.jid] || {};

  const hl = global.prefix;  // Prefijo global
  const adminMode = chat.modoadmin;  // Modo de administrador

  // Comprobamos si el mensaje está en un grupo y si el modo administrador está activado
  if (m.isGroup) {
    // Si el modo admin está activado y el usuario no tiene privilegios, rechazamos el mensaje
    if (adminMode && !isOwner && !isROwner && !isAdmin) {
      return false;  // Cancelamos la acción
    }

    // Si el bot no es administrador en el grupo, rechazamos el mensaje
    if (!isBotAdmin) {
      return false;  // Cancelamos la acción
    }
  } else {
    // Si no es un grupo, solo los usuarios con privilegios pueden enviar mensajes
    if (isOwner || isROwner || isPrems) {
      return true;  // Permitir acción
    }
    return false;  // Cancelamos la acción
  }
}

export default handler;