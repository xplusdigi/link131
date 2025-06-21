/**
 * 品牌卡片组件
 * 
 * 功能包括：
 * - 显示品牌基本信息（名称、URL、状态、描述）
 * - 复制URL功能
 * - 收藏/取消收藏功能
 * - 查看详情链接
 * - 状态标识和徽章展示
 */

import React from 'react';
import Link from 'next/link';

const BrandCard = ({ 
  brand, 
  isFavorite = false, 
  onCopyUrl, 
  onToggleFavorite, 
  copiedUrl,
  className = "" 
}) => {
  
  // 检查当前品牌的URL是否已被复制
  const isUrlCopied = copiedUrl === brand.id;
  
  // 获取状态样式类名
  const getStatusClassName = (status) => {
    const statusMap = {
      'active': 'bg-green-100 text-green-800',
      'updating': 'bg-yellow-100 text-yellow-800', 
      'inactive': 'bg-red-100 text-red-800'
    };
    return statusMap[status] || statusMap.active;
  };

  // 获取徽章样式类名
  const getBadgeClassName = (badge) => {
    const badgeMap = {
      'hot': 'bg-orange-500 text-white',
      'new': 'bg-blue-500 text-white',
      'popular': 'bg-purple-500 text-white',
      'recommended': 'bg-green-500 text-white'
    };
    return badgeMap[badge] || badgeMap.hot;
  };

  // 获取状态文本
  const getStatusText = (status) => {
    const statusTextMap = {
      'active': 'Active',
      'updating': 'Updating',
      'inactive': 'Inactive'
    };
    return statusTextMap[status] || 'Active';
  };

  return (
    <div className={`group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500 overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1 ${className}`}>
      {/* 卡片头部 - Logo和徽章 */}
      <div className="relative p-6 pb-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 品牌Logo */}
        <div className="relative flex justify-center mb-4">
          <div className="relative">
            <img 
              src={brand.logo || 'https://via.placeholder.com/80x80/6366f1/ffffff?text=LOGO'} 
              alt={brand.name}
              className="w-20 h-20 object-contain rounded-xl bg-white/80 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x80/6366f1/ffffff?text=LOGO';
              }}
            />
            {/* Logo光晕效果 */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </div>
        </div>
        
        {/* 徽章 */}
        {brand.badge && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105 ${getBadgeClassName(brand.badge)}`}>
              {brand.badgeText || brand.badge}
            </span>
          </div>
        )}
      </div>

      {/* 卡片主体内容 */}
      <div className="relative px-6 pb-4">
        {/* 品牌名称 */}
        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 text-center group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
          {brand.name}
        </h3>
        
        {/* 品牌URL */}
        <div className="flex justify-center mb-3">
          <p className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg font-mono text-center break-all group-hover:bg-blue-100 transition-colors duration-300">
            {brand.url}
          </p>
        </div>
        
        {/* 状态标识 */}
        <div className="flex justify-center mb-4">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all duration-300 group-hover:shadow-lg ${getStatusClassName(brand.status)}`}>
            <span className={`w-2.5 h-2.5 rounded-full mr-2 animate-pulse ${
              brand.status === 'active' ? 'bg-green-500' : 
              brand.status === 'updating' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            {getStatusText(brand.status)}
          </span>
        </div>
        
        {/* 品牌描述 */}
        {brand.description && (
          <p className="text-sm text-gray-600 mb-4 text-center line-clamp-3 leading-relaxed">
            {brand.description}
          </p>
        )}
      </div>

      {/* 卡片底部 - 操作按钮 */}
      <div className="relative px-6 py-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-t border-white/40">
        {/* 装饰性渐变 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative flex flex-col space-y-3">
          {/* 第一行：复制URL按钮 */}
          <button
            onClick={() => onCopyUrl && onCopyUrl(brand.url, brand.id)}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isUrlCopied 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-200' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200'
            }`}
            title={isUrlCopied ? 'URL copied' : 'Copy URL'}
          >
            <i className={`${isUrlCopied ? 'fas fa-check' : 'fas fa-copy'} mr-2 text-lg`}></i>
            {isUrlCopied ? 'Copied!' : 'Copy URL'}
          </button>
          
          {/* 第二行：收藏和详情按钮 */}
          <div className="flex space-x-3">
            {/* 收藏按钮 */}
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(brand.id)}
              className={`flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isFavorite
                  ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 hover:from-red-200 hover:to-pink-200 shadow-red-100'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-gray-100'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <i className={`${isFavorite ? 'fas fa-heart' : 'far fa-heart'} mr-2 ${isFavorite ? 'text-red-500 animate-pulse' : ''}`}></i>
              <span className="text-sm font-medium">{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
            
            {/* 详情按钮 */}
            <Link
              href={`/brand-details?id=${brand.id}`}
              className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 hover:from-indigo-200 hover:to-blue-200 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
              title="View details"
            >
              <i className="fas fa-info-circle mr-2"></i>
              <span className="text-sm font-medium">Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard; 