/**
 * All Brands页面 - 完整品牌目录
 * 
 * 功能包括：
 * 1. 显示所有品牌的完整列表
 * 2. 品牌搜索和筛选功能
 * 3. 状态筛选（活跃/更新中/不活跃）
 * 4. 收藏和URL复制功能
 * 5. 响应式网格布局
 * 6. 实时搜索结果统计
 */

'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import BrandCard from '../../components/BrandCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { brands, statusOptions } from '../../data/brands';
import { copyToClipboard } from '../../utils/clipboard';

export default function AllBrandsPage() {
  
  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const copyUrl = async (url, id) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(id);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const toggleFavorite = (brandId) => {
    const newFavorites = favorites.includes(brandId)
      ? favorites.filter(id => id !== brandId)
      : [...favorites, brandId];
    setFavorites(newFavorites);
  };

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === 'all' || brand.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout 
      currentPath="/all-brands"
      title="All Brands - BetLink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Brands
          </h1>
          <p className="text-xl text-gray-600">
            Complete directory of Philippine betting platforms
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search brand name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => setActiveStatus(status.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeStatus === status.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredBrands.length} of {brands.length} brands
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500">
                No brands found matching your criteria
              </p>
            </div>
          ) : (
            filteredBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                isFavorite={favorites.includes(brand.id)}
                onCopyUrl={copyUrl}
                onToggleFavorite={toggleFavorite}
                copiedUrl={copiedUrl}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
} 