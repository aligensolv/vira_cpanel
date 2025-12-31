import React from 'react';
import { Map, MapPin, BarChart3 } from 'lucide-react';
import { StatCard } from '../../../components/ui/stat_card';
import type { Region } from '../types/region';

interface RegionStatsProps {
  regions: Region[];
  isLoading: boolean;
}

export const RegionStats: React.FC<RegionStatsProps> = ({ regions, isLoading }) => {
  // Calculate stats on the fly (or replace with API data)
  const totalRegions = regions.length;
  const totalPlaces = regions.reduce((acc, curr) => acc + curr.places_count, 0);
  
  // Find region with most places
  const topRegion = regions.length > 0 
    ? regions.reduce((prev, current) => (prev.places_count > current.places_count) ? prev : current)
    : null;

  if (isLoading) return <div className="h-32 animate-pulse bg-card border border-border" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Total Regions" 
        value={totalRegions} 
        icon={<Map size={20} />}
        trend={{ value: "100%", isPositive: undefined, label: "Coverage" }}
      />
      
      <StatCard 
        title="Total Spots Hosted" 
        value={totalPlaces} 
        icon={<MapPin size={20} />}
        trend={{ value: "Capacity", isPositive: true, label: "Total capacity" }}
      />

      <StatCard 
        title="Top Density Region" 
        value={topRegion ? topRegion.places_count : 0} 
        icon={<BarChart3 size={20} />}
        trend={{ 
          value: topRegion?.name || "N/A", 
          isPositive: undefined, 
          label: "Highest concentration" 
        }}
      />
    </div>
  );
};