
import axios from "axios";
import cheerio from "cheerio";

const handler = async (m, { conn, args}) => {
    if (!args[0]) return conn.reply(m.chat, '❌ *Debes proporcionar un enlace de TikTok!*', m);

    const url = args[0];
    const apiUrl = `https://api.nekorinn.my.id/downloader/tikwm?url=${encodeURIComponent(url)}`;

    try {
        await m.react('🕒');

        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.video && data.video.url) {

const txt = `*⟦ 💥 𝙈𝙚𝙡𝙞𝙤𝙙𝙖𝙨𝘽𝙤𝙩 ⟧ — ⌜📃 tiktokdl 📃⌟*

⤷ 📃 *Estado:* Descarga completada  
⤷ 🔗 *Fuente:* ${url}  
⤷ 🎬 *Tipo:* Video TikTok

⟬ Tipo: TikTok Dl ⟭

⌞ © Powered by Bajo`.trim();

            await conn.sendMessage(m.chat, {
                video: { url: data.video.url},
                caption: txt,
});
} else {
            await conn.reply(m.chat, '⚠️ *No se pudo obtener el video. Intenta con otro enlace.*', m);
}
} catch (error) {
        console.error(error);
        await conn.reply(m.chat, '❌ *Hubo un problema con la API. Inténtalo más tarde.*', m);
}
};

handler.command = ["tiktokdl"];
export default handler;