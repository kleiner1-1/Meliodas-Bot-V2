
const handler = async (m, { conn}) => {
    const escenarios = [
        {
            descripcion: "🧟‍♂️ *Estás atrapado en una ciudad infestada de zombis.* Solo tienes un bate de béisbol y pocas provisiones.",
            opciones: ["Buscar un refugio seguro", "Atacar a los zombis", "Correr sin dirección"],
            destino: ["✅ Encuentras una tienda abandonada y consigues comida.", "💀 Los zombis te superan en número. No sobrevives.", "❌ Corres, pero te pierdes y acabas rodeado."]
},
        {
            descripcion: "🚗 *Encuentras un automóvil abandonado con poca gasolina.* Hay tres direcciones posibles.",
            opciones: ["Ir hacia la ciudad", "Tomar el camino hacia el bosque", "Dirigirse al puente destruido"],
            destino: ["❌ La ciudad está infestada. Es peligroso seguir adelante.", "✅ En el bosque hay una zona segura con más sobrevivientes.", "💀 El puente colapsa y quedas atrapado."]
},
        {
            descripcion: "🏚️ *Te refugias en una casa abandonada y escuchas ruidos extraños.*",
            opciones: ["Explorar el sótano", "Cerrar todas las puertas y esperar", "Salir de inmediato"],
            destino: ["💀 En el sótano hay zombis esperando. No sobrevives.", "✅ La casa es segura y puedes pasar la noche.", "❌ Afuera hay más zombis de los que pensabas."]
}
    ];

    const escenario = escenarios[Math.floor(Math.random() * escenarios.length)];

    let mensaje = `🧟‍♂️ *Modo Zombie* 🧟‍♂️\n\n📜 *Situación:* ${escenario.descripcion}\n\n`;
    escenario.opciones.forEach((opcion, i) => {
        mensaje += `🔹 ${i + 1}. ${opcion}\n`;
});

    mensaje += "\n📌 *Responde con el número de la opción que elijas.*";

    conn.zombieGame = conn.zombieGame || {};
    conn.zombieGame[m.chat] = {
        destino: escenario.destino
};

    await conn.sendMessage(m.chat, { text: mensaje});
};

handler.before = async (m, { conn}) => {
    if (conn.zombieGame && conn.zombieGame[m.chat]) {
        const respuesta = parseInt(m.text.trim());
        const destino = conn.zombieGame[m.chat].destino;

        if (respuesta>= 1 && respuesta <= destino.length) {
            delete conn.zombieGame[m.chat];
            return conn.reply(m.chat, destino[respuesta - 1], m);
} else {
            return conn.reply(m.chat, `❌ *Opción no válida. Intenta con un número entre 1 y ${destino.length}.*`, m);
}
}
};

handler.command = ["zombie"];
export default handler;