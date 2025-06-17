
import { WAMessageStubType } from "@whiskeysockets/baileys";
import fetch from "node-fetch";

export async function before(m, { conn, participants, groupMetadata }) {
  try {
    if (!m.messageStubType || !m.isGroup) return true;

    let ppUrl = await conn.profilePictureUrl(m.messageStubParameters[0], "image").catch(
      () => "https://files.catbox.moe/ltq7ph.jpg"
    );
    let imgBuffer = await fetch(ppUrl).then(res => res.buffer()).catch(() => null);

    let chat = global.db?.data?.chats?.[m.chat];
    if (!chat) return true;

    const botName = "🔥 Barboza Bot 🔥";
    const user = `@${m.messageStubParameters[0].split("@")[0]}`;
    const groupName = groupMetadata.subject;
    const groupDesc = groupMetadata.desc || "🌎 Sin descripción";

    // 🎉 Bienvenida
    if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      const welcomeText = `🎊 *¡Bienvenido, ${user}!* 🎊\n✨ *Has entrado a* ${groupName}.\n📢 *Descripción:* ${groupDesc}\n🚀 *Disfruta tu estancia y sigue las reglas!*`;

      await conn.sendMessage(m.chat, { 
        image: imgBuffer, 
        caption: welcomeText, 
        mentions: [m.messageStubParameters[0]] 
      });
    }
    if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      const goodbyeText = `👋 *${user} ha decidido salir del grupo.*\n✨ *Esperamos verte nuevamente en* ${groupName}!`;

      await conn.sendMessage(m.chat, { 
        image: imgBuffer, 
        caption: goodbyeText, 
        mentions: [m.messageStubParameters[0]] 
      });
    }
    if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      const kickText = `🚨 *${user} ha sido expulsado del grupo!* 🚨\n❌ *Eliminado de* ${groupName}.\n⚡ *Sigue las normas para evitar futuras sanciones.*`;

      await conn.sendMessage(m.chat, { 
        image: imgBuffer, 
        caption: kickText, 
        mentions: [m.messageStubParameters[0]] 
      });
    }
  } catch (error) {
    console.error("❌ Error en bienvenida/despedida:", error);
  }
}