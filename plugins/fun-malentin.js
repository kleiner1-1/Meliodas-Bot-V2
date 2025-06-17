
const carteras = {}; // { userId: { monedas: 0, dulces: 0, xp: 0 } }

const handler = async (m) => {
    if (m.text.startsWith('.maleta')) {
        const usuarioId = m.sender; // Obtener el identificador del usuario
        const monedas = 20;
        const dulcesGanados = 10; // Cantidad de dulces ganados
        const xp = 100;

        // Si el usuario no tiene una cartera, inicialízala
        if (!carteras[usuarioId]) {
            carteras[usuarioId] = { monedas: 0, dulces: 0, xp: 0 };
        }

        // Sumar las recompensas a la cartera del usuario
        carteras[usuarioId].monedas += monedas;
        carteras[usuarioId].dulces += dulcesGanados; // Sumar los dulces ganados
        carteras[usuarioId].xp += xp;

        // Mensaje a enviar
        const mensaje = `🎒 *Maleta Abierta*\n\n¡Sorpresa! Has recibido:\n💰 ${monedas} Monedas\n🍬 ${dulcesGanados} Dulces ganados\n✨ ${xp} XP\n\n➤ ¡Disfruta tu recompensa!`;

        return m.reply(mensaje);
    }
};

handler.command = /^(maleta)$/i;