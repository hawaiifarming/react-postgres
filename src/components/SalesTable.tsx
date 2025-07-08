import React from 'react';
import type { ChartData } from '../types';

interface SalesTableProps {
  data: ChartData[];
  keyColumn?: string; // Optional since we auto-detect it
  columnTitles?: { [key: string]: string }; // Optional custom column titles
}

const SalesTable: React.FC<SalesTableProps> = ({ data, columnTitles = {} }) => {
  // Default column titles that will be used across all pages
  const defaultColumnTitles: { [key: string]: string } = {
    'ActualYTD': 'Act YTD',
    'BudgetYTD': 'Bdg YTD', 
    'ActualLYTD': 'LY YTD',
    'ChangeYTD': 'Chg YTD',
    'BudgetFY': 'Bdg FY',
    'ActualLastFY': 'LY FY',
    'ChangeFY': 'Chg FY'
  };

  // Merge default titles with any custom titles passed in
  const mergedColumnTitles: { [key: string]: string } = { ...defaultColumnTitles, ...columnTitles };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  // Find the actual key column (farm names, varieties, etc.)
  const actualKeyColumn = Object.keys(data[0]).find(key => 
    key === 'Farm' || key === 'Variety' || key === 'Product' || 
    (typeof data[0][key] === 'string' && !key.toLowerCase().includes('change'))
  ) || Object.keys(data[0])[0];
  
  // Get all columns except the key column
  const columns = Object.keys(data[0]).filter(key => key !== actualKeyColumn);

  const formatValue = (value: any, column: string) => {
    // Convert string numbers to actual numbers if needed
    let numValue = value;
    if (typeof value === 'string' && !isNaN(Number(value))) {
      numValue = Number(value);
    }
    
    if (typeof numValue === 'number') {
      if (column.toLowerCase().includes('change')) {
        // For percentages, show as whole number with % sign
        return `${Math.round(numValue * 100)}%`;
      }
      // Format all other numbers as whole numbers with commas, no decimals
      return Math.round(numValue).toLocaleString('en-US');
    }
    return value;
  };

  const formatColumnHeader = (column: string) => {
    // Use merged titles (default + custom) if provided, otherwise use the column name as-is
    return mergedColumnTitles[column] || column;
  };

  return (
    <div className="card">
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell table-header-first">
                {formatColumnHeader(actualKeyColumn)}
              </th>
              {columns.map((column) => (
                <th
                  key={column}
                  className="table-header-cell"
                >
                  {formatColumnHeader(column)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {data.map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell table-cell-first">
                  {row[actualKeyColumn]}
                </td>
                {columns.map((column) => (
                  <td
                    key={column}
                    className="table-cell"
                    style={{ 
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {formatValue(row[column], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
