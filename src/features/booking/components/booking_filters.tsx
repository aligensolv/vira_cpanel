import React from 'react';
import { Filter } from 'lucide-react';
import { Select } from '../../../components/ui/select';
import { Input } from '../../../components/ui/input';
import { type BookingFilters } from '../types';
import { usePlaces } from '../../places/hooks/use-places';
import { useRegions } from '../../regions/hooks/use-region';

interface BookingFiltersProps {
  filters: BookingFilters;
  onChange: (filters: BookingFilters) => void;
  onReset: () => void;
}

export const BookingFiltersBar: React.FC<BookingFiltersProps> = ({ filters, onChange }) => {
  const { data: places } = usePlaces();
  const { data: regions } = useRegions();

  const handleChange = (key: keyof BookingFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border border-border p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-bold text-text-primary uppercase tracking-wide border-b border-border pb-2 mb-2">
        <Filter size={14} /> Filter Bookings
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Status */}
        <Select
          label="Status"
          options={[
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Completed', value: 'completed' },
          ]}
          value={filters.status}
          onChange={(val) => handleChange('status', val)}
        />

        {/* Region */}
        <Select
          label="Region"
          options={Array.from(regions ?? []).map(r => ({ label: r.name, value: String(r.id) })) || []}
          value={filters.region_id}
          onChange={(val) => handleChange('region_id', val)}
        />

        {/* Place */}
        <Select
          label="Place"
          options={places?.data.map(p => ({ label: p.name, value: String(p.id) })) || []}
          value={filters.place_id}
          onChange={(val) => handleChange('place_id', val)}
        />

        {/* Date From */}
        <Input 
          label="From Date"
          type="date"
          value={filters.date_from || ''}
          onChange={(e) => handleChange('date_from', e.target.value)}
        />

         {/* Date To */}
         <Input 
          label="To Date"
          type="date"
          value={filters.date_to || ''}
          onChange={(e) => handleChange('date_to', e.target.value)}
        />
      </div>

      
    </div>
  );
};