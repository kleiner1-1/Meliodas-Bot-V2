
const handler = async (m, { conn}) => {
    const escenarios = [
        {
            descripcion: "Te encuentras perdido en un bosque oscuro sin provisiones.",
            opciones: ["Buscar refugio en una cueva", "Seguir un río para encontrar salida", "Encender fuego para llamar la atención"],
            destino: ["🔥 Te refugias en la cueva y sobrevives.", "✅ Sigues el río y encuentras una salida.", "💀 Tu fuego atrae depredadores. Mueres."]
},
        {
            descripcion: "Tu barco se hundió y llegaste a una isla desierta.",
            opciones: ["Construir un refugio", "Buscar comida primero", "Explorar la isla"],
            destino: ["✅ Construyes un refugio y sobrevives.", "💀 Te adentras en la selva y te pierdes sin agua.", "🔥 Encuentras un volcán activo y escapas por poco."]
},
        {
            descripcion: "Estás atrapado en una ciudad abandonada después de un desastre.",
            opciones: ["Buscar provisiones en un supermercado", "Refugiarse en un edificio alto", "Tratar de contactar a sobrevivientes"],
            destino: ["💀 El supermercado es peligroso, mueres atrapado.", "✅ Encuentras seguridad en el edificio y sobrevives.", "🔥 Contactas sobrevivientes y organizan una salida."]
},
        {
            descripcion: "Eres un astronauta atrapado en una nave averiada en el espacio.",
            opciones: ["Reparar sistemas eléctricos", "Lanzar señal de emergencia", "Usar oxígeno para explorar afuera"],
            destino: ["✅ Reparas la nave y escapas con vida.", "💀 Nadie responde tu señal y tu oxígeno se acaba.", "🔥 Encuentras ayuda externa y sobrevives."]
},
        {
            descripcion: "Te despiertas en un desierto sin señales de vida.",
            opciones: ["Caminar hasta encontrar un oasis", "Enterrarte parcialmente en la arena para conservar energía", "Buscar rocas como refugio"],
            destino: ["💀 Caminas sin rumbo y mueres deshidratado.", "✅ Conservas energía y logras sobrevivir hasta la noche.", "🔥 Encuentras refugio y sobrevives."]
},
        {
            descripcion: "Una tormenta de nieve te atrapa en una montaña sin refugio cercano.",
            opciones: ["Construir un iglú improvisado", "Descender rápido sin protección", "Encender una fogata con los materiales disponibles"],
            destino: ["✅ Te refugias en el iglú y sobrevives.", "💀 Desciendes y caes por un acantilado.", "🔥 La fogata te mantiene vivo hasta que pasa la tormenta."]
}
    ];

    const escenario = escenarios[Math.floor(Math.random() * escenarios.length)];

    let mensaje = `🔥 *Modo Supervivencia* 🔥\n\n📜 *Situación:* ${escenario.descripcion}\n\n`;
    escenario.opciones.forEach((opcion, i) => {
        mensaje += `🔹 ${i + 1}. ${opcion}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.survivalGame = conn.survivalGame || {};
    conn.survivalGame[m.chat] = {
        destino: escenario.destino
};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.survivalGame && conn.survivalGame[m.chat]) {
        const respuesta = parseInt(m.text.trim());
        const destino = conn.survivalGame[m.chat].destino;

        if (respuesta>= 1 && respuesta <= destino.length) {
            delete conn.survivalGame[m.chat];
            return conn.reply(m.chat, destino[respuesta - 1], m);
} else {
            return conn.reply(m.chat, `❌ *Opción no válida. Intenta con un número entre 1 y ${destino.length}.*`, m);
}
}
};

handler.command = ["supervivencia"];
export default handler;