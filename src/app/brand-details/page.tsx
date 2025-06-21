'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { getBrandById } from '../../data/brands';
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
  pros?: string[];
  cons?: string[];
}

function BrandDetailsContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get('id');
  
  const [brand, setBrand] = useState<Brand | null>(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [copiedUrl, setCopiedUrl] = useState<number | null>(null);

  useEffect(() => {
    if (brandId) {
      const foundBrand = getBrandById(parseInt(brandId));
      if (foundBrand) {
        setBrand(foundBrand);
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
              <button
                onClick={() => copyUrl(brand.url, brand.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  copiedUrl === brand.id
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copiedUrl === brand.id ? 'Copied!' : 'Copy URL'}
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
            </div>
          </div>
        </div>

        {/* Brand Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pros and Cons */}
            {(brand.pros || brand.cons) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brand.pros && (
                  <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">
                      👍 Pros
                    </h3>
                    <ul className="space-y-2">
                      {brand.pros.map((pro: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-green-700">
                          <span className="text-green-500">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {brand.cons && (
                  <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                    <h3 className="text-lg font-semibold text-red-800 mb-4">
                      👎 Cons
                    </h3>
                    <ul className="space-y-2">
                      {brand.cons.map((con: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-red-700">
                          <span className="text-red-500">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

            {/* Visit Website */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to Play?</h3>
              <p className="text-blue-100 mb-4 text-sm">Visit the official website</p>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Visit {brand.name} →
              </a>
            </div>
          </div>
        </div>
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