
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import FarmProjects from '@/pages/FarmProjects';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';
import Tokenization from '@/pages/Tokenization';
import TokenPurchase from '@/pages/TokenPurchase';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/farm-projects" element={<FarmProjects />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tokenization" element={<Tokenization />} />
      <Route path="/token-purchase" element={<TokenPurchase />} />
    </Routes>
  );
};

export default App;
