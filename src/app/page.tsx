/**
 * Link131 主页组件 - 使用Layout组件重构版本
 * 
 * 这是一个博彩网站URL查询助手的主页面，主要功能包括：
 * 1. 展示热门博彩品牌信息和URL
 * 2. 提供搜索和筛选功能
 * 3. 支持收藏和复制URL功能
 * 4. 深色/浅色主题切换
 * 5. 显示最近更新的品牌信息
 * 
 * 新架构优势：
 * - 使用Layout组件统一页面结构
 * - 导航栏组件化，便于复用和维护
 * - 关注点分离，代码更清晰
 */

'use client';

import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { brands, recentUpdates, statusOptions } from '../data/brands';
import { copyToClipboard } from '../utils/clipboard';
import BrandCard from '../components/BrandCard';
import Layout from '../components/Layout';

const Page = () => {
  
  // 状态管理
  const [searchQuery, setSearchQuery] = useState(''); // 搜索关键词
  const [activeStatus, setActiveStatus] = useState('all'); // 当前选中的状态筛选项（全部/活跃/更新中/不活跃）
  const [showSearchResults, setShowSearchResults] = useState(false); // 是否显示搜索结果下拉框
  const [favorites, setFavorites] = useLocalStorage('favorites', []); // 收藏列表，存储在本地存储中
  const [copiedUrl, setCopiedUrl] = useState<number | null>(null); // 记录当前复制的URL的ID，用于显示"已复制"状态

  /**
   * 复制URL到剪贴板功能
   * @param {string} url - 要复制的URL
   * @param {number} id - 品牌ID，用于显示复制状态
   */
  const copyUrl = async (url: string, id: number) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(id); // 设置复制状态，显示"已复制"
      setTimeout(() => setCopiedUrl(null), 2000); // 2秒后恢复"复制"按钮状态
    }
  };

  /**
   * 收藏/取消收藏功能
   * @param {number} brandId - 品牌ID
   */
  const toggleFavorite = (brandId: number) => {
    const newFavorites = favorites.includes(brandId)
      ? favorites.filter((id: number) => id !== brandId) // 如果已收藏，则移除
      : [...favorites, brandId]; // 如果未收藏，则添加
    
    setFavorites(newFavorites); // 更新收藏列表并自动保存到本地存储
  };

  // 品牌筛选功能 - 根据搜索关键词和状态筛选品牌
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()); // 按品牌名称搜索
    const matchesStatus = activeStatus === 'all' || brand.status === activeStatus; // 按状态筛选
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout 
      currentPath="/"
      title="Link131"
    >
      {/* 页面内容区域 - 由Layout组件管理 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 简约欢迎区域 */}
        <section className="text-center mb-16 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-200 mb-4">
            Link131
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Find the latest URLs for Philippine betting platforms
          </p>
          
          {/* 简约搜索栏 */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-slate-500"></i>
              </div>
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-slate-600 text-slate-200 placeholder-slate-500"
              />
            </div>
            
            {/* 简约搜索结果 */}
            {showSearchResults && (
              <div className="absolute mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20">
                <div className="p-4 text-sm text-slate-400">
                  Search results will appear here...
                </div>
              </div>
            )}
          </div>
          
          {/* 优化统计部分 */}
          <div className="flex justify-center items-center gap-4 max-w-sm mx-auto">
            <div className="flex-1 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-200">
                    {brands.filter(b => b.status === 'active').length}
                  </div>
                  <div className="text-xs text-slate-400">Active</div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-200">
                    {brands.length}
                  </div>
                  <div className="text-xs text-slate-400">Total</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 独立状态筛选按钮 */}
        <section className="mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 justify-center min-w-max px-4">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setActiveStatus(status.value)}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    activeStatus === status.value
                      ? 'bg-slate-700 text-slate-100 border-slate-600 shadow-lg' 
                      : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:bg-slate-700/50 hover:border-slate-600/50'
                  }`}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {status.value === 'active' && <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>}
                    {status.value === 'updating' && <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>}
                    {status.value === 'inactive' && <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>}
                    {status.value === 'all' && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>}
                    {status.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 品牌展示区域 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <i className="fas fa-fire text-2xl text-orange-400"></i>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl font-semibold text-slate-300">
                Hot Brands
              </h2>
            </div>
            <a
              href="/all-brands"
              className="group flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600 rounded-xl text-slate-400 hover:text-slate-200 text-sm transition-all duration-200 transform hover:scale-105"
            >
              <span>View all</span>
              <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
            </a>
          </div>
          
          {/* 品牌卡片网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500">
                  No brands found
                </p>
              </div>
            ) : (
              // 渲染品牌卡片
              filteredBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand} // 品牌数据
                  isFavorite={favorites.includes(brand.id)} // 是否已收藏
                  onCopyUrl={copyUrl} // 复制URL回调函数
                  onToggleFavorite={toggleFavorite} // 切换收藏回调函数
                  copiedUrl={copiedUrl} // 当前复制状态
                />
              ))
            )}
          </div>
        </section>

        {/* 优化更新列表 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <i className="fas fa-clock text-xl text-blue-400"></i>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-semibold text-slate-300">
              Recent Updates
            </h2>
          </div>
          
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className="group bg-slate-800/50 hover:bg-slate-800/80 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 transform hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      update.type === 'url_update' ? 'bg-blue-500/20 text-blue-400' :
                      update.type === 'feature_update' ? 'bg-green-500/20 text-green-400' :
                      update.type === 'promotion' ? 'bg-purple-500/20 text-purple-400' :
                      update.type === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      <i className={`${update.icon} text-sm`}></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="font-semibold text-slate-200 mb-1.5 group-hover:text-slate-100">
                          {update.brandName}
                        </div>
                        <div className="text-slate-400 text-sm leading-relaxed">
                          {update.message}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="text-slate-500 text-xs font-medium">
                          {update.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Page; 