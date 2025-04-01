
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MobileLayout from '@/components/layout/MobileLayout';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { DeveloperModeProvider } from '@/context/DeveloperModeContext';
import { AuthProvider } from '@/context/auth/AuthProvider';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Tokenization from '@/pages/Tokenization';
import Analytics from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import BackendDashboard from '@/pages/BackendDashboard';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="akar-theme">
      <DeveloperModeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Analytics />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tokenization" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Tokenization />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Settings />
                    </MainLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Backend route (admin only) */}
              <Route 
                path="/backend" 
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <BackendDashboard />
                    </MainLayout>
                  </ProtectedRoute>
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
        </AuthProvider>
      </DeveloperModeProvider>
    </ThemeProvider>
  );
}

export default App;
