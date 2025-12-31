// src/features/dashboard/components/DashboardStats.tsx
import React from 'react';
import { DollarSign, MapPin, CalendarClock, AlertCircle } from 'lucide-react';
import StatCard from '../../../components/ui/stat_card';
import type { DashboardMetrics } from '../hooks/use-dashboard';

interface DashboardStatsProps {
  metrics?: DashboardMetrics;
  isLoading: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ metrics, isLoading }) => {
  if (isLoading) return <div className="p-4 text-sm text-neutral-500">Loading metrics...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Revenue" 
        value={`$${metrics?.totalRevenue.toLocaleString()}`} 
        icon={<DollarSign size={20} />}
        trend={{ value: "", isPositive: undefined, label: "" }}
      />

      <StatCard 
        title="Total Regions" 
        value={metrics?.regions_count || 0} 
        icon={<CalendarClock size={20} />}
        trend={{ value: "", isPositive: undefined, label: "" }}
      />
      
      <StatCard 
        title="Active places" 
        value={metrics?.activeSpots || 0} 
        icon={<MapPin size={20} />}
        // UPDATED: Added neutral trend to prevent empty feeling
        trend={{ value: "", isPositive: undefined, label: "" }}
      />

       <StatCard 
        title="Pending Actions" 
        value={metrics?.pendingBookings || 0} 
        icon={<AlertCircle size={20} />}
        trend={{ value: "", isPositive: undefined, label: "" }}
      />
    </div>
  );
};