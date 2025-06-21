/**
 * 页面布局组件
 * 
 * 功能包括：
 * - 统一的页面结构
 * - 顶部和底部导航栏
 * - 主题管理
 * - 响应式设计
 */

import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

const Layout = ({ 
  children, 
  showBackButton = false,
  title = "BetLink",
  showBottomNav = true,
  className = "",
  currentPath = ""
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${className}`}>
      {/* 顶部导航栏 */}
      <Header 
        showBackButton={showBackButton}
        title={title}
      />
      
      {/* 主要内容区域 - 为底部导航栏预留空间 */}
      <main className={`transition-all duration-300 ease-in-out ${showBottomNav ? 'pb-20 md:pb-20' : 'pb-8'}`}>
        <div className="animate-fadeIn">
          {children}
        </div>
      </main>
      
      {/* 底部导航栏 */}
      {showBottomNav && (
        <BottomNavigation 
          currentPath={currentPath}
        />
      )}
      
      {/* 添加自定义动画样式 */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Layout; 