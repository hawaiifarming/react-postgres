import React from 'react';

interface TableStackProps {
  children: React.ReactNode;
  className?: string;
}

const TableStack: React.FC<TableStackProps> = ({ children, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
};

export default TableStack;
