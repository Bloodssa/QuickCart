import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAddress, deleteAddress, getAddresses, getAddressById, setDefaultAddress, updateAddress } from "../api/addresses";

export const addressKeys = {
    all: ["addresses"],
    list: () => [...addressKeys.all, "list"],
    detail: (id) => [...addressKeys.all, "detail", String(id)]
};

export const useAddresses = () =>
    useQuery({
        queryKey: addressKeys.list(),
        queryFn: ({ signal }) => getAddresses(signal)
    });

export const useAddress = (id) =>
    useQuery({
        queryKey: addressKeys.detail(),
        queryFn: ({ signal }) => getAddressById(id, signal),
        enabled: Boolean(id)
    });

// for everry write request mutate it and mark as the data is outdate
function useAddressMutation(mutationFn) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: addressKeys.all })
    });
}

export const useCreateAddress = () => useAddressMutation(createAddress);
export const useUpdateAddress = () => useAddressMutation(updateAddress);
export const useDeleteAddress = () => useAddressMutation(deleteAddress);
export const useSetDefaultAddress = () => useAddressMutation(setDefaultAddress);
