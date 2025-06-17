const handler = async (m, { conn }) => {
  let gifUrl = "https://files.catbox.moe/ltq7ph.jpg";

  let text = `
 ──────── ⚔ ────────  
     *COMUNIDAD*  
──────── ⚔ ────────  

*Bot barboza*  
• ,👥➤ **Grupo de WhatsApp de la comunidad de Bot Barboza Ai**  
   Únete para compartir y resolver dudas con otros usuarios. 
  ➤https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18

• 📢 ➤ *Canal de Bot Barboza Ai*  
   Recibe actualizaciones, noticias y lanzamientos del bot.  
https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18
• 💬 ➤ *Grupo de WhatsApp activo*  
   Chatea con usuarios en tiempo real y sé parte de la conversación y usa al bot que esta de uso libre.  
➤https://chat.whatsapp.com/E1kx7olE0RpA18BdALdaWV

──────── ⚔ ────────  
🔍 *¿Sabías que...?* 
- El bot Barboza Ai es actualizado regularmente para mejorar su desempeño.  
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