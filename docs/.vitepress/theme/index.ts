import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoEmbed from './DemoEmbed.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 全局注册，Markdown 中可直接 <DemoEmbed src="/demos/..." title="..." />
    app.component('DemoEmbed', DemoEmbed)
  },
} satisfies Theme
