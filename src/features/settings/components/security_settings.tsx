import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock, KeyRound } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export const SecuritySettings: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setTimeout(() => {
      alert("Password updated successfully.");
      reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-border p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="p-2 bg-neutral-100 rounded-full">
           <Lock size={20} className="text-neutral-700" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Security</h3>
          <p className="text-sm text-text-muted">Manage your password and account security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Current Password" 
          type="password"
          placeholder='◉◉◉◉◉◉◉◉'
          icon={<KeyRound size={16}/>}
          {...register('current_password')} 
          className='md:col-span-2'
        />
        <Input 
          label="New Password" 
          type="password"
          placeholder='◉◉◉◉◉◉◉◉'
          icon={<KeyRound size={16}/>}
          {...register('new_password')} 
        />
        <Input 
          label="Confirm New Password" 
          type="password"
          placeholder='◉◉◉◉◉◉◉◉'
          icon={<KeyRound size={16}/>}
          {...register('confirm_password')} 
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button variant="secondary" type="submit">
          Update Password
        </Button>
      </div>
    </form>
  );
};