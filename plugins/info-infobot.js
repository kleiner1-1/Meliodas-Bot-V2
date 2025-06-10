import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname, version, release, arch } from 'os'
import speed from 'performance-now'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
std: 'JEDEC',
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
let bot = global.db.data.settings[conn.user.jid]
let _uptime = process.uptime() * 1000
let uptime = (_uptime).toTimeString()
let totalreg = Object.keys(global.db.data.users).length
let totalbots = Object.keys(global.db.data.settings).length
let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
let totalchats = Object.keys(global.db.data.chats).length
let totalf = Object.values(global.plugins).filter( (v) => v.help && v.tags ).length
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
const used = process.memoryUsage()
const cpus = _cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu })
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}})
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let timestamp = speed()
let latensi = speed() - timestamp
let kirito = `╭─⬣「 *Info De ${botname}* 」⬣\n`
kirito += `│ 👑 *Creador* : @${owner[0][0].split('@s.whatsapp.net')[0]}\n`
kirito += `│ ${emoji} *Prefijo* : [  ${usedPrefix}  ]\n`
kirito += `│ 📦 *Total Plugins* : ${totalf}\n`
kirito += `│ 🖥️ *Plataforma* : ${platform()}\n`
kirito += `│ 📡 *Servidor* : ${hostname()}\n`
kirito += `│ 📈 *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n`
kirito += `│ 💾 *FreeRAM* : ${format(freemem())}\n`
kirito += `│ 🚀 *Speed* : ${latensi.toFixed(4)} ms\n`
kirito += `│ 🕗 *Uptime* : ${uptime}\n`
kirito += `│ 🔮 *Modo* : ${bot.public ? 'Privado' : 'Publico'}\n`
kirito += `│ 📜 *Comandos Ejecutados* : ${toNum(totalStats)} ( *${totalStats}* )\n`
kirito += `│ 📍 *Grupos Registrados* : ${toNum(totalchats)} ( *${totalchats}* )\n`
kirito += `│ 📌 *Registrados* : ${toNum(totalreg)} ( *${totalreg}* ) Usuarios\n`
kirito += `╰─⬣\n\n`
kirito += `╭─⬣「 *Chats De ${botname}* 」⬣\n`
kirito += `│ 🪧 *${groupsIn.length}* Chats en Grupos\n`
kirito += `│ 📰 *${groupsIn.length}* Grupos Unidos\n`
kirito += `│ 📄 *${groupsIn.length - groupsIn.length}* Grupos Salidos\n`
kirito += `│ 💬 *${chats.length - groupsIn.length}* Chats Privados\n`
kirito += `│ 💭 *${chats.length}* Chats Totales\n`
kirito += `╰─⬣\n\n`
kirito += `╭─⬣「 *NodeJS Uso de memoria* 」⬣\n`
kirito += `${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}\n`
kirito += `╰─⬣`

await conn.reply(m.chat, kirito, fkontak, { contextInfo: { mentionedJid: [owner[0][0] + '@s.whatsapp.net'] }})
}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = ['info', 'infobot']

export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number >= 1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else if (number <= -1000 && number > -1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number <= -1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else {
return number.toString()
}}