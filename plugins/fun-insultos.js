const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {
  //conn.reply(m.chat, `${emoji2} Buscando un insulto, espere un momento...`, m, rcanal)

  conn.reply(m.chat, `*┏━━━━━━━🔥━━━━━━━┓*\n\n» *"${pickRandom(global.insultos)}"*\n\n*┗━━━━━━━🔥━━━━━━━┛*`, m, rcanal);
}

handler.help = ['insulto']
handler.tags = ['fun']
handler.command = ['insulto']
handler.fail = null
handler.exp = 0
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.insultos = [
  "Tu existencia es la prueba de que los errores también caminan.",
  "Ni tu sombra quiere seguirte.",
  "Ojalá te vieras como te escuchas... así al menos te darías asco tú también.",
  "Tus padres debieron haber cerrado esa puerta con más fuerza.",
  "Hablas como si tu opinión importara, y eso es adorablemente triste.",
  "No eres una decepción... eres una advertencia para otros.",
  "Hasta el silencio te supera en inteligencia.",
  "La única vez que fuiste importante fue cuando fuiste un problema para alguien.",
  "Si fueras un recuerdo, serías un trauma.",
  "El aire se contamina más cuando hablas.",
  "Eres la razón por la que algunos prefieren a los animales sobre las personas.",
  "No te odio, pero ojalá nunca hubieras existido.",
  "Estás tan vacío que podrías servir de envase.",
  "Ni el karma se mete contigo porque sabe que la vida ya te está castigando.",
  "Tu vida es tan gris que hasta la tristeza se aburre contigo.",
  "Ojalá pudieras ver lo inútil que te vuelves cuando tratas de encajar.",
  "Si fueras una emoción, serías decepción.",
  "Tu cara no es lo peor... es tu forma de ser.",
  "Cuando mueras, lo único que extrañarán será el silencio.",
  "Ni el fracaso te quiere cerca porque le arruinas la reputación.",
  "Si tus lágrimas supieran lo poco que importas, dejarían de salir.",
  "Tu ausencia sería el mejor regalo que podrías dar.",
  "Hasta tus errores quieren olvidarte.",
  "Cuando respiras, desperdicias oxígeno que otra persona valiosa podría usar.",
  "Tienes tanta presencia como un fantasma olvidado."
]