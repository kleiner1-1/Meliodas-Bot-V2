
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        if (!args[0]) {
            return conn.reply(m.chat, 
                `> 𝘗𝘰𝘳 𝘧𝘢𝘷𝘰𝘳 𝘪𝘯𝘨𝘳𝘦𝘴𝘢 𝘦𝘭 𝘵𝘦𝘹𝘵𝘰 𝘲𝘶𝘦 𝘥𝘦𝘴𝘦𝘢𝘴 𝘤𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘳 𝘦𝘯 𝘴𝘵𝘪𝘤𝘬𝘦𝘳.\n\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: ${usedPrefix}brat 𝘩𝘰𝘭𝘢 𝘣𝘰𝘭𝘢.`, 
                m);
        }

        const text = encodeURIComponent(args.join(" "));
        const apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${text}`;

        // Reacción de espera
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // Obtener el sticker
        const stickerResponse = await fetch(apiUrl);
        if (!stickerResponse.ok) throw new Error('Error al generar el sticker');

        // Enviar el sticker de forma limpia
        await conn.sendMessage(m.chat, {
            sticker: { url: apiUrl },
            packname: 'Barboza',  // Nombre que aparecerá al ver info
            author: conn.getName(m.sender) // Muestra el nombre del creador
        }, { quoted: m });

        // Reacción de éxito
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error(err);
        // Reacción de error
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await conn.reply(m.chat, 
            `> 𝘖𝘤𝘶𝘳𝘳𝘪ó 𝘶𝘯 𝘦𝘳𝘳𝘰𝘳 𝘢𝘭 𝘨𝘦𝘯𝘦𝘳𝘢𝘳 𝘦𝘭 𝘴𝘵𝘪𝘤𝘬𝘦𝘳.\n\n𝘗𝘰𝘳 𝘧𝘢𝘷𝘰𝘳 𝘪𝘯𝘵𝘦𝘯𝘵𝘢 𝘥𝘦 𝘯𝘶𝘦𝘷𝘰.`, 
            m);
    }
};

handler.help = ['brat <texto>'];
handler.tags = ['sticker'];
handler.command = /^brat(icker)?$/i;

export default handler;