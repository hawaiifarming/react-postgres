import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { ChartData } from '../types';

interface SalesLineChartMonthlyProps {
  data: ChartData[];
  x: string;
  y: string;
  series: string;
  title: string;
}

const SalesLineChartMonthly: React.FC<SalesLineChartMonthlyProps> = ({
  data,
  x,
  y,
  series,
  title,
}) => {
  // Hook to track screen size for responsive intervals
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Check initial size
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Transform data for ECharts
  const chartOptions = React.useMemo(() => {
    // Get all CSS values once
    const rootStyles = getComputedStyle(document.documentElement);
    const chartColors = [
      rootStyles.getPropertyValue('--chart-color-1').trim(),
      rootStyles.getPropertyValue('--chart-color-2').trim(),
      rootStyles.getPropertyValue('--chart-color-3').trim(),
      rootStyles.getPropertyValue('--chart-color-4').trim(),
      rootStyles.getPropertyValue('--chart-color-5').trim(),
      rootStyles.getPropertyValue('--chart-color-6').trim(),
      rootStyles.getPropertyValue('--chart-color-7').trim(),
      rootStyles.getPropertyValue('--chart-color-8').trim(),
    ];
    
    const titleColor = rootStyles.getPropertyValue('--chart-title-color').trim();
    const titleSize = parseInt(rootStyles.getPropertyValue('--chart-title-size'));
    const titleWeight = rootStyles.getPropertyValue('--chart-title-weight').trim();
    const axisColor = rootStyles.getPropertyValue('--chart-axis-color').trim();
    const gridColor = rootStyles.getPropertyValue('--chart-grid-color').trim();
    const legendColor = rootStyles.getPropertyValue('--chart-legend-color').trim();
    
    // Group data by series and preserve backend order
    const seriesData = new Map<string, { [key: string]: any }[]>();
    const seriesOrder: string[] = []; // Track the order series first appear
    const xAxisData = new Set<string>();

    data.forEach(item => {
      const seriesKey = item[series];
      const xValue = item[x];
      const yValue = item[y];

      if (!seriesData.has(seriesKey)) {
        seriesData.set(seriesKey, []);
        seriesOrder.push(seriesKey); // Simply preserve the order from your backend
      }
      
      seriesData.get(seriesKey)!.push({
        name: xValue,
        value: [xValue, yValue]
      });
      
      xAxisData.add(xValue);
    });

    const sortedXAxis = Array.from(xAxisData).sort((a, b) => Number(a) - Number(b));

    // Format values for tooltip and axis
    const formatValue = (value: number) => {
      // Return whole numbers without decimals, properly formatted with commas
      return Math.round(value).toLocaleString();
    };

    // Convert month number to short month name
    const getMonthName = (month: number) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthNames[month - 1] || month.toString();
    };

    const seriesConfig = seriesOrder.map((seriesName, index) => {
      const seriesPoints = seriesData.get(seriesName)!;
      // Create data array aligned with x-axis
      const alignedData = sortedXAxis.map(xValue => {
        const point = seriesPoints.find(p => p.name === xValue);
        return point ? point.value[1] : null;
      });

      return {
        name: seriesName,
        type: 'line',
        data: alignedData,
        smooth: false,
        symbol: 'none',
        lineStyle: {
          width: 2,
          color: chartColors[index % chartColors.length]
        },
        itemStyle: {
          color: chartColors[index % chartColors.length]
        },
        connectNulls: false
      };
    });

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 750,
      title: {
        text: title,
        left: 'left',
        textStyle: {
          color: titleColor,
          fontSize: titleSize,
          fontWeight: titleWeight,
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'var(--chart-bg-color)',
        borderColor: 'var(--chart-border-color)',
        borderWidth: 1,
        textStyle: {
          color: 'var(--chart-text-color)',
          fontSize: 'var(--chart-text-size)',
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: gridColor,
            width: 1,
            type: 'dashed',
          },
        },
        formatter: (params: any) => {
          if (!params || params.length === 0) return '';
          
          const monthNumber = parseInt(params[0].axisValue);
          const monthName = getMonthName(monthNumber);
          
          // Create header
          let result = `<div class="tooltip-header">${monthName} 2025</div>`;
          
          // Create aligned data rows using CSS classes
          params.forEach((param: any) => {
            if (param.value !== null && param.value !== undefined) {
              const color = param.color;
              const name = param.seriesName;
              const value = formatValue(param.value);
              
              result += `<div class="tooltip-row">
                <span class="tooltip-icon-cell">
                  <span class="tooltip-icon" style="background-color: ${color};"></span>
                </span>
                <span class="tooltip-name-cell">${name}:</span>
                <span class="tooltip-value-cell">${value}</span>
              </div>`;
            }
          });
          
          return result;
        },
      },
      legend: {
        top: '40px',
        left: 'center',
        textStyle: {
          color: legendColor,
          fontSize: 12,
        },
        icon: 'circle'
      },
      grid: {
        left: rootStyles.getPropertyValue('--chart-grid-left').trim(),
        right: rootStyles.getPropertyValue('--chart-grid-right').trim(),
        top: rootStyles.getPropertyValue('--chart-grid-top').trim(),
        bottom: rootStyles.getPropertyValue('--chart-grid-bottom').trim(),
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: sortedXAxis,
        axisLine: {
          lineStyle: {
            color: gridColor,
          },
        },
        axisLabel: {
          color: axisColor,
          fontSize: 11,
          formatter: (value: string) => {
            const monthNum = parseInt(value);
            return getMonthName(monthNum);
          },
          interval: (_index: number, value: string) => {
            const num = parseInt(value);
            if (isSmallScreen) {
              // Small screen: show every other month (2, 4, 6, 8, 10, 12)
              return num % 2 === 0 && num <= 12;
            } else {
              // Large screen: show all months (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
              return num >= 1 && num <= 12;
            }
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: axisColor,
          fontSize: 11,
          formatter: (value: number) => formatValue(value),
        },
        splitLine: {
          lineStyle: {
            color: gridColor,
            type: 'solid',
            width: 1,
            opacity: 0.6,
          },
        },
      },
      series: seriesConfig,
    };
  }, [data, x, y, series, title, isSmallScreen]);

  return (
    <div className="card">
      <div className="chart-container sales-line-chart">
        <ReactECharts
          option={chartOptions}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

export default SalesLineChartMonthly;
