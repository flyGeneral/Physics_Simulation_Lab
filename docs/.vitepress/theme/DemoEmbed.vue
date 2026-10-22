<script setup lang="ts">
import { ref } from 'vue'

// 嵌入 docs/public/demos/ 下的自包含交互 demo
// 用法：<DemoEmbed src="/demos/camera/rolling-shutter/" title="卷帘快门时序演示" />
const props = withDefaults(
  defineProps<{
    src: string
    title?: string
    /** 宽高比（宽/高），默认 16/9 */
    aspect?: string
    /** iframe 初始高度提示，默认 600px（全屏时自动撑满） */
    minHeight?: string
  }>(),
  { title: '', aspect: '16 / 9', minHeight: '560px' },
)

// 目录 URL 统一补全 index.html：dev 模式下 Vite 的 SPA fallback 会把
// /demos/<name>/ 劫持成 VitePress 壳页面（客户端渲染出 404），
// 显式文件路径在 dev 与构建产物下都命中真实 demo
const srcFile = props.src.endsWith('/') ? props.src + 'index.html' : props.src

const frameBox = ref<HTMLElement | null>(null)

function openNew() {
  window.open(srcFile, '_blank')
}

async function toggleFullscreen() {
  const el = frameBox.value
  if (!el) return
  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await el.requestFullscreen()
  } catch {
    openNew()
  }
}
</script>

<template>
  <figure class="demo-embed">
    <div class="demo-bar">
      <span class="demo-dot" aria-hidden="true"></span>
      <span class="demo-title">{{ title || src }}</span>
      <span class="demo-actions">
        <button type="button" @click="openNew">新窗口打开 ↗</button>
        <button type="button" @click="toggleFullscreen">全屏 ⤢</button>
      </span>
    </div>
    <div ref="frameBox" class="demo-frame" :style="{ aspectRatio: aspect, minHeight }">
      <iframe :src="srcFile" :title="title || src" loading="lazy" allowfullscreen></iframe>
    </div>
    <figcaption v-if="title">
      <span class="cap-tag">交互演示</span>{{ title }}
    </figcaption>
  </figure>
</template>

<style scoped>
.demo-embed {
  margin: 16px 0;
  border: 1px solid var(--vp-c-border, #c2c2c4);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft, #f6f6f7);
}
.demo-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-border, #c2c2c4);
  background: var(--vp-c-bg-alt, #f2f2f3);
  font-size: 13px;
}
.demo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand-1, #345c13);
  flex: none;
}
.demo-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}
.demo-actions button {
  flex: none;
  font-size: 12px;
  padding: 2px 8px;
  border: 1px solid var(--vp-c-border, #c2c2c4);
  border-radius: 4px;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-2, #3c3c3e);
  cursor: pointer;
}
.demo-actions button:hover {
  border-color: var(--vp-c-brand-1, #345c13);
  color: var(--vp-c-brand-1, #345c13);
}
.demo-frame {
  position: relative;
  width: 100%;
  background: #101014;
}
.demo-frame:fullscreen {
  aspect-ratio: auto;
  min-height: 100vh;
  display: flex;
}
.demo-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.demo-frame:fullscreen iframe {
  position: static;
  flex: 1;
}
figcaption {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--vp-c-text-2, #3c3c3e);
  border-top: 1px solid var(--vp-c-border, #c2c2c4);
}
.cap-tag {
  flex: none;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
  color: var(--vp-c-brand-1, #345c13);
  background: var(--vp-c-brand-dim, rgba(52, 92, 19, 0.14));
}
</style>
