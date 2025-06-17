
// YAHOO SEARCH ✨

import fetch from 'node-fetch';

let MF = async(m, { conn, args }) => {

if (!args[0]) return conn.reply(m.chat, '🌙 INGRESE UN TEXTO PARA BUSCAR EN YAHOO', m);

try {
let api = await (await fetch(`https://archive-ui.tanakadomp.biz.id/search/yahoosearch?q=${args[0]}`)).json();

let moon = `\`𝚈𝙰𝙷𝙾𝙾 𝑋 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰\`.`
for (let i = 0; i < (5 <= api.result.length ? 5 : api.result.length); i++) {

let force = api.result[i];

moon += `\n\n`
moon += `☪︎ *Título:* ${force.title}\n`
moon += `☪︎ *Enlace:* ${force.link}\n\n`
moon += `☪︎ *Descripción:* ${force.snippet}\n`
moon += `───── ･ ｡ﾟ☆: *.☽ .* :☆ﾟ. ─────`
}

conn.sendMessage(m.chat, { text: moon }, { quoted: m });

} catch (e) {
m.reply(`*Error En La Api*`);
m.react('✖️');
}}

MF.command = ['yahoosearch', 'yahoos'];

export default MF;