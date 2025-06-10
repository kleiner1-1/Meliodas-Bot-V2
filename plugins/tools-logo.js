//© Código hecho por Deylin  

import axios from 'axios';

const estilosDisponibles = [
    '3D', 'Winner', 'smurfs', 'wrooom', 'fabulous', 
    'fire', 'Fluffy', 'Glow', 'neon', 'summer', 
    'flaming', 'Retro'
];

async function generarLogo(estilo, texto, m, conn) {
    try {
        await conn.sendMessage(m.chat, { text: '⏳ Generando tu logo, espera un momento...' }, { quoted: m });

        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        await conn.sendMessage(m.chat, { 
            image: { url }, 
            caption: `${emoji} Resultado de *${texto}*` 
        }, { quoted: m });
    } catch (error) {
        console.error('Error al generar el logo:', error);
        await conn.sendMessage(m.chat, { 
            text: '${emoji6} Error al generar el logo. Prueba con otro estilo.' 
        }, { quoted: m });
    }
}

const handler = async (m, { conn, args, command }) => {
    if (command !== 'logo') {
        return conn.sendMessage(m.chat, { text: '${emoji} El comando no existe.' }, { quoted: m });
    }

    if (!args || args.length < 2) {
        const ejemplo = `${emoji} Ejemplo: /logo neon Kirito-Bot

Estilos disponibles:
- 3D
- Winner 
- smurfs 
- wrooom
- fabulous
- fire
- Fluffy 
- Glow
- neon
- summer
- flaming 
- Retro`;

        return conn.sendMessage(m.chat, { text: `${emoji} Uso incorrecto.\n\n${ejemplo}` }, { quoted: m });
    }

    const estilo = args[0].toLowerCase();
    const texto = args.slice(1).join(' ');

    if (!estilosDisponibles.map(e => e.toLowerCase()).includes(estilo)) {
        return conn.sendMessage(m.chat, { 
            text: `${emoji6} El estilo *${estilo}* no está disponible.\n\nEstilos disponibles:\n- ${estilosDisponibles.join('\n- ')}` 
        }, { quoted: m });
    }

    await generarLogo(estilo, texto, m, conn);
};

handler.help = ['logo'];
handler.tags = ['fun'];
handler.command = ['logo'];
handler.group = true;

export default handler;