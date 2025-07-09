<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React PostgreSQL Dashboard

This is a React TypeScript application for creating interactive dashboards with PostgreSQL data sources. The project replicates Evidence.dev functionality using React, ECharts, and custom CSS.

## Project Structure
- `src/components/` - Reusable UI components (charts, tables, layout)
- `src/pages/` - Dashboard pages (WeeklyBudget, MonthlyBudget)
- `src/services/` - Database services and API calls
- `src/types/` - TypeScript type definitions
- `src/config/` - Configuration files for database connections
- `src/styles/` - Custom CSS styling (Tailwind removed)
- `src/hooks/` - Custom React hooks

## Key Technologies
- React 19 with TypeScript
- Vite for build tooling
- Custom CSS for styling (migrated from Tailwind CSS)
- Apache ECharts for data visualization (echarts-for-react)
- React Router v7 for navigation
- PostgreSQL for data source
- Production-ready database connections (no mock data)

## Design Patterns
- Use TypeScript interfaces for all data structures
- Component composition with reusable layout components
- Responsive design with custom CSS and CSS variables
- DRY principles with unified data services and chart components
- Clean architecture with separated concerns

## Coding Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
- Use proper TypeScript types for all props and state
- Follow React best practices for performance and accessibility
- Use custom CSS classes for consistent styling
- Implement responsive design patterns
- Maintain clean, production-ready code structure

## Coding Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
- Use proper TypeScript types for all props and state
- Follow React best practices for performance and accessibility
- Use Tailwind classes for consistent styling
