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
  theme, 
  onThemeToggle, 
  showBackButton = false, 
  title = "BetLink",
  className = "" 
}) => {
  return (
    <header className={`bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧：Logo/返回按钮 + 网站名称 */}
          <div className="flex items-center space-x-3">
            {/* 返回按钮（可选） */}
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="返回上一页"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            )}
            
            {/* 网站Logo和名称 */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <i className="fas fa-link text-blue-600"></i>
              <span>{title}</span>
            </Link>
          </div>
          
          {/* 右侧：控制按钮区域 */}
          <div className="flex items-center space-x-4">
            {/* 主题切换按钮 */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
              aria-label="切换主题"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 