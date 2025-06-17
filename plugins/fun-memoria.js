
const timeout = 30000; // 30 segundos para responder

const handler = async (m, { conn}) => {
    const emojis = ["🔥", "🌟", "💎", "🎲", "🚀", "🎮", "🏆", "🧠", "⚡", "🎭"];
    const seleccionados = [];

    // Generar una secuencia de 4 a 6 emojis aleatorios
    for (let i = 0; i < Math.floor(Math.random() * 3) + 4; i++) {
        seleccionados.push(emojis[Math.floor(Math.random() * emojis.length)]);
}

    const secuencia = seleccionados.join(" ");
    conn.memoriaGame = conn.memoriaGame || {};
    conn.memoriaGame[m.chat] = {
        secuencia,
        timeout: setTimeout(() => {
            if (conn.memoriaGame[m.chat]) {
                conn.reply(m.chat, `⏳ *Tiempo agotado!* La secuencia era: *${secuencia}*`, m);
                delete conn.memoriaGame[m.chat];
}
}, timeout),
};

    await conn.reply(m.chat, `🧠 *Juego de Memoria*\n\n📌 Recuerda esta secuencia y repítela:\n➡️ *${secuencia}*\n⏳ Tienes *30 segundos* para escribirla correctamente.`, m);
};

handler.before = async (m, { conn}) => {
    if (conn.memoriaGame && conn.memoriaGame[m.chat]) {
        const respuesta = m.text.trim();
        if (respuesta === conn.memoriaGame[m.chat].secuencia) {
            clearTimeout(conn.memoriaGame[m.chat].timeout);
            delete conn.memoriaGame[m.chat];

            return conn.reply(m.chat, `🎉 ¡Correcto! Tienes una excelente memoria.`, m);
} else {
            return conn.reply(m.chat, `❌ *Incorrecto.* Inténtalo de nuevo.`, m);
}
}
};

handler.command = ["memoria"];
export default handler;