/**
 * 底部导航栏组件
 * 
 * 功能包括：
 * - 主要页面导航链接
 * - 活跃状态高亮
 * - 移动端友好设计
 * - 可扩展的导航项
 */

import React from 'react';
import Link from 'next/link';

const BottomNavigation = ({ 
  className = "",
  hideOnDesktop = false,
  currentPath = "" 
}) => {
  
  // 导航项配置
  const navItems = [
    {
      href: '/',
      icon: 'fas fa-home',
      label: 'Home'
    },
    {
      href: '/favorites', 
      icon: 'fas fa-heart',
      label: 'Favorites'
    },
    {
      href: '/about',
      icon: 'fas fa-info-circle', 
      label: 'About'
    },
    {
      href: '/contact',
      icon: 'fas fa-envelope',
      label: 'Contact'
    }
  ];

  // 检查当前路径是否为活跃状态
  const isActive = (href) => {
    if (currentPath) {
      // 特殊处理根路径
      if (href === '/' && currentPath === '/') {
        return true;
      }
      if (href !== '/') {
        return currentPath === href || currentPath.startsWith(href);
      }
      return currentPath === href;
    }
    if (typeof window !== 'undefined') {
      // 特殊处理根路径
      if (href === '/' && window.location.pathname === '/') {
        return true;
      }
      if (href !== '/') {
        return window.location.pathname === href || window.location.pathname.startsWith(href);
      }
      return window.location.pathname === href;
    }
    return false;
  };

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-white/80 backdrop-blur-lg
      border-t border-white/30 shadow-2xl
      ${hideOnDesktop ? 'md:hidden' : ''} 
      ${className}
    `}>
      {/* 顶部渐变装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
      
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center py-3 px-4 rounded-2xl
                transition-all duration-300 transform hover:scale-105 active:scale-95
                ${active 
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-indigo-50 shadow-lg' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gradient-to-t hover:from-blue-50/50 hover:to-indigo-50/50'
                }
              `}
              title={item.label}
            >
              {/* 背景光晕效果 */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-indigo-100/50 rounded-2xl blur-sm"></div>
              )}
              
              {/* 图标 */}
              <div className="relative">
                <i className={`${item.icon} text-xl mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`}></i>
                {/* 图标装饰 */}
                {active && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 animate-pulse"></div>
                )}
              </div>
              
              {/* 标签文字 */}
              <span className={`text-xs font-medium transition-all duration-300 ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              
              {/* 活跃状态指示器 */}
              {active && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 