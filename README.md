# BetLink - Philippine Betting Platform Directory

<div align="center">
  <h1>🎲 BetLink</h1>
  <p>Quickly find the latest available URLs for major Philippine betting brands</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwind-css)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
</div>

## 📖 Project Overview

BetLink is a modern Philippine betting platform directory application that provides users with the latest and most comprehensive betting brand information and available URLs. The application uses Next.js 14 App Router architecture to deliver a smooth user experience with comprehensive functionality.

### 🌟 Key Features

- **🔍 Smart Search** - Real-time brand name search for quick platform location
- **📱 Responsive Design** - Perfect compatibility with desktop and mobile devices
- **🎨 Clean Design** - Modern and clean user interface
- **⭐ Favorites Management** - Local brand favorites for quick access
- **📋 One-Click Copy** - Quick copying of brand URLs to clipboard
- **🔄 Status Filtering** - Filter by brand status (active/updating/maintenance)
- **📊 Data Statistics** - Display search result counts and brand statistics
- **🚀 Performance Optimization** - SSR rendering for fast loading

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 14** - React full-stack framework (App Router)
- **React 18** - User interface building library
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS post-processor
- **Font Awesome** - Icon library

### State Management
- **Local Storage** - Local data persistence for user preferences

### Development Tools
- **ESLint** - Code quality checking
- **Prettier** - Code formatting

## 📂 Project Structure

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── all-brands/        # All brands page
│   │   ├── contact/           # Contact page
│   │   ├── favorites/         # Favorites page
│   │   ├── home/              # Home redirect
│   │   ├── layout.tsx         # Global layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── BrandCard.jsx      # Brand card component
│   │   ├── BottomNavigation.jsx # Bottom navigation
│   │   ├── Header.jsx         # Top navigation
│   │   └── Layout.jsx         # Page layout component
│   ├── data/                  # Data files
│   │   └── brands.js          # Brand data
│   ├── hooks/                 # Custom hooks
│   │   └── useLocalStorage.js # Local storage hook
│   ├── utils/                 # Utility functions
│   │   └── clipboard.js       # Clipboard operations
│   └── pages/                 # Legacy page components (deprecated)
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.mjs         # PostCSS configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependency management
```

## 🚀 Quick Start

### Requirements
- Node.js 18.x or higher
- npm, yarn, pnpm or bun

### Installation Steps

1. **Clone the project**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to view the application

### Build and Deploy

```bash
# Build production version
npm run build

# Start production server
npm start
```

## 📱 Feature Modules

### 🏠 Home Page (/)
- **Welcome Area** - Project introduction and search entry
- **Hot Brands** - Featured recommended brand displays
- **Search Function** - Real-time brand name search
- **Status Filtering** - Filter display by brand status
- **Recent Updates** - Display latest platform updates

### 📋 All Brands (/all-brands)
- **Complete List** - Display all available brands
- **Advanced Search** - Support name search and status filtering
- **Grid Layout** - Responsive card display
- **Result Statistics** - Real-time display of filter result counts

### ⭐ Favorites Page (/favorites)
- **Favorites Management** - View and manage favorite brands
- **Quick Access** - One-click access to favorite brands
- **Empty State** - Friendly empty favorites prompt
- **Usage Guide** - Favorites usage instructions

### ℹ️ About Page (/about)
- **Platform Introduction** - Detailed project introduction
- **Feature Overview** - Main feature descriptions
- **Disclaimer** - Terms of use and disclaimers
- **Contact Information** - Development team information

### 📞 Contact Page (/contact)
- **Contact Form** - User feedback and inquiry form
- **Contact Methods** - Multiple contact method displays
- **Form Validation** - Complete input validation
- **Submit Feedback** - Form submission status prompts

## 🎨 Component Details

### BrandCard - Brand Card
- **Brand Information** - Name, Logo, URL, Status
- **Operation Functions** - Copy URL, toggle favorites, view details
- **Status Indicators** - Visual status display
- **Badge System** - Hot, new, recommended and other indicators



### BottomNavigation - Bottom Navigation
- **Main Navigation** - Home, Favorites, About, Contact
- **Active State** - Current page highlighting
- **Icon System** - Font Awesome icons
- **Responsive** - Mobile optimization

## 🔧 Configuration

### Styling Configuration
The application uses a clean light theme design:

```css
/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

## 📊 Data Structure

### Brand Data Model
```javascript
{
  id: 1,                              // Unique identifier
  name: 'BrandName',                  // Brand name
  url: 'https://example.com',         // Access URL
  category: 'Sports Betting',         // Category
  logo: '/path/to/logo.jpg',         // Logo image
  badge: 'hot',                      // Badge type
  status: 'active',                  // Status
  description: 'Brand description',   // Detailed description
  features: ['Feature1', 'Feature2'], // Main features
  lastUpdated: '2024-01-15',         // Last updated
  rating: 4.8,                       // Rating
  languages: ['English', 'Chinese']   // Supported languages
}
```

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Browsers** iOS Safari, Chrome Mobile

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 📞 Contact Us

- **Project Maintainer**: BetLink Team
- **Email**: contact@betlink.ph
- **Website**: https://betlink.ph

## 🔄 Changelog

### v1.0.0 (2024-01-16)
- ✨ Initial release
- 🎨 Complete UI design and responsive layout
- 🔍 Search and filtering functionality
- ⭐ Favorites management feature
- 🎨 Clean and modern interface
- 📱 Mobile optimization

---

<div align="center">
  <p>Made with ❤️ for the Philippine betting community</p>
</div>
