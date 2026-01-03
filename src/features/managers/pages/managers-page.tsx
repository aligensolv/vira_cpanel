import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useManagers } from '../hooks/use-managers';
import { ManagersList } from '../components/managers-list';
import { Button } from '../../../components/ui/button';

export const ManagersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useManagers();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Managers</h1>
          <p className="text-sm text-text-muted">Control who has access to the Vira CPanel.</p>
        </div>
        <Button 
          onClick={() => navigate('/managers/create')}
          leftIcon={<Plus size={16} />}
        >
          Add Manager
        </Button>
      </div>

      <ManagersList 
        data={data?.data || []} 
        isLoading={isLoading} 
        refetch={refetch}
      />
    </div>
  );
};