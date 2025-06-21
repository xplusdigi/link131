/**
 * 品牌数据文件
 * 
 * 包含：
 * - 品牌列表数据
 * - 最近更新信息
 * - 状态筛选选项
 * - 分类选项
 */

// 品牌数据列表
export const brands = [
  {
    id: 1,
    name: 'Jilibet',
    url: 'https://jilibet888.com',
    category: 'Sports Betting',
    logo: '/assets/brands/jilibet-ico.jpg',
    badge: 'hot',
    badgeText: 'Hot',
    status: 'active',
    statusText: 'Active',
    description: 'Leading online sports betting platform in the Philippines, offering global sports event betting services.',
    fullDescription: 'Jilibet stands as one of the premier online sports betting platforms in the Philippines, providing comprehensive betting services for major global sporting events. With cutting-edge technology and a user-friendly interface, Jilibet offers an unparalleled betting experience.',
    features: ['Sports Betting', 'Live Betting', 'Casino Games', 'Mobile App'],
    lastUpdated: '2024-01-15',
    rating: 4.8,
    languages: ['English', 'Filipino', 'Chinese'],
    founded: '2018',
    license: 'PAGCOR Licensed',
    minDeposit: '₱100',
    maxPayout: '₱10,000,000',
    paymentMethods: ['GCash', 'PayMaya', 'BPI', 'BDO', 'UnionBank', 'Crypto'],
    customerSupport: '24/7 Live Chat, Email, Phone',
    bonuses: [
      {
        type: 'Welcome Bonus',
        description: '100% First Deposit Bonus up to ₱10,000',
        terms: 'Min deposit ₱100, 30x rollover requirement'
      },
      {
        type: 'Sports Cashback',
        description: '10% Weekly Sports Betting Cashback',
        terms: 'Up to ₱5,000 cashback per week'
      }
    ],
    pros: [
      'Wide range of sports markets',
      'Competitive odds',
      'Fast payouts',
      'Mobile-friendly platform',
      'Live streaming available'
    ],
    cons: [
      'Limited casino game selection',
      'High rollover requirements for bonuses'
    ],
    screenshots: [
      '/assets/brands/jilibet-home.jpg',
      '/assets/brands/jilibet-sports.jpg',
      '/assets/brands/jilibet-mobile.jpg'
    ],
    urlHistory: [
      { url: 'https://jilibet.com', date: '2024-01-15', status: 'current', note: 'Official main site' },
      { url: 'https://jilibet.co', date: '2024-01-10', status: 'backup', note: 'Alternative domain' },
      { url: 'https://jili888.com', date: '2023-12-20', status: 'archived', note: 'Previous domain' }
    ]
  },
  {
    id: 2,
    name: 'Nuebe Gaming',
    url: 'https://nuebegaming.ph',
    category: 'Live Casino',
    logo: 'https://via.placeholder.com/80x80/e74c3c/ffffff?text=NG',
    badge: 'new',
    badgeText: 'New',
    status: 'active',
    statusText: 'Active',
    description: 'Professional online live entertainment platform, offering classic games like Baccarat and Roulette.',
    fullDescription: 'Nuebe Gaming brings the authentic casino experience to your screen with professional live dealers and high-quality streaming. Specializing in classic table games, it offers an immersive gaming environment that rivals physical casinos.',
    features: ['Live Casino', 'Baccarat', 'Roulette', 'Blackjack'],
    lastUpdated: '2024-01-12',
    rating: 4.6,
    languages: ['English', 'Filipino'],
    founded: '2023',
    license: 'PAGCOR Licensed',
    minDeposit: '₱200',
    maxPayout: '₱5,000,000',
    paymentMethods: ['GCash', 'PayMaya', 'Online Banking', 'Crypto'],
    customerSupport: '24/7 Live Chat, Email',
    bonuses: [
      {
        type: 'New Player Bonus',
        description: '200% Welcome Bonus up to ₱20,000',
        terms: 'Min deposit ₱200, 25x rollover requirement'
      },
      {
        type: 'Daily Cashback',
        description: '5% Daily Cashback on Live Casino',
        terms: 'Up to ₱2,000 cashback daily'
      }
    ],
    pros: [
      'Professional live dealers',
      'HD quality streaming',
      'Multiple camera angles',
      'VIP tables available',
      'Fast game loading'
    ],
    cons: [
      'Limited game variety',
      'Higher minimum bets',
      'New platform with limited history'
    ],
    screenshots: [
      '/assets/brands/nuebe-lobby.jpg',
      '/assets/brands/nuebe-baccarat.jpg',
      '/assets/brands/nuebe-roulette.jpg'
    ],
    urlHistory: [
      { url: 'https://nuebegaming.ph', date: '2024-01-12', status: 'current', note: 'Official website' },
      { url: 'https://nuebe.live', date: '2024-01-08', status: 'backup', note: 'Live games portal' },
      { url: 'https://nuebecasino.com', date: '2023-11-15', status: 'archived', note: 'Previous domain' }
    ]
  },
  {
    id: 3,
    name: 'SWERTRES',
    url: 'https://swertres.gov.ph',
    category: 'Lottery',
    logo: 'https://via.placeholder.com/80x80/27ae60/ffffff?text=SW',
    badge: 'popular',
    badgeText: 'Popular',
    status: 'updating',
    statusText: 'Updating',
    description: 'Official Philippine lottery platform, offering classic lottery games like SWERTRES.',
    fullDescription: 'SWERTRES is the official Philippine government lottery platform, providing legitimate and regulated lottery services. With decades of operation, it offers traditional lottery games that are part of Filipino gaming culture, ensuring fair play and transparent results.',
    features: ['SWERTRES', 'Lotto 6/42', 'Mega Lotto', 'Super Lotto'],
    lastUpdated: '2024-01-10',
    rating: 4.5,
    languages: ['English', 'Filipino'],
    founded: '1995',
    license: 'Government Licensed (PCSO)',
    minDeposit: '₱12',
    maxPayout: '₱500,000,000',
    paymentMethods: ['Cash', 'Authorized Retailers', 'Online Banking', 'Mobile Payments'],
    customerSupport: 'Business Hours Support, Hotline',
    bonuses: [
      {
        type: 'System Play',
        description: 'Increased winning chances with multiple combinations',
        terms: 'Available for select lottery games'
      }
    ],
    pros: [
      'Government regulated',
      'Transparent draw process',
      'Nationwide accessibility',
      'Long-established reputation',
      'Multiple game options'
    ],
    cons: [
      'Limited online features',
      'Lower frequency draws',
      'Traditional interface',
      'Limited payment options'
    ],
    screenshots: [
      '/assets/brands/swertres-official.jpg',
      '/assets/brands/swertres-results.jpg',
      '/assets/brands/swertres-outlets.jpg'
    ],
    urlHistory: [
      { url: 'https://swertres.gov.ph', date: '2024-01-10', status: 'current', note: 'Official PCSO site' },
      { url: 'https://pcso.gov.ph/swertres', date: '2023-12-01', status: 'backup', note: 'PCSO portal' },
      { url: 'https://swertres-result.com', date: '2023-10-15', status: 'archived', note: 'Results portal' }
    ]
  },
  {
    id: 4,
    name: 'Lucky Cola',
    url: 'https://luckycola.com',
    category: 'Slots',
    logo: 'https://via.placeholder.com/80x80/9b59b6/ffffff?text=LC',
    badge: 'recommended',
    badgeText: 'Recommended',
    status: 'active',
    statusText: 'Active',
    description: 'Rich slot machine gaming platform with hundreds of premium slot games.',
    fullDescription: 'Lucky Cola offers an extensive collection of premium slot games from top providers worldwide. With stunning graphics, engaging themes, and exciting bonus features, it provides an unparalleled slot gaming experience for players of all levels.',
    features: ['Slot Games', 'Progressive Jackpots', 'Bonus Rounds', 'Free Spins'],
    lastUpdated: '2024-01-14',
    rating: 4.7,
    languages: ['English', 'Filipino', 'Chinese'],
    founded: '2020',
    license: 'PAGCOR Licensed',
    minDeposit: '₱50',
    maxPayout: '₱8,000,000',
    paymentMethods: ['GCash', 'PayMaya', 'Bank Transfer', 'Crypto', 'Load Cards'],
    customerSupport: '24/7 Live Chat, Email',
    bonuses: [
      {
        type: 'Welcome Package',
        description: '300% Welcome Bonus + 100 Free Spins',
        terms: 'Min deposit ₱50, 35x rollover requirement'
      },
      {
        type: 'Daily Free Spins',
        description: '20 Free Spins Daily on Selected Slots',
        terms: 'Login daily to claim, no deposit required'
      }
    ],
    pros: [
      'Huge selection of slot games',
      'Progressive jackpots',
      'Generous bonus offers',
      'Mobile-optimized platform',
      'Fast withdrawal processing'
    ],
    cons: [
      'Limited live casino games',
      'No sports betting',
      'High wagering requirements'
    ],
    screenshots: [
      '/assets/brands/luckycola-lobby.jpg',
      '/assets/brands/luckycola-slots.jpg',
      '/assets/brands/luckycola-jackpots.jpg'
    ],
    urlHistory: [
      { url: 'https://luckycola.com', date: '2024-01-14', status: 'current', note: 'Main gaming site' },
      { url: 'https://luckycola.vip', date: '2024-01-05', status: 'backup', note: 'VIP player portal' },
      { url: 'https://cola-slots.com', date: '2023-09-12', status: 'archived', note: 'Previous brand name' }
    ]
  },
  {
    id: 5,
    name: 'BingoPlus',
    url: 'https://bingoplus.com',
    category: 'Bingo',
    logo: 'https://via.placeholder.com/80x80/f39c12/ffffff?text=BP',
    badge: 'trending',
    badgeText: 'Trending',
    status: 'active',
    statusText: 'Active',
    description: 'Interactive bingo gaming platform with live hosts and exciting prizes.',
    fullDescription: 'BingoPlus revolutionizes the traditional bingo experience with interactive live streaming, professional hosts, and a vibrant community. Featuring multiple game rooms and exciting tournaments, it brings the social aspect of bingo into the digital age.',
    features: ['Live Bingo', 'Interactive Chat', 'Multiple Rooms', 'Daily Tournaments'],
    lastUpdated: '2024-01-13',
    rating: 4.4,
    languages: ['English', 'Filipino'],
    founded: '2021',
    license: 'PAGCOR Licensed',
    minDeposit: '₱30',
    maxPayout: '₱1,000,000',
    paymentMethods: ['GCash', 'PayMaya', 'Load Cards', 'Bank Transfer'],
    customerSupport: '24/7 Live Chat, Social Media',
    bonuses: [
      {
        type: 'Welcome Bonus',
        description: '₱50 Free Credits for New Players',
        terms: 'Register and verify account'
      },
      {
        type: 'Daily Login',
        description: 'Daily Free Credits and Bonuses',
        terms: 'Login daily to claim rewards'
      },
      {
        type: 'Tournament Prizes',
        description: 'Win Big in Daily Tournaments',
        terms: 'Participate in scheduled tournaments'
      }
    ],
    pros: [
      'Interactive live experience',
      'Low minimum deposits',
      'Social community features',
      'Regular tournaments',
      'Mobile-friendly platform',
      'Quick registration'
    ],
    cons: [
      'Limited to bingo games only',
      'Smaller prize pools',
      'Newer platform',
      'Limited customer support hours'
    ],
    screenshots: [
      '/assets/brands/bingoplus-live.jpg',
      '/assets/brands/bingoplus-rooms.jpg',
      '/assets/brands/bingoplus-community.jpg'
    ],
    urlHistory: [
      { url: 'https://bingoplus.com', date: '2024-01-13', status: 'current', note: 'Main bingo platform' },
      { url: 'https://bingoplus.live', date: '2023-12-18', status: 'backup', note: 'Live streaming portal' },
      { url: 'https://bingo-ph.com', date: '2023-08-20', status: 'archived', note: 'Original launch domain' }
    ]
  },
  {
    id: 6,
    name: 'Peso88',
    url: 'https://peso88.com',
    category: 'Sports Betting',
    logo: 'https://via.placeholder.com/80x80/2ecc71/ffffff?text=P88',
    badge: 'hot',
    badgeText: 'Hot',
    status: 'active',
    statusText: 'Active',
    description: 'Premier sports betting platform with competitive odds and extensive market coverage.',
    fullDescription: 'Peso88 stands as the premier sports betting destination in the Philippines, offering competitive odds across all major sporting events worldwide. With advanced live betting features and comprehensive market coverage, it provides professional-grade betting tools for serious sports enthusiasts.',
    features: ['Sports Betting', 'Live Streaming', 'In-Play Betting', 'Cash Out'],
    lastUpdated: '2024-01-16',
    rating: 4.9,
    languages: ['English', 'Filipino', 'Chinese'],
    founded: '2019',
    license: 'PAGCOR Licensed',
    minDeposit: '₱100',
    maxPayout: '₱15,000,000',
    paymentMethods: ['GCash', 'PayMaya', 'BPI', 'BDO', 'Metrobank', 'Crypto', 'USDT'],
    customerSupport: '24/7 Live Chat, Phone, Email, Telegram',
    bonuses: [
      {
        type: 'Sports Welcome Bonus',
        description: '100% Sports Betting Bonus up to ₱15,000',
        terms: 'Min deposit ₱100, 10x rollover on sports bets'
      },
      {
        type: 'Live Betting Cashback',
        description: '15% Weekly Cashback on Live Betting',
        terms: 'Up to ₱10,000 cashback per week'
      },
      {
        type: 'Accumulator Bonus',
        description: 'Up to 30% Bonus on Accumulator Bets',
        terms: 'Minimum 5 selections, odds 1.50 or higher'
      }
    ],
    pros: [
      'Best odds in the market',
      'Extensive live streaming',
      'Fast cash-out feature',
      'Professional betting tools',
      'Excellent customer support',
      'Wide range of sports'
    ],
    cons: [
      'Limited casino selection',
      'Higher minimum deposits',
      'Complex bonus terms'
    ],
    screenshots: [
      '/assets/brands/peso88-sportsbook.jpg',
      '/assets/brands/peso88-live.jpg',
      '/assets/brands/peso88-mobile.jpg'
    ],
    urlHistory: [
      { url: 'https://peso88.com', date: '2024-01-16', status: 'current', note: 'Main sportsbook site' },
      { url: 'https://peso88.net', date: '2024-01-08', status: 'backup', note: 'Mirror site' },
      { url: 'https://peso-betting.com', date: '2023-07-15', status: 'archived', note: 'Former brand domain' }
    ]
  },
  {
    id: 7,
    name: 'GCash Lottery',
    url: 'https://gcash.com/lottery',
    category: 'Digital Lottery',
    logo: 'https://via.placeholder.com/80x80/3498db/ffffff?text=GL',
    badge: 'official',
    badgeText: 'Official',
    status: 'active',
    statusText: 'Active',
    description: 'Official digital lottery platform integrated with GCash mobile payment system.',
    fullDescription: 'GCash Lottery brings convenience to traditional lottery gaming through seamless mobile integration. As the official digital lottery platform, it offers secure transactions, instant ticket purchases, and real-time results, all within the trusted GCash ecosystem.',
    features: ['Digital Tickets', 'Instant Results', 'GCash Integration', 'Mobile First'],
    lastUpdated: '2024-01-11',
    rating: 4.3,
    languages: ['English', 'Filipino'],
    founded: '2019',
    license: 'BSP and PCSO Licensed',
    minDeposit: '₱10',
    maxPayout: '₱100,000,000',
    paymentMethods: ['GCash Wallet', 'Linked Bank Accounts', 'Cash-in Partners'],
    customerSupport: '24/7 GCash Support, In-app Help',
    bonuses: [
      {
        type: 'First Purchase',
        description: '₱20 Bonus for First Lottery Purchase',
        terms: 'New users only, minimum ₱50 purchase'
      },
      {
        type: 'Cashback Rewards',
        description: '1% Cashback on All Lottery Purchases',
        terms: 'Credited to GCash wallet monthly'
      }
    ],
    pros: [
      'Seamless GCash integration',
      'Instant ticket purchasing',
      'Secure digital transactions',
      'Official government backing',
      'Mobile-first design',
      'Real-time results'
    ],
    cons: [
      'Requires GCash account',
      'Limited game variety',
      'Regional restrictions',
      'Dependent on mobile network'
    ],
    screenshots: [
      '/assets/brands/gcash-lottery-app.jpg',
      '/assets/brands/gcash-lottery-purchase.jpg',
      '/assets/brands/gcash-lottery-results.jpg'
    ],
    urlHistory: [
      { url: 'https://gcash.com/lottery', date: '2024-01-11', status: 'current', note: 'GCash app lottery section' },
      { url: 'https://lottery.gcash.com', date: '2023-11-20', status: 'backup', note: 'Dedicated lottery portal' },
      { url: 'https://gcash-lotto.ph', date: '2023-06-10', status: 'archived', note: 'Beta version' }
    ]
  },
  {
    id: 8,
    name: 'PhilWeb',
    url: 'https://philweb.com.ph',
    category: 'Multi-Gaming',
    logo: 'https://via.placeholder.com/80x80/8e44ad/ffffff?text=PW',
    badge: 'established',
    badgeText: 'Established',
    status: 'inactive',
    statusText: 'Maintenance',
    description: 'Established multi-gaming platform offering various casino and betting options.',
    fullDescription: 'PhilWeb has been a pioneer in the Philippine online gaming industry, offering a comprehensive multi-gaming platform. With years of experience and a diverse portfolio, it has served as a foundation for many gaming operations, though currently undergoing maintenance and updates.',
    features: ['Casino Games', 'Sports Betting', 'Lottery', 'Poker'],
    lastUpdated: '2024-01-05',
    rating: 4.2,
    languages: ['English', 'Filipino'],
    founded: '2000',
    license: 'Previously PAGCOR Licensed',
    minDeposit: '₱500',
    maxPayout: '₱5,000,000',
    paymentMethods: ['Bank Transfer', 'Credit Cards', 'E-wallets'],
    customerSupport: 'Limited during maintenance',
    bonuses: [
      {
        type: 'Historical Welcome Bonus',
        description: 'Previously offered 100% Welcome Bonus',
        terms: 'Currently unavailable due to maintenance'
      }
    ],
    pros: [
      'Long industry experience',
      'Comprehensive gaming platform',
      'Established reputation',
      'Multiple game categories',
      'Pioneer in Philippine gaming'
    ],
    cons: [
      'Currently under maintenance',
      'Outdated interface',
      'Limited customer support',
      'Uncertain return timeline',
      'Higher minimum deposits'
    ],
    screenshots: [
      '/assets/brands/philweb-legacy.jpg',
      '/assets/brands/philweb-games.jpg',
      '/assets/brands/philweb-maintenance.jpg'
    ],
    urlHistory: [
      { url: 'https://philweb.com.ph', date: '2024-01-05', status: 'current', note: 'Under maintenance' },
      { url: 'https://philweb-gaming.com', date: '2023-10-15', status: 'backup', note: 'Gaming portal' },
      { url: 'https://philweb.net', date: '2023-03-20', status: 'archived', note: 'Legacy platform' }
    ]
  }
];

