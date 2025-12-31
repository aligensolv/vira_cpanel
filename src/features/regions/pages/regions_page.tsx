import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Dialog } from '../../../components/ui/dialog'
import { RegionForm } from '../components/region_form'
import { RegionsList } from '../components/regions_list'
import { useRegions, useCreateRegion } from '../hooks/use-region'
import { useNotification } from '../../../core/hooks/use-notification'
import { RegionStats } from '../components/regions_stats'

export const RegionsPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  
  // Queries
  const { data = [], isLoading } = useRegions()
  const { notify } = useNotification()

  console.log(data)
  
  
  // Create Mutation
  const { mutate: createRegion, isPending: isCreating } = useCreateRegion(() => {
    setIsCreateOpen(false)
    notify.success('Region was created.')
  })

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Regions</h1>
          <p className="text-sm text-text-muted">Define the areas where your spots are located.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsCreateOpen(true)}
            leftIcon={<Plus size={16} />}
          >
            Add Region
          </Button>
        </div>
      </div>

        <RegionStats 
            regions={data || []} 
            isLoading={isLoading} 
        />

      {/* CONTENT */}
      <div className="pb-10">
        <RegionsList 
          data={data || []} 
          isLoading={isLoading} 
        />
      </div>

      {/* CREATE DIALOG */}
      <Dialog 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        title="Add New Region"
      >
        <RegionForm 
          onSubmit={(values) => createRegion(values)}
          isLoading={isCreating}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Dialog>

    </div>
  )
}