/**
 * Favorites页面 - 用户收藏管理
 * 
 * 功能包括：
 * 1. 显示用户收藏的品牌列表
 * 2. 支持取消收藏操作
 * 3. 空状态提示和引导
 * 4. 收藏品牌的详细信息展示
 * 5. 与品牌数据的关联显示
 */

'use client';

import React from 'react';
import Layout from '../../components/Layout';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { brands } from '../../data/brands';
import BrandCard from '../../components/BrandCard';
import { copyToClipboard } from '../../utils/clipboard';

export default function FavoritesPage() {
  
  // 状态管理
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [copiedUrl, setCopiedUrl] = React.useState<number | null>(null);

  // 获取收藏的品牌详细信息
  const favoriteBrands = brands.filter(brand => favorites.includes(brand.id));

  // 复制URL功能
  const copyUrl = async (url: string, id: number) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(id);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  // 切换收藏状态
  const toggleFavorite = (brandId: number) => {
    const newFavorites = favorites.filter((id: number) => id !== brandId);
    setFavorites(newFavorites);
  };

  return (
    <Layout 
      currentPath="/favorites"
      title="Favorites - BetLink"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Favorites
          </h1>
          <p className="text-gray-600 mb-8">
            Your saved favorite brands will appear here
          </p>
          
          {favoriteBrands.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-heart text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-500 text-lg mb-4">
                No favorites yet. Start adding some brands to your favorites!
              </p>
              <p className="text-gray-400 text-sm">
                Click the heart icon on any brand card to add it to your favorites
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteBrands.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  isFavorite={true}
                  onCopyUrl={copyUrl}
                  onToggleFavorite={toggleFavorite}
                  copiedUrl={copiedUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 