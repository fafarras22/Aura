
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DeveloperModeProvider } from "@/context/DeveloperModeContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Sensors from "@/pages/Sensors";
import Alerts from "@/pages/Alerts";
import CCTV from "@/pages/CCTV";
import Harvest from "@/pages/Harvest";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DeveloperModeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sensors" element={<Sensors />} />
              <Route path="/water" element={<Sensors />} /> {/* Temporarily using Sensors page for water */}
              <Route path="/climate" element={<Sensors />} /> {/* Temporarily using Sensors page for climate */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/cctv" element={<CCTV />} />
              <Route path="/harvest" element={<Harvest />} />
              <Route path="/calendar" element={<Dashboard />} /> {/* Placeholder - will implement later */}
              <Route path="/analytics" element={<Dashboard />} /> {/* Placeholder - will implement later */}
              <Route path="/settings" element={<Dashboard />} /> {/* Placeholder - will implement later */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DeveloperModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
