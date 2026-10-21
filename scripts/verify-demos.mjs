// 视觉验证脚本：对本机 Chrome 截图三个 demo + 一个文档嵌入页
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

console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'console clean')
await browser.close()
