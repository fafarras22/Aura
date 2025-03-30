
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DeveloperModeProvider } from "@/context/DeveloperModeContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Sensors from "@/pages/Sensors";
import Water from "@/pages/Water";
import Climate from "@/pages/Climate";
import Alerts from "@/pages/Alerts";
import CCTV from "@/pages/CCTV";
import Harvest from "@/pages/Harvest";
import Calendar from "@/pages/Calendar";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Tokenization from "@/pages/Tokenization";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import News from "@/pages/News";
import Partners from "@/pages/Partners";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Legal from "@/pages/Legal";
import Whitepaper from "@/pages/Whitepaper";
import ExploreSolutions from "@/pages/ExploreSolutions";
import LearnMore from "@/pages/LearnMore";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

// Use Layout components that accept children through React component pattern
const ResponsiveLayout = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileLayout><Outlet /></MobileLayout> : <MainLayout><Outlet /></MainLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <DeveloperModeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/news" element={<News />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/explore-solutions" element={<ExploreSolutions />} />
              <Route path="/learn-more" element={<LearnMore />} />
              
              {/* Protected routes - Add authentication check here in a real app */}
              <Route element={<ResponsiveLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Internal Environment */}
                <Route path="/internal-environment" element={<Navigate to="/sensors" replace />} />
                <Route path="/sensors" element={<Sensors />} />
                <Route path="/water" element={<Water />} />
                <Route path="/climate" element={<Climate />} />
                
                {/* External Environment */}
                <Route path="/external-environment" element={<Navigate to="/alerts" replace />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/cctv" element={<CCTV />} />
                <Route path="/calendar" element={<Calendar />} />
                
                <Route path="/tokenization" element={<Tokenization />} />
                <Route path="/harvest" element={<Harvest />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DeveloperModeProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
