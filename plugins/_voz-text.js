import fs from 'fs'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import { SpeechClient } from '@google-cloud/speech'

ffmpeg.setFfmpegPath(ffmpegPath)

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.includes('audio')) {
      return m.reply(`🎙️ Responde a un audio con el comando *${usedPrefix + command}* para transcribirlo.`)
    }

    const inputDir = './tmp'
    if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir)

    const inputPath = path.join(inputDir, `audio.ogg`)
    const outputPath = path.join(inputDir, `audio.flac`)

    const audioBuffer = await m.quoted.download()
    fs.writeFileSync(inputPath, audioBuffer)

    
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('flac')
        .audioCodec('flac')
        .save(outputPath)
        .on('end', resolve)
        .on('error', reject)
    })

    m.reply('🔍 Procesando con inteligencia de Google...')

    const client = new SpeechClient({
      keyFilename: './google-credentials.json' 
    }) 

    const audioBytes = fs.readFileSync(outputPath).toString('base64')

    const [response] = await client.recognize({
      audio: { content: audioBytes },
      config: {
        encoding: 'FLAC',
        sampleRateHertz: 44100,
        languageCode: 'es-ES', 
      },
    })

    const transcription = response.results.map(r => r.alternatives[0].transcript).join('\n').trim()

    if (!transcription) {
      return m.reply('❌ No se detectó texto en el audio.')
    }

    m.reply(`🗣️ *Texto detectado:*\n\n${transcription}`)

    fs.unlinkSync(inputPath)
    fs.unlinkSync(outputPath)

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al procesar el audio.')
  }
}

handler.command = ['voztext']
handler.tags = ['ia']
handler.help = ['voztext']
export default handler
