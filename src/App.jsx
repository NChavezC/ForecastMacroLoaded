import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Plot from "./pages/Plot";
import Forecast from "./pages/Forecast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "./ui/PageNotFound";
import { ForecastProvider } from "./contexts/ForecastContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
});

function App() {
  return (
    <ForecastProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="plot" />} />
              <Route path="plot" element={<Plot />} />
              <Route path="forecast" element={<Forecast />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ForecastProvider>
  );
}

export default App;
