import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { usePlaces } from '../hooks/use-places'
import { Button } from '../../../components/ui/button'
import { PlacesList } from '../components/places_list'
import { PlaceStats } from '../components/place_stats'
import Card from '../../../components/ui/card'
import { PlaceFiltersBar } from '../components/place_filters'
import type { PlaceFilters } from '../types'
import { useRegions } from '../../regions/hooks/use-region'

export const PlacesPage: React.FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<PlaceFilters>({
    search: '',
    status: 'all',
    region_id: undefined
  })
  

  const { data, isLoading } = usePlaces(filters)
  const { data: regions = [] } = useRegions()

  return (
    <div className="space-y-6">
      <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-none">
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight uppercase">Places</h1>
          <p className="text-sm text-text-muted">Overview of all bookable locations.</p>
        </div>
        <Button 
          onClick={() => navigate('/places/create')}
          leftIcon={<Plus size={16} />}
        >
          Create Place
        </Button>
      </Card>

      <PlaceStats 
        places={data?.data || []} 
        isLoading={isLoading} 
      />

      <PlaceFiltersBar 
        filters={filters} 
        onChange={setFilters} 
        regions={regions}
      />

      <div className="pb-10">
        <PlacesList 
          data={data?.data || []} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  )
}