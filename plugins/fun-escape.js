
const timeout = 60000; // 60 segundos para resolver el acertijo

const handler = async (m, { conn}) => {
    const acertijos = [
        {
            descripcion: "🔐 *Estás atrapado en una habitación cerrada.* Hay una mesa con tres objetos: un libro, una vela y un espejo. Uno de ellos tiene una pista para la salida.",
            opciones: ["Revisar el libro", "Encender la vela", "Mirar el espejo"],
            respuestaCorrecta: 2,
            resultado: ["❌ No encuentras nada útil en el libro.", "❌ La vela solo ilumina, pero no revela pistas.", "✅ En el espejo aparece un código secreto que desbloquea la puerta."]
},
        {
            descripcion: "🚪 *La puerta está bloqueada con un número misterioso.* En la pared hay una secuencia: 2, 4, 8, 16,??",
            opciones: ["32", "20", "64"],
            respuestaCorrecta: 0,
            resultado: ["✅ La secuencia sigue duplicándose: 32 es la clave correcta.", "❌ 20 no tiene sentido con la progresión.", "❌ 64 es demasiado alto."]
},
        {
            descripcion: "🕵️‍♂️ *Hay un cuadro en la habitación con una firma sospechosa.* Un papel en el suelo dice 'La clave está en el arte'.",
            opciones: ["Examinar el marco", "Leer la firma del cuadro", "Romper el cuadro"],
            respuestaCorrecta: 1,
            resultado: ["❌ El marco está vacío.", "✅ La firma del artista contiene un código para desbloquear la salida.", "❌ Romper el cuadro solo deja trozos por todas partes."]
}
    ];

    const acertijoSeleccionado = acertijos[Math.floor(Math.random() * acertijos.length)];

    let mensaje = `🚪 *Escape Room Virtual* 🚪\n\n📜 *Escenario:* ${acertijoSeleccionado.descripcion}\n\n`;
    acertijoSeleccionado.opciones.forEach((opcion, i) => {
        mensaje += `🔹 ${i + 1}. ${opcion}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción correcta antes de que el tiempo se acabe!*";

    conn.escapeGame = conn.escapeGame || {};
    conn.escapeGame[m.chat] = {
        respuestaCorrecta: acertijoSeleccionado.respuestaCorrecta,
        resultado: acertijoSeleccionado.resultado,
        timeout: setTimeout(() => {
            if (conn.escapeGame[m.chat]) {
                conn.reply(m.chat, "⏰ *Tiempo agotado!* No lograste escapar a tiempo.", m);
                delete conn.escapeGame[m.chat];
}
}, timeout)
};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.escapeGame && conn.escapeGame[m.chat]) {
        const respuesta = parseInt(m.text.trim());
        const { respuestaCorrecta, resultado} = conn.escapeGame[m.chat];

        if (respuesta>= 1 && respuesta <= resultado.length) {
            delete conn.escapeGame[m.chat];
            return conn.reply(m.chat, resultado[respuesta - 1], m);
} else {
            return conn.reply(m.chat, `❌ *Opción no válida. Intenta con un número entre 1 y ${resultado.length}.*`, m);
}
}
};

handler.command = ["escape"];
export default handler;