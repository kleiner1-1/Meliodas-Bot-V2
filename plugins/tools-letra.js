function handler(m, { text, args }) {
    if (!text) return conn.reply(m.chat, '⚠️ Ingresa el texto y el estilo que quieres usar.\n\nEjemplo: *letra fancy Hola Mundo*', m);

    let styles = {
        fancy: {
            'a': 'ᥲ', 'b': 'ᑲ', 'c': 'ᥴ', 'd': 'ძ', 'e': 'ᥱ', 'f': '𝖿',
            'g': 'ɢ', 'h': 'һ', 'i': 'і', 'j': 'ᴊ', 'k': '𝗄', 'l': 'ᥣ',
            'm': '𝗆', 'n': 'ᥒ', 'o': '᥆', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋',
            's': '𝗌', 't': '𝗍', 'u': 'ᥙ', 'v': '᥎', 'w': 'ᥕ', 'x': '᥊',
            'y': 'ᥡ', 'z': '𝗓'
        },
        bold: {
            'a': '𝗔', 'b': '𝗕', 'c': '𝗖', 'd': '𝗗', 'e': '𝗘', 'f': '𝗙',
            'g': '𝗚', 'h': '𝗛', 'i': '𝗜', 'j': '𝗝', 'k': '𝗞', 'l': '𝗟',
            'm': '𝗠', 'n': '𝗡', 'o': '𝗢', 'p': '𝗣', 'q': '𝗤', 'r': '𝗥',
            's': '𝗦', 't': '𝗧', 'u': '𝗨', 'v': '𝗩', 'w': '𝗪', 'x': '𝗫',
            'y': '𝗬', 'z': '𝗭'
        },
        italic: {
            'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧',
            'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭',
            'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳',
            's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹',
            'y': '𝘺', 'z': '𝘻'
        },
        monospace: {
            'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏',
            'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕',
            'm': '𝚖', 'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛',
            's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡',
            'y': '𝚢', 'z': '𝚣'
        }
    };

    let styleName = args.shift()?.toLowerCase();
    let textToTransform = args.join(' ');

    if (!styles[styleName]) {
        return m.reply(`⚠️ Estilo no válido.\n\n*Estilos disponibles:* ${Object.keys(styles).join(', ')}`);
    }

    let transformedText = textToTransform.replace(/[a-z]/gi, v => styles[styleName][v.toLowerCase()] || v);
    
    m.reply(transformedText);
}

handler.help = ['letra <estilo> <texto>'];
handler.tags = ['fun'];
handler.command = ['letra'];
handler.register = true;

export default handler;