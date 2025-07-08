# React PostgreSQL Dashboard

A modern React TypeScript dashboard application that replicates Evidence.dev functionality for creating interactive dashboards with PostgreSQL data sources.

## Features

- 📊 **Interactive Charts** - Comprehensive charting with Apache ECharts (Line, Bar, Pie, Gauge, Radar charts)
- 📋 **Data Tables** - Sortable and filterable tables for detailed data analysis
- 🔌 **Database Connections** - Easy PostgreSQL connection management
- 📱 **Responsive Design** - Mobile-first design using Tailwind CSS
- 🎨 **Modern UI** - Clean, professional interface inspired by Evidence.dev
- ⚡ **Fast Development** - Hot module replacement with Vite
- 🔒 **Type Safety** - Full TypeScript support throughout the application
- 🎯 **Advanced Visualizations** - Radar charts, gauges, and custom chart configurations

## Getting Started

### Prerequisites

- Node.js (18.0 or later)
- npm or yarn
- PostgreSQL database (optional - mock data included)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technology Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Apache ECharts (echarts-for-react)
- **Routing**: React Router
- **Database**: PostgreSQL (with mock data fallback)
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
