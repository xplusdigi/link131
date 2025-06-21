/**
 * About页面 - 关于Link131平台
 * 
 * 功能包括：
 * 1. 平台介绍和使命说明
 * 2. 主要功能特性展示
 * 3. 免责声明和使用条款
 * 4. 响应式信息展示布局
 * 5. 品牌价值和服务理念
 */

'use client';

import React from 'react';
import Layout from '../../components/Layout';

export default function AboutPage() {

  return (
    <Layout 
      currentPath="/about"
      title="About - Link131"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-200 mb-4">
            About Link131
          </h1>
          <p className="text-xl text-slate-300">
            Your trusted guide to Philippine betting platforms
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-slate-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Link131 is designed to help users quickly find the latest available URLs for major Philippine betting brands. 
              We provide a comprehensive directory of trusted betting platforms with up-to-date information.
            </p>
          </section>

          <section className="bg-slate-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              Features
            </h2>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-400 mr-3"></i>
                Real-time URL updates
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-400 mr-3"></i>
                Brand favorites and bookmarking
              </li>
                              <li className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  Clean and modern design
                </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-green-400 mr-3"></i>
                Mobile-responsive design
              </li>
            </ul>
          </section>

          <section className="bg-slate-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              Disclaimer
            </h2>
            <p className="text-slate-300 leading-relaxed">
              This platform is for informational purposes only. Please gamble responsibly and ensure 
              you comply with local laws and regulations regarding online betting.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
} 