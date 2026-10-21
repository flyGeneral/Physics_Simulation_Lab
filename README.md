# Physics_Simulation_Lab · 物理与感知实验室

学习资料库：用**知识文档、剧本驱动动画、参数仿真台**三种载体，演示物理知识、讲解感知器件（camera / mic / IMU / lidar / TOF…）选型与测试背后的物理原理。

基于 [VitePress](https://vitepress.dev/) 构建；所有交互动画为零依赖、零构建的自包含 HTML（继承自姊妹项目 AI_Physics 的约定），可独立打开、可 iframe 嵌入。

## 快速开始

```bash
npm install
npm run docs:dev      # 开发预览 http://localhost:5173
npm run docs:build    # 构建静态站 → docs/.vitepress/dist/
npm run docs:preview  # 预览构建产物
```

## 内容结构

- **感知器件评估** `docs/sensing/` —— 器件原理、选型权衡、测试方法与判据
  - [Camera · 选型测试地图](docs/sensing/camera/index.md)：sensor 选型可以测什么，一张总表
  - [Camera · 快门与曝光时序](docs/sensing/camera/shutter.md)：全局 vs 卷帘、果冻效应、闪光带
  - [Camera · 噪声与动态范围](docs/sensing/camera/noise.md)：散粒噪声、读出噪声、SNR
  - [Camera · 帧率与运动采样](docs/sensing/camera/temporal-sampling.md)：运动模糊、漏检、时间混叠
  - [Mic · 选型测试地图](docs/sensing/mic/index.md) / [采样率与混叠](docs/sensing/mic/aliasing.md)
  - [测试方法论](docs/sensing/methodology.md)：观测方案、对比实验、故障复现、数据复盘
- **物理演示** `docs/physics/` —— 通用物理演示（栏目预留，可从 AI_Physics 导入动画）
- **创作指南** `docs/guide/authoring.md` —— 如何新增专题 / demo / 栏目，如何导入 AI_Physics 动画

```text
docs/
├── sensing/            # 感知器件评估（文档）
├── physics/            # 通用物理演示（文档）
├── guide/              # 创作指南
└── public/demos/       # 交互 demo（自包含 HTML，iframe 嵌入文档）
    ├── camera/         #   rolling-shutter / exposure-noise
    ├── common/         #   aliasing（camera 与 mic 共用，数学同源）
    └── physics/        #   AI_Physics 动画导入落点（按需）
```

## 约定

- **统一模型**：一切内容 = 专题；专题 = 若干 Markdown 文档 + 若干自包含 demo；
- **demo 铁律**：一个目录一个 `index.html`，内联全部 JS/CSS，零 CDN、零构建、`file://` 可直接打开；
- 新增内容的方法见[创作指南](docs/guide/authoring.md)。
