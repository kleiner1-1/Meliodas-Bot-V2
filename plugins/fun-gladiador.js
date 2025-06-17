const handler = async (m, { conn}) => {
    const estilosCombate = [
        { nombre: "🛡️ Defensivo", ventaja: "Resiste mejor los ataques enemigos."},
        { nombre: "⚔️ Agresivo", ventaja: "Hace más daño al atacar."},
        { nombre: "🏹 Estratégico", ventaja: "Mayor probabilidad de esquivar ataques."},
        { nombre: "🦍 Bestia", ventaja: "Golpes brutales, pero menos precisión."},
        { nombre: "🔮 Místico", ventaja: "Utiliza tácticas engañosas y ataques impredecibles."},
        { nombre: "🗡️ Equilibrado", ventaja: "Buena combinación de defensa y ataque."},
        { nombre: "🔥 Berserker", ventaja: "Sacrifica defensa por poder máximo en ataque."},
        { nombre: "🌀 Acrobático", ventaja: "Alta movilidad para esquivar y atacar rápidamente."},
        { nombre: "☠️ Destructor", ventaja: "Golpes devastadores que pueden acabar rápido la pelea."},
        { nombre: "🐉 Dragón", ventaja: "Poder legendario con ataques elementales de fuego."},
        { nombre: "🦂 Venenoso", ventaja: "Infecta al enemigo con ataques dañinos a largo plazo."},
        { nombre: "🌪️ Huracán", ventaja: "Ataques rápidos en sucesión para desgastar al enemigo."},
        { nombre: "👁️ Ilusorio", ventaja: "Confunde al rival con tácticas impredecibles."}
    ];

    let mensaje = `🏛️ *Modo Gladiador* 🏛️\n\n📌 **Elige tu estilo de combate:**\n`;

    estilosCombate.forEach((estilo, i) => {
        mensaje += `🔹 ${i + 1}. ${estilo.nombre} - ${estilo.ventaja}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.gladiadorGame = conn.gladiadorGame || {};
    conn.gladiadorGame[m.chat] = {};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.gladiadorGame && conn.gladiadorGame[m.chat]) {
        const eleccion = parseInt(m.text.trim());
        const estilosCombate = [
            "🛡️ Defensivo", "⚔️ Agresivo", "🏹 Estratégico", "🦍 Bestia", "🔮 Místico",
            "🗡️ Equilibrado", "🔥 Berserker", "🌀 Acrobático", "☠️ Destructor", "🐉 Dragón",
            "🦂 Venenoso", "🌪️ Huracán", "👁️ Ilusorio"
        ];

        if (eleccion>= 1 && eleccion <= estilosCombate.length) {
            const estiloSeleccionado = estilosCombate[eleccion - 1];
            const usuario = conn.getName(m.sender);
            conn.gladiadorGame[m.chat] = { nombre: usuario, estilo: estiloSeleccionado};

            await conn.reply(m.chat, `✅ *${usuario} ha elegido:* ${estiloSeleccionado}\n⌛ Preparándose para la batalla...`, m);

            setTimeout(() => {
                const resultado = [
                    "🏆 ¡Has vencido en la arena con un increíble desempeño!",
                    "💀 Has sido derrotado en combate, pero volverás más fuerte.",
                    "⚔️ Fue un empate, ambos gladiadores demostraron gran habilidad.",
                    "🔥 Lograste una victoria arriesgada, pero quedaste muy debilitado.",
                    "💢 Tu ataque fue feroz, pero tu rival resistió hasta el final."
                ];
                const desenlace = resultado[Math.floor(Math.random() * resultado.length)];

                let mensajeFinal = `🏛️ *Batalla en la Arena* 🏛️\n\n👤 *Gladiador:* ${usuario}\n⚔️ *Estilo de combate:* ${estiloSeleccionado}\n\n${desenlace}`;

                conn.sendMessage(m.chat, { text: mensajeFinal});

                delete conn.gladiadorGame[m.chat];
}, 5000);
} else {
            await conn.reply(m.chat, "❌ *Opción inválida. Elige un número entre 1 y 13.*", m);
}
}
};

handler.command = ["gladiador"];
export default handler;