// src/features/dashboard/pages/DashboardPage.tsx
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { DashboardStats } from '../components/dashboard_stats';
import { useDashboardMetrics } from '../hooks/use-dashboard';

export const DashboardPage: React.FC = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl uppercase tracking-tight">Vira - Dashboard</h1>
          <p className="text-sm text-neutral-500">Welcome back, Admin.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" leftIcon={<Download size={14}/>}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats metrics={metrics} isLoading={isLoading} />

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full">
           {metrics?.revenueTrend && <RevenueChart data={metrics.revenueTrend} />}
        </div>

        <div className="lg:col-span-1 h-full">
          {metrics && (
            <BookingStatusChart 
              confirmed={metrics.bookingsByStatus.confirmed}
              pending={metrics.bookingsByStatus.pending}
              cancelled={metrics.bookingsByStatus.cancelled}
            />
          )}
        </div>
      </div> */}

      {/* Table */}
      {/* <div className="pb-10">
        <RecentBookings />
      </div> */}
    </div>
  );
};