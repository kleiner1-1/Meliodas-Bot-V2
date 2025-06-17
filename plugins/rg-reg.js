
import { createHash} from 'crypto';

let handler = async (m, { conn, text, usedPrefix, command}) => {
    let regFormat = /^([^\s]+)\.(\d+)\.(\w+)$/i;
    let userDB = global.db.data.users[m.sender];
    let imageUrl = 'https://files.catbox.moe/ltq7ph.jpg';

    if (userDB?.registered) {
        return m.reply(`✅ Ya estás registrado.\nSi deseas eliminar tu registro, usa: *${usedPrefix}unreg*`);
}

    if (!regFormat.test(text)) {
        return m.reply(`❌ Formato incorrecto.\nUsa: *${usedPrefix + command} Nombre.Edad.País*\nEjemplo: *${usedPrefix + command} Barboza.18.Venezuela*`);
}

    let [_, name, age, country] = text.match(regFormat);
    age = parseInt(age);

    if (!name || name.length> 50) return m.reply('❌ Nombre inválido o demasiado largo.');
    if (isNaN(age) || age < 5 || age> 100) return m.reply('❌ Edad no válida.');
    if (!country || country.length> 30) return m.reply('❌ País inválido o demasiado largo.');

    let userHash = createHash('md5').update(m.sender).digest('hex');

    global.db.data.users[m.sender] = {
        name,
        age,
        country,
        registered: true,
        regTime: Date.now(),
        id: userHash
};

    let confirmMsg = `🎉 *Registro exitoso!*\n\n📂 Tus datos:\n👤 *Nombre:* ${name}\n🎂 *Edad:* ${age} años\n🌍 *País:* ${country}\n🆔 *Código:* ${userHash}`;

    await conn.sendMessage(m.chat, {
        image: { url: imageUrl},
        caption: confirmMsg
});

    await conn.sendMessage(m.chat, {
        text: `✅ *Verificación completada!*\n\nTu registro ha sido validado y guardado correctamente.`,
});
};

handler.help = ['registrar <nombre.edad.país>'];
handler.tags = ['registro'];
handler.command = ['registrar', 'reg'];

export default handler;