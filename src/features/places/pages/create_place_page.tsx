import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCreatePlace } from '../hooks/use-places';
import { Button } from '../../../components/ui/button';
import { PlaceForm } from '../components/place_form';
import { useNotification } from '../../../core/hooks/use-notification';


export const CreatePlacePage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification()

  const { mutate, isPending } = useCreatePlace(() => {
    notify.success('Place was created');
    navigate('/places');
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/places')}>
           <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Create Place</h1>
          <p className="text-sm text-text-muted">Add a new location to the system.</p>
        </div>
      </div>

      <PlaceForm onSubmit={mutate} isLoading={isPending} />
    </div>
  );
};