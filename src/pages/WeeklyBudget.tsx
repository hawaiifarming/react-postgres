import React, { useState, useEffect } from 'react';
import SalesLineChart from '../components/SalesLineChart';
import SalesTable from '../components/SalesTable';
import PageHeader from '../components/PageHeader';
import ChartGrid from '../components/ChartGrid';
import TableStack from '../components/TableStack';
import { usePostgresData } from '../hooks/useDatabase';

const WeeklyBudget: React.FC = () => {
  const { service, loading: serviceLoading, error: serviceError } = usePostgresData();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load weekly budget data when service is available
  useEffect(() => {
    // Set document title
    document.title = 'Weekly Budget - Dashboard';
    
    const loadData = async () => {
      if (!service) return;
      
      try {
        setLoading(true);
        setError(null);
        const weeklyData = await service.loadAllData();
        setData(weeklyData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [service]);

  // Simulate user role - in a real app this would come from authentication
  const userRole = 'admin'; // or 'user'
  const metrics = userRole === 'admin' ? ['dollars', 'cases'] : ['cases'];

  // Show loading if service is still loading or data is loading
  const isLoading = serviceLoading || loading;
  // Show error from either service or data loading
  const displayError = serviceError || error;

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-text">Error loading data: {displayError.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="loading-container">
        <p className="loading-text">No data available</p>
      </div>
    );
  }

  const {
    farms,
    varieties,
    products,
    summaryChartDollarsCases,
    summaryTableDollar,
    summaryTableCases,
    summaryChartPounds,
    productChartDollarsCases,
    productTableDollar,
    productTableCases,
    varietyTablePounds,
  } = data;

  return (
    <PageHeader 
      title="Weekly Budget" 
      subtitle=""
    >
      {/* Summary Charts - Dollars & Cases */}
      <ChartGrid columns={3}>
        {metrics.map(m =>
          farms.map((f: any) => (
            <SalesLineChart
              key={`${f.farm}-${m}`}
              data={summaryChartDollarsCases.filter((d: any) => d.Farm === f.farm)}
              x="ISOWeek"
              y={m === 'dollars' ? 'Dollars' : 'Cases'}
              series="DataLabel"
              title={`${f.farm} ${m === 'dollars' ? '$ (000)' : 'Cases'} On & Off Grade`}
            />
          ))
        )}
      </ChartGrid>

      {/* Summary Charts - Pounds */}
      <ChartGrid columns={3}>
        {varieties.map((v: any) => (
          <SalesLineChart
            key={v.variety}
            data={summaryChartPounds.filter((d: any) => d.Variety === v.variety)}
            x="ISOWeek"
            y="PoundsPerDay"
            series="DataLabel"
            title={`${
              v.variety === 'K' ? 'Keiki' : 
              v.variety === 'J' ? 'Japanese' : 
              'Lettuce'
            } On-grade lb/day`}
          />
        ))}
      </ChartGrid>

      {/* Summary Tables */}
      <TableStack className="mb-8">
        {metrics.map(m => (
          <SalesTable
            key={m}
            data={m === 'dollars' ? summaryTableDollar : summaryTableCases}
            columnTitles={m === 'dollars' ? { 'Dollars': '$ (000)' } : { 'Cases': 'Cases' }}
          />
        ))}

        <SalesTable
          key="pounds"
          data={varietyTablePounds}
        />
      </TableStack>

      {/* Product Charts */}
      <ChartGrid columns={2}>
        {products.map((p: any) =>
          metrics.map(m => (
            <SalesLineChart
              key={`${p.productcode}-${m}`}
              data={productChartDollarsCases.filter((d: any) => d.Product === p.productcode)}
              x="ISOWeek"
              y={m === 'dollars' ? 'Dollars' : 'Cases'}
              series="DataLabel"
              title={`${p.productcode} ${m === 'dollars' ? '$ (000)' : 'Cases'}`}
            />
          ))
        )}
      </ChartGrid>

      {/* Product Tables */}
      <TableStack>
        {metrics.map(m => (
          <SalesTable
            key={`product-${m}`}
            data={m === 'dollars' ? productTableDollar : productTableCases}
            columnTitles={m === 'dollars' ? { 'Dollars': '$ (000)' } : { 'Cases': 'Cases' }}
          />
        ))}
      </TableStack>
    </PageHeader>
  );
};

export default WeeklyBudget;
