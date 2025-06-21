'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import BrandCard from '../../components/BrandCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getBrandById, getRelatedBrands } from '../../data/brands';
import { copyToClipboard } from '../../utils/clipboard';

interface Brand {
  id: number;
  name: string;
  url: string;
  category: string;
  logo: string;
  description: string;
  fullDescription?: string;
  rating: number;
  founded?: string;
  license?: string;
  minDeposit?: string;
  maxPayout?: string;
  urlHistory?: {
    url: string;
    date: string;
    status: string;
    note: string;
  }[];
}

function BrandDetailsContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get('id');
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [relatedBrands, setRelatedBrands] = useState<Brand[]>([]);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [copiedUrl, setCopiedUrl] = useState<number | null>(null);

  useEffect(() => {
    if (brandId) {
      const foundBrand = getBrandById(parseInt(brandId));
      if (foundBrand) {
        setBrand(foundBrand);
        setRelatedBrands(getRelatedBrands(foundBrand.id, foundBrand.category, 3));
      }
    }
  }, [brandId]);

  const copyUrl = async (url: string, id: number) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(id);
      setTimeout(() => setCopiedUrl(null), 2000);
    }
  };

  const toggleFavorite = (brandId: number) => {
    const newFavorites = favorites.includes(brandId)
      ? favorites.filter((id: number) => id !== brandId)
      : [...favorites, brandId];
    setFavorites(newFavorites);
  };

  const shareUrl = async () => {
    const shareData = {
      title: `${brand?.name} - BetLink`,
      text: `Check out ${brand?.name} on BetLink`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyUrl(window.location.href, brand?.id || 0);
      }
    } else {
      copyUrl(window.location.href, brand?.id || 0);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  if (!brand) {
    return (
      <Layout currentPath="/brand-details" title="Brand Details - BetLink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Brand Not Found</h1>
            <p className="text-gray-600 mb-6">The requested brand could not be found.</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      currentPath="/brand-details" 
      title={`${brand.name} - BetLink`}
      showBackButton={true}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xl">
                {brand.name.charAt(0)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(brand.rating)}
                </div>
                <span className="text-xl font-semibold">{brand.rating}</span>
                <span className="text-gray-500">/ 5.0</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <span>{brand.category}</span>
                {brand.founded && <span>Founded {brand.founded}</span>}
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {brand.fullDescription || brand.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                🌐 Visit Site
              </a>
              
              <button
                onClick={() => copyUrl(brand.url, brand.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  copiedUrl === brand.id
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedUrl === brand.id ? '✓ Copied!' : '📋 Copy URL'}
              </button>
              
              <button
                onClick={() => toggleFavorite(brand.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  favorites.includes(brand.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {favorites.includes(brand.id) ? '♥ Saved' : '♡ Save'}
              </button>
              
              <button
                onClick={shareUrl}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                📤 Share
              </button>
            </div>
          </div>
        </div>

        {/* Brand Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* URL History */}
            {brand.urlHistory && brand.urlHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 URL History</h3>
                <div className="space-y-3">
                  {brand.urlHistory.map((urlRecord, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span 
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              urlRecord.status === 'current' ? 'bg-green-100 text-green-800' :
                              urlRecord.status === 'backup' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {urlRecord.status}
                          </span>
                          <span className="text-sm text-gray-600">{urlRecord.date}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-1">{urlRecord.url}</p>
                        <p className="text-xs text-gray-500">{urlRecord.note}</p>
                      </div>
                      <button
                        onClick={() => copyUrl(urlRecord.url, brand.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                {brand.minDeposit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Deposit:</span>
                    <span className="font-medium">{brand.minDeposit}</span>
                  </div>
                )}
                {brand.maxPayout && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Payout:</span>
                    <span className="font-medium">{brand.maxPayout}</span>
                  </div>
                )}
                {brand.license && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium text-sm">{brand.license}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Current URL */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">🌐 Current Available URL</h3>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <p className="text-blue-100 text-sm mb-2">Official Website</p>
                <p className="font-mono text-sm break-all">{brand.url}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyUrl(brand.url, brand.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    copiedUrl === brand.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  {copiedUrl === brand.id ? '✓ Copied' : '📋 Copy'}
                </button>
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-4 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  🌐 Visit
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Brands */}
        {relatedBrands.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Recommendations</h2>
              <Link
                href="/all-brands"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All →
              </Link>
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
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function BrandDetailsPage() {
  return (
    <Suspense fallback={
      <Layout currentPath="/brand-details" title="Loading...">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading brand details...</p>
          </div>
        </div>
      </Layout>
    }>
      <BrandDetailsContent />
    </Suspense>
  );
} 