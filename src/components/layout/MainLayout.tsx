
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { AppleNotification } from "@/components/ui/apple-notification";
import { Bell, LogOut } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleSignOut = () => {
    // In a real app, this would include authentication logic
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar isDeveloperMode={isDeveloperMode} />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md" />
              <img src="/lovable-uploads/3672cca4-6d18-4e47-a64d-554cbda0558b.png" alt="AKAR Logo" className="h-8" />
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <AppleButton 
                variant="ghost" 
                size="icon" 
                onClick={triggerNotification}
                className="rounded-full"
              >
                <Bell className="w-5 h-5" />
              </AppleButton>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {isDeveloperMode ? "Developer Mode" : "Client Mode"}
                </span>
                <Switch
                  checked={isDeveloperMode}
                  onCheckedChange={toggleDeveloperMode}
                />
              </div>

              <AppleButton 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 ml-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </AppleButton>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      
      <AppleNotification
        title="AKAR Farm Update"
        description="Monitor your farm's status in real-time with our advanced dashboard."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        icon={<Bell className="w-5 h-5 text-primary" />}
      />
    </SidebarProvider>
  );
}
