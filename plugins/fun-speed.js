
const handler = async (m, { conn}) => {
    const modos = [
        { nombre: "🚥 Carrera Nocturna", reto: "Corre en la oscuridad con solo pequeños destellos de luz iluminando el camino."},
        { nombre: "🌪️ Carrera Extrema", reto: "Supera tormentas, terremotos y obstáculos impredecibles mientras intentas llegar a la meta."},
        { nombre: "🛑 Carrera de Eliminación", reto: "Cada cierto tiempo, el último corredor es eliminado hasta que solo quede uno."},
        { nombre: "💨 Derrapes de Fuego", reto: "Gana puntos haciendo los derrapes más espectaculares en curvas cerradas."},
        { nombre: "🔥 Ruta de Supervivencia", reto: "Esquiva explosiones, zonas de peligro y trampas antes de cruzar la meta."},
        { nombre: "🏎️ Desafío Turbo", reto: "Usa potenciadores en el momento correcto y alcanza velocidades extremas."},
        { nombre: "🕹️ Circuito Arcade", reto: "Corre en pistas con gráficos retro y potenciadores locos como turbo infinito."},
        { nombre: "🏰 Torneo Medieval", reto: "Caballos y carruajes compiten en terrenos accidentados inspirados en castillos y aldeas."},
        { nombre: "🎭 Ruta Caótica", reto: "Los corredores nunca saben qué obstáculos aparecerán en la pista."},
        { nombre: "🛸 Velocidad Intergaláctica", reto: "Compite en pistas fuera de la Tierra con gravedad cero y túneles espaciales."},
        { nombre: "🎲 Desafío Aleatorio", reto: "El tipo de carrera cambia cada vez, desde circuitos normales hasta desafíos extremos."}
    ];

    let mensaje = `🏁 *Zona de Velocidad Extrema* 🚀🔥\n\n📌 **Elige tu desafío:**\n`;

    modos.forEach((modo, i) => {
        mensaje += `🔹 ${i + 1}. ${modo.nombre} - ${modo.reto}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.speedGame = conn.speedGame || {};
    conn.speedGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.speedGame && conn.speedGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const modos = [
            "🚥 Carrera Nocturna", "🌪️ Carrera Extrema", "🛑 Carrera de Eliminación",
            "💨 Derrapes de Fuego", "🔥 Ruta de Supervivencia", "🏎️ Desafío Turbo",
            "🕹️ Circuito Arcade", "🏰 Torneo Medieval", "🎭 Ruta Caótica", "🛸 Velocidad Intergaláctica", "🎲 Desafío Aleatorio"
        ];

        if (eleccion>= 1 && eleccion <= modos.length) {
            const modoSeleccionado = modos[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.speedGame[m.chat] = { nombre: usuario, modo: modoSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${modoSeleccionado}\n⌛ Preparándose para la velocidad extrema...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has dominado la pista y eres el campeón!",
                    "💀 Perdiste el control y la competencia te superó.",
                    "⚔️ Fue un duelo intenso, pero lograste terminar en buena posición.",
                    "🔥 Sobreviviste al caos y llegaste a la meta.",
                    "💢 La carrera fue brutal y apenas conseguiste terminar."
                ];

                let desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🏁 *Zona de Velocidad Extrema* 🚀🔥\n\n👤 *Jugador:* ${usuario}\n🏎️ *Modo elegido:* ${modoSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.speedGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 11.*", m);
}
}
};

handler.command = ["speed"];
export default handler;
