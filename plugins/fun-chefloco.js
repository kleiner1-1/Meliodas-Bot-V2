
const handler = async (m, { conn}) => {
    const caos = [
        { nombre: "🔥 La cocina está en llamas", reto: "Intenta cocinar mientras todo está ardiendo."},
        { nombre: "🌀 Ingredientes cambiantes", reto: "Los ingredientes se transforman en cosas inesperadas."},
        { nombre: "🎭 Cliente con demandas imposibles", reto: "Debes cumplir órdenes absurdas antes de que se enoje."},
        { nombre: "🚀 Utensilios voladores", reto: "Sartenes y cucharas salen disparadas por la cocina."},
        { nombre: "⚡ Robot cocinero descontrolado", reto: "Evita que el robot haga desastres con la comida."}
    ];

    let mensaje = `🍳 *Chef Loco* 🍳\n\n📌 **Elige el caos culinario que enfrentarás:**\n`;

    caos.forEach((evento, i) => {
        mensaje += `🔹 ${i + 1}. ${evento.nombre} - ${evento.reto}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.crazyChefGame = conn.crazyChefGame || {};
    conn.crazyChefGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.crazyChefGame && conn.crazyChefGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const caos = [
            "🔥 La cocina está en llamas", "🌀 Ingredientes cambiantes", "🎭 Cliente con demandas imposibles",
            "🚀 Utensilios voladores", "⚡ Robot cocinero descontrolado"
        ];

        if (eleccion>= 1 && eleccion <= caos.length) {
            const eventoSeleccionado = caos[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.crazyChefGame[m.chat] = { nombre: usuario, evento: eventoSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${eventoSeleccionado}\n⌛ La locura culinaria comienza en 3...2...1!`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Lograste sobrevivir al caos y cocinar un platillo increíble!",
                    "💀 El desastre fue demasiado y tu comida terminó en el suelo.",
                    "⚔️ Fue un empate, tu plato estaba decente pero el caos no ayudó.",
                    "🔥 Tu creatividad salvó el día, pero tu platillo es... interesante.",
                    "💢 Lo intentaste, pero la cocina estaba demasiado descontrolada."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🍳 *Chef Loco* 🍳\n\n👤 *Jugador:* ${usuario}\n🌀 *Caos culinario:* ${eventoSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.crazyChefGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 5.*", m);
}
}
};

handler.command = ["chefloco"];
export default handler;