// 最近更新信息
export const recentUpdates = [
  {
    id: 1,
    brandId: 6,
    brandName: 'Peso88',
    type: 'url_update',
    message: 'Updated to new domain for better accessibility',
    date: '2024-01-16',
    icon: 'fas fa-link'
  },
  {
    id: 2,
    brandId: 1,
    brandName: 'Jilibet',
    type: 'feature_update',
    message: 'Added new live betting features',
    date: '2024-01-15',
    icon: 'fas fa-plus-circle'
  },
  {
    id: 3,
    brandId: 4,
    brandName: 'Lucky Cola',
    type: 'promotion',
    message: 'New welcome bonus for new players',
    date: '2024-01-14',
    icon: 'fas fa-gift'
  },
  {
    id: 4,
    brandId: 5,
    brandName: 'BingoPlus',
    type: 'maintenance',
    message: 'Scheduled maintenance completed successfully',
    date: '2024-01-13',
    icon: 'fas fa-tools'
  },
  {
    id: 5,
    brandId: 2,
    brandName: 'Nuebe Gaming',
    type: 'new_games',
    message: 'Added new live dealer games',
    date: '2024-01-12',
    icon: 'fas fa-dice'
  }
];

// 状态筛选选项
export const statusOptions = [
  {
    value: 'all',
    label: 'All Status',
    count: brands.length
  },
  {
    value: 'active',
    label: 'Active',
    count: brands.filter(b => b.status === 'active').length
  },
  {
    value: 'updating',
    label: 'Updating',
    count: brands.filter(b => b.status === 'updating').length
  },
  {
    value: 'inactive',
    label: 'Inactive',
    count: brands.filter(b => b.status === 'inactive').length
  }
];

