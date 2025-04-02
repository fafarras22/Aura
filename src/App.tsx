
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { DeveloperModeProvider } from '@/context/DeveloperModeContext';
import { WalletProvider } from '@/context/WalletContext';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
import Tokenization from '@/pages/Tokenization';
import Analytics from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import BackendDashboard from '@/pages/BackendDashboard';
import ProjectDetails from '@/pages/ProjectDetails';
import FarmProjects from '@/pages/FarmProjects';
import FarmProjectDetails from '@/pages/FarmProjectDetails';
import Climate from '@/pages/Climate';
import Water from '@/pages/Water';
import Sensors from '@/pages/Sensors';
import CCTV from '@/pages/CCTV';
import Containers from '@/pages/Containers';
import Harvest from '@/pages/Harvest';
import Alerts from '@/pages/Alerts';
import Vegetables from '@/pages/production/Vegetables';
import DailySales from '@/pages/sales/Daily';
import './App.css';

// Add ethers to window to ensure it's accessible
import { ethers } from 'ethers';
(window as any).ethers = ethers;

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="akar-theme">
      <DeveloperModeProvider>
        <WalletProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              {/* Dashboard and analytics */}
              <Route 
                path="/dashboard" 
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <MainLayout>
                    <Analytics />
                  </MainLayout>
                } 
              />
              <Route 
                path="/tokenization" 
                element={
                  <MainLayout>
                    <Tokenization />
                  </MainLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                } 
              />
              
              {/* Monitoring routes */}
              <Route 
                path="/climate" 
                element={
                  <MainLayout>
                    <Climate />
                  </MainLayout>
                } 
              />
              <Route 
                path="/water" 
                element={
                  <MainLayout>
                    <Water />
                  </MainLayout>
                } 
              />
              <Route 
                path="/sensors" 
                element={
                  <MainLayout>
                    <Sensors />
                  </MainLayout>
                } 
              />
              <Route 
                path="/cctv" 
                element={
                  <MainLayout>
                    <CCTV />
                  </MainLayout>
                } 
              />
              
              {/* Farm management routes */}
              <Route 
                path="/containers" 
                element={
                  <MainLayout>
                    <Containers />
                  </MainLayout>
                } 
              />
              <Route 
                path="/harvest" 
                element={
                  <MainLayout>
                    <Harvest />
                  </MainLayout>
                } 
              />
              <Route 
                path="/alerts" 
                element={
                  <MainLayout>
                    <Alerts />
                  </MainLayout>
                } 
              />
              
              {/* Production data routes */}
              <Route 
                path="/production/vegetables" 
                element={
                  <MainLayout>
                    <Vegetables />
                  </MainLayout>
                } 
              />
              
              {/* Sales performance routes */}
              <Route 
                path="/sales/daily" 
                element={
                  <MainLayout>
                    <DailySales />
                  </MainLayout>
                } 
              />

              {/* Project details */}
              <Route 
                path="/project/:id" 
                element={
                  <MainLayout>
                    <ProjectDetails />
                  </MainLayout>
                } 
              />
              
              {/* Farm Projects routes (new) */}
              <Route 
                path="/farm-projects" 
                element={
                  <MainLayout>
                    <FarmProjects />
                  </MainLayout>
                } 
              />
              <Route 
                path="/farm-projects/:id" 
                element={
                  <MainLayout>
                    <FarmProjectDetails />
                  </MainLayout>
                } 
              />
              
              {/* Admin routes */}
              <Route 
                path="/admin/*" 
                element={
                  <MainLayout>
                    <BackendDashboard />
                  </MainLayout>
                } 
              />
              
              {/* Not found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WalletProvider>
      </DeveloperModeProvider>
    </ThemeProvider>
  );
}

export default App;
