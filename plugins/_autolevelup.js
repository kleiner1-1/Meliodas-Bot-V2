/*import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';
import moment from 'moment-timezone';

let handler = m => m;
handler.before = async function (m, { conn }) {
    if (!db.data.chats[m.chat].autolevelup) return;
    
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');
    let userName = m.pushName || 'Anónimo';
    let user = global.db.data.users[m.sender];
    let chat = global.db.data.chats[m.chat];

    if (!chat.autolevelup) return;

    let before = user.level;
    while (canLevelUp(user.level, user.exp, global.multiplier)) 
        user.level++;

    if (before !== user.level) {
        let fecha = moment.tz('America/Bogota').format('DD/MM/YY');

        let mensaje = `✰━─━─━《 𝑳𝑬𝑽𝑬𝑳 𝑼𝑷! 》━─━─━✰\n✦ *Usuario:* ${userName}\n✦ *Nivel anterior:* ${before}\n✦ *Nivel actual:* ${user.level}\n✦ *Fecha:* ${fecha}\n✰━━━━━━━━━━━━━━━━━━━━━✰\n> ¡Sigue subiendo como un campeón!`;

        m.reply(mensaje);

        let especial = 'coin';
        let especial2 = 'exp';
        let especialCant = Math.floor(Math.random() * (9 - 6 + 1)) + 6;
        let especialCant2 = Math.floor(Math.random() * (10 - 6 + 1)) + 6;

        if (user.level % 5 === 0) {
            user[especial] += especialCant;
            user[especial2] += especialCant2;
        }
    }
};

export default handler;*/