import fs from 'fs'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import { transcribe } from '@ai-zen/whisper'

ffmpeg.setFfmpegPath(ffmpegPath)

let handler = async (m, { conn, args }) => {
  try {
    if (!m.quoted || !m.quoted.audio) {
      return m.reply('🎙️ Responde a un audio con el comando *⚡voztext* para transcribirlo.')
    }

    const media = await m.quoted.download()
    const inputPath = './tmp/input.ogg'
    const outputPath = './tmp/output.wav'

    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')

    fs.writeFileSync(inputPath, media)


    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .audioCodec('pcm_s16le')
        .format('wav')
        .save(outputPath)
        .on('end', resolve)
        .on('error', reject)
    })


    m.reply('🧠 Transcribiendo el audio...')

    const result = await transcribe(outputPath)

    const text = result.text?.trim()
    if (!text) return m.reply('❌ No se pudo transcribir el audio.')

    m.reply(`🗣️ *Texto detectado:*\n\n${text}`)


    fs.unlinkSync(inputPath)
    fs.unlinkSync(outputPath)
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al procesar el audio.')
  }
}

handler.command = ['voztext']
handler.help = handler.command;
handler.tags = ['ia'];
handler.register = true

export default handler
