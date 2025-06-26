import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw m.reply('🎧 Ingresa el nombre de una canción para buscar.');

  await m.react('🔍');

  let res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
  let json = await res.json();

  if (!json.result) throw m.reply('❌ No se encontró la canción.');

  let { title, thumbnail, duration, downloadUrl } = json.result;

  await conn.sendMessage(m.chat, {
    image: { url: thumbnail },
    caption: `
╭───〔 🎵 *SPOTIFY MUSIC* 〕───
│🎶 *${title}*
│⏱️ ${duration}
╰────────────────────
    `.trim()
  }, { quoted: m });

  const steps = ['▰▱▱▱▱▱▱▱▱▱ 10%', '▰▰▰▰▱▱▱▱▱▱ 50%', '▰▰▰▰▰▰▰▰▰▰ 100%'];
  for (let step of steps) {
    await m.reply(`📡 Cargando... ${step}`);
    await new Promise(r => setTimeout(r, 1000));
  }

  let audioBuffer = await fetch(downloadUrl).then(res => res.buffer());

  await conn.sendMessage(m.chat, {
    audio: audioBuffer,
    mimetype: 'audio/mpeg'
  }, { quoted: m });

  await m.react('✅');
};

handler.help = ['spotify *<texto>*'];
handler.tags = ['descargas'];
handler.command = ['spotify'];

export default handler;
