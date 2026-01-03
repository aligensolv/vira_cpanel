import type { Manager, ManagerResponse, SingleManagerResponse } from '../types';
import type { ManagerFormValues } from '../schema/manager-schema';
import { useGetQuery, useMutationAction, type ApiError } from '../../../core/hooks/queries-actions';

export const useManagers = () => {
  return useGetQuery<ManagerResponse>({
    key: ['managers'],
    url: '/managers',
  });
};

// --- GET SINGLE MANAGER ---
export const useManager = (id: string | undefined) => {
  return useGetQuery<SingleManagerResponse>({
    key: ['managers', id],
    url: `/managers/${id}`,
    options: { enabled: !!id }
  });
};

// --- CREATE MANAGER ---
export const useCreateManager = (onSuccess?: () => void, onError?: (error: ApiError) => void) => {
  return useMutationAction<Manager, ManagerFormValues>({
    method: 'post',
    url: '/managers',
    key: ['managers', 'create'],
    onSuccessCallback: onSuccess,
    onErrorCallback: onError,
  });
};

// --- UPDATE MANAGER ---
export const useUpdateManager = (id: number, onSuccess?: () => void) => {
  return useMutationAction<Manager, ManagerFormValues>({
    method: 'put',
    url: `/managers/${id}`,
    key: ['managers', 'update'],
    onSuccessCallback: onSuccess,
  });
};

// --- DELETE MANAGER ---
export const useDeleteManager = (id: number | null, onSuccess?: () => void) => {
  return useMutationAction<number, void>({
    method: 'delete',
    url: `/managers/${id}`,
    key: ['managers', 'delete', id],
    onSuccessCallback: onSuccess,
  });
};
