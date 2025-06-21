/**
 * 品牌Logo组件
 * 
 * 功能：
 * - 统一显示品牌Logo
 * - 如果有图标则显示图标
 * - 如果没有图标则显示品牌首字母
 * - 支持不同尺寸和样式
 */

import React, { useState } from 'react';

const BrandLogo = ({ 
  brand, 
  size = 'medium', 
  className = '',
  showGlow = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 尺寸映射
  const sizeMap = {
    small: 'w-12 h-12 text-lg',
    medium: 'w-20 h-20 text-2xl',
    large: 'w-32 h-32 text-4xl',
    xlarge: 'w-40 h-40 text-5xl'
  };
  
  // 获取品牌首字母
  const getInitials = (name) => {
    if (!name) return 'B';
    return name.charAt(0).toUpperCase();
  };
  
  // 生成基于品牌名称的颜色
  const getBrandColor = (name) => {
    if (!name) return 'from-blue-500 to-indigo-500';
    
    const colors = [
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-green-500',
      'from-yellow-500 to-orange-500'
    ];
    
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  const sizeClass = sizeMap[size] || sizeMap.medium;
  const brandColor = getBrandColor(brand.name);
  
  // 检查是否有有效的logo
  const hasValidLogo = brand.logo && 
                      brand.logo !== '' && 
                      !brand.logo.includes('placeholder') &&
                      !imageError;
  
  return (
    <div className={`relative ${className}`}>
      {hasValidLogo ? (
        <>
          {/* 图片Logo */}
          <img 
            src={brand.logo}
            alt={`${brand.name} logo`}
            className={`${sizeClass} object-contain rounded-xl bg-slate-600/80 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
            style={{ display: imageError ? 'none' : 'block' }}
          />
          
          {/* 备用首字母Logo */}
          {imageError && (
            <div className={`${sizeClass} bg-gradient-to-br ${brandColor} rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              {getInitials(brand.name)}
            </div>
          )}
        </>
      ) : (
        /* 首字母Logo */
        <div className={`${sizeClass} bg-gradient-to-br ${brandColor} rounded-xl flex items-center justify-center text-white font-extrabold shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          {getInitials(brand.name)}
        </div>
      )}
      
      {/* 装饰光晕效果 */}
      {showGlow && (
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default BrandLogo; 