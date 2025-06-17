
const handler = async (m, { conn}) => {
    const hechiceros = [
        { nombre: "🔮 Archimago", ventaja: "Control total de los elementos mágicos."},
        { nombre: "🔥 Hechicero Infernal", ventaja: "Dominio de fuego con ataques devastadores."},
        { nombre: "🌪️ Mago del Viento", ventaja: "Rapidez y capacidad de esquivar ataques."},
        { nombre: "🌊 Guardián de Agua", ventaja: "Defensa con habilidades regenerativas."},
        { nombre: "⚡ Maestro del Trueno", ventaja: "Ataques explosivos con electricidad."},
        { nombre: "🖤 Nigromante", ventaja: "Invoca espíritus y absorbe energía de sus rivales."}
    ];

    let mensaje = `🔮 *Dueño de Magia* 🔮\n\n📌 **Elige tu hechicero para la batalla:**\n`;

    hechiceros.forEach((hechicero, i) => {
        mensaje += `🔹 ${i + 1}. ${hechicero.nombre} - ${hechicero.ventaja}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.magicBattleGame = conn.magicBattleGame || {};
    conn.magicBattleGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.magicBattleGame && conn.magicBattleGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const hechiceros = [
            "🔮 Archimago", "🔥 Hechicero Infernal", "🌪️ Mago del Viento", "🌊 Guardián de Agua",
            "⚡ Maestro del Trueno", "🖤 Nigromante"
        ];

        if (eleccion>= 1 && eleccion <= hechiceros.length) {
            const hechiceroSeleccionado = hechiceros[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.magicBattleGame[m.chat] = { nombre: usuario, hechicero: hechiceroSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${hechiceroSeleccionado}\n⌛ Preparándose para la batalla mágica...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has lanzado un hechizo legendario y ganaste la batalla!",
                    "💀 Tu energía mágica se agotó y fuiste derrotado.",
                    "⚔️ Fue un empate, ambos hechiceros demostraron gran poder.",
                    "🔥 Lograste una victoria ajustada, pero tu magia quedó debilitada.",
                    "💢 Tu hechizo fue fuerte, pero tu rival resistió hasta el final."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🔮 *Batalla de Magia* 🔮\n\n👤 *Jugador:* ${usuario}\n✨ *Hechicero seleccionado:* ${hechiceroSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.magicBattleGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 6.*", m);
}
}
};

handler.command = ["magia"];
export default handler;