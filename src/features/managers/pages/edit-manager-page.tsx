import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ManagerForm } from '../components/manager-form';
import { useManager, useUpdateManager } from '../hooks/use-managers';
import { Button } from '../../../components/ui/button';

export const EditManagerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading: isFetching } = useManager(id);
  const { mutate, isPending: isSaving } = useUpdateManager(Number(id), () => {
    navigate('/managers');
  });

  if (isFetching) return <div>Loading details...</div>;
  if (!data?.data) return <div>Manager not found</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/managers')}>
           <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Edit Manager</h1>
          <p className="text-sm text-text-muted">Update details for {data.data.name}</p>
        </div>
      </div>

      <ManagerForm 
        defaultValues={data.data} 
        onSubmit={mutate} 
        isLoading={isSaving} 
      />
    </div>
  );
};