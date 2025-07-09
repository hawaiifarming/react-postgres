# Database Setup Instructions

This guide will help you set up the PostgreSQL database for the React PostgreSQL Dashboard.

## Prerequisites

- PostgreSQL server running (local or remote)
- Node.js and npm installed
- Database connection details configured in `src/config/database.ts`

## Setup Steps

### 1. Configure Database Connection

Update your database connection in `src/config/database.ts`:

```typescript
export const getConnection = (name: string): DatabaseConnection | null => {
  const connections: { [key: string]: DatabaseConnection } = {
    postgres_views: {
      id: 'postgres_views',
      name: 'PostgreSQL Views',
      type: 'postgres',
      host: 'your_host',
      port: 5432,
      database: 'your_database', 
      username: 'your_username',
      password: 'your_password',
      ssl: false
    }
  };
  return connections[name] || null;
};
```

### 2. Required Database Views and Tables

The application expects the following PostgreSQL views/tables to exist:

### 2. Install Dependencies

In the backend directory, install the required dependencies:

```bash
npm install
```

### 3. Run Database Setup

Execute the database setup script:

```bash
npm run setup-db
```

This will:
- Create all required tables and views
- Insert sample data for farms, varieties, and products
- Generate sample sales and budget data for the last 12 weeks
- Create indexes for optimal performance

### 4. Start the Backend Server

```bash
npm start
# or for development with auto-restart:
npm run dev
```

## Database Structure

The setup creates the following tables:

### Base Tables
- `global_farms` - Farm information
- `global_varieties` - Product varieties
- `product_details` - Product codes and details
- `sales_data` - Sales transaction data
- `budget_data` - Budget/target data

### Views (for Dashboard)
- `sales_budget_weekly_summary_chart_dollars_cases`
- `sales_budget_weekly_summary_table_dollars`
- `sales_budget_weekly_summary_table_cases`
- `sales_budget_weekly_summary_chart_pounds`
- `sales_budget_weekly_product_chart_dollars_cases`
- `sales_budget_weekly_product_table_dollars`
- `sales_budget_weekly_product_table_cases`
- `sales_budget_weekly_variety_table_pounds`

## Sample Data

The setup includes:
- 8 farms
- 10 product varieties
- 12 products (excluding test products KF and JF)
- 12 weeks of sales and budget data
- Realistic random data for testing

## Troubleshooting

### Connection Issues
- Verify database credentials in `.env`
- Check if PostgreSQL server is running
- Ensure firewall allows connections to the database port

### Permission Issues
- Ensure the database user has CREATE, INSERT, and SELECT permissions
- Check if the database exists and is accessible

### Data Issues
- Run `npm run setup-db` again to reset the database
- Check server logs for specific error messages

## Verification

After setup, you can verify the installation by:

1. Starting the backend server (`npm start`)
2. Visiting `http://localhost:3001/health` to check server status
3. Using the dashboard frontend to view the data

## Manual Setup

If you prefer to run the SQL manually:

1. Open your PostgreSQL client (psql, pgAdmin, etc.)
2. Execute the contents of `database-setup.sql`
3. Verify tables and views were created successfully

## Next Steps

Once the database is set up:
1. Start the backend server
2. Start the frontend React application
3. Navigate to the Weekly Budget dashboard to see your data

The dashboard will automatically connect to your database and display the sample data with interactive charts and tables.
