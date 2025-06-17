import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import PhoneNumber from 'awesome-phonenumber'

const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = async function (m, conn, db) {
    // Función para obtener buffer de una URL
    async function getBuffer(url, options = {}) {
        try {
            let res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'User-Agent': 'GoogleBot',
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.log(`Error : ${e}`)
            return null
        }
    }

    // Obtener información del usuario
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let fotoperfil = await conn.profilePictureUrl(who, 'image').catch(() => 'https://qu.ax/QGAVS.jpg')

    // Obtener nacionalidad
    let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
    let userNationality = api.data.result ? `${api.data.result.name} ${api.data.result.emoji}` : 'Desconocido'

    // Obtener usuario de la base de datos
    let user = db.data.users[who] || {}
    let pushname = m.pushName || 'Sin nombre'

    // Datos generales del bot
    let creador = 'Wa.me/584146277368'
    let ofcbot = conn.user.jid.split('@')[0]
    let asistencia = 'Wa.me/5804146277368'

    // Lista de canales
    let canalIdM = ["120363414007802886@newsletter", "120363414007802886@newsletter"]
    let canalNombreM = ["bot Barboza", "✧┊┋◟🚀Barboza🚀◞┊┋✧"]
    
    async function getRandomChannel() {
        let randomIndex = Math.floor(Math.random() * canalIdM.length)
        return { id: canalIdM[randomIndex], name: canalNombreM[randomIndex] }
    }
    
    let channelRD = await getRandomChannel()

    // Reacciones
    let rwait = '🕒'
    let done = '✅'
    let error = '✖️'

    // Imagen de respuesta
    let category = "imagen"
    const dbPath = './src/database/db.json'
    const dbData = JSON.parse(fs.readFileSync(dbPath))
    const random = Math.floor(Math.random() * dbData.links[category].length)
    const randomlink = dbData.links[category][random]
    const response = await fetch(randomlink)
    const rimg = await response.buffer()

    // Mensajes de espera
    let wait = '🕒 *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗮 ...*'

    // Tags
    let taguser = '@' + m.sender.split("@s.whatsapp.net")

    // Fakes
    let fkontak = { 
        key: { 
            participants: "0@s.whatsapp.net", 
            remoteJid: "status@broadcast", 
            fromMe: false, 
            id: "Halo" 
        }, 
        message: { 
            contactMessage: { 
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        participant: "0@s.whatsapp.net" 
    }

    // Selección de canal aleatorio
    let rcanal = { 
        contextInfo: { 
            isForwarded: true, 
            forwardedNewsletterMessageInfo: { 
                newsletterJid: channelRD.id, 
                serverMessageId: 100, 
                newsletterName: channelRD.name 
            }, 
            externalAdReply: { 
                showAdAttribution: true, 
                title: "Texto del bot", 
                body: '🚀 ♡⃝Barboza𝒕ᚐ҉ᚐ', 
                previewType: "PHOTO", 
                thumbnailUrl: "https://qu.ax/QGAVS.jpg", 
                sourceUrl: "https://whatsapp.com/channel/0029Vaua0ZD3gvWjQaIpSy18", 
                mediaType: 1, 
                renderLargerThumbnail: false 
            }
        } 
    }

    return { fotoperfil, userNationality, pushname, taguser, rimg, wait, fkontak, rcanal }
}

export default handler