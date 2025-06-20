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
  title = "BetLink",
  className = "" 
}) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧：Logo/返回按钮 + 网站名称 */}
          <div className="flex items-center space-x-3">
            {/* 返回按钮（可选） */}
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                title="Go back"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
            )}
            
            {/* 网站Logo和名称 */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <i className="fas fa-link text-blue-600"></i>
              <span>{title}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 