# 创作指南：如何新增内容

本项目的统一模型：**一切内容 = 专题（topic）**。一个专题 = 若干 Markdown 文档页 + 若干自包含 demo HTML。物理专题与器件专题同构，新增任何主题都是同一套动作。

## 目录规范

```text
docs/
├── physics/                 # 栏目一：通用物理演示
│   └── <topic>/             #   每个专题一个目录
├── sensing/                 # 栏目二：感知器件评估
│   ├── <device>/            #   每类器件一个目录（camera/ mic/ imu/…）
│   │   └── <topic>.md
│   └── methodology.md       #   通用方法论
├── guide/                   # 创作指南（本页）
└── public/demos/            # 全部交互 demo（静态托管，不参与构建）
    ├── camera/<demo>/       #   按栏目分组
    ├── common/<demo>/       #   跨器件共用 demo
    └── physics/<demo>/      #   AI_Physics 导入落点
```

## 新增一个文档专题

1. 在对应栏目目录下新建 `<topic>.md`；
2. 在 `docs/.vitepress/config.mts` 的 sidebar（必要时 nav）里加一项；
3. 按下面模板写内容。

### 文档模板

```markdown
# <专题名>

> 关键词：三个以内，方便检索

## 原理
物理机制讲清楚，公式给直觉解释而不是只给形式。

## 现象与物理
现象 → 成因的映射表或分小节。

## 测试方法
| 测试 | 器材 | 步骤 | 判据 |   ← 表格化，可执行

## 交互演示
<DemoEmbed src="/demos/<栏目>/<demo>/" title="演示标题" :aspect="`4 / 3`" />
配 3~4 条「试这些操作」引导。

## 选型速查 / 选型建议
场景 → 建议的映射，写清前提条件。

## 延伸阅读
交叉链接到相关专题。
```

## 新增一个交互 demo

demo 是**一个目录一个 `index.html`**，铁律继承自 AI_Physics 项目：

- **自包含**：全部 JS/CSS 内联，零 CDN、零外部资源、零构建；
- **可移植**：双击 `file://` 直接打开也能跑（因此不要引用站内共享脚本，工具函数宁可每个 demo 复制一份）；
- **两种风格**（只是编写风格，不是两套框架）：
  - **剧本式**：确定性时序演示，提供 播放/暂停/单步/重置，关键事件在画面上标注——适合「快到看不见」的过程（逐行曝光、时钟漂移）；
  - **仿真式**：参数面板（滑杆/开关）+ 实时画面 + 数值读数——适合建立 trade-off 直觉；
- 目录名用英文短横线（`rolling-shutter`），页面文案中文；
- 同目录放一个简短 `README.md`（一两段话：演示什么、对应哪篇文档）。

在文档中嵌入：

```markdown
<DemoEmbed src="/demos/<栏目>/<demo>/" title="演示标题" :aspect="`4 / 3`" />
```

## 导入 AI_Physics 动画 {#import-ai-physics}

AI_Physics 的每个主题是自包含 `index.html`（20K~68K，vanilla JS + WebGL/Canvas），导入三步：

1. **拷贝**：把主题目录（如 `blackhole/`）整个拷到 `docs/public/demos/physics/blackhole/`（只拷 `index.html` 即可，其 README/start.sh 不需要）；
2. **建文档**：`docs/physics/blackhole.md` 按文档模板写原理讲解；
3. **嵌入**：文档里 `<DemoEmbed src="/demos/physics/blackhole/" title="黑洞：光线弯曲与吸积盘" />`，并在 sidebar 注册。

AI_Physics 页面是零依赖自包含 HTML，与 iframe 嵌入天然兼容；若其页面自带全屏/说明，嵌入时可加 `:aspect="`16 / 9`"` 等适配参数。

## 新增一个栏目

1. `docs/` 下建目录（如 `engineering/`）；
2. `config.mts` 加 nav + sidebar 条目；
3. `docs/index.md` 的 features 里视需要加卡片；
4. `docs/public/demos/` 下建同名子目录。

## 本地开发与构建

```bash
npm install
npm run docs:dev      # 开发预览 http://localhost:5173
npm run docs:build    # 产出静态站 docs/.vitepress/dist/
npm run docs:preview  # 本地预览构建产物
```

注意：VitePress 构建会校验死链，交叉链接写错会直接构建失败（这是特性，不是 bug）。demo 的 HTML 放在 `public/` 下不参与构建，`file://` 可直接打开抽查。
