import { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  Info, 
  ChevronRight, 
  LayoutGrid, 
  Zap, 
  Code, 
  Palette, 
  BookOpen, 
  MoreHorizontal,
  X,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RECOMMENDATIONS, CATEGORIES } from './constants';
import { Recommendation } from './types';

// --- Main App Component ---
export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedItem, setSelectedItem] = useState<Recommendation | null>(null);

  const filteredRecommendations = useMemo(() => {
    return RECOMMENDATIONS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === '全部' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '全部': return <LayoutGrid size={18} />;
      case 'AI工具': return <Zap size={18} />;
      case '开发工具': return <Code size={18} />;
      case '设计资源': return <Palette size={18} />;
      case '学习资源': return <BookOpen size={18} />;
      case '效率提升': return <Zap size={18} />;
      default: return <MoreHorizontal size={18} />;
    }
  };

  const getIconSource = (item: Recommendation) => {
    if (item.localIcon) {
      return new URL(`./assets/${item.localIcon}`, import.meta.url).href;
    }
    return `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`;
  };

  const renderIcon = (item: Recommendation, sizeClass: string = "w-12 h-12") => {
    if (item.name === 'Flow') {
      return (
        <div className={`${sizeClass} bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#1A1A1A] p-1`}>
          <span className="text-[10px] font-black tracking-tighter uppercase leading-none">Flow</span>
        </div>
      );
    }

    // Special handling for NotebookLM as it has a wide logo
    const isNotebookLM = item.name === 'NotebookLM';
    const containerClass = isNotebookLM 
      ? sizeClass.replace(/w-\d+/, 'w-28') // Make it wider
      : sizeClass;

    return (
      <div className={`${containerClass} bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-center overflow-hidden group-hover:border-[#1A1A1A] transition-colors p-2`}>
        <img 
          src={getIconSource(item)} 
          alt={item.name}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to network if local fails (though unlikely if file exists)
            const target = e.target as HTMLImageElement;
            const networkUrl = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`;
            if (target.src !== networkUrl) {
              target.src = networkUrl;
            }
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-[#E2E8F0]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white">
              <Zap size={24} fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">TechStack</h1>
              <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">优质工具与网站推荐</p>
            </div>
          </div>

          <div className="relative group max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1A1A1A] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="搜索工具、网站或标签..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#1A1A1A]/10 focus:bg-white transition-all outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Categories */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h2 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-4 px-3">分类浏览</h2>
            <nav className="space-y-1">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category 
                    ? 'bg-[#1A1A1A] text-white shadow-lg shadow-[#1A1A1A]/10' 
                    : 'text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]'
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </nav>
            
            <div className="mt-12 p-6 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
              <h3 className="text-sm font-bold mb-2">关于本站</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                这里分享我个人在开发和设计过程中发现的宝藏工具。纯内容分享，无任何商业推广。
              </p>
            </div>
          </div>
        </aside>

        {/* Content Grid */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              {selectedCategory}
              <span className="text-xs font-normal bg-[#F3F4F6] text-[#6B7280] px-2 py-0.5 rounded-full">
                {filteredRecommendations.length}
              </span>
            </h2>
          </div>

          {filteredRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecommendations.map((item) => (
                <motion.div
                  layoutId={item.id}
                  key={item.id}
                  className="group bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:border-[#1A1A1A] hover:shadow-xl hover:shadow-[#1A1A1A]/5 transition-all cursor-pointer flex flex-col h-full"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start mb-4">
                    {renderIcon(item)}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] bg-[#F9FAFB] px-2 py-1 rounded-md border border-[#F3F4F6]">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold mb-2 group-hover:text-[#1A1A1A] transition-colors">{item.name}</h3>
                  <p className="text-sm text-[#6B7280] line-clamp-2 mb-4 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-medium text-[#4B5563] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6] mt-auto">
                    <div className="flex items-center text-xs font-bold text-[#1A1A1A] group-hover:translate-x-1 transition-transform">
                      查看详情 <ChevronRight size={14} />
                    </div>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-[#9CA3AF] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] rounded-lg transition-all"
                      title="直接打开"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-[#E5E7EB]">
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#9CA3AF] mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-bold mb-1">未找到相关内容</h3>
              <p className="text-sm text-[#6B7280]">尝试更换搜索关键词或分类</p>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={selectedItem.id}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 overflow-y-auto">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-[#F3F4F6] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  {renderIcon(selectedItem, "w-16 h-16")}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#F3F4F6] text-[#6B7280] px-2 py-1 rounded-md">
                        {selectedItem.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="text-xs text-[#6B7280]">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Info size={14} /> 工具简介
                    </h4>
                    <p className="text-[#4B5563] leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </section>

                  <section className="p-6 bg-[#F9FAFB] rounded-2xl border border-[#F3F4F6]">
                    <h4 className="text-xs font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap size={14} fill="#1A1A1A" /> 推荐理由
                    </h4>
                    <p className="text-[#1A1A1A] font-medium leading-relaxed">
                      {selectedItem.reason}
                    </p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Code size={14} /> 如何使用
                    </h4>
                    <p className="text-[#4B5563] leading-relaxed whitespace-pre-wrap">
                      {selectedItem.howToUse}
                    </p>
                  </section>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-[#F3F4F6] flex gap-4">
                <a 
                  href={selectedItem.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold hover:bg-[#333] transition-all shadow-lg shadow-[#1A1A1A]/10 active:scale-[0.98]"
                >
                  立即访问 <ArrowUpRight size={18} />
                </a>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-8 border border-[#E5E7EB] rounded-2xl font-bold hover:bg-[#F3F4F6] transition-all"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[#E5E7EB] mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Zap size={18} />
            <span className="text-sm font-bold tracking-tight">TechStack</span>
          </div>
          <p className="text-sm text-[#9CA3AF]">
            © 2026 TechStack. 由 Google AI Studio 构建。
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">关于我</a>
            <a href="#" className="text-sm text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">提交推荐</a>
            <a href="#" className="text-sm text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
