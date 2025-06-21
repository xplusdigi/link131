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
import BrandLogo from './BrandLogo';

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
    <div className={`group bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden flex flex-col h-full ${className}`}>
      {/* 卡片头部 - Logo和徽章 */}
      <div className="relative p-6 pb-4">
        {/* 品牌Logo */}
        <div className="flex justify-center mb-4">
          <BrandLogo 
            brand={brand}
            size="medium"
            showGlow={false}
          />
        </div>
        
        {/* 徽章 */}
        {brand.badge && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getBadgeClassName(brand.badge)}`}>
              {brand.badgeText || brand.badge}
            </span>
          </div>
        )}
      </div>

      {/* 卡片主体内容 - 使用flex-1占据剩余空间 */}
      <div className="flex-1 px-6 pt-0 pb-4 flex flex-col">
        {/* 品牌名称 */}
        <h3 className="text-xl font-bold text-slate-200 mb-3 text-center">
          {brand.name}
        </h3>
        
        {/* 品牌URL */}
        <div className="flex justify-center mb-3">
          <p className="text-sm text-blue-400 bg-slate-700 px-3 py-1 rounded-lg font-mono text-center break-all">
            {brand.url}
          </p>
        </div>
        
        {/* 状态标识 */}
        <div className="flex justify-center mb-4">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClassName(brand.status)}`}>
            <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
              brand.status === 'active' ? 'bg-green-500' : 
              brand.status === 'updating' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            {getStatusText(brand.status)}
          </span>
        </div>
        
        {/* 品牌描述 - 占据剩余空间 */}
        <div className="flex-1">
          {brand.description && (
            <p className="text-sm text-slate-400 text-center line-clamp-3 leading-relaxed">
              {brand.description}
            </p>
          )}
        </div>
      </div>

      {/* 卡片底部 - 简约操作按钮 */}
      <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50">
        <div className="flex gap-2">
          {/* 复制URL按钮 */}
          <button
            onClick={() => onCopyUrl && onCopyUrl(brand.url, brand.id)}
            className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isUrlCopied 
                ? 'bg-green-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            title={isUrlCopied ? 'URL copied' : 'Copy URL'}
          >
            <i className={`${isUrlCopied ? 'fas fa-check' : 'fas fa-copy'} mr-1.5`}></i>
            {isUrlCopied ? 'Copied' : 'Copy URL'}
          </button>
          
          {/* 收藏按钮 */}
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(brand.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFavorite
                ? 'bg-red-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`${isFavorite ? 'fas fa-heart' : 'far fa-heart'}`}></i>
          </button>
          
          {/* 详情按钮 */}
          <Link
            href={`/brand-details?id=${brand.id}`}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium transition-colors"
            title="View details"
          >
            <i className="fas fa-info-circle"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandCard; 