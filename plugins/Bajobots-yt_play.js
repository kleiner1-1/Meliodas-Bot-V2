//bajo bots

import yts from "yt-search";

const limit = 100;
const APIKEY = "Sylphiette's";

const handler = async (m, { conn, text, command }) => {
  if (!text) return m.reply("🌴 Ingresa el nombre de un video o una URL de YouTube.");
  m.react("🌱");

  let res = await yts(text);
  if (!res || !res.all || res.all.length === 0) {
    return m.reply("No se encontraron resultados para tu búsqueda.");
  }

  let video = res.all[0];

  const cap = `
\`\`\`⊜─⌈ 📻 ◜YouTube Play◞ 📻 ⌋─⊜\`\`\`

≡ 🌿 \`Título\` : » ${video.title}
≡ 🌾 \`Author\` : » ${video.author.name}
≡ 🌱 \`Duración\` : » ${video.duration.timestamp}
≡ 🌴 \`Vistas\` : » ${video.views}
≡ ☘️ \`URL\`      : » ${video.url}
`;

  await conn.sendFile(m.chat, await (await fetch(video.thumbnail)).buffer(), "image.jpg", cap, m);

  const urlAudio = `https://www.apis-anomaki.zone.id/downloader/yta?url=joji}`;
  const urlVideo = `https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(video.url)}&apikey=${APIKEY}`;

  if (command === "play") {
    try {
      let resApi = await fetch(urlAudio);
      let json = await resApi.json();
      if (!json.status) return m.reply("No se pudo obtener el audio del video.");

      let audioUrl = json.res.downloadURL;
      let title = json.res.title || "audio.mp3";

      await conn.sendFile(m.chat, audioUrl, title + ".mp3", "", m);
      await m.react("✔️");
    } catch (error) {
      return m.reply("Error al descargar audio: " + error.message);
    }
  } else if (command === "play2" || command === "playvid") {
    try {
      let resApi = await fetch(urlVideo);
      let json = await resApi.json();
      if (!json.status) return m.reply("No se pudo obtener el video.");

      let videoUrl = json.res.url;
      let title = json.res.title || "video.mp4";

      const resHead = await fetch(videoUrl, { method: "HEAD" });
      const cont = resHead.headers.get("content-length");
      const bytes = parseInt(cont, 10);
      const sizemb = bytes / (1024 * 1024);
      const asDocument = sizemb >= limit;

      await conn.sendFile(m.chat, videoUrl, title + ".mp4", "", m, null, {
        asDocument,
        mimetype: "video/mp4",
      });
      await m.react("✔️");
    } catch (error) {
      return m.reply("Error al descargar video: " + error.message);
    }
  }
};

handler.help = ["play", "play2"];
handler.tags = ["download"];
handler.command = ["play", "play2", "playvid"];

export default handler;
