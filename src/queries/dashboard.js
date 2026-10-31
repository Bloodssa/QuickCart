import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard";

export const dashboardKeys = {all: ["admin", "dashboard"]};


export const useDashboard = () =>
    useQuery({
        queryKey: dashboardKeys.all,
        queryFn: ({signal}) => getDashboardData(signal),
        refetchInterval: 60_000,
        staleTime: 30_0000
    });