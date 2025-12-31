// src/features/dashboard/components/BookingStatusChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface BookingStatusChartProps {
  confirmed: number;
  pending: number;
  cancelled: number;
}

export const BookingStatusChart: React.FC<BookingStatusChartProps> = ({ confirmed, pending, cancelled }) => {
  const series = [confirmed, pending, cancelled];
  const labels = ['Confirmed', 'Pending', 'Cancelled'];

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      animations: { enabled: true }
    },
    labels: labels,
    colors: ['#007a55', '#fcbf49', 'var(--destructive)'], // Emerald-500, Amber-500, Rose-500
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Thinner ring for modern look
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              color: '#525252', // neutral-600
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
              }
            },
            value: {
              fontSize: '24px',
              fontWeight: 700,
              color: '#171717', // neutral-900
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    stroke: { show: false }, // Remove white border between slices
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontFamily: 'inherit',
    //   markers: { width: 12, height: 12, radius: 0 }, // Square markers
      itemMargin: { horizontal: 10, vertical: 5 }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: { fontSize: '12px',  }
    }
  };

  return (
    <div className="bg-white border border-neutral-200 p-6 h-full flex flex-col">
      <h3 className="text-lg font-bold text-neutral-900 mb-2">Booking Status</h3>
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <Chart options={options} series={series} type="donut" height={320} width="100%" />
      </div>
    </div>
  );
};