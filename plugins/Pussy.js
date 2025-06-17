import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
   
    if (command !== Buffer.from("cHVzc3k=", "base64").toString("utf-8")) {
      throw new Error("Comando no reconocido.");
    }

   
    const apiUrl = Buffer.from("aHR0cHM6Ly9kZWxpcml1cy1hcGlvZmMudmVyY2VsLmFwcC9uc2Z3L2dpcmxz", "base64").toString("utf-8");

    // Realizar la solicitud a la API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`La API devolvió un estado HTTP ${response.status}.`);
    }

    const imageBuffer = await response.buffer();

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: Buffer.from("8J+PjSBBCcOkcO8YSB0aWVuZXMgdW5hIGltYWdlbiBhbGVhdG9yaWEgc29saWNpdGFkYSBjb24gZWwgY29tYW5kbyAq", "base64").toString("utf-8") + `${usedPrefix}${command}*.`,
    });
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    await conn.sendMessage(m.chat, {
      text: Buffer.from("4piNICBPY3VycmlvIHVuIGVycm9yIGFsIGludGVudGFyIHByb2Nlc2FyIHR1IHNvbGljaXR1ZDo=", "base64").toString("utf-8") +
        `\n${error.message || "Error desconocido"}`,
    });
  }
};

handler.command = [Buffer.from("cHVzc3k=", "base64").toString("utf-8")];

export default handler;