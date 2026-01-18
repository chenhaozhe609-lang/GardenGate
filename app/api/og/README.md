# Open Graph Image API

## 路由
`/api/og?id={postId}`

## 功能
动态生成社交媒体分享预览图片（Open Graph Images）

## 使用方法

### 参数
- `id` (必需): Post的唯一ID

### 示例
```
https://gardengate.app/api/og?id=1737214800000-abc123
```

## 技术实现

- **框架**: Next.js Edge Runtime
- **库**: @vercel/og (Vercel的OG图片生成库)
- **存储**: Firebase Firestore
- **格式**: PNG
- **尺寸**: 
  - 3:4比例: 1080 × 1440
  - 9:16比例: 1080 × 1920

## 特性

1. **动态内容**: 根据post内容和模式生成不同样式
2. **模板匹配**: 
   - Bold Insight: 深色背景 + 渐变文字
   - Cheat Sheet: 米色背景 + 深色文字
   - Zen Writer: 浅灰背景 + 优雅排版
3. **品牌一致性**: 包含handle和domain
4. **性能优化**: Edge Runtime实现毫秒级响应

## 调试

本地测试：
```
http://localhost:3000/api/og?id=your-post-id
```

浏览器中直接访问此URL可以看到生成的图片。

## 社交媒体测试工具

- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

## 注意事项

1. 需要部署到支持Edge Runtime的平台（如Vercel）
2. 本地开发需要Next.js 13+
3. 文字过长会自动截断（最多200字符）
4. 生成的图片会被CDN缓存
