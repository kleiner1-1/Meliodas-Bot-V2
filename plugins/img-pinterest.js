
import axios from "axios";

const handler = async (m, { conn, args}) => {
    if (!args[0]) return conn.reply(m.chat, "❌ *Debes proporcionar un término de búsqueda!*", m);

    const query = encodeURIComponent(args.join(" "));
    const apiUrl = `https://api.siputzx.my.id/api/s/pinterest?query=${query}`;

    try {
        await m.react("🕒");

        const response = await axios.get(apiUrl);
        const data = response.data.data;

        if (!data || data.length === 0) {
            await conn.reply(m.chat, `⚠️ *No se encontraron imágenes para:* ${args.join(" ")}`, m);
            return;
}

        const randomImage = data[Math.floor(Math.random() * data.length)];
        const imageUrl = randomImage.images_url;

        await conn.sendMessage(m.chat, {
            image: { url: imageUrl},
            caption: `✅ *Imagen de Pinterest encontrada!*\n🔎 *Búsqueda:* ${args.join(" ")}`,
}, { quoted: m});

        await m.react("✅");

} catch (error) {
        await m.react("✖️");
        console.error("Error al obtener la imagen:", error);
        await conn.reply(m.chat, "❌ *Ocurrió un error al obtener la imagen. Inténtalo nuevamente.*", m);
}
};

handler.command = ["pinterest"];
export default handler;