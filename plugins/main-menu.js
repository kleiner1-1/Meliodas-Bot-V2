
import { xpRange} from '../lib/levelling.js'

const clockString = ms => {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

const imagen = "https://qu.ax/rEJmN.jpg";

const menuHeader = `
| 🎰𝐌𝐄𝐋𝐈𝐎𝐃𝐀𝐒 𝐁𝐎𝐓-𝐌𝐃🎰 |
------|🫴 ¡𝐇𝐎𝐋𝐀, %name!
------|🫴 𝐍𝐈𝐕𝐄𝐋: %level | XP: %exp/%max
------|🫴 𝐋𝐈𝐌𝐈𝐓𝐄: %limit | MODO: %mode
------|🫴 𝐔𝐏𝐓𝐈𝐌𝐄: %uptime | USUARIOS: %total

`;

const sectionDivider = `༒━━━━━━━━━━━━━━━━━━༒`;

const menuFooter = `
____________________________________

🫴__  𝐮𝐬𝐚 𝐜𝐚𝐝𝐚 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐬𝐮 𝐩𝐫𝐞𝐟𝐢𝐣𝐨
🫴__ ✨ 𝐞𝐥 𝐛𝐨𝐭 𝐩𝐞𝐫𝐟𝐞𝐜𝐭𝐨 𝐩𝐚𝐫𝐚 𝐭𝐮 𝐠𝐫𝐮𝐩𝐨.
🫴__🛠 𝘥𝘦𝘴𝘢𝘳𝘳𝘰𝘭𝘭𝘢𝘥𝘰 𝘱𝘰𝘳 @𝘉𝘢𝘫𝘰 𝘉𝘰𝘵𝘴

`; 

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5};
    const { exp, level, limit} = user;
    const { min, xp} = xpRange(level, global.multiplier || 1);
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const mode = global.opts?.self? 'Privado 🔒': 'Público 🌐';
    const uptime = clockString(process.uptime() * 1000);
    const name = await conn.getName(m.sender) || "Usuario";

    if (!global.plugins) return conn.reply(m.chat, '❌ Plugins no cargados correctamente.', m);

    let categorizedCommands = {
     // "🎭 Anime": new Set(),
      "ℹ️ INFO": new Set(),
      "🔎 SEARCH": new Set(),
     "🎮 GAME": new Set(),
      "🤖 SUBBOTS": new Set(),
      //"🌀 RPG": new Set(),
      "📝 REGISTRO": new Set(),
      "🎨 STICKER": new Set(),
      "🖼️ IMAGEN": new Set(),
      "🖌️ LOGO": new Set(),
      "⚙️ CONFIGURACION": new Set(),
      //"💎 Premium": new Set(),
      "📥 DESCARGAS": new Set(),
      " 🛠️ HERRAMIENTAS ": new Set(),
      //"🎉 Diversión": new Set(),
      //"🔞 NSFW": new Set(),
      "📀 BASE DE DATOS": new Set(),
      //"🔊 Audios": new Set(),
     // "🗝️ Avanzado": new Set(),
      "🔥 FREE FIRE": new Set(),
      "OTROS": new Set() 
};

    for (const plugin of Object.values(global.plugins)) {
      if (plugin?.help &&!plugin.disabled) {
        const cmds = Array.isArray(plugin.help)? plugin.help: [plugin.help];
        const tagKey = Object.keys(categorizedCommands).find(key => {
          const clean = key.replace(/[^a-z]/gi, '').toLowerCase();
          return plugin.tags?.includes(clean);
}) || "Otros";
        cmds.forEach(cmd => categorizedCommands[tagKey].add(cmd));
}
}

    const menuBody = Object.entries(categorizedCommands)
.filter(([_, cmds]) => cmds.size> 0)
.map(([title, cmds]) => {
        const entries = [...cmds].map(cmd => {
          const plugin = Object.values(global.plugins).find(p => Array.isArray(p.help)? p.help.includes(cmd): p.help === cmd);
          const premium = plugin?.premium? '🐉': '';
          const limited = plugin?.limit? '🌀': '';
          return `║⇝ 🐉 _${_p}${cmd}_ ${premium}${limited}`.trim();
}).join('\n');
        return `| 『 ${title} 』 \n${entries}\n${sectionDivider}`;
}).join('\n\n');

    const finalHeader = menuHeader
.replace('%name', name || "Usuario")
.replace('%level', level || 1)
.replace('%exp', (exp - min) || 0)
.replace('%max', xp || 100)
.replace('%limit', limit || 0)
.replace('%mode', mode || "Privado")
.replace('%uptime', uptime || "0:00:00")
.replace('%total', totalreg || 0);

    const fullMenu = `${finalHeader}\n\n${menuBody}\n\n${menuFooter}`.trim();
await conn.sendMessage(m.chat, {
      image: { url: imagen},
      caption: fullMenu,
      mentions: [m.sender]
}, { quoted: m});

} catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Error al generar el menú. Intenta de nuevo.', m);
}
};

handler.command = ['menu', 'help', 'menú'];
export default handler;
