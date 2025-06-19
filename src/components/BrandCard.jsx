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
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'updating': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', 
      'inactive': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
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
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 overflow-hidden ${className}`}>
      {/* 卡片头部 - Logo和徽章 */}
      <div className="relative p-6 pb-4">
        {/* 品牌Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={brand.logo || 'https://via.placeholder.com/80x80/6366f1/ffffff?text=LOGO'} 
            alt={brand.name}
            className="w-20 h-20 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-2"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80x80/6366f1/ffffff?text=LOGO';
            }}
          />
        </div>
        
        {/* 徽章 */}
        {brand.badge && (
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeClassName(brand.badge)}`}>
              {brand.badgeText || brand.badge}
            </span>
          </div>
        )}
      </div>

      {/* 卡片主体内容 */}
      <div className="px-6 pb-4">
        {/* 品牌名称 */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          {brand.name}
        </h3>
        
        {/* 品牌URL */}
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3 text-center break-all">
          {brand.url}
        </p>
        
        {/* 状态标识 */}
        <div className="flex justify-center mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClassName(brand.status)}`}>
            <span className={`w-2 h-2 rounded-full mr-1.5 ${
              brand.status === 'active' ? 'bg-green-500' : 
              brand.status === 'updating' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            {getStatusText(brand.status)}
          </span>
        </div>
        
        {/* 品牌描述 */}
        {brand.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center line-clamp-3">
            {brand.description}
          </p>
        )}
      </div>

      {/* 卡片底部 - 操作按钮 */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <div className="flex flex-col space-y-2">
          {/* 第一行：复制URL按钮 */}
          <button
            onClick={() => onCopyUrl && onCopyUrl(brand.url, brand.id)}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isUrlCopied 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            title={isUrlCopied ? 'URL已复制' : '复制URL'}
          >
            <i className={`${isUrlCopied ? 'fas fa-check' : 'fas fa-copy'} mr-2`}></i>
            {isUrlCopied ? 'Copied!' : 'Copy URL'}
          </button>
          
          {/* 第二行：收藏和详情按钮 */}
          <div className="flex space-x-2">
            {/* 收藏按钮 */}
            <button
              onClick={() => onToggleFavorite && onToggleFavorite(brand.id)}
              className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
              title={isFavorite ? '取消收藏' : '添加到收藏'}
            >
              <i className={`${isFavorite ? 'fas fa-heart' : 'far fa-heart'} mr-1.5`}></i>
              <span className="text-sm">{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
            
            {/* 详情按钮 */}
            <Link
              href={`/brand-details?id=${brand.id}`}
              className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg font-medium transition-colors"
              title="查看详情"
            >
              <i className="fas fa-info-circle mr-1.5"></i>
              <span className="text-sm">Details</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard; 