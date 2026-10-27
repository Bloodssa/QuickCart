import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders, getAdminOrder, updateAdminOrderStatus  } from "../api/adminOrders";
import { toast } from "sonner";
import { getErrorMessage } from "../api/client";

export const adminOrderKeys = {
    all: ["admin-orders"],
    lists: () => [...adminOrderKeys.all, "list"],
    list: (params) => [...adminOrderKeys.lists(), params],
    detail: (id) => [...adminOrderKeys.all, "detail", String(id)],
};

export const useAdminOrders = (params = {}) =>
    useQuery({
        queryKey: adminOrderKeys.list(params),
        queryFn: ({ signal }) => getAdminOrders(params, signal),
        placeholderData: keepPreviousData,
    });

export const useAdminOrder = (id) =>
    useQuery({
        queryKey: adminOrderKeys.detail(id),
        queryFn: ({ signal }) => getAdminOrder(id, signal),
        enabled: Boolean(id),
    });

export const useUpdateAdminOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, paymentStatus }) =>
      updateAdminOrderStatus(id, status, paymentStatus),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminOrderKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: adminOrderKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("Order updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};