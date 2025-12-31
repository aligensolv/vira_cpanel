import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useAdminLogin } from '../hooks/use-auth';
import { type LoginFormValues, loginSchema } from '../schema/login_schema';

export const LoginPage: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useAdminLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      
      {/* COLUMN 1: Visual / Brand (Hidden on Mobile) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-neutral-900 text-white">
        
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-80 mix-blend-overlay"
          style={{ 
            // Using a modern architectural/space abstract image
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')" 
          }}
        />
        <div className="absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/50 to-neutral-900/50" />

        {/* Brand Logo */}
        <div className="relative z-10 flex items-center gap-3">
           <div className="w-10 h-10 bg-white flex items-center justify-center">
             <div className="w-5 h-5 bg-neutral-900 rounded-none" />
           </div>
           <span className="text-xl font-bold tracking-tight uppercase">Vira Panel</span>
        </div>

        {/* Quote / Context */}
        <div className="relative z-10 max-w-lg">
          <blockquote className="text-2xl font-medium leading-relaxed mb-6">
            "Control your spaces with precision. Manage bookings, monitor revenue, and optimize occupancy in real-time."
          </blockquote>
          <div className="flex items-center gap-2 text-neutral-400 text-sm">
            <div className="h-px w-8 bg-neutral-600" />
            <span>Admin Control Center v1.0</span>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white text-neutral-900 relative">
        
        {/* Mobile Logo (Visible only on small screens) */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
           <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center">
             <div className="w-4 h-4 bg-white" />
           </div>
           <span className="font-bold uppercase tracking-tight">Vira - CPanel</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm space-y-8"
        >
          {/* Form Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 uppercase">Sign in</h1>
            <p className="text-neutral-500">Enter your credentials to access the workspace.</p>
          </div>

          {/* Global Error */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 bg-destructive/10 border-l-2 border-destructive text-destructive text-sm font-medium"
            >
              {error?.response?.data?.message || "Invalid credentials. Please try again."}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input 
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={<Mail size={16} />}
              error={errors.email?.message}
              disabled={isPending}
              {...register('email')}
            />

            <div className="space-y-1">
              <Input 
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
                error={errors.password?.message}
                disabled={isPending}
                {...register('password')}
              />
              <div className="flex justify-end">
                <a href="#" className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full uppercase" 
              size="md"
              isLoading={isPending}
            >
              Sign In to vira 
            </Button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-text-muted mt-6">
            Copyright {new Date().getFullYear()} Vira CPanel. All rights reserved.
          </p>
        </motion.div>
      </div>

    </div>
  );
};