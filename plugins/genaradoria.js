*Codigo para generar imágenes con IA no quites créditos*

_____________________________________


/* Código creado por Bajo Bots y API también
https://github.com/kleiner1-1
  no quites créditos 
 Atte: Bajo-Bots*/



let handler = async (m, { text, conn }) => {


  if (!text) {
    return await conn.reply(m.chat, `⚡ Escribe el prompt de la imagen. Ejemplo:\n.imagina un dragón azul volando en el espacio`, m)
  }

  await conn.reply(m.chat, `⚡ Generando imagen de: "${text}", espera un momento...`, m)

  try {
    let prompt = encodeURIComponent(text.trim())
    let imageUrl = `https://anime-xi-wheat.vercel.app/api/ia-img?prompt=${prompt}`

    await conn.sendFile(m.chat, imageUrl, 'imagen.jpg', `🧃 Imagen generada:\n"${text}"`, m)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Ocurrió un error al generar la imagen:\n${e.message}`)
  }
}

handler.help = ['imagina <prompt>']
handler.tags = ['ia'];
handler.command = ['imgrg', 'imagina']

export default handler