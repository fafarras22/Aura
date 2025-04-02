
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { useWallet } from "@/context/WalletContext";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AppleNotification } from "@/components/ui/apple-notification";
import { Bell, Leaf, LogOut, Settings, Wallet } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { Footer } from "./Footer";
import { FloatingContactButton } from "./FloatingContactButton";
import { WalletConnectModal } from "@/components/wallet/WalletConnectModal";
import { shortenAddress } from "@/lib/web3";
import { Logo } from "@/components/logo/Logo";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isDeveloperMode, toggleDeveloperMode, currentUser } = useDeveloperMode();
  const { wallet, disconnect } = useWallet();
  const [showNotification, setShowNotification] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const navigate = useNavigate();

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // Handle wallet disconnection
  const handleDisconnectWallet = () => {
    disconnect();
  };
  
  // Get display name/initial for avatar
  const walletDisplay = wallet.connected 
    ? shortenAddress(wallet.address)
    : 'Connect Wallet';
  
  const avatarInitial = wallet.connected 
    ? wallet.address.substring(2, 4).toUpperCase() 
    : 'W';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-gray-200 dark:border-gray-800 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md" />
              <Logo size="sm" />
            </div>
            
            <div className="flex items-center gap-3">
              {isDeveloperMode && (
                <div className="flex items-center gap-2 mr-2">
                  <Switch 
                    checked={isDeveloperMode} 
                    onCheckedChange={toggleDeveloperMode} 
                    id="developer-mode" 
                  />
                  <label htmlFor="developer-mode" className="text-xs font-medium cursor-pointer">
                    Developer Mode
                  </label>
                </div>
              )}
              
              <ThemeToggle />
              
              {wallet.connected ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {avatarInitial}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm hidden md:inline">{walletDisplay}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                    <DropdownMenuItem 
                      className="text-xs text-muted-foreground"
                      disabled
                    >
                      {wallet.address}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/tokenization')}>
                      My Investments
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDisconnectWallet} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Disconnect Wallet</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="default" 
                  className="gap-2"
                  onClick={() => setShowWalletModal(true)}
                >
                  <Wallet className="h-4 w-4" />
                  <span className="hidden md:inline">Connect Wallet</span>
                </Button>
              )}
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
          
          <Footer />
        </div>

        <AppleNotification 
          title="Hint" 
          description="You can switch to developer mode to see all farms."
          icon={<Leaf className="h-6 w-6 text-green-700" />}
          onClose={() => setShowNotification(false)}
          isVisible={showNotification}
        />
        
        <WalletConnectModal
          open={showWalletModal}
          onOpenChange={setShowWalletModal}
        />
      </div>
    </SidebarProvider>
  );
}
