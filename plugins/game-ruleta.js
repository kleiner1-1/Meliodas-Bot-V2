
const handler = async (m, { conn, participants }) => {
    if (!m.isGroup) return m.reply("❌ *Este comando solo puede usarse en grupos.*");

    if (!participants || participants.length === 0) return m.reply("⚠️ *No hay suficientes participantes para la ruleta.*");

    const miembros = participants.filter(p => !p.admin && p.id);
    if (miembros.length === 0) return m.reply("⚠️ *No hay suficientes miembros no administradores para jugar.*");

    const ganador = miembros[Math.floor(Math.random() * miembros.length)];
    const nombreGanador = await conn.getName(ganador.id);

    await m.reply(`
🎰 **¡La ruleta ha girado!** 🎰  
🏆 *Felicitaciones, ${nombreGanador}! Eres el ganador.*  
🎊 Disfruta tu victoria y compártela con el grupo!
`, false, { mentions: [ganador.id] });
};

handler.command = ['ruleta'];
export default handler;

