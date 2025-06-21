/**
 * 顶部导航栏组件
 * 
 * 功能包括：
 * - 网站Logo和名称展示
 * - 主题切换按钮
 * - 响应式设计
 */

import React from 'react';
import Link from 'next/link';

const Header = ({ 
  showBackButton = false, 
  title = "Link131",
  className = "" 
}) => {
  return (
    <header className={`bg-slate-800/90 backdrop-blur-md shadow-lg border-b border-slate-700/50 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧：Logo/返回按钮 + 网站名称 */}
          <div className="flex items-center space-x-3">
            {/* 返回按钮（可选） */}
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="p-2.5 rounded-xl text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-all duration-200"
                title="Go back"
              >
                <i className="fas fa-arrow-left text-lg"></i>
              </button>
            )}
            
            {/* 网站Logo和名称 */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 text-xl font-bold text-blue-400 hover:text-blue-300 transition-all duration-200"
            >
              <i className="fas fa-link text-2xl"></i>
              <span className="font-extrabold tracking-tight">{title}</span>
            </Link>
          </div>
          
          {/* 右侧：预留扩展空间 */}
          <div className="flex items-center space-x-2">
            {/* 可在此添加其他功能按钮 */}
          </div>
        </div>
      </div>
      
      {/* 简约边框效果 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 opacity-30"></div>
    </header>
  );
};

export default Header; 