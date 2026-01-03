import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ManagerForm } from '../components/manager-form';
import { useCreateManager } from '../hooks/use-managers';
import { Button } from '../../../components/ui/button';
import { useNotification } from '../../../core/hooks/use-notification';

export const CreateManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useNotification()

  const { mutate, isPending } = useCreateManager(
    () => {
        notify.success("Manager was created");
        navigate('/managers');
    },
    (error) => {
        notify.error(error.response.data.error.message)
    }
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/managers')}>
           <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Add New Manager</h1>
          <p className="text-sm text-text-muted">Create a new administrative account.</p>
        </div>
      </div>

      <ManagerForm onSubmit={mutate} isLoading={isPending} />
    </div>
  );
};