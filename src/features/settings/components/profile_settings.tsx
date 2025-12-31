import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, Save } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useMutationAction } from '../../../core/hooks/queries-actions';

export const ProfileSettings: React.FC = () => {
  // Mock initial data - in real app fetch from useAuth or API
  const defaultValues = {
    name: "Admin User",
    email: "admin@vira.no",
    phone: "+1 234 567 890"
  };

  const { register, handleSubmit } = useForm({ defaultValues });

  // Mock Mutation
  const { mutate, isPending } = useMutationAction({
    method: 'put',
    url: '/admin/profile',
    onSuccessCallback: () => alert('Profile updated!')
  });

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="bg-white border border-border p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="p-2 bg-neutral-100 rounded-full">
           <User size={20} className="text-neutral-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Profile Information</h3>
          <p className="text-sm text-text-muted">Update your account's public information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Full Name" 
          icon={<User size={16}/>}
          {...register('name')} 
        />
        <Input 
          label="Email Address" 
          icon={<Mail size={16}/>}
          {...register('email')} 
        />
        <Input 
          label="Phone Number" 
          icon={<Phone size={16}/>}
          {...register('phone')} 
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" isLoading={isPending} leftIcon={<Save size={16}/>}>
          Save Changes
        </Button>
      </div>
    </form>
  );
};