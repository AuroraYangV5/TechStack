export interface Recommendation {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  reason: string;
  howToUse: string;
  tags: string[];
  icon?: string;
  localIcon?: string;
}

export type Category = 'AI工具' | '开发工具' | '设计资源' | '效率提升' | '学习资源' | '其他';
