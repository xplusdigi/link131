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
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* 顶部导航栏 */}
      <Header 
        showBackButton={showBackButton}
        title={title}
      />
      
      {/* 主要内容区域 - 为底部导航栏预留空间 */}
      <main className={`${showBottomNav ? 'pb-20 md:pb-20' : 'pb-8'}`}>
        {children}
      </main>
      
      {/* 底部导航栏 */}
      {showBottomNav && (
        <BottomNavigation 
          currentPath={currentPath}
        />
      )}
    </div>
  );
};

export default Layout; 