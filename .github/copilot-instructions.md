<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React PostgreSQL Dashboard

This is a React TypeScript application for creating interactive dashboards with PostgreSQL data sources. The project replicates Evidence.dev functionality using React, ECharts, and Tailwind CSS.

## Project Structure
- `src/components/` - Reusable UI components (charts, tables, navigation)
- `src/pages/` - Dashboard pages and views
- `src/services/` - Database services and API calls
- `src/types/` - TypeScript type definitions
- `src/config/` - Configuration files for database connections
- `backend/` - Node.js/Express API server for PostgreSQL connections

## Key Technologies
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Apache ECharts for data visualization (echarts-for-react)
- React Router for navigation
- PostgreSQL for data source
- Node.js/Express backend API
- Live database connections (no mock data)

## Design Patterns
- Use TypeScript interfaces for all data structures
- Component composition with props drilling or React Context for state management
- Responsive design with Tailwind CSS utilities
- Mock data service for development (replace with real PostgreSQL client in production)

## Coding Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
- Use proper TypeScript types for all props and state
- Follow React best practices for performance and accessibility
- Use Tailwind classes for consistent styling
