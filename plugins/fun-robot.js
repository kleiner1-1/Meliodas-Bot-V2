
const handler = async (m, { conn}) => {
    const robots = [
        { nombre: "🤖 Titan-X", ventaja: "Ataque poderoso pero lento."},
        { nombre: "⚡ ElectroBot", ventaja: "Ataques rápidos con electricidad."},
        { nombre: "🛡️ IronGuard", ventaja: "Defensa máxima contra golpes."},
        { nombre: "🔥 PyroMech", ventaja: "Lanza fuego en sus ataques."},
        { nombre: "🔮 NanoDrone", ventaja: "Tecnología avanzada con ataques precisos."},
        { nombre: "🔧 MechaFix", ventaja: "Puede reparar daños en combate."}
    ];

    let mensaje = `🤖 *Pelea de Robots* 🤖\n\n📌 **Elige tu robot para la batalla:**\n`;

    robots.forEach((robot, i) => {
        mensaje += `🔹 ${i + 1}. ${robot.nombre} - ${robot.ventaja}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.robotFightGame = conn.robotFightGame || {};
    conn.robotFightGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.robotFightGame && conn.robotFightGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const robots = [
            "🤖 Titan-X", "⚡ ElectroBot", "🛡️ IronGuard", "🔥 PyroMech",
            "🔮 NanoDrone", "🔧 MechaFix"
        ];

        if (eleccion>= 1 && eleccion <= robots.length) {
            const robotSeleccionado = robots[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.robotFightGame[m.chat] = { nombre: usuario, robot: robotSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${robotSeleccionado}\n⌛ Preparándose para la batalla...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has ganado la pelea con una estrategia increíble!",
                    "💀 Tu robot ha sido destruido en combate.",
                    "⚔️ Fue un empate, ambos robots demostraron gran fuerza.",
                    "🔥 Lograste una victoria ajustada, pero quedaste dañado.",
                    "💢 Tu ataque fue feroz, pero tu rival resistió hasta el final."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🤖 *Batalla de Robots* 🤖\n\n👤 *Jugador:* ${usuario}\n⚔️ *Robot:* ${robotSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.robotFightGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 6.*", m);
}
}
};

handler.command = ["robotp"];
export default handler;
