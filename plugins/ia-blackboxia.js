import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args.length) {
            return await conn.reply(m.chat, `❌ Debes proporcionar una pregunta.\n\nEjemplo: *${usedPrefix + command} ¿Cuál es el origen del universo?*`, m);
        }

        const query = encodeURIComponent(args.join(" "));
        const apiUrl = `https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${query}`;

        await conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key } });

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 segundos

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error('❌ Error al contactar la API.');

        const result = await response.json();

        if (!result.status || !result.data) {
            throw new Error('❌ La API no devolvió una respuesta válida.');
        }

        const cleanText = result.data.replace(/<[^>]*>/g, '').trim();

        await conn.reply(m.chat, `🧠 *Blackbox AI responde:*\n\n${cleanText}`, m);

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error(err);
        await conn.reply(m.chat, `❌ Ocurrió un error al procesar tu pregunta.\n\n${err.name === 'AbortError' ? '⏱️ Tiempo de espera agotado.' : err.message}`, m);
    }
};

handler.command = /^blackboxai$/i;
export default handler;