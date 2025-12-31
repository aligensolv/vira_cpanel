import React, { useState } from 'react';
import { Edit, Trash2, MapPin } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { Dialog } from '../../../components/ui/dialog';
import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableActions, TableAction } from '../../../components/ui/table-actions';
import { useDeleteRegion, useUpdateRegion } from '../hooks/use-region';
import type { Region } from '../types/region';
import { RegionForm } from './region_form';
import { useNotification } from '../../../core/hooks/use-notification';

interface RegionsListProps {
  data: Region[];
  isLoading: boolean;
}

export const RegionsList: React.FC<RegionsListProps> = ({ data, isLoading }) => {
  // --- STATE ---
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { notify } = useNotification()

  // --- MUTATIONS ---
  const deleteMutation = useDeleteRegion(deletingId, () => {
    setDeletingId(null)
    notify.success('Region was successfully deleted.')
  });
  
  const columns: ColumnDef<Region>[] = [
    { 
      header: 'ID', 
      accessorKey: 'id', 
      className: 'font-mono text-xs text-text-muted w-16' 
    },
    { 
      header: 'Region Name', 
      cell: (item) => (
        <div className="flex items-center gap-2 font-medium text-text-primary">
          <div className="w-6 h-6 bg-secondary/10 flex items-center justify-center text-secondary">
            <MapPin size={14} />
          </div>
          {item.name}
        </div>
      )
    },
    { 
      header: 'Places Count', 
      accessorKey: 'places_count',
      cell: (item) => (
        <span className="text-xs font-semibold bg-secondary/5 px-2 py-1 rounded-none text-text-muted">
          {item.places_count} Places
        </span>
      )
    },
    { 
      header: 'Last Updated', 
      accessorKey: 'updated_at',
      cell: (item) => (
        <span className="text-xs text-text-muted">
          {new Date(item.updated_at).toLocaleDateString()}
        </span>
      )
    },
    {
      header: 'Actions',
      align: 'left',
      cell: (item) => (
        <TableActions className='justify-start'>
          <TableAction 
            icon={Edit} 
            label="Edit Region" 
            onClick={() => setEditingRegion(item)} 
          />
          <TableAction 
            icon={Trash2} 
            label="Delete Region" 
            variant="destructive"
            onClick={() => setDeletingId(item.id)} 
          />
        </TableActions>
      )
    }
  ];

  const handleDelete = () => {
    if (deletingId) deleteMutation.mutate({ id: deletingId });
  };


  return (
    <>
      <DataTable
        title="Regions List"
        description="Manage geographical regions for your spots."
        data={data}
        columns={columns} 
        isLoading={isLoading}
        emptyMessage="No regions found."
        // Basic pagination stub (would come from API metadata in real app)
        pagination={{ currentPage: 1, totalPages: 2, onPageChange: () => {} }}
      />

      {/* DELETE DIALOG */}
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Region"
        description="Are you sure you want to delete this region? This action might affect associated places."
        isLoading={deleteMutation.isPending}
      />

      {/* UPDATE DIALOG WRAPPER */}
      {/* We conditionally render this so the hook inside gets the correct ID */}
      {editingRegion && (
        <UpdateRegionDialog 
          region={editingRegion} 
          onClose={() => {
            setEditingRegion(null);
            notify.success('Region was successfully updated.')
          }} 
        />
      )}
    </>
  );
};

// --- HELPER COMPONENT FOR UPDATE LOGIC ---
// This ensures the hook is initialized with the correct ID
const UpdateRegionDialog = ({ region, onClose }: { region: Region; onClose: () => void }) => {
  const { mutate, isPending } = useUpdateRegion(region.id, onClose);

  return (
    <Dialog 
      isOpen={true} 
      onClose={onClose} 
      title="Edit Region"
    >
      <RegionForm 
        defaultValues={region}
        onSubmit={(data) => mutate(data)}
        isLoading={isPending}
        onCancel={onClose}
      />
    </Dialog>
  );
};