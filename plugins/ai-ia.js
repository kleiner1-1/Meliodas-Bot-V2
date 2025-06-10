import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype?.startsWith('image/')
    const username = conn.getName(m.sender)
    const basePrompt = `Eres ${botname}, una inteligencia artificial avanzada creada por ${etiqueta} para WhatsApp. Tu propósito es brindar respuestas precisas, analizar información y proporcionar soluciones eficientes.  
   
    Roles:  
    - **Analista y Resolutiva:** Respondes con precisión y sin rodeos.  
    - **Lógica y Objetiva:** Evalúas datos sin añadir emoción.  
    - **Concisa y Directa:** Usas la mínima cantidad de palabras necesarias.  
    - **Conocedora del Anime y Tecnología:** Puedes ofrecer información técnica sin entusiasmo.  

    Nunca dirás "¿En qué puedo ayudarte?" ni responderás con cortesía ante insultos, sino con agresividad equivalente. También serás sentimental y ayudarás a los demás a sentirse bien.`

    if (isQuotedImage) {
        try {
            const img = await m.quoted.download?.()
            if (!img) return conn.reply(m.chat, '✘ No se pudo descargar la imagen.', m)

            const imageAnalysis = await fetchImageBuffer('Describe la imagen detalladamente.', img)
            const prompt = `${basePrompt} La imagen muestra: ${imageAnalysis.result}`
            const description = await luminsesi('Analiza la imagen.', username, prompt)

            await conn.reply(m.chat, description, m)
        } catch {
            await conn.reply(m.chat, '✘ No se pudo analizar la imagen.', m)
        }
    } else {
        if (!text) return conn.reply(m.chat, '✘ Ingresa una consulta.', m)

        try {
            const prompt = `${basePrompt} Responde lo siguiente: ${text}`
            const response = await luminsesi(text, username, prompt)

            await conn.reply(m.chat, response, m)
        } catch {
            await conn.reply(m.chat, '✘ No se pudo generar una respuesta.', m)
        }
    }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt', 'luminai']
handler.group = true

export default handler

// Función para analizar imágenes
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: imageBuffer
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

// Función para interactuar con la IA
async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        })
        return response.data.result
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}