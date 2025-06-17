
import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply("🔍 *Por favor, ingresa tu mensaje para la IA.*");

    try {
        m.react("💬");
        let respuesta = await (await fetch(`https://api.sylphy.xyz/ai/chatgpt?text=${encodeURIComponent(text)}`)).json();

        if (!respuesta || !respuesta.data) return m.reply("⚠️ *No se obtuvo respuesta, intenta nuevamente.*");

        await m.reply(`🤖 *Respuesta AI:* \n${respuesta.data}`);
    } catch (e) {
        m.reply("❌ *Ocurrió un error al procesar la respuesta. Inténtalo más tarde.*");
    }
};

handler.help = ["chatbot"];
handler.tags = ["ai"];
handler.command = ["chatbot", "askai"];

export default handler;