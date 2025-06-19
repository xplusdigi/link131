/**
 * 关于页面组件
 * 
 * 功能包括：
 * - 项目介绍和使命
 * - 功能特点说明
 * - 团队信息
 * - 技术栈信息
 * - FAQ常见问题
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Layout from '../components/Layout';

const About = () => {
  // 状态管理
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [activeSection, setActiveSection] = useState('mission');

  // 主题切换功能
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 功能特点数据
  const features = [
    {
      icon: 'fas fa-search',
      title: 'Smart Search',
      description: 'Quickly find betting brands with our intelligent search system',
      descriptionCn: '通过智能搜索系统快速找到博彩品牌'
    },
    {
      icon: 'fas fa-heart',
      title: 'Favorites Management',
      description: 'Save and organize your favorite betting platforms',
      descriptionCn: '保存和管理你喜欢的博彩平台'
    },
    {
      icon: 'fas fa-copy',
      title: 'One-Click Copy',
      description: 'Copy URLs instantly with a single click',
      descriptionCn: '一键快速复制网址链接'
    },
    {
      icon: 'fas fa-moon',
      title: 'Dark Mode',
      description: 'Eye-friendly dark mode for comfortable browsing',
      descriptionCn: '护眼的深色模式，舒适浏览体验'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Responsive',
      description: 'Perfect experience across all devices',
      descriptionCn: '全设备完美体验'
    },
    {
      icon: 'fas fa-sync-alt',
      title: 'Real-time Updates',
      description: 'Always up-to-date brand information and URLs',
      descriptionCn: '实时更新的品牌信息和网址'
    }
  ];

  // 技术栈数据
  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: 'fab fa-react', color: 'text-blue-500' },
        { name: 'Next.js', icon: 'fab fa-js', color: 'text-black dark:text-white' },
        { name: 'Tailwind CSS', icon: 'fas fa-paint-brush', color: 'text-blue-400' },
        { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-500' }
      ]
    },
    {
      category: 'Features',
      technologies: [
        { name: 'Progressive Web App', icon: 'fas fa-mobile-alt', color: 'text-purple-500' },
        { name: 'Service Worker', icon: 'fas fa-cogs', color: 'text-green-500' },
        { name: 'Local Storage', icon: 'fas fa-database', color: 'text-orange-500' },
        { name: 'Responsive Design', icon: 'fas fa-desktop', color: 'text-indigo-500' }
      ]
    }
  ];

  // FAQ数据
  const faqs = [
    {
      id: 'what-is-betlink',
      question: 'What is BetLink?',
      questionCn: '什么是BetLink？',
      answer: 'BetLink is a comprehensive directory and link management tool for Philippine betting brands. It helps users quickly find and access the latest URLs for major betting platforms.',
      answerCn: 'BetLink是一个专为菲律宾博彩品牌设计的综合目录和链接管理工具。它帮助用户快速查找和访问主要博彩平台的最新网址。'
    },
    {
      id: 'is-it-free',
      question: 'Is BetLink free to use?',
      questionCn: 'BetLink是免费使用的吗？',
      answer: 'Yes, BetLink is completely free to use. All features including search, favorites, and URL copying are available at no cost.',
      answerCn: '是的，BetLink完全免费使用。包括搜索、收藏和URL复制在内的所有功能都无需付费。'
    },
    {
      id: 'how-often-updated',
      question: 'How often is the information updated?',
      questionCn: '信息多久更新一次？',
      answer: 'We strive to keep all brand information and URLs up-to-date. Our team regularly monitors and updates the database to ensure accuracy.',
      answerCn: '我们努力保持所有品牌信息和网址的最新状态。我们的团队定期监控和更新数据库以确保准确性。'
    },
    {
      id: 'mobile-support',
      question: 'Does BetLink work on mobile devices?',
      questionCn: 'BetLink在移动设备上能用吗？',
      answer: 'Absolutely! BetLink is fully responsive and works perfectly on smartphones, tablets, and desktop computers.',
      answerCn: '当然可以！BetLink完全响应式设计，在智能手机、平板电脑和台式电脑上都能完美运行。'
    },
    {
      id: 'data-privacy',
      question: 'How is my data handled?',
      questionCn: '我的数据如何处理？',
      answer: 'We respect your privacy. All favorites and preferences are stored locally on your device. We do not collect or store personal information on our servers.',
      answerCn: '我们尊重您的隐私。所有收藏和偏好设置都存储在您的设备本地。我们不会在服务器上收集或存储个人信息。'
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <Layout 
      theme={theme} 
      onThemeToggle={toggleTheme}
      currentPath="/about"
      title="About - BetLink"
      showBackButton={false}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 页面头部 */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About BetLink
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your trusted companion for navigating the Philippine betting landscape
            <br />
            <span className="text-sm">您在菲律宾博彩领域的可信赖伙伴</span>
          </p>
        </section>

        {/* 导航标签 */}
        <section className="mb-8">
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
              <div className="flex space-x-2">
                {[
                  { id: 'mission', label: 'Mission', icon: 'fas fa-bullseye' },
                  { id: 'features', label: 'Features', icon: 'fas fa-star' },
                  { id: 'tech', label: 'Technology', icon: 'fas fa-code' },
                  { id: 'faq', label: 'FAQ', icon: 'fas fa-question-circle' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                      activeSection === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 使命与愿景 */}
        {activeSection === 'mission' && (
          <section className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bullseye text-2xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  To provide a reliable, user-friendly platform that simplifies access to legitimate betting brands in the Philippines, ensuring users can find updated and accurate information quickly and safely.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
                  为用户提供可靠、友好的平台，简化对菲律宾合法博彩品牌的访问，确保用户能够快速、安全地找到最新和准确的信息。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-shield-alt text-xl text-green-600 dark:text-green-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reliability</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Trusted information and up-to-date URLs
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-users text-xl text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User-Centric</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Designed with user experience in mind
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-bolt text-xl text-orange-600 dark:text-orange-400"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Efficiency</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Quick access to what you need
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 功能特点 */}
        {activeSection === 'features' && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <i className={`${feature.icon} text-xl text-blue-600 dark:text-blue-400`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {feature.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.descriptionCn}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 技术栈 */}
        {activeSection === 'tech' && (
          <section className="space-y-8">
            {techStack.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <i className={`${tech.icon} text-3xl ${tech.color} mb-3`}></i>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {tech.name}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* FAQ */}
        {activeSection === 'faq' && (
          <section>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {faq.questionCn}
                        </p>
                      </div>
                      <i className={`fas fa-chevron-${expandedFaq === faq.id ? 'up' : 'down'} text-gray-400`}></i>
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {faq.answer}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {faq.answerCn}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 底部行动号召 */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Explore the best betting brands in the Philippines with BetLink. 
              Start discovering, saving, and accessing your favorite platforms today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/home"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-home mr-2"></i>
                Go to Home
              </Link>
              <Link
                href="/all-brands"
                className="inline-flex items-center px-8 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                <i className="fas fa-th-large mr-2"></i>
                Browse All Brands
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About; 