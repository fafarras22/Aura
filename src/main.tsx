
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/auth/AuthProvider'
import { ThemeProvider } from './components/ui/theme-provider'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="akar-theme">
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
