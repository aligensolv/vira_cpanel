import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldAlert } from 'lucide-react';
import { managerSchema, type ManagerFormValues } from '../schema/manager-schema';
import { type Manager } from '../types';

// Components
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

interface ManagerFormProps {
  defaultValues?: Manager;
  onSubmit: (data: ManagerFormValues) => void;
  isLoading: boolean;
}

export const ManagerForm: React.FC<ManagerFormProps> = ({ 
  defaultValues, 
  onSubmit, 
  isLoading,
}) => {
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<ManagerFormValues>({
    resolver: zodResolver(managerSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      password: '',
      password_confirmation: ''
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      
      {/* SECTION 1: ACCOUNT DETAILS */}
      <div className="bg-white p-6 border border-border">
        <h3 className="text-lg font-bold text-text-primary border-b border-border pb-4 mb-6 flex items-center gap-2">
          <User size={18} /> Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            icon={<User size={16}/>}
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="jane@vira.no"
            icon={<Mail size={16}/>}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
      </div>

      {/* SECTION 2: SECURITY */}
      <div className="bg-white p-6 border border-border">
        <h3 className="text-lg font-bold text-text-primary border-b border-border pb-4 mb-6 flex items-center gap-2">
          <Lock size={18} /> Security
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Information Alert - Spans full width */}
          <div className="md:col-span-2 bg-accent p-3 text-xs text-accent-foreground flex items-start gap-2">
            <ShieldAlert size={14} className="mt-0.5 shrink-0" />
            <p className="tracking-wider uppercase">
              {defaultValues 
                ? "Leave the password fields empty if you do not want to change the current password." 
                : "Please set a strong initial password for the new manager account."}
            </p>
          </div>

          <Input
            label={defaultValues ? "New Password" : "Password"}
            type="password"
            placeholder="••••••••"
            icon={<Lock size={16}/>}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={16}/>}
            error={errors.password_confirmation?.message}
            {...register('password_confirmation')}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 pt-2">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={() => navigate('/managers')}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          isLoading={isLoading}
        >
          {defaultValues ? 'Update Manager' : 'Create Manager'}
        </Button>
      </div>

    </form>
  );
};