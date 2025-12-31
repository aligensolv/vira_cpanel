import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePlace, useUpdatePlace } from '../hooks/use-places';
import { Button } from '../../../components/ui/button';
import { PlaceForm } from '../components/place_form';
import { useNotification } from '../../../core/hooks/use-notification';

export const EditPlacePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch existing data
  const { data, isLoading: isFetching } = usePlace(id);
  const { notify } = useNotification()
  
  // Update mutation
  const { mutate, isPending: isSaving } = useUpdatePlace(Number(id), () => {
    notify.success('Place was updated');
    navigate('/places');
  });

  if (isFetching) return <div>Loading place details...</div>;
  if (!data?.data) return <div>Place not found</div>;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/places')}>
           <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Edit Place</h1>
          <p className="text-sm text-text-muted">Modify details for {data.data.name}</p>
        </div>
      </div>

      <PlaceForm 
        defaultValues={data.data} 
        onSubmit={mutate} 
        isLoading={isSaving} 
      />
    </div>
  );
};