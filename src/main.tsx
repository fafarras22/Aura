
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/auth/AuthProvider'
import { ThemeProvider } from './components/ui/theme-provider'
import { DeveloperModeProvider } from './context/developer-mode'
import { WalletProvider } from './context/wallet/WalletContext'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="akar-theme">
        <DeveloperModeProvider>
          <WalletProvider>
            <App />
          </WalletProvider>
        </DeveloperModeProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
