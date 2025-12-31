import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { type UserFilters } from '../types';
import { debounce } from '../../../core/utils/debounce';

interface UserFiltersBarProps {
  filters: UserFilters;
  onChange: (filters: UserFilters) => void;
}

export const UserFiltersBar: React.FC<UserFiltersBarProps> = ({ filters, onChange }) => {

  const handleChangeDebounced = debounce((key: keyof UserFilters, value: string) => {
    onChange({ ...filters, [key]: value });
  }, 0);

  return (
    <div className="bg-white border border-border p-4 flex flex-col md:flex-row gap-4 items-end">
      
      <div className="flex-1 w-full">
        <Input 
          label="Search Users"
          placeholder="Name, email or phone..."
          icon={<Search size={16}/>}
          value={filters.search || ''}
          onChange={(e) => handleChangeDebounced('search', e.target.value)}
        />
      </div>
    </div>
  );
};