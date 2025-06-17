const banderas = [
  { pais: "Honduras", emoji: "🇭🇳" },
  { pais: "México", emoji: "🇲🇽" },
  { pais: "Brasil", emoji: "🇧🇷" },
  { pais: "Argentina", emoji: "🇦🇷" },
  { pais: "Colombia", emoji: "🇨🇴" },
  { pais: "Chile", emoji: "🇨🇱" },
  { pais: "Perú", emoji: "🇵🇪" },
  { pais: "Venezuela", emoji: "🇻🇪" },
  { pais: "Uruguay", emoji: "🇺🇾" },
  { pais: "Bolivia", emoji: "🇧🇴" },
  { pais: "Guatemala", emoji: "🇬🇹" },
  { pais: "Nicaragua", emoji: "🇳🇮" },
  { pais: "Costa Rica", emoji: "🇨🇷" },
  { pais: "El Salvador", emoji: "🇸🇻" },
  { pais: "Panamá", emoji: "🇵🇦" },
  { pais: "Paraguay", emoji: "🇵🇾" },
  { pais: "Cuba", emoji: "🇨🇺" },
  { pais: "República Dominicana", emoji: "🇩🇴" },
  { pais: "Estados Unidos", emoji: "🇺🇸" },
  { pais: "Canadá", emoji: "🇨🇦" },
  { pais: "España", emoji: "🇪🇸" },
  { pais: "Francia", emoji: "🇫🇷" },
  { pais: "Alemania", emoji: "🇩🇪" },
  { pais: "Italia", emoji: "🇮🇹" },
  { pais: "Reino Unido", emoji: "🇬🇧" },
  { pais: "Portugal", emoji: "🇵🇹" },
  { pais: "Rusia", emoji: "🇷🇺" },
  { pais: "Noruega", emoji: "🇳🇴" },
  { pais: "Suecia", emoji: "🇸🇪" },
  { pais: "Finlandia", emoji: "🇫🇮" },
  { pais: "Países Bajos", emoji: "🇳🇱" },
  { pais: "Grecia", emoji: "🇬🇷" },
  { pais: "Irlanda", emoji: "🇮🇪" },
  { pais: "Japón", emoji: "🇯🇵" },
  { pais: "China", emoji: "🇨🇳" },
  { pais: "India", emoji: "🇮🇳" },
  { pais: "Corea del Sur", emoji: "🇰🇷" },
  { pais: "Vietnam", emoji: "🇻🇳" },
  { pais: "Filipinas", emoji: "🇵🇭" },
  { pais: "Indonesia", emoji: "🇮🇩" },
  { pais: "Tailandia", emoji: "🇹🇭" },
  { pais: "Arabia Saudita", emoji: "🇸🇦" },
  { pais: "Israel", emoji: "🇮🇱" },
  { pais: "Sudáfrica", emoji: "🇿🇦" },
  { pais: "Nigeria", emoji: "🇳🇬" },
  { pais: "Kenia", emoji: "🇰🇪" },
  { pais: "Egipto", emoji: "🇪🇬" },
  { pais: "Marruecos", emoji: "🇲🇦" },
  { pais: "Argelia", emoji: "🇩🇿" },
  { pais: "Australia", emoji: "🇦🇺" },
  { pais: "Nueva Zelanda", emoji: "🇳🇿" },
  { pais: "Fiyi", emoji: "🇫🇯" },
  { pais: "LGBT", emoji: "🏳️‍🌈" },
  { pais: "Orgullo trans", emoji: "🏳️‍⚧️" },
  { pais: "ONU", emoji: "🇺🇳" },
  { pais: "Palestina", emoji: "🇵🇸" },
  { pais: "Ucrania", emoji: "🇺🇦" }
];

const juegoBanderas = new Map();

function elegirBanderaAleatoria() {
  return banderas[Math.floor(Math.random() * banderas.length)];
}

let handler = async (m, { conn, usedPrefix }) => {
  if (juegoBanderas.has(m.sender)) {
    juegoBanderas.delete(m.sender);
  }
  const seleccionada = elegirBanderaAleatoria();
  juegoBanderas.set(m.sender, { pais: seleccionada.pais.toLowerCase(), intentos: 2 });
  const text = `🎌 Adivina la bandera:\n\n» ${seleccionada.emoji}\n\n*Responde con el nombre del país.*\nTienes 2 corazones ❤️❤️`;
  const buttons = [
    {
      buttonId: `${usedPrefix}adivinabandera`,
      buttonText: { displayText: "🔄 Siguiente bandera" },
      type: 1
    }
  ];
  await conn.sendMessage(
    m.chat,
    { text, buttons, viewOnce: true },
    { quoted: m,rcanal }
  );
};

handler.before = async (m, { conn, usedPrefix }) => {
  const juego = juegoBanderas.get(m.sender);
  if (!juego) return;
  const respuesta = m.text.trim().toLowerCase();
  if (respuesta === juego.pais) {
    juegoBanderas.delete(m.sender);
    const text = `¡Correcto! Adivinaste la bandera de *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}* 🥳`;
    const buttons = [
      {
        buttonId: `${usedPrefix}adivinabandera`,
        buttonText: { displayText: "🔄 Siguiente bandera" },
        type: 1
      }
    ];
    return await conn.sendMessage(
      m.chat,
      { text, buttons, viewOnce: true },
      { quoted: m,rcanal}
    );
  } else {
    juego.intentos--;
    if (juego.intentos <= 0) {
      juegoBanderas.delete(m.sender);
      const text = `❌ Perdiste. La respuesta correcta era *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}*`;
      const buttons = [
        {
          buttonId: `${usedPrefix}adivinabandera`,
          buttonText: { displayText: "🔄 Siguiente bandera" },
          type: 1
        }
      ];
      return await conn.sendMessage(
        m.chat,
        { text, buttons, viewOnce: true },
        { quoted: m }
      );
    } else {
      return await conn.sendMessage(
        m.chat,
        { text: `❌ Incorrecto. Te quedan ${juego.intentos} corazón(es) ❤️` },
        { quoted: m,rcanal}
      );
    }
  }
};

handler.help = ['adivinabandera'];
handler.tags = ['game'];
handler.command = ['adivinabandera'];
handler.group = true;
handler.register = true;

export default handler;