
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import FarmProjects from '@/pages/FarmProjects';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Tokenization from '@/pages/Tokenization';
import TokenPurchase from '@/pages/TokenPurchase';
import ConnectWallet from '@/pages/ConnectWallet';
import ProjectDetails from '@/pages/ProjectDetails';
import HowItWorks from '@/pages/HowItWorks';
import Sensors from '@/pages/Sensors';
import Water from '@/pages/Water';
import About from '@/pages/About';
import Whitepaper from '@/pages/Whitepaper';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/farm-projects" element={<FarmProjects />} />
      <Route path="/connect-wallet" element={<ConnectWallet />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tokenization" element={<Tokenization />} />
      <Route path="/token-purchase" element={<TokenPurchase />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/sensors" element={<Sensors />} />
      <Route path="/water" element={<Water />} />
      <Route path="/about" element={<About />} />
      <Route path="/whitepaper" element={<Whitepaper />} />
    </Routes>
  );
};

export default App;
