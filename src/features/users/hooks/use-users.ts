import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions';
import type { UserResponse, UserFilters } from '../types';

// --- GET USERS ---
export const useUsers = (filters?: UserFilters) => {
  return useGetQuery<UserResponse>({
    key: ['users', filters],
    url: `/users?q=${filters?.search || ''}`
  });
};

// --- DELETE USER ---
export const useDeleteUser = (id: number | null, onSuccess?: () => void) => {

  return useMutationAction<number, void>({
    method: 'delete',
    url: `/users/${id}`,
    key: ['users'],
    onSuccessCallback: () => {
      if (onSuccess) onSuccess();
    }
  });
};
