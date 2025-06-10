import * as fs from 'fs';

export async function before(m, {conn, isAdmin, isBotAdmin, usedPrefix}) {
  if (m.isBaileys && m.fromMe) {
    return !0;
  }
  if (!m.isGroup) return !1;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  const delet = m.key.participant;
  const bang = m.key.id;
  const name = await conn.getName(m.sender);
  const fakemek = {'key': {'participant': '0@s.whatsapp.net', 'remoteJid': '0@s.whatsapp.net'}, 'message': {'groupInviteMessage': {'groupJid': '51995386439-1616969743@g.us', 'inviteCode': 'm', 'groupName': 'P', 'caption': 'kirito-Bot MD', 'jpegThumbnail': null}}};

  if (chat.antiTraba && m.text.length > 5000) { 
    if (isAdmin) return conn.sendMessage(m.chat, {text: `> *ALERTA DEL ADMINISTRADOR* \n> @${m.sender.split('@')[0]} ha enviado un mensaje con más de 5000 caracteres. ¡Demasiado largo!`, mentions: [m.sender]}, {quoted: fakemek});
    conn.sendMessage(m.chat, `⚠️ *¡Mensaje con exceso de caracteres detectado!*\n[ ¡ ] Se ha encontrado un mensaje con más de ## caracteres. ¡Ten cuidado!`, `${isBotAdmin ? '' : 'No soy administrador, no puedo tomar acción :'}`, m);

    if (isBotAdmin && bot.restrict) {
      conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}});
      setTimeout(() => {
        conn.sendMessage(m.chat, {text: `✅ *Marcado como leído*\n${'\n'.repeat(400)}\n➡️ Número: wa.me/${m.sender.split('@')[0]}\n➡️ Alias: ${name}\n[ ¡ ] El mensaje tiene demasiados caracteres y podría causar problemas en los dispositivos.`, mentions: [m.sender]}, {quoted: fakemek});
      }, 0);
      setTimeout(() => {
        conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }, 1000);
    } else if (!bot.restrict) return m.reply('⚠️ *Aviso:* El modo restringido debe estar activado para realizar estas acciones.');
  }
  return !0;
}