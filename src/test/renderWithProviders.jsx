import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { AuthContext } from "../context/AuthContext";

export function renderWithProviders(ui, { route = "/", auth = {} } = {}) {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const authValue = { user: null, status: "anonymous", isAdmin: false, login: vi.fn(), logout: vi.fn(), ...auth };

    return render(
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={authValue}>
                <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
            </AuthContext.Provider>
        </QueryClientProvider>,
    );
}