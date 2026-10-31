import { useQuery } from "@tanstack/react-query";
import { getAllCities, getBarangays, getProvinces } from "../api/psgc";

const cache = { staleTime: Infinity, gcTime: Infinity, retry: 1, refetchOnWindowFocus: false };

export const provincesQuery = {
    queryKey: ["psgc", "provinces"],
    queryFn: ({ signal }) => getProvinces(signal),
    ...cache,
};

export const allCitiesQuery = {
    queryKey: ["psgc", "cities", "all"],
    queryFn: ({ signal }) => getAllCities(signal),
    ...cache,
};

export const barangaysQuery = (cityCode) => ({
    queryKey: ["psgc", "barangays", cityCode],
    queryFn: ({ signal }) => getBarangays(cityCode, signal),
    ...cache,
});

export const useProvinces = () => useQuery(provincesQuery);
export const useAllCities = () => useQuery(allCitiesQuery);
export const useBarangays = (cityCode) => useQuery({ ...barangaysQuery(cityCode), enabled: Boolean(cityCode) });