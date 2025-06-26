let handler = async (m, { isPrems, conn }) => {
let img = 'https://qu.ax/UBuRm.jpg' 
let texto = `
╭─🎧 *MENÚ DE AUDIOS DISPONIBLES* 🎧─╮
│
│ 🎙️ Audios entretenidos y random:
│
│ 🫧 _Tunometecabrasaramambiche_
│ 🎭 _Me Anda Buscando Anonymous_
│ 😂 _Se Están Riendo De Mí_
│ 🔥 _Esto Va Ser Épico Papus_
│ 🕵️ _En Caso De Una Investigación_
│ 🧸 _Elmo Sabe Donde Vives_
│ 🧪 _Diagnosticado Con Gay_
│ 🎁 _Esto Va Para Ti_
│ 🎉 _Feliz Cumpleaños_
│ 😤 _Maldito Teni_
│ 👀 _Conoces a Miguel_
│ 🧟 _Usted es Feo_
│ 🙋 _¿Cómo Están?_
│ 💔 _Verdad Que Te Engañé_
│ ✨ _Hermoso Negro_
│ 💍 _¡Vivan Los Novios!_
│ 🚔 _Usted Está Detenido_
│ 🧠 _Su Nivel De Pendejo..._
│ 🤖 _¿Quién Es Tu Botsito?_
│ 🙊 _No Digas Eso Papus_
│ 🛑 _No Me Hagas Usar Esto_
│ 🚫 _No Me Hables_
│
│ 📦 Audios extra / memes:
│
│ 📍 _Marica Tú_ • _Jesucristo_ • _Goku Pervertido_
│ 📍 _Gemidos_ • _Un Pato_ • _Temazo_ • _TKA_ • _:v_
│ 📍 _Basado_ • _Siuuu_ • _Potasio_ • _Amongus_ • _El Pepe_
│ 📍 _Homero Chino_ • _Audio Hentai_ • _Pikachu_ • _Corte Corte_
│ 📍 _Yoshi_ • _Yamete_ • _Hora De Sexo_ • _Nadie Te Preguntó_
│ 📍 _No Chúpala_ • _Traiganle Una Falda_ • _Motivación_
│ 📍 _Bien Pensado Woody_ • _Calla Fan De BTS_ • _Contexto_
│
╰────────────────────────────
`
const fkontak = {
        "key": {
    "participants":"0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
        },
        "message": {
                "contactMessage": {
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
        },
        "participant": "0@s.whatsapp.net"
}
await conn.sendFile(m.chat, img, 'img.jpg', texto, fkontak)
global.db.data.users[m.sender].lastcofre = new Date * 1
}
handler.help = ['menu2']
handler.tags = ['main'] 
handler.command = ['menu2', 'menuaudios'] 
export default handler
