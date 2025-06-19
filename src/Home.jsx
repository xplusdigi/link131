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

import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { brands, recentUpdates, statusOptions } from './data/brands';
import { copyToClipboard } from './utils/clipboard';
import BrandCard from './components/BrandCard';
import Layout from './components/Layout';

const Home = () => {
  
  // 状态管理
  const [theme, setTheme] = useLocalStorage('theme', 'dark'); // 主题设置：深色/浅色模式，默认深色
  const [searchQuery, setSearchQuery] = useState(''); // 搜索关键词
  const [activeStatus, setActiveStatus] = useState('all'); // 当前选中的状态筛选项（全部/活跃/更新中/不活跃）
  const [showSearchResults, setShowSearchResults] = useState(false); // 是否显示搜索结果下拉框
  const [favorites, setFavorites] = useLocalStorage('favorites', []); // 收藏列表，存储在本地存储中
  const [copiedUrl, setCopiedUrl] = useState(null); // 记录当前复制的URL的ID，用于显示"已复制"状态

  // 主题切换功能 - 在页面加载时应用保存的主题设置
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * 切换主题函数
   * 在深色模式和浅色模式之间切换，并保存到本地存储
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  /**
   * 复制URL到剪贴板功能
   * @param {string} url - 要复制的URL
   * @param {number} id - 品牌ID，用于显示复制状态
   */
  const copyUrl = async (url, id) => {
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
  const toggleFavorite = (brandId) => {
    const newFavorites = favorites.includes(brandId)
      ? favorites.filter(id => id !== brandId) // 如果已收藏，则移除
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
      theme={theme} 
      onThemeToggle={toggleTheme}
      currentPath="/home"
      title="BetLink"
    >
      {/* 页面内容区域 - 由Layout组件管理 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 欢迎区域和搜索功能 */}
        <section className="text-center mb-12">
          {/* 页面标题和描述 */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to BetLink
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Quickly find the latest available URLs for major Philippine betting brands
            <br />
            <span className="text-sm">快速查找菲律宾主要博彩品牌的最新可用网址</span>
          </p>
          
          {/* 搜索栏 */}
          <div className="relative max-w-md mx-auto">
            {/* 搜索图标 */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            {/* 搜索输入框 */}
            <input
              type="text"
              placeholder="Search brand name... (搜索品牌名称)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value); // 更新搜索关键词
                setShowSearchResults(e.target.value.length > 0); // 显示/隐藏搜索结果
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            {/* 搜索结果下拉框（预留功能） */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                  搜索结果将在这里显示...
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 状态筛选导航 */}
        <section className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setActiveStatus(status.value)} // 切换筛选状态
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeStatus === status.value
                    ? 'bg-blue-600 text-white' // 选中状态样式
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' // 未选中状态样式
                }`}
                title={`筛选${status.label}状态的品牌`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </section>

        {/* 热门品牌展示区域 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            {/* 区域标题 */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <i className="fas fa-fire text-orange-500 mr-2"></i>
              Hot Brands (热门品牌)
            </h2>
            {/* 查看全部按钮 */}
            <a
              href="/all-brands"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center"
              title="查看所有品牌"
            >
              View All (查看全部)
              <span className="ml-1">→</span>
            </a>
          </div>
          
          {/* 品牌卡片网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.length === 0 ? (
              // 无搜索结果时的提示
              <div className="col-span-full text-center py-12">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">
                  没有找到匹配的品牌，请尝试其他搜索词或筛选条件
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
        <section>
          <div className="flex justify-between items-center mb-6">
            {/* 区域标题 */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <i className="fas fa-clock text-blue-500 mr-2"></i>
              Recent Updates (最近更新)
            </h2>
            {/* 刷新按钮 */}
            <button
              onClick={() => window.location.reload()} // 刷新页面获取最新数据
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
              title="刷新页面获取最新数据"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Refresh (刷新)
            </button>
          </div>
          
          {/* 更新列表 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {recentUpdates.map((update, index) => (
              <div key={index} className="p-4 flex justify-between items-center">
                {/* 更新信息 */}
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {update.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    URL updated: {update.url}
                  </div>
                </div>
                {/* 更新状态和时间 */}
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium mb-1">
                    Updated (已更新)
                  </span>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {update.time}
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

export default Home; 