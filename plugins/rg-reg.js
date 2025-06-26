let usersTempRegister = {};

let handler = async (m, { conn, text, command}) => {
  const id = m.sender;
  const user = global.db.data.users[id];

  if (user?.registered) {
    return m.reply('✅ Ya estás registrado.\nPara eliminar tu registro, usa: *.unregister*');
}

  if (!usersTempRegister[id]) {
    usersTempRegister[id] = { step: 1};
    return m.reply('📝 ¿Cuál es tu *nombre*? (Máximo 30 caracteres)');
}

  const stage = usersTempRegister[id];
  if (stage.step === 1) {
    if (!text || text.length> 30) return m.reply('❌ Nombre inválido o muy largo. Intenta de nuevo.');
    stage.name = text.trim();
    stage.step = 2;
    return m.reply('🩸 ¿Cuál es tu *edad*? (Debe ser entre 5 y 100)');
}

  if (stage.step === 2) {
    let age = parseInt(text);
    if (isNaN(age) || age < 5 || age> 100) return m.reply('❌ Edad no válida. Intenta de nuevo.');
    stage.age = age;
    stage.step = 3;
    return m.reply('🌍 ¿De qué *país* eres? (Máx 30 caracteres)');
}

  if (stage.step === 3) {
    if (!text || text.length> 30) return m.reply('❌ País no válido o demasiado largo.');
    stage.country = text.trim();

    global.db.data.users[id] = {
      name: stage.name,
      age: stage.age,
      country: stage.country,
      registered: true,
      regTime: Date.now(),
      id: require('crypto').createHash('sha256').update(id).digest('hex')
};

    delete usersTempRegister[id];

    const response = `
🎊 *¡Registro completo!*

👤 *Nombre:* ${global.db.data.users[id].name}
🩸 *Edad:* ${global.db.data.users[id].age}
🌎 *País:* ${global.db.data.users[id].country}
🆔 *ID:* ${global.db.data.users[id].id.slice(0, 8)}...

Bienvenido(a) al sistema.
`.trim();

    return conn.sendMessage(m.chat, { text: response}, { quoted: m});
}
};

handler.command = ['reg'];
handler.tags = ['registro'];
handler.help = ['iniciarregistro'];
export default handler;
