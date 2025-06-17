
import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, `[ ✰ ]  Ingresa un link de CapCut`, m);
    if (!args[0].match(/capcut/gi)) return conn.reply(m.chat, `[ ✰ ]  Verifica que el link sea de *CapCut*`, m);

    await m.react('🕓');
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(args[0])}`);
        const data = response.data;

        if (data.status) {
            let videoUrl = data.data.originalVideoUrl;

            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
            await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', 'Aquí tienes tu video de CapCut', m);
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error: ${data.data}`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['capcutdownload *<url cc>*'];
handler.tags = ['downloader'];
handler.command = ['capcut', 'ccdownload'];
handler.register = true;

export default handler;