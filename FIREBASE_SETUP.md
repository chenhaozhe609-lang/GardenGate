# 🔥 Firebase集成说明

## 环境变量配置

创建 `.env.local` 文件，并添加以下Firebase配置：

```env
# ===== Firebase配置 =====
# 从 Firebase Console > 项目设置 > 您的应用 > SDK 设置和配置 中获取

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# ===== 应用配置 =====
# 生产环境请替换为您的实际域名
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Firebase项目设置步骤

### 1. 创建Firebase项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"
3. 输入项目名称：`GardenGate`
4. 可选：启用 Google Analytics
5. 创建项目

### 2. 启用Firestore Database

1. 在左侧菜单选择 **Build** → **Firestore Database**
2. 点击"创建数据库"
3. 选择模式：
   - **测试模式**（开发阶段）：30天免费访问
   - **生产模式**（上线后）：需配置安全规则
4. 选择服务器位置（推荐）：
   - `asia-northeast1` (东京) - 中国大陆访问较快
   - `asia-east1` (台湾)
5. 点击"启用"

### 3. 获取Web应用配置

1. 在项目概览页面，点击 **Web图标** `</>`
2. 注册应用，输入昵称：`GardenGate Web`
3. **不需要**勾选 Firebase Hosting
4. 复制显示的配置代码中的值到 `.env.local`

### 4. 设置Firestore安全规则

在 **Firestore Database** → **规则** 标签页，替换为以下规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection
    match /posts/{postId} {
      // 允许所有人读取
      allow read: if true;
      
      // 允许所有人创建（生产环境建议添加限流）
      allow create: if true;
      
      // 暂时禁止更新和删除
      allow update, delete: if false;
    }
  }
}
```

点击"发布"保存规则。

### 5. （可选）创建索引

如需优化查询性能，可在 **Firestore Database** → **索引** 标签页创建：

- **集合ID**: `posts`
- **字段1**: `createdAt` (降序)
- **查询范围**: 集合

## 部署检查清单

- [ ] 已创建Firebase项目
- [ ] 已启用Firestore Database
- [ ] 已获取并配置所有环境变量到 `.env.local`
- [ ] 已设置Firestore安全规则
- [ ] 本地测试：`npm run dev` 并尝试发布一个post
- [ ] 在Firestore Console中验证数据已保存到 `posts` 集合

## 生产环境部署

如果使用Vercel部署，需要在 **Settings** → **Environment Variables** 中添加所有 `NEXT_PUBLIC_*` 环境变量。

## 数据结构

Post数据在Firestore中的结构：

```typescript
{
  id: string;              // 文档ID
  text: string;            // 文本内容
  mode: string;            // bold-insight | cheat-sheet | zen-writer
  aspectRatio: string;     // 3:4 | 9:16
  createdAt: number;       // Unix timestamp
  handle: string;          // @GardenGate
  brandType: string;       // domain | qrcode
  customDomain: string;    // gardengate.app
}
```

## 费用说明

Firebase免费额度（Spark计划）：
- **读取**: 50,000次/天
- **写入**: 20,000次/天
- **删除**: 20,000次/天
- **存储**: 1 GB

对于MVP阶段完全够用！
