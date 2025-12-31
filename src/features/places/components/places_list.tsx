import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, DollarSign } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { type Place } from '../types';
import { useDeletePlace } from '../hooks/use-places';
import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableActions, TableAction } from '../../../components/ui/table-actions';
import { useNotification } from '../../../core/hooks/use-notification';

interface PlacesListProps {
  data: Place[];
  isLoading: boolean;
}

export const PlacesList: React.FC<PlacesListProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { notify } = useNotification()

  const deleteMutation = useDeletePlace(deletingId, () => {
    setDeletingId(null)
    notify.success('Place was successfully deleted.')
  });

  const columns: ColumnDef<Place>[] = [
    { 
      header: 'Name', 
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.name}</span>
          <Link
            to={`${item.region != null ? `/regions/${item.region!.id}` : '#'}`}
            className={`${item.region != null ? 'text-primary underline' : 'text-text-muted'}`}
          >
            <div className="flex items-center gap-1 text-xs mt-0.5">
                {item.region?.name || 'Unknown Region'}
            </div>
          </Link>
        </div>
      )
    },
    { 
      header: 'Price/Hr', 
      cell: (item) => (
        <div className="flex items-center gap-1 font-mono text-sm text-text-primary">
          <DollarSign size={12} className="text-text-muted" />
          {Number(item.price_per_hour).toFixed(2)}
        </div>
      )
    },
    { 
      header: 'Min Duration', 
      align: 'center',
      cell: (item) => (
        <div className="flex items-center text-md text-text-muted font-bold">
          {item.min_duration_minutes}M
        </div>
      )
    },
    { 
      header: 'Status', 
      cell: (item) => (
        <span className={`
          px-2 py-1 text-[10px] uppercase font-bold tracking-wide rounded-none border
          ${item.is_active 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-secondary/10 text-text-muted border-border'}
        `}>
          {item.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={Edit} 
            label="Edit Place" 
            onClick={() => navigate(`/places/edit/${item.id}`)} 
          />
          <TableAction 
            icon={Trash2} 
            label="Delete Place" 
            variant="destructive"
            onClick={() => setDeletingId(item.id)} 
          />
        </TableActions>
      )
    }
  ];

  return (
    <>
      <DataTable
        title="Places List"
        description="Manage parking spots and rental areas."
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No places found."
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />

      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="Delete Place"
        description="Are you sure you want to delete this place? This will also remove all associated bookings history."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};