const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
    if (!user) {
        console.error("Usuario no encontrado en la base de datos:", m.sender);
        return; 
    }
    const username = m.sender.split('@')[0];

    // Verificar si el usuario ES el owner. Si lo es, se deniega el acceso.
    if (m.sender === global.owner.number) { // Reemplaza global.owner.number con tu ID de owner
        await conn.sendMessage(m.chat, { text: 'Este comando no está disponible para el owner.' }, { quoted: fkontak });
        return;
    }

    const message = `🚩 *@${username}* Ahora tienes recursos ilimitados`;
    try {
        await conn.sendMessage(m.chat, { text: message, mentions: [m.sender] }, { quoted: fkontak });
        user.money = Infinity;
        user.estrellas = Infinity;
        user.level = Infinity;
        user.exp = Infinity;
        console.log(`Recursos cheteados para ${username}`); 
    } catch (error) {
        console.error("Error al chetear recursos:", error);
        await conn.sendMessage(m.chat, { text: 'Error al procesar el comando. Contacta al administrador.' }, { quoted: fkontak }); //Mensaje de error al usuario
    }
};

handler.help = ['chetaruser'];
handler.tags = ['group']; // Esta etiqueta se puede mantener, aunque no afecta la funcionalidad
handler.command = /^(ilimitado2|infiniy2|chetaruser)$/i;
handler.rowner = false;
handler.fail = null;
export default handler;