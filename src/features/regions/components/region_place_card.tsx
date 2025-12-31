import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Edit } from 'lucide-react';
import { type Place } from '../../places/types';

interface RegionPlaceCardProps {
  place: Place;
}

export const RegionPlaceCard: React.FC<RegionPlaceCardProps> = ({ place }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white border border-border hover:border-neutral-400 transition-colors p-5 flex flex-col gap-4 relative">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-bold text-text-primary text-lg truncate pr-4">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
            <MapPin size={12} />
            <span>{place.region?.name}</span> {/* Or region name if populated */}
          </div>
        </div>
        
        {/* Status Badge */}
        <span className={`
          px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide border
          ${place.is_active 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-secondary/10 text-text-muted border-border'}
        `}>
          {place.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-border border-dashed">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Rate</span>
          <div className="flex items-center gap-1 text-text-primary font-mono text-sm">
            <DollarSign size={12} className="text-text-muted" />
            {Number(place.price_per_hour).toFixed(2)}<span className="text-xs text-text-muted">/hr</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-muted font-bold tracking-wider">Min Time</span>
          <div className="flex items-center gap-1 text-text-primary font-mono text-sm">
            <Clock size={12} className="text-text-muted" />
            {place.min_duration_minutes}m
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-1">
        <button 
          onClick={() => navigate(`/places/edit/${place.id}`)}
          className="text-xs font-medium text-text-muted hover:text-text-primary flex items-center gap-1 transition-colors"
        >
          <Edit size={12} /> Edit Details
        </button>
      </div>
    </div>
  );
};