import React from 'react';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import { StatCard } from '../../../components/ui/stat_card';
import { type User } from '../types';

interface UserStatsProps {
  users: User[];
  isLoading: boolean;
}

export const UserStats: React.FC<UserStatsProps> = ({ users, isLoading }) => {
  // Client-side calcs (Real app: separate stats endpoint)
  const total = users.length;
  const activeNow = users.filter(u => u.has_active_booking).length;
  const noBookings = users.filter(u => u.total_bookings === 0).length;
  
  // Fake "New Today" logic for demo
  const newToday = users.filter(u => {
    const date = new Date(u.created_at);
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }).length;

  if (isLoading) return <div className="h-32 animate-pulse bg-card border border-border" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
        title="Total Customers" 
        value={total} 
        icon={<Users size={20} />} 
        trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
      />
      <StatCard 
        title="Active Now" 
        value={activeNow} 
        icon={<UserCheck size={20} />}
        trend={{ value: "With Bookings", isPositive: true, label: "" }}
      />
      <StatCard 
        title="Inactive Users" 
        value={noBookings} 
        icon={<UserX size={20}  />}
        trend={{ value: "Zero History", isPositive: false, label: "Potential leads" }}
      />
      <StatCard 
        title="New Today" 
        value={newToday} 
        icon={<UserPlus size={20} />}
        trend={{ value: "Growth", isPositive: true, label: "Daily signups" }}
      />
    </div>
  );
};