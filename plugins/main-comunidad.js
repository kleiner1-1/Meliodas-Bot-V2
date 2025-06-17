const handler = async (m, { conn }) => {
  let gifUrl = "https://qu.ax/QhXFQ.jpg";

  let text = `
 ──────── ⚔ ────────  
     *COMUNIDAD*  
──────── ⚔ ────────  

*Bot Meliodas V2*  
• ,👥➤ **Grupo de WhatsApp de la comunidad de Bot Meliodas V2**  
   Únete para compartir y resolver dudas con otros usuarios. 
  ➤https://whatsapp.com/channel/0029Vb63Kf9KwqSQLOQOtk3N

• 📢 ➤ *Canal de Bot Meliodas V2*  
   Recibe actualizaciones, noticias y lanzamientos del bot.  
https://whatsapp.com/channel/0029Vb63Kf9KwqSQLOQOtk3N
• 💬 ➤ *Grupo de WhatsApp activo*  
   Chatea con usuarios en tiempo real y sé parte de la conversación y usa al bot que esta de uso libre.  
➤

──────── ⚔ ────────  
🔍 *¿Sabías que...?* 
- El bot Meliodas V2 es actualizado regularmente para mejorar su desempeño.  
- Puedes sugerir mejoras o reportar errores directamente en los grupos.  
- Nuestra comunidad sigue creciendo y cuenta con soporte activo.  
-
`.trim();


  await conn.sendMessage(
    m.chat,
    {
      video: { url: gifUrl },
      gifPlayback: true, 
      caption: text,
      mentions: [m.sender], 
    },
    { quoted: m }
  );
};

handler.command = /^(comunidad)$/i; 
export default handler;
