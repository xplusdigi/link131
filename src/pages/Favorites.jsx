/**
 * 收藏页面组件
 * 
 * 功能包括：
 * - 显示用户收藏的品牌列表
 * - 搜索收藏的品牌
 * - 排序和筛选功能
 * - 移除收藏功能
 * - 空状态处理
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { brands, sortOptions } from '../data/brands';
import { copyToClipboard } from '../utils/clipboard';
import BrandCard from '../components/BrandCard';
import Layout from '../components/Layout';

const Favorites = () => {
  // 状态管理
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [copiedUrl, setCopiedUrl] = useState(null);

  // 主题切换功能
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 复制URL功能
  const copyUrl = async (url, id) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(id);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  // 移除收藏功能
  const removeFavorite = (brandId) => {
    const newFavorites = favorites.filter(id => id !== brandId);
    setFavorites(newFavorites);
  };

  // 获取收藏的品牌数据
  const getFavoriteBrands = () => {
    return brands.filter(brand => favorites.includes(brand.id));
  };

  // 筛选和排序收藏品牌
  const getFilteredAndSortedBrands = () => {
    let favoriteBrands = getFavoriteBrands();

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      favoriteBrands = favoriteBrands.filter(brand =>
        brand.name.toLowerCase().includes(query) ||
        brand.description.toLowerCase().includes(query) ||
        brand.category.toLowerCase().includes(query)
      );
    }

    // 排序
    favoriteBrands.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return b.rating - a.rating;
        case 'updated':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return favoriteBrands;
  };

  const filteredBrands = getFilteredAndSortedBrands();

  return (
    <Layout 
      theme={theme} 
      onThemeToggle={toggleTheme}
      currentPath="/favorites"
      title="Favorites - BetLink"
      showBackButton={false}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 页面头部 */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <i className="fas fa-heart text-red-500 mr-3"></i>
            My Favorites
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Your saved betting brands for quick access
            <br />
            <span className="text-sm">你保存的博彩品牌，方便快速访问</span>
          </p>
          
          {/* 统计信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 inline-block border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {favorites.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {getFavoriteBrands().filter(b => b.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {getFavoriteBrands().filter(b => b.status === 'updating').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Updating</div>
              </div>
            </div>
          </div>
        </section>

        {/* 搜索和筛选工具栏 */}
        {favorites.length > 0 && (
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 搜索框 */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search your favorites... (搜索收藏)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                {/* 排序选择器 */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <i className="fas fa-sort mr-1"></i>
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 主要内容区域 */}
        <section>
          {favorites.length === 0 ? (
            // 空状态 - 没有收藏
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <i className="fas fa-heart-broken text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Favorites Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Start building your collection by saving your favorite betting brands
                    <br />
                    <span className="text-sm">开始收藏你喜欢的博彩品牌吧</span>
                  </p>
                </div>
                
                <Link
                  href="/home"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <i className="fas fa-search mr-2"></i>
                  Browse Brands
                </Link>
              </div>
            </div>
          ) : filteredBrands.length === 0 ? (
            // 空状态 - 搜索无结果
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <i className="fas fa-search text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Results Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  No favorites match your search criteria. Try a different search term.
                  <br />
                  <span className="text-sm">没有找到匹配的收藏品牌，请尝试其他搜索词</span>
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <i className="fas fa-times mr-2"></i>
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            // 品牌卡片网格
            <>
              {/* 结果计数 */}
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredBrands.length} of {favorites.length} favorite brands
                  {searchQuery && (
                    <span className="ml-2">
                      matching "<span className="font-medium text-gray-900 dark:text-white">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>
              
              {/* 品牌网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBrands.map((brand) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    isFavorite={true} // 在收藏页面中，所有品牌都是已收藏的
                    onCopyUrl={copyUrl}
                    onToggleFavorite={removeFavorite} // 在收藏页面中，点击会移除收藏
                    copiedUrl={copiedUrl}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* 底部操作区域 */}
        {favorites.length > 0 && (
          <section className="mt-12 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/home"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add More Favorites
                </Link>
                <Link
                  href="/all-brands"
                  className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-lg transition-colors"
                >
                  <i className="fas fa-th-large mr-2"></i>
                  Browse All Brands
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Favorites; 