let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `*Uso correcto:*\n\nPara un canal: ${usedPrefix}${command} <enlace del canal>\nPara un grupo: ${usedPrefix}${command} <enlace del grupo>\nPara una comunidad: ${usedPrefix}${command} <enlace de la comunidad>`, m);
    }

    const whatsappLinkRegex = /(https?:\/\/(?:www\.)?chat\.whatsapp\.com\/([0-9A-Za-z]{22}))|(https?:\/\/whatsapp\.com\/channel\/([0-9A-Za-z]+))|(https?:\/\/whatsapp\.com\/community\/([0-9A-Za-z]+))/i;

    let match = text.match(whatsappLinkRegex);

    if (!match) {
        return conn.reply(m.chat, `*Enlace inválido:* Por favor, proporciona un enlace de WhatsApp válido para un canal, grupo o comunidad.`, m);
    }

    let type = '';
    let identifier = '';

    if (match[2]) {
        type = 'group';
        identifier = match[2];
    } else if (match[4]) {
        type = 'channel';
        identifier = match[4];
    } else if (match[6]) {
        type = 'community';
        identifier = match[6];
    }

    if (!type || !identifier) {
        return conn.reply(m.chat, `*No se pudo identificar el tipo de enlace o extraer el ID.* Asegúrate de que el enlace sea correcto.`, m);
    }

    try {
        let responseText = '';
        switch (type) {
            case 'channel':
                const info = await conn.getChannelMetadata(identifier); // Replace with actual function

                const creationDate = new Date(info.creation_time * 1000);
                const formattedDate = creationDate.toLocaleDateString("es-ES", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                responseText = `
*╭┈┈┈「 🌿 Información del Canal 🌿 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${info.name || 'No disponible'}
*┆ 🆔 ID:* ${info.id || 'No disponible'}
*┆ 📍 Estado:* ${info.state || 'No disponible'}
*┆ 🗓️ Creado:* ${formattedDate}
*┆ 🔗 Enlace:* https://whatsapp.com/channel/${info.invite || 'No disponible'}
*┆ 👥 Seguidores:* ${info.subscribers || 0}
*┆ ✅ Verificado:* ${info.verified ? "Sí" : "No"}
*┆*
*┆ 📄 Descripción:* ${info.description || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
                `.trim();
                break;

            case 'group':
                const fullGroupLink = match[1];
                const groupInfo = await conn.groupMetadata(fullGroupLink); 

                responseText = `
*╭┈┈┈「 💬 Información del Grupo 💬 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${groupInfo.subject || 'No disponible'}
*┆ 🆔 ID:* ${groupInfo.id || 'No disponible'}
*┆ 👥 Miembros:* ${groupInfo.size || 0}
*┆ 👑 Creador/Administrador:* ${groupInfo.owner ? `@${groupInfo.owner.split('@')[0]}` : 'No disponible'}
*┆*
*┆ 📄 Descripción:* ${groupInfo.desc || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
                `.trim();
                break;

            case 'community':
                const communityInfo = await conn.communityMetadata(identifier); 

                responseText = `
*╭┈┈┈「 🏘️ Información de la Comunidad 🏘️ 」┈┈┈╮*
*┆*
*┆ 📝 Nombre:* ${communityInfo.name || 'No disponible'}
*┆ 🆔 ID:* ${communityInfo.id || 'No disponible'}
*┆ 👥 Miembros:* ${communityInfo.members?.length || 0}
*┆ 📄 Descripción:* ${communityInfo.description || "Sin descripción disponible."}
*┆*
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*
                `.trim();
                break;
        }

        await conn.reply(m.chat, responseText, m, { mentions: type === 'group' && groupInfo.owner ? [groupInfo.owner] : [] });
        m.react("✅");

    } catch (error) {
        console.error(`Error al obtener información de ${type}:`, error);
        let errorMessage = `*Error al procesar la solicitud de ${type}:* No se pudo obtener la información.`;
        if (type === 'group') {
            errorMessage += ` Asegúrate de que el enlace sea válido y el bot esté en el grupo o tenga acceso para ver su metadata.`;
        }
        errorMessage += ` Detalle: ${error.message}`;
        await conn.reply(m.chat, errorMessage, m);
    }
};

handler.command = ["inspeccionar", "channelinfo", "canalinfo", "groupinfo", "comunidadinfo"];
handler.help = ["infocanal <link>", "infogrupo <link>", "infocomunidad <link>"];
handler.tags = ["tools"];

export default handler;