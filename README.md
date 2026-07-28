<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# AI Portfolio

个人 AI 作品集网站，首页保留 Magic UI Portfolio 风格，在 My Projects 里展示三个自研 AI demo：

1. **AI Interview Coach / 个人 AI 面试助手** — GankInterview 风格的 SaaS Landing + Dashboard + 功能页（`/demos/interview-assistant`）
2. **企业知识库 RAG Demo** — PandaWiki 风格的知识工作台（`/demos/knowledge-base`）
3. **简历筛选 / 招聘助手** — 招聘仪表盘（`/demos/recruiting-assistant`）

Built with Next.js 16, [shadcn/ui](https://ui.shadcn.com/), TailwindCSS v4, Framer Motion, Magic UI.

## 在线访问

生产环境部署在 Vercel：

- 主站：<https://portfolio-site-seven-mocha.vercel.app>
- AI 面试助手：<https://portfolio-site-seven-mocha.vercel.app/demos/interview-assistant>
- 知识库 Demo：<https://portfolio-site-seven-mocha.vercel.app/demos/knowledge-base>
- 招聘助手：<https://portfolio-site-seven-mocha.vercel.app/demos/recruiting-assistant>

> 域名后缀 `seven-mocha` 是 Vercel 自动生成的 alias，可在 Vercel 项目 Settings → Domains 改成自定义域名或更短的免费别名。

## 本地开发

```bash
# 1. 安装依赖（任选一个包管理器）
pnpm install
# 或 npm install / yarn install

# 2. 启动 dev server
pnpm dev
# 打开 http://localhost:3000

# 3. 生产构建 + 本地预览
pnpm build
pnpm start
```

Node ≥ 18（推荐 20+）。项目依赖 `@content-collections/next`，首次 `dev`/`build` 会自动生成 `.content-collections/`（已被 `.gitignore` 忽略）。

## 项目结构

```
src/
├── app/
│   ├── page.tsx                          # 首页（Magic UI Portfolio 风格）
│   ├── blog/                             # MDX 博客
│   └── demos/
│       ├── interview-assistant/          # AI 面试助手（landing + app/* 功能页）
│       ├── knowledge-base/               # PandaWiki 风格知识库 Demo
│       └── recruiting-assistant/         # 招聘助手 Demo
├── components/
│   ├── demo/                             # 三个 Demo 的实现（demo-layouts / interview-* / demo-page）
│   ├── magicui/                          # Magic UI 组件
│   ├── ui/                               # shadcn/ui 组件
│   └── navbar.tsx                        # 全局 Dock（在 fullscreen demo 页自动隐藏）
├── data/
│   ├── resume.tsx                        # ⭐ 首页项目数据 + 简历内容（改这里改个人信息）
│   └── ai-demos.ts                       # 三个 demo 的元数据
└── lib/                                  # 工具函数
content/                                  # 博客 MDX 源文件
scripts/prepare-sites-static.mjs          # 生成 Cloudflare/Sites 静态 worker（可选）
tests/                                    # node:test 内容校验
```

## 部署到 Vercel（已配置好）

本项目已通过 Vercel CLI 关联到生产项目 `a-cf7c/portfolio-site`。后续有两种部署方式：

### 方式 A：git push 自动部署（推荐）

把本地代码 push 到一个你自己账号下的 GitHub 仓库，然后在 Vercel 项目 Settings → Git 连接该仓库。之后每次 `git push main` 都会自动触发 Vercel 重新构建并部署到生产。

```bash
# 1. 在 GitHub 创建空仓库 ai-portfolio-site（不勾 README / .gitignore / license）
# 2. 改 remote 指向自己的仓库
git remote rename origin upstream                      # 保留 magicuidesign 为 upstream
git remote add origin https://github.com/<你的用户名>/ai-portfolio-site.git
git push -u origin main
# 3. 去 Vercel 项目 Settings → Git 连接该仓库
```

### 方式 B：Vercel CLI 手动部署

```bash
# 已登录 vercel CLI 的情况下，在项目根目录执行
vercel deploy --prod --yes
# 或不带 --yes 走交互流程
vercel deploy --prod
```

> 注意：Vercel CLI 57 在 Windows 上把 token 存进 Windows 凭据管理器（Credential Manager / keyring），不是 `auth.json` 文件。`vercel whoami` 在能访问 keyring 的 shell（普通 Git Bash / PowerShell / CMD）里才能读到登录态。如果换 shell 报 `No existing credentials found`，重新 `vercel login` 即可。

## 自定义域名

1. 在 Vercel 项目 → Settings → Domains 添加你的域名
2. 按提示到域名 DNS 服务商添加 CNAME 记录指向 `cname.vercel-dns.com`
3. Vercel 自动签发 HTTPS 证书，几分钟后生效

## 更新简历内容

所有个人信息集中在 `src/data/resume.tsx`：

```ts
export const DATA = {
  name: "Dillion Verma",              // ← 改成你的名字
  initials: "DV",
  url: "https://dillion.io",          // ← 改成你的域名（部署后改成 Vercel 域名或自定义域名）
  location: "San Francisco, CA",
  description: "...",
  avatarUrl: "/me.png",               // ← 把 public/me.png 换成你的头像
  contact: {
    email: "hello@example.com",       // ← 改成你的邮箱
    social: {
      GitHub: { url: "https://..." },  // ← 改成你的 GitHub
      LinkedIn: { url: "https://..." },
      X: { url: "https://..." },
    },
  },
  work: [...],                        // 工作经历
  education: [...],                   // 教育背景
  projects: [...],                    // My Projects 卡片数据
  // ...
}
```

改完后 `pnpm dev` 本地预览，满意了 `git push`（自动部署）或 `vercel deploy --prod`（手动部署）。

## 测试

```bash
# 内容校验：三个 demo 路由存在、布局标记完整、landing 关键文案
node --test tests/portfolio-content.test.mjs

# Sites 静态 worker 校验（仅当用 Cloudflare Sites 部署时需要）
node --test tests/sites-static-worker.test.mjs
# 跑 sites-static-worker 测试前需要先生成 dist
node scripts/prepare-sites-static.mjs
```

## 三个 Demo 的设计参考

- **AI Interview Coach**：参考 [GankInterview](https://gankInterview.com) 的 SaaS 首页 + 仪表盘布局，landing 走「hero + features + pricing + CTA」，app 走「sidebar 多功能页 + 主面板」。功能页包括 Practice / Resume / Jobs / History / Report / Settings，登录页支持 Email + Google + GitHub。
- **企业知识库 Demo**：参考 [chaitin/PandaWiki](https://github.com/chaitin/PandaWiki) 的产品形态，覆盖 wiki 门户 / AI Q&A / 知识源导入（URL / Sitemap / RSS / File Upload）/ 模型配置 / 集成渠道（钉钉 / 飞书 / 企业微信）/ 数据分析等模块。
- **简历筛选 / 招聘助手**：招聘方仪表盘，展示候选人列表、简历评分、岗位匹配、面试排期等。

## 原始模板

基于 [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio)（MIT License），在此基础上新增三个 AI demo 并做产品化改写。
