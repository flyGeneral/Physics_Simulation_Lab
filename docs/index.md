---
layout: home

hero:
  name: 物理实验室
  text: Physics & Sensing Lab
  tagline: 用知识文档、剧本动画与参数仿真台，演示物理原理，讲透感知器件的选型与测试
  actions:
    - theme: brand
      text: 感知器件评估
      link: /sensing/
    - theme: alt
      text: 物理演示
      link: /physics/
    - theme: alt
      text: 创作指南
      link: /guide/authoring

features:
  - icon: 📖
    title: 知识库文档
    details: 器件工作原理、选型参数对照表、测试步骤与判据、典型案例，全部 Markdown 结构化沉淀，可搜索、可交叉引用。
    link: /sensing/
    linkText: 进入知识库
  - icon: 🎬
    title: 剧本驱动动画
    details: 确定性时序演示：单步、暂停、回放、事件标注。把卷帘快门、逐行读出这类「快到看不见」的过程放慢给你看。
    link: /sensing/camera/shutter
    linkText: 看一个例子
  - icon: 🎛️
    title: 参数仿真台
    details: 亲手调节曝光、增益、采样率等参数，实时观测物理现象与数值结果，建立对选型 trade-off 的直觉。
    link: /sensing/camera/noise
    linkText: 试一试仿真
  - icon: 🧩
    title: 同源模型，跨器件复用
    details: 相机帧率漏检与麦克风采样混叠背后是同一个 Nyquist 采样定理——一个仿真，两处讲解，数学同源。
    link: /sensing/mic/aliasing
    linkText: 采样混叠仿真
---
