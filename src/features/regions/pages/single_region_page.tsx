import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Map, Calendar, AlertCircle } from 'lucide-react';

// Hooks
import { useRegion, useRegionPlaces, useDeleteRegion } from '../hooks/use-region';

// Components
import { Button } from '../../../components/ui/button';
import { StatCard } from '../../../components/ui/stat_card';
import { DangerDialog } from '../../../components/ui/dialog';
import { RegionPlaceCard } from '../components/region_place_card';
import { type Place } from '../../places/types';

export const SingleRegionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 1. Fetch Region Details
  const { data: regionData, isLoading: isRegionLoading } = useRegion(+id!);
  const region = regionData?.data;

  // 2. Fetch Places for this Region
  // Note: Depending on your API, you might need to filter client-side 
  // if you reuse the generic usePlaces hook. 
  // Here assuming useRegionPlaces filters by ID or API does it.
  const { data: placesData, isLoading: isPlacesLoading } = useRegionPlaces(id as number | undefined);
  
  // Client-side filter fallback if API returns all places
  const regionPlaces = placesData?.data.filter((p: Place) => String(p.region_id) === id) || [];

  // 3. Delete Mutation
  const deleteMutation = useDeleteRegion(+id!, () => {
    navigate('/regions');
  });


  useEffect(() => {

  }, [])

  if (isRegionLoading) return <div className="p-8 text-text-muted">Loading region details...</div>;
  if (!region) return <div className="p-8 text-destructive">Region not found</div>;

  return (
    <div className="space-y-8 pb-20">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">{region.name}</h1>
            <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
              <span className="flex items-center gap-1"><Map size={14}/> Region ID: {region.id ?? 'xx'}</span>
              <span className="flex items-center gap-1"><Calendar size={14}/> Created: {new Date(region.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Button 
          variant="danger" 
          leftIcon={<Trash2 size={16} />}
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          Delete Region
        </Button>
      </div>

      {/* --- QUICK STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Spots" 
          value={regionPlaces.length} 
          icon={<Map size={20} />} 
          trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
        />
        <StatCard 
          title="Active Spots" 
          value={regionPlaces.filter((p: Place) => p.is_active).length} 
          icon={<AlertCircle size={20} />} 
          trend={{ value: "0.0%", isPositive: undefined, label: "No change" }}
        />
        {/* You could add revenue stats for this specific region here if API supported it */}
      </div>

      {/* --- PLACES GRID --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">Associated Places</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/places/create')}>
            Add New Place
          </Button>
        </div>

        {isPlacesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[1,2,3].map(i => <div key={i} className="h-40 bg-card animate-pulse border border-border" />)}
          </div>
        ) : regionPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionPlaces.map((place: Place) => (
              <RegionPlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-border border-dashed bg-secondary/5">
            <p className="text-text-muted">No places found in this region.</p>
          </div>
        )}
      </div>

      {/* --- DELETE DIALOG --- */}
      <DangerDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => deleteMutation.mutate(Number(id))}
        title={`Delete ${region.name}?`}
        description="Are you sure you want to delete this region? All associated places will likely be unlinked or deleted depending on system rules."
        isLoading={deleteMutation.isPending}
      />

    </div>
  );
};