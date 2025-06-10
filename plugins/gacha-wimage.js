import { promises as fs } from 'fs';

const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('👑 No se pudo cargar el archivo characters.json.');
    }
}

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

let handler = async (m, { conn, args }) => {
    const characterName = args.join(' ').toLowerCase().trim();

    try {
        const characters = await loadCharacters();
        const character = characters.find(c => c.name.toLowerCase() === characterName);

        if (!character) {
            await conn.reply(m.chat, `👑 No se ha encontrado el personaje *${characterName}*. Asegúrate de que el nombre esté correcto.`, m);
            return;
        }

        // Seleccionar una imagen aleatoria
        const randomImage = character.img[Math.floor(Math.random() * character.img.length)];

        const message = `✰ Nombre » *${character.name}*
✰ Género » *${character.gender}*
✰ Fuente » *${character.source}*`;

        await conn.sendFile(m.chat, randomImage, `${character.name}.jpg`, message, m);
    } catch (error) {
        await conn.reply(m.chat, `✘ Error al cargar la imagen del personaje: ${error.message}`, m);
    }
};

handler.help = ['wimage <nombre del personaje>'];
handler.tags = ['anime'];
handler.command = ['charimage', 'cimage', 'wimage', 'waifuimage'];
handler.group = true;
handler.register = true;

export default handler;
