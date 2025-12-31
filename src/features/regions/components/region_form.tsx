import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { type RegionFormValues, regionSchema } from '../schema/region-schema';
import type { Region } from '../types/region';

interface RegionFormProps {
  defaultValues?: Region; // Passed if editing
  onSubmit: (data: RegionFormValues) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export const RegionForm: React.FC<RegionFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading,
  onCancel 
}) => {
  const { 
    register, 
    handleSubmit, 
    // reset,
    formState: { errors } 
  } = useForm<RegionFormValues>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: defaultValues?.name || '',
    },
  });

  // Reset form if defaultValues change (e.g., opening edit for different item)
  // useEffect(() => {
  //   if (defaultValues) {
  //     reset({ name: defaultValues.name });
  //   } 
  // }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Region Name"
        placeholder="e.g. Downtown, North District"
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          isLoading={isLoading}
        >
          {defaultValues ? 'Update Region' : 'Create Region'}
        </Button>
      </div>
    </form>
  );
};