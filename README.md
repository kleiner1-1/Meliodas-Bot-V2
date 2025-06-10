
<h1 align="center">✰ Meliodas Bot MD ✰</h1>

---

<p align="center">
  <img src="https://qu.ax/iZYvt.png" alt="Meliodas Bot MD Logo">
</p>

---

# *Acerca de Meliodas Bot MD*

> Un bot de WhatsApp potente y versátil, inspirado en el universo de Sword Art Online. Desarrollado para ofrecer una experiencia ágil, segura y funcional.

*   *Desarrollador:* Deylin Eliac
*   *Plataforma:* WhatsApp
*   *Inspiración:* Sword Art Online
*   *Características Clave:* Agilidad, Funcionalidad, Seguridad

---

## *Licencia*

Este proyecto se distribuye bajo la [Licencia Pública General GNU Affero v3](./LICENSE).

---

<a
href="https://www.mediafire.com/file/3hsvi3xkpq3a64o/termux_118.a"><img src="https://qu.ax/finc.jpg" height="125px"></a>

# *Instalación en Termux*

<details>
  <summary><b>*Guía de Instalación Paso a Paso*</b></summary>

  1.  `termux-setup-storage`
  2.  `pkg update -y && pkg upgrade -y`
  3.  `pkg install git nodejs ffmpeg imagemagick yarn -y`
  4.  `git clone https://github.com/Deylin-Eliac/Kirito-Bot-MD`
  5.  `cd Kirito-Bot-MD`
  6.  `yarn install`
  7.  `yarn start`

  *Nota:* Los errores en rojo durante el escaneo del código QR son normales.

  *Reiniciar el bot:*

  ```bash
  cd Meliodas-Bot-MD
  yarn start
  ```

  *Escanear un nuevo código QR:*

  ```bash
  cd Meliodas-Bot-MD
  rm -rf kiritoSession
  yarn start
  ```

  *Mantener el bot activo en segundo plano:*

  ```bash
  npm i -g pm2
  pm2 start index.js
  pm2 save
  pm2 logs
  ```
</details>

---

# *Comunidad*

*   *Canal Oficial de WhatsApp:* [Únete aquí 👑]()

---

