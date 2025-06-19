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
    features: ['Sports Betting', 'Live Betting', 'Casino Games', 'Mobile App'],
    lastUpdated: '2024-01-15',
    rating: 4.8,
    languages: ['English', 'Filipino', 'Chinese']
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
    features: ['Live Casino', 'Baccarat', 'Roulette', 'Blackjack'],
    lastUpdated: '2024-01-12',
    rating: 4.6,
    languages: ['English', 'Filipino']
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
    features: ['SWERTRES', 'Lotto 6/42', 'Mega Lotto', 'Super Lotto'],
    lastUpdated: '2024-01-10',
    rating: 4.5,
    languages: ['English', 'Filipino']
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
    features: ['Slot Games', 'Progressive Jackpots', 'Bonus Rounds', 'Free Spins'],
    lastUpdated: '2024-01-14',
    rating: 4.7,
    languages: ['English', 'Filipino', 'Chinese']
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
    features: ['Live Bingo', 'Interactive Chat', 'Multiple Rooms', 'Daily Tournaments'],
    lastUpdated: '2024-01-13',
    rating: 4.4,
    languages: ['English', 'Filipino']
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
    features: ['Sports Betting', 'Live Streaming', 'In-Play Betting', 'Cash Out'],
    lastUpdated: '2024-01-16',
    rating: 4.9,
    languages: ['English', 'Filipino', 'Chinese']
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
    features: ['Digital Tickets', 'Instant Results', 'GCash Integration', 'Mobile First'],
    lastUpdated: '2024-01-11',
    rating: 4.3,
    languages: ['English', 'Filipino']
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
    features: ['Casino Games', 'Sports Betting', 'Lottery', 'Poker'],
    lastUpdated: '2024-01-05',
    rating: 4.2,
    languages: ['English', 'Filipino']
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
    labelCn: '全部状态',
    count: brands.length
  },
  {
    value: 'active',
    label: 'Active',
    labelCn: '活跃',
    count: brands.filter(b => b.status === 'active').length
  },
  {
    value: 'updating',
    label: 'Updating',
    labelCn: '更新中',
    count: brands.filter(b => b.status === 'updating').length
  },
  {
    value: 'inactive',
    label: 'Inactive',
    labelCn: '不活跃',
    count: brands.filter(b => b.status === 'inactive').length
  }
];

// 分类选项
export const categoryOptions = [
  {
    value: 'all',
    label: 'All Categories',
    labelCn: '全部分类'
  },
  {
    value: 'Sports Betting',
    label: 'Sports Betting',
    labelCn: '体育博彩'
  },
  {
    value: 'Live Casino',
    label: 'Live Casino',
    labelCn: '真人娱乐场'
  },
  {
    value: 'Slots',
    label: 'Slots',
    labelCn: '老虎机'
  },
  {
    value: 'Lottery',
    label: 'Lottery',
    labelCn: '彩票'
  },
  {
    value: 'Bingo',
    label: 'Bingo',
    labelCn: '宾果'
  }
];

// 排序选项
export const sortOptions = [
  {
    value: 'name',
    label: 'Name A-Z',
    labelCn: '名称 A-Z'
  },
  {
    value: 'name_desc',
    label: 'Name Z-A',
    labelCn: '名称 Z-A'
  },
  {
    value: 'rating',
    label: 'Rating High-Low',
    labelCn: '评分从高到低'
  },
  {
    value: 'updated',
    label: 'Recently Updated',
    labelCn: '最近更新'
  },
  {
    value: 'status',
    label: 'Status',
    labelCn: '状态'
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