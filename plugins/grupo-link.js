async function handler(m, { conn, orgs, participants, groupMetadata }) {
  let group = m.chat;
  let totalMembers = participants.length;
  let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
  conn.reply(m.chat, `☆ 𝐂𝐨𝐦𝐩𝐚𝐫𝐭𝐞 ☆\n\n𝐆𝐫𝐮𝐩𝐨: ${groupMetadata.subject}\n𝐌𝐢𝐞𝐦𝐛𝐫𝐨𝐬: ${totalMembers}\n\n\n*________________________________*\n*link*\n${link}`, m, { detectLink: true });
}

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'enlace'];
handler.group = true;
handler.botAdmin = true;

export default handler;