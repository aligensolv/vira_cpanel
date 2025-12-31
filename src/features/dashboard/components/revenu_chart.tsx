// src/features/dashboard/components/RevenueChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface RevenueChartProps {
  data: number[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      fontFamily: 'inherit',
      animations: { enabled: true }
    },
    colors: ['var(--primary)'], // neutral-900
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.0,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#737373', fontSize: '12px' }
      }
    },
    yaxis: {
      show: true,
      labels: {
        style: { colors: '#737373', fontSize: '12px' },
        formatter: (value) => `$${value}`
      }
    },
    grid: {
      show: true,
      borderColor: '#e5e5e5', // neutral-200
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },   
      yaxis: { lines: { show: true } },  
    },
    tooltip: {
      theme: 'light',
      style: { fontSize: '12px' },
      x: { show: false },
      marker: { show: false },
    }
  };

  const series = [{ name: 'Revenue', data: data }];

  return (
    <div className="bg-white border border-neutral-200 p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-neutral-900">Revenue Overview</h3>
        <p className="text-xs text-neutral-500">Income from confirmed bookings (Last 7 Days)</p>
      </div>
      <div className="h-[300px] w-full">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  );
};