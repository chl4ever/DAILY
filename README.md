# 前线简报 · Frontline Brief

## 部署步骤

### 1. 上传到 GitHub
- 去 https://github.com/new 新建仓库（Private）
- 把整个文件夹上传进去

### 2. 部署到 Vercel
- 去 https://vercel.com → Add New Project → 选 GitHub 仓库
- Framework Preset 选 "Other" → Deploy

### 3. 创建 Upstash Redis 数据库
- Vercel 项目页 → Storage → Upstash → 点右边箭头 →
- 选 Redis → Create → 选离你最近的区域（Singapore）→ Create
- 点 "Connect to Project" → 选你的项目
- ✅ 环境变量会自动注入（UPSTASH_REDIS_REST_URL / TOKEN）

### 4. 设置发布密码（可选）
- Vercel 项目 → Settings → Environment Variables
- 添加：EDITOR_PASSWORD = 你的密码
- 点 Redeploy

### 5. 开始使用
- 主页：https://xxx.vercel.app
- 编辑器：https://xxx.vercel.app/editor
- 发布后每期链接：https://xxx.vercel.app/brief/20260305

## 每日流程
打开 /editor → 填内容 → 点发布 → 复制链接 → 发微信群 ✓
