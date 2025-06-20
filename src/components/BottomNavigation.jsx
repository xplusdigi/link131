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
      bg-white 
      border-t border-gray-200 
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
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
                }
              `}
              title={item.label}
            >
              {/* 图标 */}
              <i className={`${item.icon} text-lg mb-1`}></i>
              
              {/* 标签文字 */}
              <span className="text-xs">{item.label}</span>
              
              {/* 活跃状态指示器 */}
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 