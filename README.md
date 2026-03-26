# TechStack - 优质工具与网站推荐

TechStack 是一个精选的优质网站、工具推荐平台。它旨在为开发者、设计师和提高效率的爱好者提供一个发现好工具的窗口。

## 🚀 功能特点

- **精选推荐**：展示所有推荐的网站和工具。
- **详细信息**：点击卡片查看工具详情，包括简介、推荐理由和使用指南。
- **一键访问**：提供直接跳转链接，方便快捷。
- **分类浏览**：支持按 AI工具、开发工具、设计资源、效率提升等分类筛选。
- **实时搜索**：支持通过名称、描述或标签进行实时搜索。
- **响应式设计**：完美适配桌面和移动端。

## 🛠️ 技术栈

- **Frontend**: React 19, TypeScript
- **Backend**: Firebase (Firestore & Auth)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Build Tool**: Vite

## 📂 项目结构

- `src/App.tsx`: 应用主入口和 UI 逻辑。
- `src/constants.ts`: 存储所有的推荐数据和分类。
- `src/types.ts`: 定义数据模型。
- `src/index.css`: 全局样式配置。

## 📖 如何添加新推荐

1. 打开 `src/constants.ts` 文件。
2. 在 `RECOMMENDATIONS` 数组中添加一个新的对象，符合 `Recommendation` 接口定义：

```typescript
{
  id: 'unique-id',
  name: '工具名称',
  url: '工具链接',
  category: '所属分类',
  description: '工具简介',
  reason: '推荐理由',
  howToUse: '使用指南',
  tags: ['标签1', '标签2'],
}
```

## 📄 许可证

本项目采用 Apache-2.0 许可证。
