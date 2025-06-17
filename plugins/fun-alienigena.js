
const handler = async (m, { conn}) => {
    const misiones = [
        { nombre: "⚔️ Defensa Global", reto: "Debes organizar una estrategia para defender las ciudades más importantes del planeta."},
        { nombre: "🚀 Combate Espacial", reto: "Pilota una nave y destruye las flotas alienígenas antes de que lleguen a la Tierra."},
        { nombre: "🛸 Espionaje Alien", reto: "Infiltra una base extraterrestre y obtén información sobre sus planes."},
        { nombre: "🔮 Tecnología Perdida", reto: "Encuentra artefactos antiguos que pueden ser la clave para salvar el planeta."},
        { nombre: "💣 Ataque Final", reto: "Lidera un escuadrón en la última batalla contra la amenaza alienígena."}
    ];

    let mensaje = `👽 *Invasión Alienígena* 🚀\n\n📌 **Elige tu misión:**\n`;

    misiones.forEach((mision, i) => {
        mensaje += `🔹 ${i + 1}. ${mision.nombre} - ${mision.reto}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.alienGame = conn.alienGame || {};
    conn.alienGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.alienGame && conn.alienGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const misiones = [
            "⚔️ Defensa Global", "🚀 Combate Espacial", "🛸 Espionaje Alien",
            "🔮 Tecnología Perdida", "💣 Ataque Final"
        ];

        if (eleccion>= 1 && eleccion <= misiones.length) {
            const misionSeleccionada = misiones[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.alienGame[m.chat] = { nombre: usuario, mision: misionSeleccionada};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${misionSeleccionada}\n⌛ Preparándose para la batalla intergaláctica...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has cumplido tu misión y salvado la Tierra!",
                    "💀 Los alienígenas fueron demasiado fuertes... misión fallida.",
                    "⚔️ Fue una batalla difícil, pero lograste resistir el ataque.",
                    "🔥 Tu inteligencia permitió obtener información clave sobre los extraterrestres.",
                    "💢 Lo intentaste, pero la invasión sigue avanzando."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `👽 *Invasión Alienígena* 🚀\n\n👤 *Jugador:* ${usuario}\n🛸 *Misión elegida:* ${misionSeleccionada}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.alienGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 5.*", m);
}
}
};

handler.command = ["alienigena"];
export default handler;