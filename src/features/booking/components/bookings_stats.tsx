import React from 'react';
import { CalendarClock, CheckCircle2, DollarSign } from 'lucide-react';
import { StatCard } from '../../../components/ui/stat_card';
import { type Booking } from '../types';

interface BookingStatsProps {
  bookings: Booking[];
  isLoading: boolean;
}

export const BookingStats: React.FC<BookingStatsProps> = ({ bookings, isLoading }) => {
  // Simple client-side stats (In real app, fetch from specific stats endpoint)
  const total = bookings.length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const revenue = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, curr) => acc + Number(curr.total_price), 0);

  if (isLoading) return <div className="h-32 animate-pulse bg-card border border-border" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
        title="Total Bookings" 
        value={total} 
        icon={<CalendarClock size={20} />} 
        trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
      />
      <StatCard 
        title="Pending Approval" 
        value={pending} 
        icon={<CheckCircle2 size={20} />}
        trend={{ value: "Action needed", isPositive: false, label: "Requires review" }} 
      />
      <StatCard 
        title="Confirmed" 
        value={confirmed} 
        icon={<CheckCircle2 size={20} />} 
        trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
      />
      <StatCard 
        title="Est. Revenue" 
        value={`$${revenue.toLocaleString()}`} 
        icon={<DollarSign size={20} />}
        trend={{ value: "Gross", isPositive: true, label: "Total Volume" }} 
      />
    </div>
  );
};