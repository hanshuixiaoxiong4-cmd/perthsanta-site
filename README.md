# PerthSanta 粉丝站 — 完整搭建指南

## 项目结构
```
perthsanta-drama/
├── index.html        首页
├── artists.html      艺人档案
├── schedule.html     行程表
├── drama.html       心之所归·剧集动态
├── build.js          构建脚本（自动把内容打包成 data.json）
├── package.json
├── netlify.toml      Netlify 配置
└── tina/
    └── schema.js     TinaCMS 内容模型配置
```

---

## 一、注册三个免费账号
1. **GitHub** → https://github.com 注册
2. **TinaCloud** → https://app.tina.io 用 GitHub 登录
3. **Netlify** → https://netlify.com 用 GitHub 登录

---

## 二、在 GitHub 建仓库
1. 点 New repository
2. 仓库名填：`perthsanta-site`
3. 选 Public（公开）
4. 不要勾选 README / .gitignore
5. 点 Create repository

---

## 三、上传项目文件到 GitHub
把本文件夹里的 **所有文件** 都上传到仓库根目录：
- index.html
- artists.html
- schedule.html
- drama.html
- build.js
- package.json
- netlify.toml
- tina/schema.js

操作方法：GitHub 仓库页 → Add file → Upload files → 把文件拖进去 → Commit。

---

## 四、在 TinaCloud 创建项目
1. app.tina.io → New Project
2. 选你的 GitHub 仓库 `perthsanta-site`
3. Branch 选 `main`
4. Tina 会自动读取 `tina/schema.js`
5. 创建完成后，Tina 会给你 **Client ID** 和 **Token**
6. 把这两个值填到 Netlify 的环境变量里（下一步）

---

## 五、在 Netlify 部署
1. Netlify → Add new site → Import an existing project
2. 选 GitHub → 授权 → 选 `perthsanta-site`
3. 构建设置会自动读取 netlify.toml：
   - Build command: `npm run build`
   - Publish directory: `.`
4. 点 **Show advanced** → Add new variable：
   - `TINA_CLIENT_ID` = 从 TinaCloud 复制的 Client ID
   - `TINA_TOKEN` = 从 TinaCloud 复制的 Token
5. 点 Deploy site

---

## 六、日常更新（以后只做这个）
1. 打开 TinaCloud 后台
2. 左侧选要更新的栏目：
   - 艺人档案
   - 行程表
   - 心之所归·剧集动态
3. 点 **New Document** → 填表单 → Save
4. Netlify 自动检测到仓库变化 → 自动运行 build.js → 自动部署
5. 等待 1~2 分钟，网站自动更新，链接不变

---

## 七、图片和视频
- **图片**：全部用图床直链（Postimages / 微博图床 / 自建），粘贴到表单里
- **视频**：上传 B站 / YouTube，点「分享 → 嵌入」，复制 iframe 代码，粘贴到「视频 iframe 嵌入代码」字段
- 图片 CSS 已设 `object-fit:contain`，原图完整展示，不会裁切

---

## 八、数据安全
- 所有内容存在你自己的 GitHub 仓库
- GitHub 自带版本历史，误删可一键回滚
- 不依赖第三方数据库，不会出现 Airtable 那种 API 断连问题
