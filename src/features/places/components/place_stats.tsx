import React from 'react';
import { MapPin, CheckCircle2, DollarSign, Clock } from 'lucide-react';
import { StatCard } from '../../../components/ui/stat_card';
import type { Place } from '../types';

interface PlaceStatsProps {
  places: Place[];
  isLoading: boolean;
}

export const PlaceStats: React.FC<PlaceStatsProps> = ({ places, isLoading }) => {
  // Calculations
  const totalPlaces = places.length;
  const activePlaces = places.filter(p => p.is_active).length;
  
  const avgPrice = totalPlaces > 0 
    ? places.reduce((acc, curr) => acc + Number(curr.price_per_hour), 0) / totalPlaces 
    : 0;

  const avgDuration = totalPlaces > 0 
    ? places.reduce((acc, curr) => acc + curr.min_duration_minutes, 0) / totalPlaces 
    : 0;

  if (isLoading) return <div className="h-32 animate-pulse bg-card border border-border" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Places" 
        value={totalPlaces} 
        icon={<MapPin size={20} />}
        trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
      />
      
      <StatCard 
        title="Active Places" 
        value={activePlaces} 
        icon={<CheckCircle2 size={20} />}
        trend={{ 
          value: `${Math.round((activePlaces / (totalPlaces || 1)) * 100)}%`, 
          isPositive: true, 
          label: "Operational rate" 
        }}
      />

      <StatCard 
        title="Avg. Price / Hour" 
        value={`$${avgPrice.toFixed(2)}`} 
        icon={<DollarSign size={20} />}
        trend={{ value: "Base", isPositive: undefined, label: "Average pricing" }}
      />

      <StatCard 
        title="Avg. Min Duration" 
        value={`${Math.round(avgDuration)}M`} 
        icon={<Clock size={20} />}
        trend={{ value: "Minimum", isPositive: undefined, label: "Entry threshold" }}
      />
    </div>
  );
};