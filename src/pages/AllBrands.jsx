/**
 * 全部品牌页面组件
 * 
 * 功能包括：
 * - 显示所有可用品牌
 * - 搜索和筛选功能
 * - 排序功能
 * - 状态和分类筛选
 * - 分页功能
 * - 收藏功能
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { brands, statusOptions, categoryOptions, sortOptions, searchBrands } from '../data/brands';
import { copyToClipboard } from '../utils/clipboard';
import BrandCard from '../components/BrandCard';
import Layout from '../components/Layout';

const AllBrands = () => {
  // 状态管理
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedUrl, setCopiedUrl] = useState(null);
  
  const itemsPerPage = 12; // 每页显示的品牌数量

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

  // 切换收藏功能
  const toggleFavorite = (brandId) => {
    const newFavorites = favorites.includes(brandId)
      ? favorites.filter(id => id !== brandId)
      : [...favorites, brandId];
    
    setFavorites(newFavorites);
  };

  // 获取筛选后的品牌
  const getFilteredBrands = () => {
    return searchBrands(searchQuery, {
      status: statusFilter,
      category: categoryFilter,
      sortBy: sortBy
    });
  };

  // 重置筛选器
  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  // 当筛选条件改变时，重置到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter, sortBy]);

  const filteredBrands = getFilteredBrands();
  
  // 分页逻辑
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // 分页导航
  const goToPage = (page) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 生成分页按钮
  const generatePageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 调整开始页面以确保显示足够的按钮
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }
    
    return buttons;
  };

  return (
    <Layout 
      theme={theme} 
      onThemeToggle={toggleTheme}
      currentPath="/all-brands"
      title="All Brands - BetLink"
      showBackButton={true}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 页面头部 */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <i className="fas fa-th-large text-blue-600 mr-3"></i>
            All Brands
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Browse all available betting brands in the Philippines
            <br />
            <span className="text-sm">浏览菲律宾所有可用的博彩品牌</span>
          </p>
          
          {/* 统计信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 inline-block border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {brands.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {brands.filter(b => b.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {brands.filter(b => b.status === 'updating').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Updating</div>
              </div>
            </div>
          </div>
        </section>

        {/* 搜索和筛选工具栏 */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 搜索框 */}
            <div className="mb-4">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search brands... (搜索品牌)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            {/* 筛选器行 */}
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* 状态筛选 */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <i className="fas fa-filter mr-1"></i>
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.count || 0})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 分类筛选 */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <i className="fas fa-tags mr-1"></i>
                  Category:
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 排序 */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  <i className="fas fa-sort mr-1"></i>
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* 重置按钮 */}
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                title="重置所有筛选条件"
              >
                <i className="fas fa-undo mr-2"></i>
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* 结果信息 */}
        <section className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''}
                {searchQuery && (
                  <span className="ml-2">
                    matching "<span className="font-medium text-gray-900 dark:text-white">{searchQuery}</span>"
                  </span>
                )}
                {(statusFilter !== 'all' || categoryFilter !== 'all') && (
                  <span className="ml-2 text-sm">
                    (filtered)
                  </span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Page {currentPage} of {totalPages} • {itemsPerPage} per page
                </p>
              )}
            </div>
            
            {favorites.length > 0 && (
              <Link
                href="/favorites"
                className="inline-flex items-center px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
              >
                <i className="fas fa-heart mr-2"></i>
                My Favorites ({favorites.length})
              </Link>
            )}
          </div>
        </section>

        {/* 主要内容区域 */}
        <section>
          {filteredBrands.length === 0 ? (
            // 空状态
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <i className="fas fa-search text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No Brands Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  No brands match your search criteria. Try adjusting your filters.
                  <br />
                  <span className="text-sm">没有找到匹配的品牌，请调整筛选条件</span>
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <i className="fas fa-undo mr-2"></i>
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 品牌网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentBrands.map((brand) => (
                  <BrandCard
                    key={brand.id}
                    brand={brand}
                    isFavorite={favorites.includes(brand.id)}
                    onCopyUrl={copyUrl}
                    onToggleFavorite={toggleFavorite}
                    copiedUrl={copiedUrl}
                  />
                ))}
              </div>

              {/* 分页导航 */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center space-x-2">
                      {/* 上一页按钮 */}
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === 1
                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <i className="fas fa-chevron-left mr-1"></i>
                        Previous
                      </button>

                      {/* 页码按钮 */}
                      <div className="flex items-center space-x-1">
                        {generatePageButtons().map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                              page === currentPage
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      {/* 下一页按钮 */}
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === totalPages
                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        Next
                        <i className="fas fa-chevron-right ml-1"></i>
                      </button>
                    </div>
                  </nav>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default AllBrands; 