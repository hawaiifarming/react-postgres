# Changelog

All notable changes to this project will be documented in this file.

## [Current] - 2025-01-08

### 🎯 Major Refactoring Complete

#### Added
- **Unified Chart Component**: Single `SalesLineChart` handles both weekly and monthly data
- **Sticky Navigation**: Fixed header with logo and hamburger menu
- **Custom CSS System**: Complete migration from Tailwind to custom CSS with variables
- **DRY Data Services**: Separated variable data from period-specific queries
- **Monthly Dashboard**: Full monthly budget dashboard with proper data handling
- **Responsive Design**: Mobile-first approach with responsive chart intervals
- **Production PostgreSQL**: Real database connections with proper error handling

#### Changed
- **Migrated from Tailwind CSS to Custom CSS**: Better control and smaller bundle size
- **Unified `SalesLineChart`**: Replaced separate weekly/monthly chart components
- **Refactored Data Services**: 
  - `loadAllVariableData()` - Common farms, varieties, products
  - `loadAllWeeklyData()` - Weekly data with variables
  - `loadAllMonthlyData()` - Monthly data with variables
- **Navigation Architecture**: Moved from page headers to app-level sticky navigation
- **Chart Responsiveness**: Dynamic X-axis intervals based on screen size
- **Project Structure**: Cleaner separation of concerns

#### Removed
- **Tailwind CSS**: All dependencies and classes removed
- **Mock Data**: Completely removed in favor of real PostgreSQL connections
- **Dead Code**: Eliminated 6 unused components and files:
  - `Header.tsx`
  - `PageHeader.tsx` 
  - `SalesLineChartMonthly.tsx`
  - `SalesMonthlyChart.tsx`
  - `dbFactory.ts`
  - `connectionTester.ts`
- **Duplicate Logic**: Consolidated repeated database queries

#### Fixed
- **TypeScript Errors**: Fixed event handler type casting issues in navigation
- **Table Alignment**: Proper sticky columns and responsive table layout
- **Chart Tooltips**: Professional formatting with CSS classes
- **Series Ordering**: Consistent data series order (Budget before Actual)
- **X-axis Labels**: Responsive intervals for better readability

### 🏗️ Technical Improvements

#### Architecture
- **Clean Code Principles**: DRY, separation of concerns, composition over inheritance
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized rendering and bundle size
- **Maintainability**: Unified components and services for easier updates

#### UI/UX
- **Professional Design**: Clean, modern interface with proper spacing
- **Mobile Responsive**: Works seamlessly on all screen sizes
- **Accessibility**: Proper semantic HTML and ARIA labels
- **User Experience**: Intuitive navigation and clear data presentation

#### Database
- **Production Ready**: Direct PostgreSQL connections without middleware
- **Error Handling**: Graceful failure handling and user feedback
- **Query Optimization**: Efficient data loading with proper ordering
- **Type Safety**: Strongly typed database responses

## Dependencies

### Current Stack
- React 19.1.0
- TypeScript 5.8.3
- Vite 7.0.2
- React Router 7.6.3
- ECharts 5.6.0
- echarts-for-react 3.0.2
- Lucide React 0.525.0

### Removed Dependencies
- @tailwindcss/typography
- tailwindcss
- autoprefixer
- postcss
