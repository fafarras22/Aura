
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Switch } from "@/components/ui/switch";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { AppleNotification } from "@/components/ui/apple-notification";
import { Bell } from "lucide-react";
import { AppleButton } from "@/components/ui/apple-button";

export function MainLayout() {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();
  const [showNotification, setShowNotification] = useState(false);

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar isDeveloperMode={isDeveloperMode} />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md" />
              <h1 className="text-lg font-medium">AKAR FarmWatch</h1>
            </div>
            <div className="flex items-center gap-3">
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
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
      
      <AppleNotification
        title="Welcome to AKAR FarmWatch"
        description="Monitor your farm's status in real-time with our advanced dashboard."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        icon={<Bell className="w-5 h-5 text-primary" />}
      />
    </SidebarProvider>
  );
}
