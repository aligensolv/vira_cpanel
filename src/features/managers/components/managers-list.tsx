import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit, Trash2, Shield, ShieldCheck, Mail } from 'lucide-react'
import { DangerDialog } from '../../../components/ui/dialog'
import { type Manager } from '../types'
import { useDeleteManager } from '../hooks/use-managers'
import DataTable, { type ColumnDef } from '../../../components/ui/datatable'
import { TableActions, TableAction } from '../../../components/ui/table-actions'
import { useNotification } from '../../../core/hooks/use-notification'

interface ManagersListProps {
  data: Manager[]
  isLoading: boolean
  refetch: () => void
}

export const ManagersList: React.FC<ManagersListProps> = ({ data, isLoading, refetch }) => {
  const navigate = useNavigate()
  const { notify } = useNotification()

  const [deletingId, setDeletingId] = useState<number | null>(null)
  const deleteMutation = useDeleteManager(deletingId, () => {
    notify.success('Manager was deleted')
    setDeletingId(null)
    refetch()
  })

  const columns: ColumnDef<Manager>[] = [
    { 
      header: 'Name', 
      cell: (item) => (
        <div>
          <span className="font-medium text-text-primary">{item.name}</span>
        </div>
      )
    },
    { 
      header: 'Email', 
      cell: (item) => (
        <div className="flex items-center gap-2 text-sm text-text-muted">
           <Mail size={12} /> {item.email}
        </div>
      )
    },
    { 
      header: 'Role', 
      cell: (item) => {
        const isSuper = item.role === 'SUPER_ADMIN'
        return (
          <div className={`
            inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide border
            ${isSuper 
              ? 'bg-primary/10 text-primary border-primary' 
              : 'bg-neutral-50 text-neutral-700 border-neutral-200'}
          `}>
             {isSuper ? <ShieldCheck size={12}/> : <Shield size={12}/>}
             {item.role.replace('_', ' ')}
          </div>
        )
      }
    },
    { 
      header: 'Created At', 
      cell: (item) => (
        <span className="text-sm text-text-muted">
          {new Date(item.created_at).toLocaleDateString()}
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
            label="Edit Manager" 
            onClick={() => navigate(`/managers/edit/${item.id}`)} 
          />
          <TableAction 
            icon={Trash2} 
            label="Delete Account" 
            variant="destructive"
            onClick={() => setDeletingId(item.id)} 
          />
        </TableActions>
      )
    }
  ]

  return (
    <>
      <DataTable
        title="Managers"
        description="Administrative users with dashboard access."
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={{ currentPage: 1, totalPages: 1, onPageChange: () => {} }}
      />
      
      <DangerDialog 
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletingId && deleteMutation.mutate()}
        title="Delete Manager?"
        description="Are you sure you want to remove this manager? They will immediately lose access to the admin panel."
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}