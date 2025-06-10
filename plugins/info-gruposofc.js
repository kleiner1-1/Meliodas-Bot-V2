import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

let grupos = `╭━━《 *GRUPOS OFICIALES* 》━━╮

✧ *Únete a nuestro grupo:*  
➥ *${namegrupo}*  
⌁ ${gp1}  

━═━═━═━═━═━═━═━═━═━═━

⚠ *¿Enlace inválido? Usa el alternativo:*  
➥ *${namechannel}*  
⌁ ${channel}  

━═━═━═━═━═━═━═━═━═━═━  
> ${dev}`

await conn.sendFile(m.chat, catalogo, "grupos.jpg", grupos, m)
await m.react(emojis)

}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler