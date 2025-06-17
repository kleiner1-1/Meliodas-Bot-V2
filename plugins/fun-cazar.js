import fetch from 'node-fetch'

const animales = [
  { name: 'conejo', size: 'small' },
  { name: 'ardilla', size: 'small' },
  { name: 'pato', size: 'small' },
  { name: 'liebre', size: 'small' },
  { name: 'zorro', size: 'medium' },
  { name: 'ciervo', size: 'medium' },
  { name: 'jabalí', size: 'medium' },
  { name: 'lince', size: 'medium' },
  { name: 'búho', size: 'small' },
  { name: 'lobo', size: 'large' },
  { name: 'oso', size: 'large' },
  { name: 'tigre', size: 'large' },
  { name: 'león', size: 'large' },
  { name: 'dragón', size: 'rare' },
  { name: 'fénix', size: 'rare' },
  { name: 'quiróptero', size: 'rare' },
  { name: 'hipogrifo', size: 'rare' },
  { name: 'centauro', size: 'rare' },
  { name: 'minotauro', size: 'rare' },
  { name: 'quimera', size: 'rare' }
]

export const handler = async (m, { conn, usedPrefix, command }) => {
  await conn.sendMessage(m.chat, { react: { text: '🏹', key: m.key } })
  
  const tiempoCaza = Math.floor(Math.random() * (40 - 10 + 1)) + 10
  await conn.reply(m.chat, `🏹 Disparaste Tu Fleca... Espera ${tiempoCaza} Segundos a Ver Si Le Diste A Algo .`, m)

  setTimeout(async () => {
    const animal = animales[Math.floor(Math.random() * animales.length)]
    
    let minReward, maxReward
    if (animal.size === 'small') {
      minReward = 10; maxReward = 40
    } else if (animal.size === 'medium') {
      minReward = 50; maxReward = 200
    } else if (animal.size === 'large') {
      minReward = 210; maxReward = 500
    } else if (animal.size === 'rare') {
      minReward = 600; maxReward = 1200
    }
    
    const diamantes = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward
    const monedas = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward
    const oro = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward
    const xp = Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward

    const gptPrompt = `Genera un prompt perfecto y detallado para crear una imagen realista y atractiva de un animal de caza llamado "${animal.name}". Incluye detalles sobre su aspecto, entorno natural y cualquier característica única que lo haga sobresaliente.`
    const gptUrl = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent("Genera un prompt perfecto para imagen de caza")}&content=${encodeURIComponent(gptPrompt)}`
    
    try {
      const gptRes = await fetch(gptUrl)
      if (!gptRes.ok) throw 'Error al consultar ChatGPT para el prompt de imagen.'
      const gptJson = await gptRes.json()
      if (!gptJson.status || !gptJson.data) throw 'Respuesta inválida de ChatGPT.'
      
      const promptImagen = gptJson.data
      const imagenUrl = `https://api.siputzx.my.id/api/ai/flux?prompt=${encodeURIComponent(promptImagen)}`
      const caption = `¡Increíble! Cazaste un@ *${animal.name}*.\n\n*Recompensas de Caza*\n□ Diamantes 💎: ${diamantes}\n□ Monedas 💰: ${monedas}\n□ Oro 🥇: ${oro}\n□ XP ⭐: ${xp}`
      
      await conn.sendMessage(m.chat, { image: { url: imagenUrl }, caption }, { quoted: m })
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch (e) {
      console.error(e)
      conn.reply(m.chat, `⚠️ Hubo un error mostrando los resultados de tu caza. ¡Pero seguro cazaste un *${animal.name}*!`, m)
    }
  }, tiempoCaza * 1000)
}

handler.command = /^cazar$/i
export default handler