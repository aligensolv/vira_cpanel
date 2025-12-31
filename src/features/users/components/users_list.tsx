import React, { useState } from 'react';
import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import { DangerDialog } from '../../../components/ui/dialog';
import { type User } from '../types';
import { useDeleteUser } from '../hooks/use-users';
import DataTable, { type ColumnDef } from '../../../components/ui/datatable';
import { TableActions, TableAction } from '../../../components/ui/table-actions';

interface UsersListProps {
  data: User[];
  isLoading: boolean;
}

export const UsersList: React.FC<UsersListProps> = ({ data, isLoading }) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const deleteMutation = useDeleteUser(deletingId, () => setDeletingId(null));

  const columns: ColumnDef<User>[] = [
    { 
      header: 'Name', 
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{item.name}</span>
          <span className="text-xs text-text-muted">ID: {item.id}</span>
        </div>
      )
    },
    { 
      header: 'Contact Info', 
      cell: (item) => (
        <div className="flex flex-col gap-1 text-xs text-text-muted">
          <div className="flex items-center gap-1">
             <Mail size={12}/> {item.email}
          </div>
          {item.phone && (
            <div className="flex items-center gap-1">
               <Phone size={12}/> {item.phone}
            </div>
          )}
        </div>
      )
    },
    { 
      header: 'History', 
      cell: (item) => (
        <div className="flex items-center gap-2">
           <span className="font-mono text-sm font-bold text-text-primary">{item.total_bookings}</span>
           <span className="text-xs text-text-muted">Bookings</span>
        </div>
      )
    },
    { 
      header: 'Status', 
      cell: (item) => (
         item.has_active_booking 
          ? <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Active Now</span>
          : <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-neutral-50 text-text-muted border border-border">Idle</span>
      )
    },
    { 
      header: 'Joined', 
      cell: (item) => (
        <div className="flex items-center gap-1 text-xs text-text-muted">
           <Calendar size={12}/> {new Date(item.created_at).toLocaleDateString()}
        </div>
      )
    },
    {
      header: 'Actions',
      align: 'right',
      cell: (item) => (
        <TableActions>
          <TableAction 
            icon={Trash2} 
            label="Delete User" 
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
        title="Registered Users"
        description="List of all customers registered in the system."
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No users found."
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />
      
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate()}
        title="Delete User Account?"
        description="This will permanently delete the user and anonymize their booking history. This action cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};