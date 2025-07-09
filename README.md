# React PostgreSQL Dashboard

A modern React TypeScript dashboard application for creating interactive dashboards with PostgreSQL data sources. This project provides a clean, production-ready implementation with responsive design and real-time data visualization.

## ✨ Features

- 📊 **Interactive Charts** - Unified line charts with Apache ECharts for both weekly and monthly data
- 📋 **Data Tables** - Responsive tables with sticky columns and proper alignment
- 🔌 **PostgreSQL Integration** - Direct database connections with production-ready service architecture
- 📱 **Responsive Design** - Mobile-first design with custom CSS (Tailwind removed)
- 🎨 **Modern UI** - Clean, professional interface with sticky header and hamburger navigation
- ⚡ **Fast Development** - Hot module replacement with Vite
- 🔒 **Type Safety** - Full TypeScript support throughout the application
- �️ **Clean Architecture** - DRY principles with reusable components and unified data services

## 🚀 Getting Started

### Prerequisites

- Node.js (18.0 or later)
- npm or yarn
- PostgreSQL database with required views/tables

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database connection in `src/config/database.ts`
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 
- **Styling**: Custom CSS (migrated from Tailwind)
- **Charts**: Apache ECharts (echarts-for-react)
- **Routing**: React Router v7
- **Database**: PostgreSQL with custom service layer
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChartGrid.tsx   # Grid layout for charts
│   ├── SalesLineChart.tsx # Unified chart component
│   ├── SalesTable.tsx  # Data table component  
│   └── TableStack.tsx  # Stack layout for tables
├── pages/              # Dashboard pages
│   ├── WeeklyBudget.tsx # Weekly dashboard
│   └── MonthlyBudget.tsx # Monthly dashboard
├── services/           # Database services
│   ├── postgresDataService.ts # Main data service
│   └── databaseService.ts     # Core DB connection
├── hooks/              # Custom React hooks
│   └── useDatabase.ts  # Database hook
├── config/             # Configuration
│   └── database.ts     # Database configuration
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
├── styles/             # CSS styles
│   └── dashboard.css   # Main stylesheet
└── App.tsx             # Main app component
```

## 🎯 Key Features Implemented

### Data Architecture
- **DRY Data Services**: Separated common variable queries from period-specific data
- **Unified Chart Component**: Single `SalesLineChart` handles both weekly and monthly data
- **Production-Ready PostgreSQL**: Real database connections with proper error handling

### UI/UX Improvements  
- **Sticky Header**: Fixed navigation with logo and hamburger menu
- **Responsive Design**: Mobile-first approach with responsive chart intervals
- **Clean Styling**: Custom CSS with CSS variables for theming
- **Professional Layout**: Grid-based layouts with proper spacing and alignment

### Performance Optimizations
- **Removed Dead Code**: Eliminated 6 unused components and files
- **Optimized Rendering**: Efficient React patterns with proper dependency arrays
- **Fast Development**: Vite with hot module replacement

## 📊 Dashboard Pages

### Weekly Budget Dashboard
- Weekly data visualization with ISO week numbers
- Responsive X-axis intervals (every 4 weeks on large screens, every 8 on small)
- Summary charts for dollars, cases, and pounds
- Product and variety breakdowns

### Monthly Budget Dashboard  
- Monthly data visualization with month numbers (1-12)
- All months displayed on X-axis for better visibility
- Same chart types as weekly but with monthly aggregation
- Unified codebase with weekly dashboard

## 🔧 Database Requirements

The application expects these PostgreSQL views/tables:
- `global_farms` - Farm data with Index for ordering
- `global_varieties` - Variety data 
- `product_details` - Product information
- `sales_budget_weekly_*` - Weekly data views
- `sales_budget_monthly_*` - Monthly data views

## 💡 Design Decisions

1. **Removed Tailwind CSS**: Migrated to custom CSS for better control and smaller bundle size
2. **Unified Chart Component**: Single component handles both weekly/monthly data via props
3. **DRY Data Services**: Extracted common queries to eliminate duplication
4. **Sticky Navigation**: In-app navigation without page header components
5. **Production Focus**: Real PostgreSQL connections, no mock data

## 🙏 Acknowledgments

- Inspired by [Evidence.dev](https://evidence.dev)
- Built with modern React best practices
- Clean architecture principles applied throughout
- **Icons**: Lucide React

## Acknowledgments

- Inspired by [Evidence.dev](https://evidence.dev)
- Built with modern React best practices

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
