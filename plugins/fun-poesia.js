let poesías = [
    `🌟✨ *Poesía para ti* ✨🌟\n\nEn el jardín de la vida, florece el amor,\ncada pétalo es un susurro, un dulce clamor.\nLas estrellas brillan en la noche serena,\ny en cada latido, tú eres la vena.`,
    `🌈 *Verso de esperanza* 🌈\n\nCuando la tormenta oscurece el cielo,\nrecuerda que siempre hay un destello.\nLas nubes se van y vuelve el sol,\nbrillando en tu vida con todo su rol.`,
    `🍃 *Susurros del viento* 🍃\n\nEl viento sopla suave entre los árboles,\nsusurra secretos que nunca son inalcanzables.\nCada hoja que cae tiene su razón,\ny en cada cambio, hay una canción.`,
    `🌹 *Reflejo del alma* 🌹\n\nEn el espejo del alma brilla la verdad,\nun reflejo sincero de nuestra humanidad.\nCada lágrima caída es un paso más,\nen este viaje eterno hacia la paz.`,
    `🦋 *Danza de mariposas* 🦋\n\nLas mariposas juegan en un baile sutil,\ncolores que pintan el aire febril.\nCada aleteo cuenta historias de amor,\nsusurros de vida en un mundo mejor.`,
    `🌌 *Noche estrellada* 🌌\n\nLa noche se viste con su manto estelar,\ncada estrella es un sueño por realizar.\nMira hacia arriba y deja volar tu ser,\npues en cada constelación hay algo por aprender.`,
    `☀️ *Renacer* ☀️\n\nComo el sol que se asoma tras la tempestad,\nrenacemos con fuerza y con dignidad.\nCada día es una página nueva a escribir,\ncon tinta de sueños y ganas de vivir.`
];

async function handler(m, { conn, usedPrefix }) {
    let userId = m.sender;
    if (!global.usedPoesias) global.usedPoesias = {};
    if (!global.usedPoesias[userId]) global.usedPoesias[userId] = 0;

    let index = global.usedPoesias[userId];

    if (index < poesías.length) {
        const buttons = [
            {
                buttonId: `${usedPrefix}poesía`,
                buttonText: { displayText: "💌 Poesía" },
                type: 1
            }
        ];

        await conn.sendMessage(
            m.chat,
            {
                text: poesías[index],
                buttons: buttons,
                viewOnce: true
            },
            { quoted: m }
        );

        global.usedPoesias[userId] += 1;
    } else {
        await conn.sendMessage(m.chat, { text: "Ya has recibido todas las poesías disponibles. ¡Intenta más tarde!" }, { quoted: m });
    }
}

handler.help = ['poesía'];
handler.tags = ['arte'];
handler.command = ['poesía'];

export default handler;