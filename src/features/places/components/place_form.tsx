import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

// Components
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Select } from '../../../components/ui/select'; // Ensure you have this from previous prompts
import { Switch } from '../../../components/ui/switch'; // Ensure you have this
import { useRegions } from '../../regions/hooks/use-region';
import { type PlaceFormValues, placeSchema } from '../schema/place_schema';
import type { Place } from '../types';

interface PlaceFormProps {
  defaultValues?: Place;
  onSubmit: (data: PlaceFormValues) => void;
  isLoading: boolean;
}

export const PlaceForm: React.FC<PlaceFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading 
}) => {
  const navigate = useNavigate();
  
  // Fetch regions for the dropdown
  const { data: regions } = useRegions();
  const regionsOptions = (Array.from(regions ?? [])).map(r => ({
    label: r.name,
    value: String(r.id)
  })) || [];

  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<PlaceFormValues>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      region_id: defaultValues?.region_id || undefined,
      price_per_hour: Number(defaultValues?.price_per_hour) || 0,
      min_duration_minutes: defaultValues?.min_duration_minutes || 30,
      is_active: defaultValues?.is_active ?? true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
      {/* 1. General Info */}
      <div className="bg-white p-6 border border-border space-y-6">
        <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">
          General Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Place Name"
            placeholder="e.g. VIP Zone A"
            error={errors.name?.message}
            {...register('name')}
            className="md:col-span-2"
          />

          {/* Region Select */}
          <Controller
            control={control}
            name="region_id"
            render={({ field }) => (
              <Select
                label="Region"
                placeholder="Select a region"
                options={regionsOptions}
                value={field.value ? String(field.value) : undefined}
                onChange={(val) => field.onChange(Number(val))}
                // We assume Select component doesn't inherently support error prop yet based on previous code, 
                // if it does add: error={errors.region_id?.message}
              />
            )}
          />
          {errors.region_id && (
             <p className="text-xs text-destructive mt-1">{errors.region_id.message}</p>
          )}
        </div>
      </div>

      {/* 2. Pricing & Rules */}
      <div className="bg-white p-6 border border-border space-y-6">
        <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2">
          Pricing & Rules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Price Per Hour"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price_per_hour?.message}
            {...register('price_per_hour')}
          />

          <Input
            label="Min Duration (Minutes)"
            type="number"
            placeholder="30"
            error={errors.min_duration_minutes?.message}
            {...register('min_duration_minutes')}
          />

          {/* Active Switch */}
          <div className="md:col-span-2 pt-2">
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase text-text-muted">Status</span>
                  <Switch
                    label={field.value ? "Active (Visible to users)" : "Inactive (Hidden)"}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 p-2 justify-center md:col-span-2">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => navigate('/places')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          isLoading={isLoading}
        >
          {defaultValues ? 'Update Place' : 'Create Place'}
        </Button>
      </div>

    </form>
  );
};