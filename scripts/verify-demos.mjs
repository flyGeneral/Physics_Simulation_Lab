// 视觉验证脚本：对本机 Chrome 截图五个 demo + 一个文档嵌入页
// 用法：npm run docs:build && python3 -m http.server 4174 -d docs/.vitepress/dist & node scripts/verify-demos.mjs
import { chromium } from 'playwright-core'
import { mkdirSync } from 'fs'

const BASE = 'http://localhost:4174'
const OUT = '/tmp/shots'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1180, height: 920 } })
const errors = []
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', e => errors.push(String(e)))

const shot = async name => { await page.screenshot({ path: `${OUT}/${name}.png` }); console.log('shot:', name) }
const assert = (cond, msg) => { console.log((cond ? 'PASS' : 'FAIL') + ' - ' + msg); if (!cond) process.exitCode = 1 }

// ---- demo1: rolling-shutter ----
await page.goto(`${BASE}/demos/camera/rolling-shutter/`)
await page.waitForTimeout(1500)
await page.click('#flashBtn')
await page.waitForTimeout(700)
const ro1 = await page.$eval('#readout', el => el.textContent)
assert(/命中 \d+\/60 行|未命中任何行/.test(ro1), 'demo1 闪光读数（命中/未命中提示）: ' + ro1.slice(-40))
await shot('f1-rolling-flash')

// ---- demo2: exposure-noise ----
await page.goto(`${BASE}/demos/camera/exposure-noise/`)
await page.waitForTimeout(2000)
assert(await page.$$eval('#tbl tbody tr', trs => trs.length === 8), 'demo2 表格 8 行灰阶')
const sum = await page.$eval('#summary', el => el.textContent)
assert(/动态范围/.test(sum), 'demo2 摘要含动态范围')
await shot('f2-rain')
await page.locator('#tbl').scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await shot('f2-table')

// ---- demo3: aliasing（轮子模式读数 + 相位图） ----
await page.goto(`${BASE}/demos/common/aliasing/`)
await page.waitForTimeout(1500)
const ro3 = await page.$eval('#readout', el => el.textContent)
assert(/视觉转速/.test(ro3) && /Nyquist/.test(ro3), 'demo3 轮子读数: ' + ro3.slice(0, 60))
await shot('f3-wheel')
await page.click('#modeSeg button[data-mode="wave"]')
await page.check('#aaf')
await page.waitForTimeout(900)
await shot('f3-wave-aaf')

// ---- demo4: mic cavity-response（音腔高频跌落） ----
await page.goto(`${BASE}/demos/mic/cavity-response/`)
await page.waitForTimeout(1500)
const ro4 = await page.$eval('#readout', el => el.textContent)
assert(/kHz/.test(ro4) && /dB/.test(ro4), 'demo4 音腔读数（含 kHz/dB）: ' + ro4.slice(0, 80))
await shot('f4-cavity-straight')
await page.click('#presetSeg button[data-preset="steps"]')
await page.waitForTimeout(1200)
const ro4b = await page.$eval('#readout', el => el.textContent)
assert(/kHz/.test(ro4b) && /dB/.test(ro4b), 'demo4 台阶模式读数: ' + ro4b.slice(0, 80))
await shot('f4-cavity-steps')

// ---- demo5: mic cavity-pulse（音腔脉冲对照动画） ----
await page.goto(`${BASE}/demos/mic/cavity-pulse/`)
await page.waitForTimeout(2600)                       // 自动播放进行中
const nLogs = await page.$$eval('#elog div', els => els.length)
assert(nLogs >= 3, 'demo5 事件日志已点亮（' + nLogs + ' 条）')
await shot('f5-pulse-mid')
await page.fill('#timeline', '449')
await page.dispatchEvent('#timeline', 'input')
await page.waitForTimeout(400)
const ro5 = await page.$eval('#readout', el => el.textContent)
assert(/入射/.test(ro5) && /膜片吸收/.test(ro5), 'demo5 结算读数: ' + ro5.slice(0, 80))
await shot('f5-pulse-end')

// ---- demo6: physics/planets（七星连珠，移植页） ----
await page.goto(`${BASE}/demos/physics/planets/`)
await page.waitForTimeout(2500)
const t6 = await page.title()
assert(/七星连珠/.test(t6), 'demo6 标题加载: ' + t6)
const cv6 = await page.$eval('canvas', c => c.width > 0 && c.height > 0)
assert(cv6, 'demo6 画布已渲染')
await shot('f6-planets')

// ---- demo7: physics/supermoon（超级月亮 · 三维地月，移植页） ----
await page.goto(`${BASE}/demos/physics/supermoon/`)
await page.waitForTimeout(2500)
const t7 = await page.title()
assert(/超级月亮/.test(t7), 'demo7 标题加载: ' + t7)
const cv7 = await page.$eval('canvas', c => c.width > 0 && c.height > 0)
assert(cv7, 'demo7 画布已渲染')
await shot('f7-supermoon')

// ---- demo8: physics/eclipse（日食 · 三维日地月，移植页） ----
await page.goto(`${BASE}/demos/physics/eclipse/`)
await page.waitForTimeout(2500)
const t8 = await page.title()
assert(/日食/.test(t8), 'demo8 标题加载: ' + t8)
const cv8 = await page.$eval('canvas', c => c.width > 0 && c.height > 0)
assert(cv8, 'demo8 画布已渲染')
await shot('f8-eclipse')

// ---- demo9: physics/aurora（极光 · 天空的窗帘，移植页） ----
await page.goto(`${BASE}/demos/physics/aurora/`)
await page.waitForTimeout(2500)
const t9 = await page.title()
assert(/极光/.test(t9), 'demo9 标题加载: ' + t9)
const cv9 = await page.$eval('canvas', c => c.width > 0 && c.height > 0)
assert(cv9, 'demo9 画布已渲染')
await shot('f9-aurora')

console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'console clean')
await browser.close()
