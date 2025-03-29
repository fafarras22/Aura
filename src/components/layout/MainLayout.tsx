
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useDeveloperMode } from "@/context/DeveloperModeContext";
import { Switch } from "@/components/ui/switch";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const { isDeveloperMode, toggleDeveloperMode } = useDeveloperMode();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isDeveloperMode={isDeveloperMode} />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-white dark:bg-gray-950">
            <SidebarTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {isDeveloperMode ? "Developer Mode" : "Client Mode"}
              </span>
              <Switch
                checked={isDeveloperMode}
                onCheckedChange={toggleDeveloperMode}
              />
            </div>
          </header>
          <main className="flex-1 p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
