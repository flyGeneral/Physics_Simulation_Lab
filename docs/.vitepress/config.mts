import { defineConfig } from 'vitepress'

// 站点配置：导航 / 侧边栏 / 本地搜索
// 新增栏目三步：docs/ 下建目录 → 此处加 nav/sidebar → 首页 features 加卡片
export default defineConfig({
  lang: 'zh-CN',
  title: '物理实验室',
  description:
    '物理知识演示与感知器件选型评估的学习资料库：知识文档 + 剧本动画 + 参数仿真台',
  lastUpdated: true,

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '物理演示', link: '/physics/' },
      {
        text: '感知器件评估',
        items: [
          { text: '栏目总览', link: '/sensing/' },
          { text: 'Camera · 选型测试地图', link: '/sensing/camera/' },
          { text: 'Camera · 快门与曝光时序', link: '/sensing/camera/shutter' },
          { text: 'Camera · 噪声与动态范围', link: '/sensing/camera/noise' },
          { text: 'Camera · 帧率与运动采样', link: '/sensing/camera/temporal-sampling' },
          { text: 'Mic · 选型测试地图', link: '/sensing/mic/' },
          { text: 'Mic · 采样率与混叠', link: '/sensing/mic/aliasing' },
          { text: 'Mic · 音腔与高频跌落', link: '/sensing/mic/cavity-response' },
          { text: '测试方法论', link: '/sensing/methodology' },
        ],
      },
      { text: '创作指南', link: '/guide/authoring' },
    ],

    sidebar: {
      '/physics/': [
        {
          text: '物理演示',
          items: [{ text: '栏目概览', link: '/physics/' }],
        },
      ],
      '/sensing/': [
        {
          text: '总览',
          items: [
            { text: '感知器件评估', link: '/sensing/' },
            { text: '测试方法论', link: '/sensing/methodology' },
          ],
        },
        {
          text: 'Camera',
          items: [
            { text: '选型测试地图', link: '/sensing/camera/' },
            { text: '快门类型与曝光时序', link: '/sensing/camera/shutter' },
            { text: '噪声、曝光与动态范围', link: '/sensing/camera/noise' },
            { text: '帧率与运动采样', link: '/sensing/camera/temporal-sampling' },
          ],
        },
        {
          text: 'Mic',
          items: [
            { text: '选型测试地图', link: '/sensing/mic/' },
            { text: '采样率与混叠', link: '/sensing/mic/aliasing' },
            { text: '音腔与高频跌落', link: '/sensing/mic/cavity-response' },
          ],
        },
      ],
      '/guide/': [
        {
          text: '创作指南',
          items: [{ text: '如何新增内容', link: '/guide/authoring' }],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页内容' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '上次更新' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
