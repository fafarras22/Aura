
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AdminSignup from "@/pages/AdminSignup";
import AccountSettings from "@/pages/AccountSettings";
import FarmProjects from "@/pages/FarmProjects";
import FarmProjectDetails from "@/pages/FarmProjectDetails";
import Tokenization from "@/pages/Tokenization";
import Analytics from "@/pages/Analytics";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DeveloperModeProvider } from "@/context/DeveloperModeContext";
import { WalletProvider } from "@/context/WalletContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="akar-ui-theme">
      <WalletProvider>
        <DeveloperModeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="admin-signup" element={<AdminSignup />} />
              <Route path="farm-projects" element={<FarmProjects />} />
              <Route path="farm-projects/:id" element={<FarmProjectDetails />} />
              <Route path="tokenization" element={<Tokenization />} />
              <Route path="analytics" element={<Analytics />} />
              <Route
                path="dashboard"
                element={
                  <Dashboard />
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster />
        </DeveloperModeProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
