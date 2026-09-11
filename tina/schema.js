import { defineConfig } from "tinacms";

// TinaCMS 配置文件
// 部署到 Netlify 后，在 TinaCloud 填入 clientId 和 token
export default defineConfig({
  branch: "main",
  // 在 TinaCloud 创建项目后，把这里填上
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "artist",
        label: "艺人档案",
        path: "content/artist",
        format: "md",
        fields: [
          { name: "name", label: "艺人名字", type: string, required: true },
          { name: "avatarUrl", label: "头像图片链接", type: "string" },
          { name: "profession", label: "职业 / 品牌", type: "string" },
          { name: "socialMedia", label: "社交账号（每行一个）", type: "string", ui: { component: "textarea" } },
          { name: "intro", label: "详细介绍", type: "rich-text" },
          { name: "extraImages", label: "更多图片链接（每行一个）", type: "string", ui: { component: "textarea" } }
        ]
      },
      {
        name: "schedule",
        label: "行程表",
        path: "content/schedule",
        format: "md",
        fields: [
          { name: "title", label: "行程标题", type: "string", required: true },
          { name: "eventDate", label: "行程日期", type: "datetime", required: true },
          {
            name: "category", label: "分类", type: "string",
            options: [
              { value: "offline", label: "线下活动" },
              { value: "live", label: "线上直播" },
              { value: "press", label: "发布会" }
            ]
          },
          { name: "desc", label: "行程详情", type: "rich-text" },
          { name: "posterUrl", label: "海报图片链接", type: "string" },
          { name: "link", label: "外部原帖链接", type: "string" }
        ]
      },
      {
        name: "dramaUpdate",
        label: "心之所归 · 剧集动态",
        path: "content/dramaUpdate",
        format: "md",
        fields: [
          { name: "title", label: "动态标题", type: "string", required: true },
          { name: "eventDate", label: "事件日期", type: "datetime", required: true },
          {
            name: "category", label: "分类", type: "string",
            options: [
              { value: "read", label: "剧本围读" },
              { value: "shoot", label: "拍摄路透" },
              { value: "trailer", label: "预告片" },
              { value: "ep", label: "剧集正片" },
              { value: "interview", label: "采访" }
            ]
          },
          { name: "content", label: "正文", type: "rich-text" },
          { name: "previewImgUrl", label: "列表预览图链接", type: "string" },
          { name: "fullImgUrl", label: "弹窗大图链接（原图不裁切）", type: "string" },
          { name: "videoEmbed", label: "视频 iframe 嵌入代码", type: "string", ui: { component: "textarea" } }
        ]
      }
    ]
  }
});
