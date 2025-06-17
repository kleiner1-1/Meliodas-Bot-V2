
import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply('🚩 Ingresa un mensaje para que el bot responda.\n📌 Ejemplo: `.botai Hola, ¿cómo estás?`');
  }

  const text = args.join(' ');
  const apiUrl = `https://api.nekorinn.my.id/ai/chatbot?ai_name=Barboza&text=${encodeURIComponent(text)}`;

  try {
    m.reply('🤖 Generando respuesta...');
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const json = await response.json();
    if (json && json.data) {
      await conn.sendMessage(m.chat, { text: `🤖 *Barboza dice:* ${json.data}` }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, { text: "❌ No se obtuvo respuesta de la IA." }, { quoted: m });
    }
  } catch (error) {
    console.error('❌ Error en la solicitud:', error);
    m.reply('🚩 Ocurrió un error, intenta nuevamente más tarde.');
  }
};

handler.command = ['botai'];
export default handler;