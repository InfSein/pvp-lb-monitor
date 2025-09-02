<p align="center">
  <img alt="icon" height="160" src="/doc/image/repo-logo.png" />
</p>
<h1 align="center"></h1>

<p align="center">
  <a href="/README.zh.md">简体中文</a>
  |
  <strong>English</strong>
</p>

[![Based on Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat&logo=vite)](https://github.com/vitejs/vite)
[![Based on Vue3](https://img.shields.io/badge/Vue-3.5.18-4FC08D?style=flat&logo=vue.js)](https://github.com/vuejs/core)
[![Based on TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat&logo=typescript)](https://github.com/microsoft/TypeScript)

A simple but effective ACT OverlayPlugin overlay that calculates and displays the remaining cooldown time of the `Limit Break` in Final Fantasy XIV PvP combats.

## Usage

Before getting started, you need to install and properly configure both `ACT` and `OverlayPlugin`.

1. In `OverlayPlugin`, create a new overlay, select `Custom Overlay`, and set the type to `Mini Parse`.
2. Set the overlay URL (see details below).
3. Adjust the overlay’s position, size, and scale to your preference.

> \[!TIP]
> The overlay will automatically hide when you are outside PvP instances.<br>
> You can go to the `Wolves' Den Pier` for testing.

### Available Overlay URLs

Choose an overlay URL according to your preference.

* To display **“Remain: xx ticks”**<br>
  ![Preview of tick mode](./doc/image/zh/main.mode_tick.png)
  ```
  https://infsein.github.io/pvp-lb-monitor/?lang=en&mode=tick
  ```
* To display **“Remain: xx sec”**<br>
  ![Preview of sec mode](./doc/image/zh/main.mode_sec.png)
  ```
  https://infsein.github.io/pvp-lb-monitor/?lang=en&mode=sec
  ```

> \[!TIP]
> You may have noticed that you can adjust the overlay’s display style by changing the `UrlParams` at the end of the link.<br>
> If you’re interested, please refer to the [Full List of Parameters](./doc/url-params.md).

## FAQ

* **Q: Why does it show “JOB NOT FOUND”?** <br>
  A: In rare cases, the overlay cannot retrieve the required data. You may need to **switch your job once** to resume functionality.

* **Q: Why does the remaining seconds/ticks fluctuate drastically sometimes?** <br>
  A: Certain PvP modes (e.g., Frontline) affect Limit Break gauge accumulation speed.<br>
  Please refer to the official PvP guide for details.

## License

This project currently does not have an open-source license and is provided solely for community security review.<br>
Without explicit authorization, modification and redistribution are prohibited.

> \[!CAUTION]
> Commercial use is strictly forbidden.
