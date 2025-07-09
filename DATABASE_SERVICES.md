# Database Services Architecture

This document explains the clean database architecture for PostgreSQL connections and data management.

## Services Structure

### 1. `postgresDataService.ts` - Main PostgreSQL Data Service
- **Purpose**: Encapsulates all PostgreSQL database queries and operations
- **Features**: 
  - `loadAllVariableData()` - Common data (farms, varieties, products)
  - `loadAllWeeklyData()` - All weekly dashboard data with variable data
  - `loadAllMonthlyData()` - All monthly dashboard data with variable data
  - `customQuery()` - Generic method for custom SQL queries
  - Proper TypeScript types and error handling
  - DRY principles with no duplicate queries

**Usage**:
```typescript
import { PostgresDataService } from '../services/postgresDataService';

const service = new PostgresDataService();

// Load weekly data (includes variable data)
const weeklyData = await service.loadAllWeeklyData();

// Load monthly data (includes variable data)  
const monthlyData = await service.loadAllMonthlyData();

// Custom query for other pages
const customData = await service.customQuery('SELECT * FROM my_custom_view');
```

### 2. `databaseService.ts` - Core Database Connection Service
- **Purpose**: Handles low-level database connections and query execution
- **Features**:
  - HTTP-based PostgreSQL queries
  - Connection management and error handling
  - Generic query interface
  - Type-safe query results

**Usage**:
```typescript
import { DatabaseService } from '../services/databaseService';
import { getConnection } from '../config/database';

const connection = getConnection('postgres_views');
const db = new DatabaseService(connection);
const result = await db.query('SELECT * FROM my_table');
```
import { PostgresDataService } from '../services/postgresDataService';

const service = new PostgresDataService();
const data = await service.loadAllData();

// Or use specific methods
const farms = await service.getFarms();
const varieties = await service.getVarieties();

// Or custom queries for other pages
const customData = await service.customQuery('SELECT * FROM my_custom_table');
```

### 3. `useDatabase.ts` - React Hooks
- **Purpose**: Provides clean React hooks for database operations
- **Features**:
  - `useQuery<T>()` - Generic database query hook
  - `useWeeklyBudgetData()` - Specific hook for Weekly Budget data (uses PostgresDataService)
  - `usePostgresData()` - General hook that provides access to PostgresDataService instance
  - Built-in loading states, error handling, and TypeScript support
- **Usage**:
```typescript
import { useWeeklyBudgetData, usePostgresData } from '../hooks/useDatabase';

// For Weekly Budget page
const { data, loading, error } = useWeeklyBudgetData();

// For other pages that need the service instance
const { service, loading, error } = usePostgresData();
if (service) {
  const customData = await service.customQuery('SELECT * FROM my_table');
}
```

## Benefits

1. **Clean Code**: Pages are now much simpler and focused on UI logic
2. **Reusability**: Database connection logic is centralized and reusable
3. **Type Safety**: Full TypeScript support with proper error handling
4. **Testing**: Services can be easily mocked and tested
5. **Maintainability**: Database logic is separated from UI components

## Creating New Page Services

To create services for new pages, you have two options:

### Option 1: Use PostgresDataService directly
```typescript
import { usePostgresData } from '../hooks/useDatabase';

const MyPage = () => {
  const { service, loading, error } = usePostgresData();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (service) {
      service.customQuery('SELECT * FROM my_table')
        .then(setData)
        .catch(console.error);
    }
  }, [service]);

  if (loading) return <div>Loading...</div>;
  return <div>{/* Your page content */}</div>;
};
```

### Option 2: Create a page-specific service (extending PostgresDataService)
1. **Create a page-specific service** (e.g., `myPageService.ts`):
```typescript
import { PostgresDataService } from './postgresDataService';

export class MyPageService extends PostgresDataService {
  async getMySpecificData() {
    return await this.customQuery('SELECT * FROM my_specific_table WHERE condition = true');
  }

  async getAnotherDataset() {
    return await this.customQuery('SELECT * FROM another_table ORDER BY date DESC');
  }
}
```

2. **Create a custom hook** (add to `useDatabase.ts`):
```typescript
export const useMyPageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { MyPageService } = await import('../services/myPageService');
        const service = new MyPageService();
        const result = await service.getMySpecificData();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return { data, loading, error };
};
```

## Migration Guide

The old WeeklyBudget page went from **80+ lines** of complex database logic to **45 lines** of clean UI code. The database logic is now in separate, testable services.

### Before (Complex):
```typescript
// 80+ lines of useState, useEffect, database connection, error handling, etc.
const [farms, setFarms] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  // 50+ lines of complex database loading logic
}, []);
```

### After (Clean):
```typescript
// 1 line with full error handling and loading states
const { data, loading, error } = useWeeklyBudgetData();

// Or for custom pages
const { service, loading, error } = usePostgresData();
```

## Current Architecture Files

- `src/services/databaseService.ts` - Low-level database API communication
- `src/services/postgresDataService.ts` - High-level PostgreSQL data operations  
- `src/services/dbFactory.ts` - Database service factory (singleton pattern)
- `src/services/connectionTester.ts` - Database connection testing
- `src/hooks/useDatabase.ts` - React hooks for clean data fetching
- `backend/.env` - Database connection credentials (⚠️ **DO NOT COMMIT**)
- `.gitignore` - Updated to exclude sensitive files

This architecture makes the codebase more maintainable, testable, and developer-friendly.
