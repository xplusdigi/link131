/**
 * BetLink 主页组件 - 使用Layout组件重构版本
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
      title="BetLink"
    >
      {/* 页面内容区域 - 由Layout组件管理 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 欢迎区域和搜索功能 */}
        <section className="relative text-center mb-16 py-12">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-3xl -z-10 animate-pulse"></div>
          
          {/* 页面标题和描述 */}
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fadeIn">
              Welcome to BetLink
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              🎰 Quickly find the latest available URLs for major Philippine betting brands 🇵🇭
            </p>
            
            {/* 搜索栏 */}
            <div className="relative max-w-lg mx-auto group">
              {/* 搜索栏装饰光晕 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* 搜索图标 */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-search text-blue-500 text-lg"></i>
                </div>
                
                {/* 搜索输入框 */}
                <input
                  type="text"
                  placeholder="🔍 Search brand name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 0);
                  }}
                  className="w-full pl-12 pr-6 py-4 border-2 border-white/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 backdrop-blur-sm text-gray-900 shadow-xl transition-all duration-300 text-lg font-medium placeholder-gray-500"
                />
                
                {/* 搜索按钮 */}
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              
              {/* 搜索结果下拉框 */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl z-20 overflow-hidden">
                  <div className="p-6 text-sm text-gray-500">
                    🔍 Search results will appear here...
                  </div>
                </div>
              )}
            </div>
            
            {/* 统计信息 */}
            <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{brands.filter(b => b.status === 'active').length} Active Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>{brands.length} Total Brands</span>
              </div>
            </div>
          </div>
        </section>

        {/* 状态筛选导航 */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Status</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setActiveStatus(status.value)}
                  className={`relative px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                    activeStatus === status.value
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-200' 
                      : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-xl border border-white/50'
                  }`}
                  title={`Filter ${status.label} brands`}
                >
                  {/* 选中状态装饰 */}
                  {activeStatus === status.value && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30"></div>
                  )}
                  <span className="relative">{status.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 热门品牌展示区域 */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            {/* 区域标题 */}
            <div className="flex items-center">
              <div className="relative mr-3">
                <i className="fas fa-fire text-3xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"></i>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur opacity-30 animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                Hot Brands
              </h2>
            </div>
            
            {/* 查看全部按钮 */}
            <a
              href="/all-brands"
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              title="View all brands"
            >
              <span className="flex items-center">
                View All Brands
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </a>
          </div>
          
          {/* 品牌卡片网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.length === 0 ? (
              // 无搜索结果时的提示
              <div className="col-span-full text-center py-12">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500">
                  No brands found matching your criteria. Try different search terms or filters.
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

        {/* 最近更新区域 */}
        <section className="relative">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl -z-10"></div>
          
          <div className="relative p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              {/* 区域标题 */}
              <div className="flex items-center">
                <div className="relative mr-3">
                  <i className="fas fa-clock text-3xl bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"></i>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-30 animate-pulse"></div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Recent Updates
                </h2>
              </div>
              
              {/* 刷新按钮 */}
              <button
                onClick={() => window.location.reload()}
                className="group relative px-6 py-3 bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold"
                title="Refresh page to get latest data"
              >
                <span className="flex items-center">
                  <i className="fas fa-sync-alt mr-2 group-hover:rotate-180 transition-transform duration-500"></i>
                  Refresh
                </span>
              </button>
            </div>
            
            {/* 更新列表 */}
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-6 hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    {/* 更新信息 */}
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {update.brandName}
                      </div>
                      <div className="text-gray-600 leading-relaxed">
                        {update.message}
                      </div>
                    </div>
                    
                    {/* 更新状态和时间 */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-xl text-sm font-semibold shadow-md">
                        <i className="fas fa-check-circle mr-2 text-green-500"></i>
                        Updated
                      </span>
                      <div className="text-sm text-gray-500 font-medium">
                        📅 {update.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Page; 