// 分类选项
export const categoryOptions = [
  {
    value: 'all',
    label: 'All Categories'
  },
  {
    value: 'Sports Betting',
    label: 'Sports Betting'
  },
  {
    value: 'Live Casino',
    label: 'Live Casino'
  },
  {
    value: 'Slots',
    label: 'Slots'
  },
  {
    value: 'Lottery',
    label: 'Lottery'
  },
  {
    value: 'Bingo',
    label: 'Bingo'
  }
];

// 排序选项
export const sortOptions = [
  {
    value: 'name',
    label: 'Name A-Z'
  },
  {
    value: 'name_desc',
    label: 'Name Z-A'
  },
  {
    value: 'rating',
    label: 'Rating High-Low'
  },
  {
    value: 'updated',
    label: 'Recently Updated'
  },
  {
    value: 'status',
    label: 'Status'
  }
];

// 徽章类型配置
export const badgeConfig = {
  hot: {
    className: 'bg-orange-500 text-white',
    icon: 'fas fa-fire',
    label: 'Hot'
  },
  new: {
    className: 'bg-blue-500 text-white',
    icon: 'fas fa-star',
    label: 'New'
  },
  popular: {
    className: 'bg-purple-500 text-white',
    icon: 'fas fa-heart',
    label: 'Popular'
  },
  recommended: {
    className: 'bg-green-500 text-white',
    icon: 'fas fa-thumbs-up',
    label: 'Recommended'
  },
  trending: {
    className: 'bg-pink-500 text-white',
    icon: 'fas fa-trending-up',
    label: 'Trending'
  },
  official: {
    className: 'bg-indigo-500 text-white',
    icon: 'fas fa-certificate',
    label: 'Official'
  },
  established: {
    className: 'bg-gray-600 text-white',
    icon: 'fas fa-building',
    label: 'Established'
  }
};

// 获取品牌by ID
export const getBrandById = (id) => {
  return brands.find(brand => brand.id === parseInt(id));
};

// 获取相关品牌推荐
export const getRelatedBrands = (currentBrandId, category, limit = 3) => {
  return brands
    .filter(brand => 
      brand.id !== parseInt(currentBrandId) && 
      (brand.category === category || brand.status === 'active')
    )
    .slice(0, limit);
};

// 搜索品牌
export const searchBrands = (query, filters = {}) => {
  let filtered = [...brands];
  
  // 文本搜索
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm) ||
      brand.description.toLowerCase().includes(searchTerm) ||
      brand.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // 状态筛选
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(brand => brand.status === filters.status);
  }
  
  // 分类筛选
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(brand => brand.category === filters.category);
  }
  
  // 排序
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
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
  }
  
  return filtered;
}; 