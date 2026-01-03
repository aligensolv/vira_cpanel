import { useGetQuery, useMutationAction } from "../../../core/hooks/queries-actions";
import type { PlaceFormValues } from "../schema/place_schema";
import type { PlaceResponse, SinglePlaceResponse, Place, PlaceFilters } from "../types";

// --- GET ALL PLACES ---
export const usePlaces = (filters?: PlaceFilters) => {
  return useGetQuery<PlaceResponse>({
    key: ['places', filters],
    url: `/places?q=${filters?.search || ''}&status=${filters?.status}&region_id=${filters?.region_id || ''}`,
  });
};

// --- GET SINGLE PLACE ---
export const usePlace = (id: string | undefined) => {
  return useGetQuery<SinglePlaceResponse>({
    key: ['places', id],
    url: `/places/${id}`,
    options: {
      enabled: !!id,
    }
  });
};

// --- CREATE PLACE ---
export const useCreatePlace = (onSuccess?: () => void) => {
  return useMutationAction<Place, PlaceFormValues>({
    method: 'post',
    url: '/places',
    key: ['places', 'create'],
    onSuccessCallback: onSuccess,
  });
};

// --- UPDATE PLACE ---
export const useUpdatePlace = (id: number, onSuccess?: () => void) => {
  return useMutationAction<Place, PlaceFormValues>({
    method: 'put',
    url: `/places/${id}`,
    key: ['places', 'update', id], // invalidates list
    onSuccessCallback: onSuccess,
  });
};

// --- DELETE PLACE (REST) ---
export const useDeletePlace = (place_id: number | null, onSuccess?: () => void) => {
  return useMutationAction<void, number>({
    method: 'delete',
    url: `/places/${place_id}`,
    key: ['places', 'delete', place_id],
    onSuccessCallback: onSuccess,
  });
}