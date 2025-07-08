import React from 'react';

interface ChartGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

const ChartGrid: React.FC<ChartGridProps> = ({ 
  children, 
  columns = 3,
  className = '' 
}) => {
  const getGridClasses = () => {
    switch (columns) {
      case 1:
        return 'grid grid-cols-1';
      case 2:
        return 'grid grid-cols-1 grid-cols-2-lg';
      case 3:
      default:
        return 'grid grid-cols-1 grid-cols-2-md grid-cols-3-lg';
    }
  };

  return (
    <div className={`${getGridClasses()} mb-6 ${className}`}>
      {children}
    </div>
  );
};

export default ChartGrid;
