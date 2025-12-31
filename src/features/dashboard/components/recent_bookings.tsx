// src/features/dashboard/components/RecentBookings.tsx
import React from 'react';
import { Ban, Check, FileText } from 'lucide-react';
import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableAction, TableActions } from '../../../components/ui/table-actions';

interface BookingRow {
  id: string;
  customerName: string;
  spotName: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const mockData: BookingRow[] = [
  { id: 'BK-1001', customerName: 'Ahmed Ali', spotName: 'Downtown A1', date: '2025-10-24 10:00 AM', amount: 20, status: 'confirmed' },
  { id: 'BK-1002', customerName: 'Sara Smith', spotName: 'Mall Zone B', date: '2025-10-24 11:30 AM', amount: 10, status: 'pending' },
  { id: 'BK-1003', customerName: 'John Doe', spotName: 'Downtown A1', date: '2025-10-24 02:00 PM', amount: 15, status: 'cancelled' },
  { id: 'BK-1004', customerName: 'Mona Zaki', spotName: 'VIP Parking', date: '2025-10-24 04:00 PM', amount: 60, status: 'confirmed' },
];

export const RecentBookings: React.FC = () => {
  
  const columns: ColumnDef<BookingRow>[] = [
    { header: 'ID', accessorKey: 'id', className: 'font-mono text-xs text-neutral-500' },
    { header: 'Customer', accessorKey: 'customerName', className: 'font-medium text-neutral-900' },
    { header: 'Spot', accessorKey: 'spotName' },
    { header: 'Date', accessorKey: 'date', className: 'text-xs text-neutral-500' },
    { 
      header: 'Status', 
      cell: (item) => {
        const colors = {
          confirmed: 'bg-emerald-100 text-emerald-800',
          pending: 'bg-amber-100 text-amber-800',
          cancelled: 'bg-rose-100 text-rose-800',
          completed: 'bg-neutral-100 text-neutral-800',
        };
        return (
          <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-wider ${colors[item.status]}`}>
            {item.status}
          </span>
        );
      }
    },
    { 
      header: 'Amount', 
      cell: (item) => <span className="font-mono">${item.amount}</span>, 
      align: 'right' 
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (item) => (
        <TableActions>
          {/* Default Action: View */}
          <TableAction 
            icon={FileText} 
            label="View Receipt" 
            onClick={() => console.log('View', item.id)} 
          />
          
          {/* Success Action: Approve */}
          {item.status === 'pending' && (
            <TableAction 
              icon={Check} 
              label="Approve" 
              variant="success"
              onClick={() => console.log('Approve', item.id)} 
            />
          )}

          {/* Destructive Action: Cancel */}
          {item.status !== 'cancelled' && item.status !== 'completed' && (
            <TableAction 
              icon={Ban} 
              label="Cancel Booking" 
              variant="destructive"
              onClick={() => console.log('Cancel', item.id)} 
            />
          )}
        </TableActions>
      )
    }
  ];

  return (
    <DataTable
      title="Recent Activity"
      description="Latest bookings processed today."
      data={mockData}
      columns={columns}
      pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
    />
  );
};