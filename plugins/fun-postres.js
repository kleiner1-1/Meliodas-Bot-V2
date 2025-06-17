
const handler = async (m, { conn}) => {
    const postres = [
        { nombre: "🍰 Pastel de Chocolate", ventaja: "Textura suave y un sabor irresistible."},
        { nombre: "🎂 Tarta de Frutas", ventaja: "Frescura y equilibrio con una mezcla de frutas."},
        { nombre: "🍩 Donas Rellenas", ventaja: "Dulces y con relleno sorpresa."},
        { nombre: "🍪 Galletas Artesanales", ventaja: "Crujientes por fuera y suaves por dentro."},
        { nombre: "🍮 Flan de Caramelo", ventaja: "Postre cremoso con un toque de caramelo dorado."},
        { nombre: "🍦 Helado Gourmet", ventaja: "Sabor único con una presentación sofisticada."}
    ];

    let mensaje = `🍰 *Competencia de Postres* 🍰\n\n📌 **Elige el postre que prepararás para la competencia:**\n`;

    postres.forEach((postre, i) => {
        mensaje += `🔹 ${i + 1}. ${postre.nombre} - ${postre.ventaja}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.dessertBattleGame = conn.dessertBattleGame || {};
    conn.dessertBattleGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.dessertBattleGame && conn.dessertBattleGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const postres = [
            "🍰 Pastel de Chocolate", "🎂 Tarta de Frutas", "🍩 Donas Rellenas",
            "🍪 Galletas Artesanales", "🍮 Flan de Caramelo", "🍦 Helado Gourmet"
        ];

        if (eleccion>= 1 && eleccion <= postres.length) {
            const postreSeleccionado = postres[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.dessertBattleGame[m.chat] = { nombre: usuario, postre: postreSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${postreSeleccionado}\n⌛ Preparándose para la competencia...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Tu postre fue un éxito y te coronaste como el mejor chef pastelero!",
                    "💀 Tu receta salió mal y los jueces no quedaron impresionados.",
                    "⚔️ Fue un empate, ambos postres estaban deliciosos.",
                    "🔥 Tu postre sorprendió, pero faltó un toque especial.",
                    "💢 Tu presentación fue buena, pero el sabor no convenció del todo."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🍰 *Competencia de Postres* 🍰\n\n👤 *Jugador:* ${usuario}\n🍽️ *Postre seleccionado:* ${postreSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.dessertBattleGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 6.*", m);
}
}
};

handler.command = ["postres"];
export default handler;