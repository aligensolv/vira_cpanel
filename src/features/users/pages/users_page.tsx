import React, { useState } from 'react';
import { useUsers } from '../hooks/use-users';
import { UserStats } from '../components/user_stats';
import { UsersList } from '../components/users_list';
import { UserFiltersBar } from '../components/user_filters';
import { type UserFilters } from '../types';

export const UsersPage: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({ search: '' });
  
  const { data, isLoading } = useUsers(filters);
  const users = data?.data || [];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Customers</h1>
        <p className="text-sm text-text-muted">Manage user accounts and view customer activity.</p>
      </div>

      <UserStats users={users} isLoading={isLoading} />
      
      <UserFiltersBar 
        filters={filters} 
        onChange={setFilters} 
      />

      <UsersList data={users} isLoading={isLoading} />
    </div>
  );
};