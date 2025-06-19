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
  hideOnDesktop = true,
  currentPath = "" 
}) => {
  
  // 导航项配置
  const navItems = [
    {
      href: '/home',
      icon: 'fas fa-home',
      label: 'Home',
      labelCn: '主页'
    },
    {
      href: '/favorites', 
      icon: 'fas fa-heart',
      label: 'Favorites',
      labelCn: '收藏'
    },
    {
      href: '/about',
      icon: 'fas fa-info-circle', 
      label: 'About',
      labelCn: '关于'
    },
    {
      href: '/contact',
      icon: 'fas fa-envelope',
      label: 'Contact', 
      labelCn: '联系'
    }
  ];

  // 检查当前路径是否为活跃状态
  const isActive = (href) => {
    if (currentPath) {
      return currentPath === href || currentPath.startsWith(href);
    }
    if (typeof window !== 'undefined') {
      return window.location.pathname === href || window.location.pathname.startsWith(href);
    }
    return false;
  };

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-white dark:bg-gray-800 
      border-t border-gray-200 dark:border-gray-700 
      ${hideOnDesktop ? 'md:hidden' : ''} 
      ${className}
    `}>
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center py-2 px-3 
                transition-colors duration-200
                ${active 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }
              `}
              title={item.labelCn}
            >
              {/* 图标 */}
              <i className={`${item.icon} text-lg mb-1`}></i>
              
              {/* 标签文字 */}
              <span className="text-xs">{item.label}</span>
              
              {/* 活跃状态指示器 */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 