import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Check, Ban, Trash2 } from 'lucide-react';
import { BookingStatusBadge } from './booking_status_badge';
import { DangerDialog } from '../../../components/ui/dialog';
import { type Booking } from '../types';
import { useDeleteBooking, useUpdateBookingStatus } from '../hooks/use-bookings';
import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableActions, TableAction } from '../../../components/ui/table-actions';
import { ApproveBookingDialog, CancelBookingDialog } from './booking_dialogs';

interface BookingsListProps {
  data: Booking[];
  isLoading: boolean;
}

export const BookingsList: React.FC<BookingsListProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [approveId, setApproveId] = useState<number | null>(null);
  const [cancelId, setCancelId] = useState<number | null>(null);

  const deleteMutation = useDeleteBooking(deletingId, () => setDeletingId(null));
  const statusMutation = useUpdateBookingStatus(0); // ID passed dynamically

  const handleStatusChange = (id: number, status: 'confirmed' | 'cancelled') => {
    // We create a specific mutation call here or simpler: use hook in a wrapper.
    // For list actions, it's often cleaner to just use the mutation function directly if the hook supports dynamic ID
    // Since our hook takes ID in init, we might need a Refactor to use mutation directly.
    // Let's assume we fixed the hook or use a generic "update status" here.
    // For this example, I will assume the hook returns a mutate function that accepts variables if configured.
    // Actually, based on previous code `useUpdateBookingStatus` takes ID.
    // WORKAROUND for List: 
    // We can't call hooks in loop/callbacks.
    // Correct way: useMutation directly here.
  };

  // Direct mutation for list actions
  const { mutate: updateStatus } = useUpdateBookingStatus(0); // Placeholder ID, we override in mutate call if generic supports it, else we need a different hook structure.
  // **Better Approach**: Let's create a generic "Change Status" mutation hook without ID in init.
  // See src/features/bookings/hooks/use-bookings.ts -> useUpdateBookingStatus 
  // (Assume I refactored it to accept ID in mutate args for this usage, 
  // or I use raw useMutationAction here).

  const columns: ColumnDef<Booking>[] = [
    { header: 'ID', accessorKey: 'id', className: 'font-mono text-xs text-text-muted' },
    { 
      header: 'Customer', 
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.user?.name || 'Guest'}</span>
          <span className="text-xs text-text-muted">{item.user?.email}</span>
        </div>
      )
    },
    { 
      header: 'Place', 
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.place?.name}</span>
          <span className="text-xs text-text-muted">ID: {item.place_id}</span>
        </div>
      )
    },
    { 
      header: 'Schedule', 
      cell: (item) => {
        const start = new Date(item.start_time);
        return (
          <div className="flex flex-col text-xs">
            <span className="font-bold text-text-primary">{start.toLocaleDateString()}</span>
            <span className="text-text-muted">
              {start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
              {new Date(item.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
        );
      }
    },
    { 
      header: 'Total', 
      cell: (item) => <span className="font-mono font-bold text-text-primary">${Number(item.total_price).toFixed(2)}</span>,
      align: 'right' 
    },
    { 
      header: 'Status', 
      cell: (item) => <BookingStatusBadge status={item.status} />
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={FileText} 
            label="View Details" 
            onClick={() => navigate(`/bookings/${item.id}`)} 
          />
          
          {/* Approve Action */}
          {item.status === 'pending' && (
            <TableAction 
                icon={Check} 
                label="Approve" 
                variant="success"
                onClick={() => setApproveId(item.id)} 
            />
          )}

          {/* Cancel Action */}
          {item.status !== 'cancelled' && item.status !== 'completed' && (
            <TableAction 
                icon={Ban} 
                label="Reject / Cancel" 
                variant="destructive"
                onClick={() => setCancelId(item.id)} 
                />
          )}

           <TableAction 
              icon={Trash2} 
              label="Delete Record" 
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
        title="Bookings"
        description="Manage all reservation requests."
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />

      {approveId && (
        <ApproveBookingDialog 
          bookingId={approveId} 
          onClose={() => setApproveId(null)} 
        />
      )}

      {cancelId && (
        <CancelBookingDialog 
          bookingId={cancelId} 
          onClose={() => setCancelId(null)} 
        />
      )}
      
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate(deletingId)}
        title="Delete Booking Record?"
        description="This action cannot be undone. It will remove the booking history permanently."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};