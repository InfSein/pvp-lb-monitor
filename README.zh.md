<p align="center">
  <img alt="icon" height="160" src="./doc/image/repo-logo.png" />
</p>
<h1 align="center"></h1>

<p align="center">
  <strong>简体中文</strong>
  |
  <a href="/README.md">English</a>
</p>

[![Based on Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat&logo=vite)](https://github.com/vitejs/vite)
[![Based on Vue3](https://img.shields.io/badge/Vue-3.5.18-4FC08D?style=flat&logo=vue.js)](https://github.com/vuejs/core)
[![Based on TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat&logo=typescript)](https://github.com/microsoft/TypeScript)

一个简单但有效的 ACT OverlayPlugin 悬浮窗插件，能够计算并显示 最终幻想XIV PvP 玩法中 `极限技(Limit Break)` 的剩余充能时间。

## 使用方法

在开始之前，你需要安装并正确配置 `ACT` 与 `OverlayPlugin` 。

1. 在 `OverlayPlugin` 中新建悬浮窗，预设选择 `自定义悬浮窗`，类型选择 `数据统计`；
2. 设置悬浮窗地址 (见下文说明)；
3. 按照喜好调整悬浮窗位置、大小和缩放。

> [!TIP]\
> 悬浮窗在非对战区域自动隐藏。<br>
> 你可以到 `狼狱停船场` 进行调试。

### 可选悬浮窗地址

请根据你的喜好来选择悬浮窗地址。

* 希望查看「剩余：xx跳」<br>
  ![Preview of tick mode](./doc/image/zh/main.mode_tick.png)
  ```
  https://infsein.github.io/pvp-lb-monitor/?lang=zh&mode=tick
  ```
* 希望查看「剩余：xx秒」<br>
  ![Preview of sec mode](./doc/image/zh/main.mode_sec.png)
  ```
  https://infsein.github.io/pvp-lb-monitor/?lang=zh&mode=sec
  ```

> [!TIP]\
> 你应当发现了，通过更改链接末尾的 `UrlParams` 可以调整悬浮窗的显示方式。<br>
> 如果你对此感兴趣，请参阅 [所有可选参数](./doc/url-params.md) 文档。

## 常见问题

* **Q: 为什么会显示为「未获取到职业」？** <br>
  A: 在少数场合，悬浮窗无法获取必要的数据，需要您 **切换一次职业** 才能继续运行。
* **Q: 为什么剩余秒数／跳数有时会剧烈波动？** <br>
  A: 部分对战(如纷争前线)会影响极限技积蓄速度。<br>详见官方对战指南。

## 开源许可

目前并未设置开源许可，仅供社区进行安全性审查。<br>
未经特别授权，不得修改／再分发此项目。

> [!CAUTION]\
> 严禁商用。
