
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
import Projects from '@/pages/Projects';
import ProjectDetails from '@/pages/ProjectDetails';
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
              
              {/* Project routes */}
              <Route 
                path="/projects" 
                element={
                  <MainLayout>
                    <Projects />
                  </MainLayout>
                } 
              />
              <Route 
                path="/projects/:id" 
                element={
                  <MainLayout>
                    <ProjectDetails />
                  </MainLayout>
                } 
              />
              
              {/* Backend route (admin only) */}
              <Route 
                path="/backend" 
                element={
                  <MainLayout>
                    <BackendDashboard />
                  </MainLayout>
                } 
              />
              
              {/* Mobile view */}
              <Route 
                path="/mobile" 
                element={
                  <MobileLayout>
                    <Dashboard />
                  </MobileLayout>
                } 
              />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </WalletProvider>
      </DeveloperModeProvider>
    </ThemeProvider>
  );
}

export default App;
