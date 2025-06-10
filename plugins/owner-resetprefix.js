let handler = async (m, { conn }) => {
  
  const nuevoPrefijo = './#⚡';

  
  global.prefix = new RegExp('^[' + 
    nuevoPrefijo.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ']');

  
  conn.reply(m.chat, `${emoji} *Prefijo restablecido con éxito a:* ${nuevoPrefijo}`, m, rcanal);
};

handler.help = ['resetprefix'];
handler.tags = ['owner'];
handler.command = ['resetprefix'];
handler.rowner = true;

export default handler;