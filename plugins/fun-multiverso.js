
const handler = async (m, { conn}) => {
    const misiones = [
        { nombre: "🌍 Mundo Espejo", reto: "Te enfrentas a una versión oscura de la Tierra donde los humanos están aliados con los alienígenas."},
        { nombre: "🌀 Dimensión Perdida", reto: "Encuentra la puerta secreta para viajar entre mundos sin ser atrapado."},
        { nombre: "⚔️ Choque de Civilizaciones", reto: "Las fuerzas de otro universo han invadido tu realidad. ¡Lucha para recuperar tu mundo!"},
        { nombre: "🔮 Tecnología Multiversal", reto: "Descifra el código de una máquina que puede cambiar el destino de todas las dimensiones."},
        { nombre: "💣 Última Guerra Cósmica", reto: "El equilibrio del multiverso está en juego. Solo los más fuertes podrán resistir."}
    ];

    let mensaje = `🌌 *Batalla por el Multiverso* 🚀⚔️\n\n📌 **Elige tu misión:**\n`;

    misiones.forEach((mision, i) => {
        mensaje += `🔹 ${i + 1}. ${mision.nombre} - ${mision.reto}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.multiverseGame = conn.multiverseGame || {};
    conn.multiverseGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.multiverseGame && conn.multiverseGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const misiones = [
            "🌍 Mundo Espejo", "🌀 Dimensión Perdida", "⚔️ Choque de Civilizaciones",
            "🔮 Tecnología Multiversal", "💣 Última Guerra Cósmica"
        ];

        if (eleccion>= 1 && eleccion <= misiones.length) {
            const misionSeleccionada = misiones[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.multiverseGame[m.chat] = { nombre: usuario, mision: misionSeleccionada};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${misionSeleccionada}\n⌛ Preparándose para viajar entre dimensiones...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has ganado la batalla y el multiverso está a salvo!",
                    "💀 Fallaste en tu misión y el equilibrio del multiverso se ha roto.",
                    "⚔️ Lograste sobrevivir, pero los daños han sido irreparables.",
                    "🔥 Descubriste tecnología avanzada, pero no fue suficiente para detener el caos.",
                    "💢 La guerra continúa... pero has logrado cambiar el destino de tu dimensión."
                ];

                let probabilidad = Math.random();
                let desenlace;
                if (probabilidad < 0.6) {
                    desenlace = resultado[Math.floor(Math.random() * 3) + 1]; // Mayor probabilidad de perder
} else {
                    desenlace = resultado[0]; // Menor probabilidad de ganar
}

                let mensajeFinal = `🌌 *Batalla por el Multiverso* 🚀⚔️\n\n👤 *Jugador:* ${usuario}\n🌀 *Misión elegida:* ${misionSeleccionada}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.multiverseGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 5.*", m);
}
}
};

handler.command = ["multiverso"];
export default handler;