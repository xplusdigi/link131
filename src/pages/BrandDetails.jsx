/**
 * 品牌详情页面组件
 * 
 * 功能包括：
 * - 显示品牌的详细信息
 * - 品牌Logo、URL、状态等基本信息
 * - 特色功能列表
 * - 评分和语言支持
 * - 收藏和复制功能
 * - 相关品牌推荐
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getBrandById, getRelatedBrands } from '../data/brands';
import { copyToClipboard } from '../utils/clipboard';
import BrandCard from '../components/BrandCard';
import Layout from '../components/Layout';

const BrandDetails = () => {
  // 状态管理
  const router = useRouter();
  const { id } = router.query;
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [brand, setBrand] = useState(null);
  const [relatedBrands, setRelatedBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // 主题切换功能
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 加载品牌数据
  useEffect(() => {
    if (id) {
      setLoading(true);
      const brandData = getBrandById(id);
      
      if (brandData) {
        setBrand(brandData);
        // 获取相关品牌推荐
        const related = getRelatedBrands(id, brandData.category, 3);
        setRelatedBrands(related);
      } else {
        setBrand(null);
        setRelatedBrands([]);
      }
      
      setLoading(false);
    }
  }, [id]);

  // 复制URL功能
  const copyUrl = async (url, brandId) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(brandId);
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

  // 获取状态样式
  const getStatusStyle = (status) => {
    const statusMap = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'updating': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'inactive': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return statusMap[status] || statusMap.active;
  };

  // 获取评分星级
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-yellow-400"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gray-300 dark:text-gray-600"></i>);
    }

    return stars;
  };

  if (loading) {
    return (
      <Layout 
        theme={theme} 
        onThemeToggle={toggleTheme}
        currentPath="/brand-details"
        title="Loading... - BetLink"
        showBackButton={true}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading brand details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!brand) {
    return (
      <Layout 
        theme={theme} 
        onThemeToggle={toggleTheme}
        currentPath="/brand-details"
        title="Brand Not Found - BetLink"
        showBackButton={true}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <i className="fas fa-exclamation-triangle text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Brand Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The brand you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/all-brands"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to All Brands
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isUrlCopied = copiedUrl === brand.id;
  const isFavorite = favorites.includes(brand.id);

  return (
    <Layout 
      theme={theme} 
      onThemeToggle={toggleTheme}
      currentPath="/brand-details"
      title={`${brand.name} - BetLink`}
      showBackButton={true}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 品牌主要信息卡片 */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* 卡片头部 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* 品牌Logo */}
                <div className="flex-shrink-0">
                  <img 
                    src={brand.logo || 'https://via.placeholder.com/120x120/6366f1/ffffff?text=LOGO'} 
                    alt={brand.name}
                    className="w-24 h-24 object-contain rounded-xl bg-white/10 p-3"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/120x120/6366f1/ffffff?text=LOGO';
                    }}
                  />
                </div>
                
                {/* 品牌基本信息 */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
                  <p className="text-blue-100 mb-3 break-all">{brand.url}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    {/* 状态标识 */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(brand.status)} bg-white/20 text-white`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        brand.status === 'active' ? 'bg-green-400' : 
                        brand.status === 'updating' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></span>
                      {brand.statusText}
                    </span>
                    
                    {/* 分类标签 */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                      <i className="fas fa-tag mr-2"></i>
                      {brand.category}
                    </span>
                    
                    {/* 徽章 */}
                    {brand.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                        <i className="fas fa-star mr-2"></i>
                        {brand.badgeText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 卡片主体 */}
            <div className="p-6">
              {/* 描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  <i className="fas fa-info-circle mr-2 text-blue-600"></i>
                  About This Brand
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              {/* 评分和更新时间 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* 评分 */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    <i className="fas fa-star mr-2 text-yellow-500"></i>
                    Rating
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(brand.rating)}
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {brand.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/ 5.0</span>
                  </div>
                </div>

                {/* 最后更新 */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    <i className="fas fa-clock mr-2 text-green-500"></i>
                    Last Updated
                  </h4>
                  <p className="text-lg text-gray-900 dark:text-white">
                    {new Date(brand.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* 特色功能 */}
              {brand.features && brand.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    <i className="fas fa-trophy mr-2 text-yellow-500"></i>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {brand.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                      >
                        <i className="fas fa-check mr-2"></i>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 语言支持 */}
              {brand.languages && brand.languages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    <i className="fas fa-globe mr-2 text-blue-500"></i>
                    Supported Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {brand.languages.map((language, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
                      >
                        <i className="fas fa-language mr-2"></i>
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => copyUrl(brand.url, brand.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isUrlCopied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <i className={`${isUrlCopied ? 'fas fa-check' : 'fas fa-copy'} mr-2`}></i>
                  {isUrlCopied ? 'URL Copied!' : 'Copy URL'}
                </button>

                <button
                  onClick={() => toggleFavorite(brand.id)}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    isFavorite
                      ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <i className={`${isFavorite ? 'fas fa-heart' : 'far fa-heart'} mr-2`}></i>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Visit Site
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 相关品牌推荐 */}
        {relatedBrands.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                <i className="fas fa-thumbs-up text-blue-600 mr-2"></i>
                Related Brands
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You might also be interested in these brands
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBrands.map((relatedBrand) => (
                <BrandCard
                  key={relatedBrand.id}
                  brand={relatedBrand}
                  isFavorite={favorites.includes(relatedBrand.id)}
                  onCopyUrl={copyUrl}
                  onToggleFavorite={toggleFavorite}
                  copiedUrl={copiedUrl}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default BrandDetails; 