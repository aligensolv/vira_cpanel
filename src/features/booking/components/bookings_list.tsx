import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { BookingStatusBadge } from './booking_status_badge';
import { DangerDialog } from '../../../components/ui/dialog';
import { type Booking } from '../types';
import { useDeleteBooking } from '../hooks/use-bookings';
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
          {/* {item.status === 'INITIAL' && (
            <TableAction 
                icon={Check} 
                label="Approve" 
                variant="success"
                onClick={() => setApproveId(item.id)} 
            />
          )} */}

          {/* Cancel Action */}
          {/* {item.status !== 'CANCELLED' && item.status !== 'COMPLETED' && (
            <TableAction 
                icon={Ban} 
                label="Reject / Cancel" 
                variant="destructive"
                onClick={() => setCancelId(item.id)} 
                />
          )} */}

           {/* <TableAction 
              icon={Trash2} 
              label="Delete Record" 
              variant="destructive"
              onClick={() => setDeletingId(item.id)} 
            /> */}
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