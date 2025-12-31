import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'
import { type PlaceFilters } from '../types'
import { debounce } from '../../../core/utils/debounce'
import { Select } from '../../../components/ui/select'
import type { Region } from '../../regions/types/region'

interface PlaceFiltersBarProps {
  filters: PlaceFilters
  onChange: (filters: PlaceFilters) => void
  regions: Region[]
}

export const PlaceFiltersBar: React.FC<PlaceFiltersBarProps> = ({ filters, onChange, regions }) => {

  const handleChangeDebounced = debounce((key: keyof PlaceFilters, value: string) => {
    onChange({ ...filters, [key]: value })
  }, 0)


  return (
    <div className="bg-white border border-border p-4 flex flex-col md:flex-row gap-4 items-end">
      
      <div className="flex-1 w-full">
        <Input 
          label="Search Places"
          placeholder="Name, region..."
          icon={<Search size={16}/>}
          value={filters.search || ''}
          onChange={(e) => handleChangeDebounced('search', e.target.value)}
        />
      </div>

      <div className="w-full md:w-64">
        <Select
          label="Place Status"
          options={[
            { label: 'All Places', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
          value={String(filters.status)}
          onChange={(val) => handleChangeDebounced('status', val as string)}
        />
      </div>

      <div className="w-full md:w-64">
        <Select
          label="Region"
          options={
            regions.map(region => ({ label: region.name, value: String(region.id) }))
          }
          value={String(filters.region_id)}
          onChange={(val) => handleChangeDebounced('region_id', val as string)}
        />
      </div>
    </div>
  )
}