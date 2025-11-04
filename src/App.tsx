
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Eager load critical pages
import Home from '@/pages/Home';
import ConnectWallet from '@/pages/ConnectWallet';

// Lazy load other pages for better performance
const Projects = lazy(() => import('@/pages/Projects'));
const FarmOS = lazy(() => import('@/pages/FarmOS'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Profile = lazy(() => import('@/pages/Profile'));
const ProjectDetails = lazy(() => import('@/pages/ProjectDetails'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const Sensors = lazy(() => import('@/pages/Sensors'));
const Water = lazy(() => import('@/pages/Water'));
const About = lazy(() => import('@/pages/About'));
const Whitepaper = lazy(() => import('@/pages/Whitepaper'));
const Careers = lazy(() => import('@/pages/Careers'));
const Partners = lazy(() => import('@/pages/Partners'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const Legal = lazy(() => import('@/pages/Legal'));
const AdminSignup = lazy(() => import('@/pages/AdminSignup'));
const News = lazy(() => import('@/pages/News'));
const Climate = lazy(() => import('@/pages/Climate'));
const ProjectDashboard = lazy(() => import('@/pages/ProjectDashboard'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/farm-os" element={<FarmOS />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/water" element={<Water />} />
          <Route path="/climate" element={<Climate />} />
          <Route path="/about" element={<About />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/news" element={<News />} />
          <Route path="/project/:id/dashboard" element={<ProjectDashboard />} />
          
          {/* Redirect old routes to new ones if needed */}
          <Route path="/learn-more" element={<Navigate to="/how-it-works" replace />} />
          <Route path="/explore-solutions" element={<Navigate to="/farm-os" replace />} />
          
          {/* 404 fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
              <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Return to Home
              </button>
            </div>
          } />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
