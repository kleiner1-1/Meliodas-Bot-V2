// © Deylin 

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
  { pais: "Orgullo bisexual", emoji: "⚧" }, 
  { pais: "ONU", emoji: "🇺🇳" },
  { pais: "Palestina", emoji: "🇵🇸" },
  { pais: "Ucrania", emoji: "🇺🇦" }
]

const juegoBanderas = new Map()

function elegirBanderaAleatoria() {
  return banderas[Math.floor(Math.random() * banderas.length)]
}

let handler = async (m, { conn }) => {
  if (juegoBanderas.has(m.sender)) {
    return conn.reply(m.chat, "Ya tienes un juego en curso. ¡Responde primero!", m)
  }

  const seleccionada = elegirBanderaAleatoria()
  juegoBanderas.set(m.sender, { pais: seleccionada.pais.toLowerCase(), intentos: 2 })

  let text = `🎌 *Adivina la bandera:*\n\n» ${seleccionada.emoji}\n\n*Responde con el nombre del país.*\nTienes 2 corazones ❤️❤️`
  conn.reply(m.chat, text, m, rcanal)
}

handler.before = async (m, { conn }) => {
  const juego = juegoBanderas.get(m.sender)
  if (!juego) return

  if (m.text.toLowerCase() === juego.pais) {
    let expGanada = juego.pais.length >= 8
      ? Math.floor(Math.random() * 3500)
      : Math.floor(Math.random() * 300)

    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = { exp: 0 }
    }

    global.db.data.users[m.sender].exp += expGanada
    juegoBanderas.delete(m.sender)

    return conn.reply(m.chat, `✅ ¡Correcto! Adivinaste la bandera de *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}*\n\n*Has ganado:* ${expGanada} Exp. 🥳`, m, rcanal)
  } else {
    juego.intentos--
    if (juego.intentos <= 0) {
      juegoBanderas.delete(m.sender)
      return conn.reply(m.chat, `❌ Perdiste. La respuesta correcta era *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}*`, m, rcanal)
    } else {
      return conn.reply(m.chat, `❌ Incorrecto. Te quedan ${juego.intentos} corazón(es) ❤️`, m, rcanal)
    }
  }
}

handler.help = ['adivinabandera', 'banderas', 'union']
handler.tags = ['game']
handler.command = ['adivinabandera', 'banderas', 'union']
handler.register = true

export default handler