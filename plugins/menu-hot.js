let handler = async (m, { conn }) => {
    try {
        let d = new Date();
        let locale = 'es';
        let week = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

        let menu = `
¡Hola! 👋🏻 @${m.sender.split("@")[0]}
\`\`\`${week}, ${date}\`\`\`

╭──𝗠𝗘𝗡𝗨 𝗛𝗢𝗧──────
│ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 ...
│ Dale cariño a tu ganzo 
│ con el menú hot.
╰────────────────

» 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 𝗛𝗢𝗧 
│🔥➺ .tetas
│🔥➺ .xvideos
│🔥➺ .xnxx link
│🔥➺ .xnxxsearch texto
│🔥➺ .pornhubsearch texto
╰━━━━━━⋆★⋆━━━━━━⬣

» 𝗧𝗥𝗜𝗣𝗘 𝗫
│🔞➺ .nsfwoli
│🔞➺ .nsfwfoot
│🔞➺ .nsfwass
│🔞➺ .nsfwbdsm
│🔞➺ .nsfwcum
│🔞➺ .nsfwero
│🔞➺ .nsfwfemdom
│🔞➺ .nsfwglass
│🔞➺ .nsfworgy
│🔞➺ .yuri
│🔞➺ .yaoi
│🔞➺ .booty
│🔞➺ .ecchi
│🔞➺ .furro
│🔞➺ .hentai
│🔞➺ .trapito
╰━━━━━━⋆★⋆━━━━━━⬣
`.trim();

        // Enviar solo el texto del menú
        await conn.sendMessage(m.chat, { text: menu, mentions: [m.sender] });
    } catch (e) {
        await m.reply(`⚠ Error al ejecutar el comando. Intenta nuevamente o reporta este problema.\n\nDetalles del error:\n${e.message}`);
        console.error(e);
    }
};

handler.command = /^(menuhot)$/i;
handler.register = false;
export default handler;