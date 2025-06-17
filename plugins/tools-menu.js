let handler = async (m, { conn, usedPrefix }) => {
    let menu = `
┏━━━━━━━━━━━━━━━━━━
┃ 🐾 *Menú de Mascotas* 🐾
┗━━━━━━━━━━━━━━━━━━
📜 *Tienda de Mascotas:*  
  ├ 📌 *${usedPrefix}tiendamascotas* - Ver mascotas disponibles  
  ├ 🛒 *${usedPrefix}comprarmascota [nombre]* - Comprar una mascota  

🥩 *Tienda de Comida:*  
  ├ 🍖 *${usedPrefix}tiendacomida* - Ver opciones de comida  
  ├ 🛍️ *${usedPrefix}comprarcomida [cantidad]* - Comprar comida  

🐶 *Cuidado de la Mascota:*  
  ├ 🍼 *${usedPrefix}alimentar [cantidad]* - Alimentar a tu mascota  
  ├ 💧 *${usedPrefix}agua* - Darle agua a tu mascota  
  ├ 🚶‍♂️ *${usedPrefix}pasear* - Salir de paseo con tu mascota  
  ├ 🗺️ *${usedPrefix}viajar* - Hacer un viaje con tu mascota  
  ├ 💖 *${usedPrefix}acariciar* - Acariciar a tu mascota  

⚔️ *Batallas:*  
  ├ 🥊 *${usedPrefix}batalla @usuario* - Enfrenta tu mascota contra otra  
  ├ ❤️ *${usedPrefix}estado* - Ver la salud y estadísticas de tu mascota  

💰 *Economía:*  
  ├ 🍬 *${usedPrefix}verdulces* - Ver tus dulces  
  ├ ⭐ *${usedPrefix}verxp* - Ver tu XP  
  ├ 🎁 *${usedPrefix}resemanal* - Reclamar tu recompensa semanal  

📌 *Información:*  
  ├ 🏆 Cada acción con tu mascota puede darte premios aleatorios  
  ├ 🎭 Hay múltiples variaciones de mensajes para cada acción  
  ├ 🚀 ¡Cuida bien a tu mascota y hazla más fuerte!

🤖 *Bot creado por [Tu Nombre o Marca]*  
    `.trim();

    await m.reply(menu);
};

handler.command = ['menumascotas', 'menupet'];
export default handler;