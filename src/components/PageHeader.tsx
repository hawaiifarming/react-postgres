import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="content-wrapper">
          <div className="green-accent"></div>
          <div className="page-title-section">
            <h1 className="heading-main">{title}</h1>
            <p className="subtitle">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
