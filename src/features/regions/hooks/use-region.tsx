import { useGetQuery, useMutationAction } from "../../../core/hooks/queries-actions";
import type { PlaceResponse } from "../../places/types";
import type { RegionFormValues } from "../schema/region-schema";
import type { Region } from "../types/region";

// --- GET REGIONS ---
export const useRegions = () => {
  return useGetQuery<Region[]>({
    key: ['regions'],
    url: 'regions',
  });
};

// --- CREATE REGION ---
export const useCreateRegion = (onSuccess?: () => void) => {
  return useMutationAction<Region, RegionFormValues>({
    method: 'post',
    url: '/regions',
    key: ['regions', 'create'],
    onSuccessCallback: onSuccess,
  });
};

// --- UPDATE REGION ---
export const useUpdateRegion = (id: number, onSuccess?: () => void) => {
  return useMutationAction<Region, RegionFormValues>({
    method: 'put',
    url: `/regions/${id}`,
    key: ['regions', 'update'],
    onSuccessCallback: onSuccess,
  });
};

// --- DELETE REGION ---
export const useDeleteRegion = (region_id: number | null, onSuccess?: () => void) => {
  // We don't send a body for delete, usually, so generic is void
  return useMutationAction<void>({
    method: 'delete',
    url: `regions/${region_id}`, // Note: If your API expects ID in URL, we handle it in the mutation wrapper differently or pass URL dynamically. 
    key: ['regions', 'delete', region_id],
    onSuccessCallback: onSuccess
  });
};

export const useRegion = (region_id: number) => {
  return useGetQuery<{ data: Region }>({
    url: `regions/${region_id}`,
    key: ['regions', region_id],
  });
};


export const useRegionPlaces = (region_id: number | undefined) => {
  return useGetQuery<PlaceResponse>({
    key: ['places', 'region', region_id],
    url: `/regions/${region_id}/places`,
    options: { enabled: !!region_id }
  });
};