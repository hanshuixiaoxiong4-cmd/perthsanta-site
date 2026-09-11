/**
 * build.js — 构建脚本：把 TinaCMS 保存的 markdown 内容聚合成 data.json
 * Netlify 每次部署时自动运行，前端页面读取 data.json 自动渲染卡片
 */
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'data.json');
const CONTENT_ROOT = path.join(__dirname, 'content');

// 极简 frontmatter 解析（Tina 默认 YAML frontmatter）
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw.trim() };

  const data = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    if (/^\s{2,}/.test(line) && currentKey) {
      // 多行值追加
      data[currentKey] += '\n' + line.trim();
      continue;
    }
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    // 去掉首尾引号
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
    currentKey = key;
  }
  return { data, body: match[2].trim() };
}

function loadCollection(dir) {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, body } = parseFrontmatter(raw);
      return { ...data, body, slug: f.replace(/\.md$/, '') };
    });
}

// 按日期倒序（最新在前）
function byDateDesc(a, b) {
  return new Date(b.eventDate || b.date || 0) - new Date(a.eventDate || a.date || 0);
}

const result = {
  artists: loadCollection('artist'),
  schedule: loadCollection('schedule').sort(byDateDesc),
  dramaUpdates: loadCollection('dramaUpdate').sort(byDateDesc),
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf8');
console.log(`✅ data.json 已生成：`);
console.log(`   艺人：${result.artists.length} 条`);
console.log(`   行程：${result.schedule.length} 条`);
console.log(`   剧集动态：${result.dramaUpdates.length} 条`);
