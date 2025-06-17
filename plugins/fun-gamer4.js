
const handler = async (m, { conn}) => {
    const misiones = [
        "🛸 Explorar la galaxia perdida",
        "🎭 Resolver un misterio antiguo",
        "⚔️ Vencer al jefe supremo",
        "💎 Encontrar el tesoro oculto",
        "🧠 Superar un desafío mental"
    ];

    const misionElegida = misiones[Math.floor(Math.random() * misiones.length)];
    let mensaje = `🌍 *Misión Épica!* 🏹💡\n\n📌 *Tu desafío:* ${misionElegida}\n🎮 ¡Completa la misión para ganar puntos!`;

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.command = ["gamer"];
export default handler;